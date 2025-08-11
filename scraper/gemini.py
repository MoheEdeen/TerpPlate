from dotenv import load_dotenv
from pydantic import BaseModel
from google import genai
from google.genai import types
from typing import Literal
import os
import json


class Macros(BaseModel):
    protein: float
    fat: float
    carbs: float


class RecommendationResponse(BaseModel):
    occasion: Literal["Breakfast", "Lunch", "Dinner"]
    category: str
    subcategory: str
    items_name: list[str]
    total_calories: float
    macros: Macros
    suggestions: list[str]


load_dotenv(dotenv_path="../.env.local")
API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=API_KEY)

with open("../data/16_by_meal.json", "r") as f:
    meal_data = json.load(f)

prompt = f"""
You are given a JSON object named menu with exactly three keys: "Breakfast", "Lunch", and "Dinner".
Each maps to an array of food items shaped like:

- name: string
- calories: string or null (e.g., "127")
- serving_size: string or null (e.g., "4 oz")
- servings_per_container: string or null
- allergens: array of tags (e.g., ["vegan","vegetarian","gluten-free","dairy","egg","soy","nuts","smartchoice"])
- nutrition: object with string-with-units values or null, keys may include:
    total_fat, saturated_fat, trans_fat, cholesterol, sodium, carbs, fiber, sugars, protein
- scraped: boolean

menu =
{json.dumps(meal_data, indent=2)}

TASK
Create exactly 69 complete, realistic meals: for EACH occasion ("Breakfast","Lunch","Dinner"), produce ONE meal for EACH of the 23 subcategories listed below (total 23 × 3).
Use ONLY foods from the matching occasion list: Breakfast meals must draw from menu["Breakfast"], Lunch from menu["Lunch"], Dinner from menu["Dinner"].

High-level categories and subcategories (cover ALL of these):
Nutritional Goal-Based:
  1. High-calorie (Bulking)
  2. Low-calorie (Cutting)
  3. High-protein
  4. Low-carb
  5. Keto
  6. Balanced
  7. High-fiber
  8. Low-fat
  9. High-fat
Health/Medical Goals:
  10. Low-sodium
  11. Low-cholesterol
  12. Diabetic-friendly
  13. Heart-healthy
  14. Low-glycemic
Dietary Preference:
  15. Vegetarian
  16. Vegan
  17. Pescatarian
  18. Plant-based
Allergen-Specific:
  19. Gluten-free
  20. Dairy-free
  21. Egg-free
  22. Nut-free
  23. Soy-free

OUTPUT
Return ONLY a flat JSON array of 69 objects (no extra text). Each object MUST match this schema exactly:
- occasion: "Breakfast" | "Lunch" | "Dinner"
- category: "Nutritional Goal-Based" | "Health/Medical Goals" | "Dietary Preference" | "Allergen-Specific"
- subcategory: EXACTLY one of the 23 names above
- items_name: array of strings (food names used)
- total_calories: number (sum across items; no units)
- macros: {{"protein": number, "fat": number, "carbs": number }} in grams
- suggestions: array of short strings with optional tweaks/add-ons

ORDER
Output the 69 meals in this order for easy parsing:
1–23: Breakfast (subcategories 1→23)
24–46: Lunch (subcategories 1→23)
47–69: Dinner (subcategories 1→23)

RULES
1) Use only items with available calories AND at least protein/fat/carbs data (strings like "8.7g" are OK—parse the numeric part).
2) Portion sizes must be realistic; you may use fractional multiples of a serving (e.g., 1.5 × serving_size). Scale nutrition accordingly.
3) Compute totals by summing per-item values; round calories to whole numbers and macros to 1 decimal place.
4) Enforce intent of each subcategory as much as possible given available items:
   - High-calorie (Bulking): ≥700 kcal (breakfast) / ≥800 kcal (lunch,dinner)
   - Low-calorie (Cutting): ≤400 kcal (breakfast) / ≤500 kcal (lunch,dinner)
   - High-protein: ≥30% of calories from protein
   - Low-carb: ≤25% of calories from carbs
   - Keto: ≤10% of calories from carbs
   - Balanced: ~40% carbs / 30% protein / 30% fat (±5% each)
   - High-fiber: ≥8 g (breakfast) / ≥10 g (lunch,dinner)
   - Low-fat: ≤25% of calories from fat
   - High-fat: ≥50% of calories from fat
   - Low-sodium: ≤600 mg (breakfast) / ≤800 mg (lunch,dinner)
   - Low-cholesterol: ≤100 mg
   - Diabetic-friendly / Low-glycemic: minimize sugars; avoid obvious high-sugar items
   - Heart-healthy: emphasize lower saturated fat and higher fiber
5) Dietary Preference & Allergen-Specific must strictly comply.
   Use allergens/tags when present; otherwise infer conservatively (e.g., if unsure, do NOT use the item).
6) Do NOT invent foods or nutrition data. Use only items in menu.
7) Avoid repeating the exact same meal across different subcategories.
8) If a perfect match is impossible with the available items, choose the closest feasible option and note the deviation in suggestions (e.g., "closest to keto given menu").
"""


response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
    config=types.GenerateContentConfig(
        system_instruction="You are a registered dietitian.",
        response_mime_type="application/json",
        response_schema=list[RecommendationResponse],
        thinking_config=types.ThinkingConfig(thinking_budget=0)
    ),
)

recipes: list[RecommendationResponse] = response.parsed

data = [rec.model_dump() for rec in recipes]
with open("../data/16_recommendations.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

print("Saved", len(data), "meals to recipes_output.json")
