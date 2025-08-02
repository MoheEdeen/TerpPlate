import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";

const allergenColorMap: Record<string, string> = {
  dairy: "bg-[#0067AC]",
  egg: "bg-[#F7A800]",
  fish: "bg-[#ED145B]",
  gluten: "bg-[#EF4123]",
  nuts: "bg-[#ED1C24]",
  sesame: "bg-[#F7941D]",
  shellfish: "bg-[#00B2A9]",
  soy: "bg-[#8DC63F]",
  vegan: "bg-[#92278F]",
  vegetarian: "bg-[#007A33]",
  halalfriendly: "bg-[#00AEEF]",
  smartchoice: "bg-[#D4145A]",
};

const SpringModal = ({
  data,
  onClose,
}: {
  data: {
    name: string;
    calories: string | null;
    allergens: Array<string>;
    fat: string | null;
    carbs: string | null;
    protein: string | null;
    sodium: string | null;
    spc: string | null;
    serving_size: string | null;
    sat_fat: string | null;
    fiber: string | null;
    sugars: string | null;
    cholesterol: string | null;
    trans_fat: string | null;
  };
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] bg-slate-900/30 backdrop-blur-sm p-8 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#e21833] text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
              <h3 className="text-3xl font-bold text-center mb-4 text-gray-800">
                {data.name}
              </h3>
              <div className="grid grid-cols-2 gap-y-2 mb-6 text-gray-700">
                <div className="font-semibold">Calories:</div>
                <div>{data.calories}</div>
                <div className="font-semibold">Fat:</div>
                <div>{data.fat}</div>
                <div className="font-semibold">Saturated Fat:</div>
                <div>{data.sat_fat}</div>
                <div className="font-semibold">Trans Fat:</div>
                <div>{data.trans_fat}</div>
                <div className="font-semibold">Cholesterol:</div>
                <div>{data.cholesterol}</div>
                <div className="font-semibold">Sodium:</div>
                <div>{data.sodium}</div>
                <div className="font-semibold">Sugars:</div>
                <div>{data.sugars}</div>
                <div className="font-semibold">Protein:</div>
                <div>{data.protein}</div>
                <div className="font-semibold">Fiber:</div>
                <div>{data.fiber}</div>
                <div className="font-semibold">Carbohydrates:</div>
                <div>{data.carbs}</div>
                <div className="font-semibold">Servings Per Container:</div>
                <div>{data.spc}</div>
                <div className="font-semibold">Serving Size:</div>
                <div>{data.serving_size}</div>
              </div>
              <div className="grid grid-cols-3 mt-6 gap-2 w-fit mx-auto">
                {data.allergens.map((tag, i) => {
                  const bgColor =
                    allergenColorMap[tag.toLowerCase()] || "bg-gray-200";
                  return (
                    <span
                      key={i}
                      className={`uppercase py-1 px-3 text-xs border rounded-full text-white flex justify-center items-center text-center ${bgColor}`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={onClose}
                  className="bg-white hover:opacity-90 transition-opacity text-[#e21833] mt-5 font-semibold px-6 py-2 rounded"
                >
                  <Check />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;
