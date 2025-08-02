import Aurora from "./Aurora";
import SearchNavBar from "./SearchNavBar";

const IntroSection = ({ onSearch }: { onSearch: (value: string) => void }) => {
  return (
    <section className="relative py-64 px-4 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#e21833", "#ffd200", "#000"]}
          blend={1}
          amplitude={0.6}
          speed={0.5}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-bold mb-12 text-white drop-shadow">
          TerpPlate
        </span>
        <SearchNavBar onSearch={onSearch} />
      </div>
    </section>
  );
};

export default IntroSection;
