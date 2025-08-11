import { useEffect, useRef, useState } from "react";
import SpringModal from "./SpringModal";
import dataSouth from "../../data/16_by_meal.json";
import dataYahentamitsi from "../../data/19_by_meal.json";
import data251 from "../../data/51_by_meal.json";
import Card from "./card";
import { ListFilter } from "lucide-react";
import ChipTabs from "./HallTabs";

const FoodSection = ({ searchTerm }: { searchTerm: string }) => {
  const [selected, setSelected] = useState<any | null>(null);
  const [selectedAllergen, setSelectedAllergen] = useState<string>("ALL");
  const [showFilter, setShowFilter] = useState(false);
  const [sortKey, setSortKey] = useState<string>("None");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedTab, setSelectedTab] = useState("251 North");
  const [selectedMeal, setSelectedMeal] = useState("Breakfast");

  const filterRef = useRef<HTMLDivElement>(null);

  const hallDataMap: Record<string, Record<string, any[]>> = {
    "251 North": data251 as Record<string, any[]>,
    Yahentamitsi: dataYahentamitsi as Record<string, any[]>,
    "South Campus": dataSouth as Record<string, any[]>,
  };

  const hallData = hallDataMap[selectedTab] ?? {};
  const data = (hallData[selectedMeal] ?? []).map((item: any) => ({
    ...item,
    mealType: selectedMeal,
  }));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };

    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  const filteredData = [...data]
    .filter((food) => {
      const term = searchTerm.toLowerCase();
      const nameMatch = food.name.toLowerCase().includes(term);
      const allergenMatch = food.allergens.some((allergen: string) =>
        allergen.toLowerCase().includes(term)
      );
      const allergenFilterMatch =
        selectedAllergen === "ALL" || food.allergens.includes(selectedAllergen);

      return (nameMatch || allergenMatch) && allergenFilterMatch;
    })
    .sort((a, b) => {
      if (sortKey === "None") return 0;

      const valA = Number(a[sortKey]);
      const valB = Number(b[sortKey]);

      if (isNaN(valA) || isNaN(valB)) return 0;

      return sortOrder === "asc" ? valA - valB : valB - valA;
    });

  const filter = () => {
    setShowFilter((prev) => !prev);
  };

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 mb-20">
          <span className="text-xl md:text-2xl justify-self-start">
            Showing results containing "{searchTerm}"
          </span>
          <span className="text-xl mb-20 md:text-2xl justify-self-end">
            <button onClick={filter} className="cursor-pointer">
              <ListFilter />
            </button>
            {showFilter && (
              <div
                ref={filterRef}
                className="absolute top-30 right-10 bg-white rounded-md shadow-lg p-4 z-100"
              >
                <label
                  htmlFor="allergen-select"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Filter by Allergen:
                </label>
                <select
                  id="allergen-select"
                  className="w-full text-sm uppercase border-gray-300 rounded-md mb-6 shadow-sm"
                  value={selectedAllergen}
                  onChange={(e) => setSelectedAllergen(e.target.value)}
                >
                  <option value="ALL" className="text-sm uppercase">
                    ALL
                  </option>
                  {[...new Set(data.flatMap((item) => item.allergens))].map(
                    (allergen) => (
                      <option
                        className="text-sm uppercase"
                        key={allergen}
                        value={allergen}
                      >
                        {allergen}
                      </option>
                    )
                  )}
                </select>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by:
                </label>
                <select
                  className="w-full text-sm border-gray-300 rounded-md mb-4 shadow-sm"
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value)}
                >
                  <option value="None">None</option>
                  <option value="calories">Calories</option>
                </select>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort order:
                </label>
                <select
                  className="w-full text-sm border-gray-300 rounded-md shadow-sm"
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(e.target.value === "asc" ? "asc" : "desc")
                  }
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            )}
          </span>
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="md:justify-self-start">
              <ChipTabs
                group="halls"
                selected={selectedTab}
                tabs={["251 North", "Yahentamitsi", "South Campus"]}
                setSelected={setSelectedTab}
              />
            </div>
            <div className="md:justify-self-end">
              <ChipTabs
                group="meals"
                selected={selectedMeal}
                tabs={["Breakfast", "Lunch", "Dinner"]}
                setSelected={setSelectedMeal}
              />
            </div>
          </div>
        </div>

        <section id={selectedMeal}>
          <div className="bg-red-500 w-screen text-center py-4 mb-12 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              {selectedMeal} at {selectedTab}
            </h2>
          </div>

          <div className="mb-16 w-full">
            {filteredData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center">
                {filteredData.map((food) => (
                  <Card
                    key={`${food.mealType}-${food.name}`}
                    name={food.name}
                    calories={food.calories}
                    allergens={food.allergens}
                    fat={food.nutrition.total_fat}
                    carbs={food.nutrition.carbs}
                    protein={food.nutrition.protein}
                    sodium={food.nutrition.sodium}
                    onOpen={() => setSelected(food)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No items found for {selectedMeal}.
              </p>
            )}
          </div>
        </section>
      </div>

      {selected && (
        <SpringModal
          data={{
            name: selected.name,
            calories: selected.calories,
            allergens: selected.allergens,
            fat: selected.nutrition.total_fat,
            carbs: selected.nutrition.carbs,
            protein: selected.nutrition.protein,
            sodium: selected.nutrition.sodium,
            spc: selected.servings_per_container,
            serving_size: selected.serving_size,
            sat_fat: selected.nutrition.saturated_fat,
            fiber: selected.nutrition.fiber,
            sugars: selected.nutrition.sugars,
            cholesterol: selected.nutrition.cholesterol,
            trans_fat: selected.nutrition.trans_fat,
          }}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
};

export default FoodSection;
