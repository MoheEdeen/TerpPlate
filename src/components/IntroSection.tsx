import SearchNavBar from "./SearchNavBar";
import { motion } from "framer-motion";

const IntroSection = ({ onSearch }: { onSearch: (value: string) => void }) => {
  return (
    <section className="relative mt-32 px-4 overflow-hidden flex items-center justify-center">
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-xl md:text-3xl font-bold mb-12 text-gray-600 drop-shadow"
        >
          Search by allergen or name
        </motion.span>
        <SearchNavBar onSearch={onSearch} />
      </div>
    </section>
  );
};

export default IntroSection;
