import { useState } from "react";
import IntroSection from "../components/IntroSection";
import WelcomeSection from "./../components/WelcomeSection";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="min-h-screen overflow-x-hidden">
      <main>
        <IntroSection onSearch={setSearchTerm} />
        <WelcomeSection searchTerm={searchTerm} />
      </main>
    </div>
  );
};
