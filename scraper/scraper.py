import json
from bs4 import BeautifulSoup
import requests

url = "https://nutrition.umd.edu/?locationNum=51&dtdate=4/28/2025"
response = requests.get(url)

soup = BeautifulSoup(response.text, "html.parser")

nav_links = soup.find_all("a", class_="nav-link")


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
            nutrition_info["saturated_fat"] = clean_value(
                text.replace("saturated fat", "").strip())
        elif "trans fat" in text:
            nutrition_info["trans_fat"] = clean_value(
                text.replace("trans fatty acid", "").strip())
        elif text.startswith("cholesterol"):
            nutrition_info["cholesterol"] = clean_value(
                text.replace("cholesterol", "").strip())
        elif text.startswith("sodium"):
            nutrition_info["sodium"] = clean_value(
                text.replace("sodium", "").strip())
        elif text.startswith("total carbohydrate"):
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


meal_data = {}

for nav_link in nav_links:
    meal_name = nav_link.text.strip()
    section_id = nav_link['aria-controls']
    section_div = soup.find("div", id=section_id)

    if not section_div:
        continue

    items = section_div.find_all("div", class_="menu-item-row")
    visited = set()
    meal_items = []

    for item in items:
        name_tag = item.find("a", class_="menu-item-name")
        name = name_tag.text.strip() if name_tag else "no name"

        if name in visited:
            continue
        visited.add(name)

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

        if name_tag and "href" in name_tag.attrs:
            nutrition_link = "https://nutrition.umd.edu/" + name_tag["href"]

            try:
                nutrition_response = requests.get(nutrition_link)
                if nutrition_response.status_code != 200:
                    raise Exception(
                        f"Bad status code: {nutrition_response.status_code}")

                nutrition_soup = BeautifulSoup(
                    nutrition_response.text, "html.parser")
                table_div = nutrition_soup.find(
                    "div", class_="section-ut_table")

                if not table_div:
                    raise Exception("No table div")

                facts_table = table_div.find("table", class_="facts_table")
                if not facts_table:
                    raise Exception("No facts table")

                rows = facts_table.find_all("tr")

                for row in rows:
                    tds = row.find_all("td")
                    for td in tds:
                        serving_per_container_div = td.find(
                            "div", class_="nutfactsservpercont")
                        if serving_per_container_div:
                            servings_per_container = serving_per_container_div.text.strip()

                        serving_div = td.find_all(
                            "div", class_="nutfactsservsize")
                        if len(serving_div) > 1:
                            serving_size = serving_div[1].text.strip()

                        p_tags = td.find_all("p")
                        if len(p_tags) > 1:
                            calories = p_tags[1].text.strip()

                nut_facts = nutrition_soup.find_all(
                    "span", class_="nutfactstopnutrient")
                nutrition = parse_nutrition(nut_facts)
                scraped = True

            except Exception as e:
                print(f"Failed to parse {name} — {str(e)}")

        icon_div = item.find("div", class_="col-md-4")
        allergen_imgs = icon_div.find_all("img") if icon_div else []

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

        meal_items.append(item_data)

    meal_data[meal_name] = meal_items


with open("../data/51_by_meal.json", "w", encoding="utf-8") as file:
    json.dump(meal_data, file, indent=2, ensure_ascii=False)
