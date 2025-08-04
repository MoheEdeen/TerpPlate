import Aurora from "./Aurora";

const TitleSection = () => {
  return (
    <section className="relative py-100 px-4 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#e21833", "#e21833", "#e21833"]}
          blend={1}
          amplitude={0.6}
          speed={0.5}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <span className="text-4xl md:text-8xl font-bold mb-12 text-white text-shadow-lg/60">
          TerpPlate
        </span>
      </div>
    </section>
  );
};

export default TitleSection;
