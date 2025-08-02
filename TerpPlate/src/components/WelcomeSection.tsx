import React, { useState } from "react";
import SpringModal from "./SpringModal";
import data from "../../data/16_test.json";
import Card from "./card";
import { ListFilter } from "lucide-react";
const WelcomeSection = ({ searchTerm }: { searchTerm: string }) => {
  const [selected, setSelected] = useState<any | null>(null);

  const filteredData = data.filter((food) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = food.name.toLowerCase().includes(term);
    const allergenMatch = food.allergens.some((allergen) =>
      allergen.toLowerCase().includes(term)
    );
    return nameMatch || allergenMatch;
  });

  const filter = () => {
    console.log("hi");
  };

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 mb-20">
          <span className="text-xl md:text-2xl justify-self-start">
            Showing results containing "{searchTerm}"
          </span>
          <span className="text-xl md:text-2xl justify-self-end">
            <button onClick={filter} className="cursor-pointer">
              <ListFilter />
            </button>
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center">
          {filteredData.map((food) => (
            <Card
              key={food.name}
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

export default WelcomeSection;
