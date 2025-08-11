import { useState } from "react";
import IntroSection from "../components/IntroSection";

import { RecommendedSection } from "../components/RecommendedSection";
import TitleSection from "../components/TitleSection";
import NavBar from "../components/NavBar";
import FoodSection from "../components/FoodSection";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="min-h-screen overflow-x-hidden">
      <main>
        <NavBar />
        <TitleSection />
        <RecommendedSection />
        <IntroSection onSearch={setSearchTerm} />
        <FoodSection searchTerm={searchTerm} />
      </main>
    </div>
  );
};
