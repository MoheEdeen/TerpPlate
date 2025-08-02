import json
import os
from bs4 import BeautifulSoup
import requests

url = "https://nutrition.umd.edu/?locationNum=16&dtdate=4/29/2025"
response = requests.get(url)

soup = BeautifulSoup(response.text, "html.parser")

items = soup.find_all("div", class_="menu-item-row")


def clean_value(val):
    val = val.replace("\xa0", "").replace("-", "").strip()
    return val if val and any(char.isdigit() for char in val) else None


def parse_nutrition(nut_facts_spans):
    nutrition_info = {}

    for span in nut_facts_spans:
        text = span.get_text(separator=" ").strip().lower()

        if text.startswith("total fat"):
            nutrition_info["total_fat"] = clean_value(
                text.replace("total fat", "").strip())
        elif text.startswith("saturated fat"):
            nutrition_info["saturated_fat"] = clean_value(text.replace(
                "saturated fat", "").strip())
        elif "trans fat" in text:
            nutrition_info["trans_fat"] = clean_value(text.replace(
                "trans fatty acid", "").strip())
        elif text.startswith("cholesterol"):
            nutrition_info["cholesterol"] = clean_value(text.replace(
                "cholesterol", "").strip())
        elif text.startswith("sodium"):
            nutrition_info["sodium"] = clean_value(
                text.replace("sodium", "").strip())
        elif text.startswith("total carbohydrate") or text.startswith("total carbohydrate."):
            nutrition_info["carbs"] = clean_value(text.replace(
                "total carbohydrate.", "").replace("total carbohydrate", "").strip())
        elif text.startswith("dietary fiber"):
            nutrition_info["fiber"] = clean_value(
                text.replace("dietary fiber", "").strip())
        elif text.startswith("total sugars"):
            nutrition_info["sugars"] = clean_value(
                text.replace("total sugars", "").strip())
        elif text.startswith("protein"):
            nutrition_info["protein"] = clean_value(
                text.replace("protein", "").strip())

    return nutrition_info


visited = set()
all_items = []

for item in items:
    name_tag = item.find("a", class_="menu-item-name")
    name = name_tag.text.strip() if name_tag else "no name"

    if name in visited:
        continue

    visited.add(name)
    print(name)

    if name_tag and "href" in name_tag.attrs:

        nutrition_link = "https://nutrition.umd.edu/" + name_tag["href"]

        calories = None
        servings_per_container = None
        serving_size = None
        nutrition = {
            "total_fat": None,
            "saturated_fat": None,
            "trans_fat": None,
            "cholesterol": None,
            "sodium": None,
            "carbs": None,
            "fiber": None,
            "sugars": None,
            "protein": None
        }
        scraped = False

        try:
            nutrition_response = requests.get(nutrition_link)

            if nutrition_response.status_code != 200:
                print(f"{name} — bad status code")
                print(f"Skipping {name} — fallback to None")
                pass

            nutrition_soup = BeautifulSoup(
                nutrition_response.text, "html.parser")
            table_div = nutrition_soup.find("div", class_="section-ut_table")

            if table_div is None:
                print(f"Skipping {name} — no table found.")
                print(f"Skipping {name} — fallback to None")
                pass

            facts_table = table_div.find("table", class_="facts_table")
            if facts_table is None:
                print(f"Skipping {name} - no facts table.")
                print(f"Skipping {name} — fallback to None")
                pass

            rows = facts_table.find_all("tr")

            for row in rows:
                tds = row.find_all("td")
                for td in tds:
                    serving_per_container_div = td.find(
                        "div", class_="nutfactsservpercont")
                    if serving_per_container_div:
                        servings_per_container = serving_per_container_div.text.strip()

                    serving_div = td.find_all("div", class_="nutfactsservsize")
                    if serving_div:
                        serving_size = serving_div[1].text.strip()

                    p_tags = td.find_all("p")
                    if p_tags:
                        calories = p_tags[1].text.strip()

            nut_facts = nutrition_soup.find_all(
                "span", class_="nutfactstopnutrient")
            nutrition = parse_nutrition(nut_facts)
            scraped = True
        except Exception as e:
            print(f"Failed to parse {name} — {str(e)}")
            pass

    icon_div = item.find("div", class_="col-md-4")

    allergen_imgs = []

    if icon_div:
        allergen_imgs = icon_div.find_all("img")

    allergens = []
    for img in allergen_imgs:
        if "alt" in img.attrs:
            raw = img["alt"].strip().lower()

            if raw.startswith("contains "):
                raw = raw.replace("contains ", "")

            allergens.append(raw)

    item_data = {
        "name": name,
        "calories": calories,
        "servings_per_container": servings_per_container,
        "serving_size": serving_size,
        "allergens": allergens,
        "nutrition": nutrition,
        "scraped": scraped
    }

    all_items.append(item_data)

with open("../data/16_test.json", "w", encoding="utf-8") as file:
    json.dump(all_items, file, indent=2, ensure_ascii=False)
