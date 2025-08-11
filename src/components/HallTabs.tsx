import { motion } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";

const tabs = ["251 North", "Yahentamitsi", "South Campus"];

const ChipTabs = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="py-14 flex items-center gap-2">
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selected={selected === tab}
          setSelected={setSelected}
          key={tab}
        />
      ))}
    </div>
  );
};

const Chip = ({
  text,
  selected,
  setSelected,
}: {
  text: string;
  selected: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
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
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-[#ffd200] rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

export default ChipTabs;
