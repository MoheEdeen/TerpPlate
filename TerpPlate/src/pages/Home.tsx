import { useState } from "react";
import IntroSection from "../components/IntroSection";
import WelcomeSection from "./../components/WelcomeSection";
import { RecommendedSection } from "../components/RecommendedSection";
import TitleSection from "../components/TitleSection";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="min-h-screen overflow-x-hidden">
      <main>
        <TitleSection />
        <RecommendedSection />
        <IntroSection onSearch={setSearchTerm} />
        <WelcomeSection searchTerm={searchTerm} />
      </main>
    </div>
  );
};
