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

const Card = ({
  name,
  calories,
  allergens,
  fat,
  carbs,
  protein,
  sodium,
  onOpen,
}: {
  name: string;
  calories: string | null;
  allergens: Array<string>;
  fat: string | null;
  carbs: string | null;
  protein: string | null;
  sodium: string | null;
  onOpen: () => void;
}) => {
  return (
    <div className="product-card w-[300px] rounded-4xl inset-ring shadow-xl overflow-hidden z-[10] relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-4 transition-all duration-300">
      {/* Title */}
      <div className="para uppercase text-center leading-none z-40">
        <p className="font-bold text-xl tracking-wider text-[#e21833] z-30">
          {name}
        </p>
      </div>

      <div className="w-full z-20">
        <div className="flex flex-col items-start gap-3">
          <p className="text-[#e21833] font-semibold text-xl">{calories} Cal</p>

          <ul className="flex flex-col items-start gap-2">
            {[
              ["Fat", fat],
              ["Carbs", carbs],
              ["Protein", protein],
              ["Sodium", sodium],
            ].map(([label, val]) => (
              <li key={label} className="inline-flex gap-2 items-center">
                <svg
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth={3}
                  className="stroke-[#e21833]"
                  stroke="#e21833"
                  fill="none"
                  viewBox="0 0 24 24"
                  height={10}
                  width={10}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p className="text-xs font-semibold text-black">
                  {label}: {val}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="opacity-100">
        <button
          onClick={onOpen}
          className="cursor-pointer bg-[#ffd200] text-black px-4 py-1 rounded-lg border-[#e6bd00] border-b-[4px] hover:brightness-105 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-95 active:translate-y-[2px] transition-all"
        >
          View More
        </button>
      </div>

      <div className="grid grid-cols-3 mt-6 gap-2 w-fit mx-auto">
        {allergens.map((tag, i) => {
          const bgColor = allergenColorMap[tag.toLowerCase()] || "bg-gray-200";
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
    </div>
  );
};

export default Card;
