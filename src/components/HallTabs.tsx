import { motion } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";

const ChipTabs = ({
  selected,
  tabs,
  setSelected,
  group,
}: {
  selected: string;
  tabs: string[];
  setSelected: Dispatch<SetStateAction<string>>;
  group: string;
}) => {
  return (
    <div className="py-4 inline-flex items-center gap-2 w-fit">
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selected={selected === tab}
          setSelected={setSelected}
          key={tab}
          layoutId={`pill-tab-${group}`}
        />
      ))}
    </div>
  );
};

const Chip = ({
  text,
  selected,
  setSelected,
  layoutId,
}: {
  text: string;
  selected: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
  layoutId: string;
}) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? "text-black font-bold"
          : "text-black hover:text-white hover:bg-black"
      } text-lg md:text-xl transition-colors px-2.5 py-0.5 rounded-md relative`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId={layoutId}
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-[#ffd200] rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

export default ChipTabs;
