# UMD Dining AI Meal Recommender

A full-stack web application that scrapes the University of Maryland College Park Dining website (https://nutrition.umd.edu/) daily, processes nutrition data, and uses Google’s Gemini AI to recommend personalized meals for students and staff.

## 📖 Overview

This project automatically gathers up-to-date menus for Breakfast, Lunch, and Dinner across all three UMD dining halls. It presents the meals in a clean, user-friendly interface along with detailed nutrition facts (calories, protein, fat, carbs, etc.).  
Through integration with Gemini AI, users receive personalized daily meal recommendations tailored to specific goals and dietary preferences, such as:

- Bulking / Cutting
- Vegan / Vegetarian / Pescatarian
- Low-carb / Keto
- Allergen-friendly (Gluten-free, Nut-free, etc.)
- Medical-focused (Low-sodium, Diabetic-friendly, Heart-healthy)

<img width="2472" height="1426" alt="image" src="https://github.com/user-attachments/assets/aa28a560-1dbe-43e4-a5af-246d9b3e06f3" />

## 🚀 Features

- Automated Web Scraping  
  - Python + BeautifulSoup fetches daily menu data from UMD Dining Services.
  - Pulls all meals from Breakfast, Lunch, Dinner for every dining hall.

- Structured Nutrition Data  
  - Parses calories, protein, fat, carbs, sugars, sodium, cholesterol, fiber.
  - Stores data in JSON format for easy use in frontend.

- AI-Powered Recommendations  
  - Uses Google Gemini AI (google-genai) to analyze meals and generate 69 daily recommendations (23 categories × 3 occasions).
  - Categories include nutritional goals, health/medical goals, dietary preferences, and allergen-specific needs.

- Responsive Frontend  
  - Built with React + TypeScript + Tailwind CSS for a modern UI.
  - Three-column layout for Breakfast / Lunch / Dinner.
  - Interactive drawers to explore different recommendation categories.

<img width="2477" height="1423" alt="image" src="https://github.com/user-attachments/assets/ca12558c-1f20-41ac-b922-d508acdd23a4" />

- Filtering by Occasion and Category  
  - Easily switch between breakfast, lunch, and dinner recommendations.
  - Organized by category for quick access.

## 🛠️ Tech Stack

Frontend: React, TypeScript, Tailwind CSS, Framer Motion (animations)  
Backend / Scraping: Python 3, BeautifulSoup4, dotenv  
AI Integration: Google Gemini AI (google-genai), prompt engineering for structured meal recommendations  
Build Tools: Node.js & npm  

## 📂 Project Structure

.
├── scraper/                # Python web scraper for UMD Dining  
│   ├── gemini.py            # AI prompt & recommendation generator  
│   └── scrape.py            # BeautifulSoup scraper logic  
├── data/                    # Saved JSON menu & recommendations  
├── src/components/          # React UI components  
│   ├── Drawer.tsx  
│   ├── BounceCard.tsx  
│   ├── RecommendedSection.tsx  
├── public/                  # Static assets  
├── package.json  
├── README.md  
└── ...

## ⚙️ Setup & Installation

1. Clone the repo:  
git clone https://github.com/YOUR_USERNAME/umd-dining-ai.git  
cd umd-dining-ai  

2. Install dependencies:  
Frontend:  
npm install  
Backend/Scraper:  
pip install -r requirements.txt  

3. Environment variables:  
Create `.env.local` in the root directory with:  
GEMINI_API_KEY=your_google_genai_api_key  

4. Run the scraper:  
python scraper/scrape.py  

5. Generate AI recommendations:  
python scraper/gemini.py  

6. Start the frontend:  
npm run dev  

## 🧠 AI Recommendation Categories

The system generates 23 recommendation types for each meal occasion:

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

Health / Medical Goals:  
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

<img width="2478" height="1425" alt="image" src="https://github.com/user-attachments/assets/ea384b4f-a2d3-4f66-b7d1-6c48ca2b87e7" />

## 📸 Screenshots

<img width="2304" height="783" alt="image" src="https://github.com/user-attachments/assets/681d0051-388a-4914-8160-9e6629fb8fc0" />
<img width="2478" height="1425" alt="image" src="https://github.com/user-attachments/assets/6b154d12-f9a9-4b97-a2a8-71be9d64ba4b" />
<img width="1556" height="1230" alt="image" src="https://github.com/user-attachments/assets/bc4f7261-e16d-4440-872e-5fe474966edb" />
<img width="2479" height="1422" alt="image" src="https://github.com/user-attachments/assets/007eed82-e915-4741-8bdb-bf5411c3e4ee" />

## 🧾 License
This project is licensed under the MIT License.

## 🙌 Acknowledgements
- University of Maryland Dining Services for menu data.
- Google Gemini AI for powering recommendations.
- BeautifulSoup for HTML parsing.
