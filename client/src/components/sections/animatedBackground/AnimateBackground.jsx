import HobbySection from "../hobby/HobbySection";
import SectionTitle from "../../sectionTitle/SectionTitle";
import SkillsProgressBar from "../skillsProgressBar/SkillsProgressBar";
import { FaGears } from "react-icons/fa6";

const AnimatedBackground = () => {
  return (
    <div className="lg:max-w-7xl mx-auto lg:p-0 p-2">
      <SectionTitle
        title="My Hobby &"
        decoratedText="Skills Progress Bar"
        subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
        icon={FaGears}
      />

      <div className="w-full rounded-md">
        <div className="flex justify-between"></div>
        {/* Content here */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 justify-between items-center">
          <div className="lg:col-span-8 col-span-12">
            <HobbySection />
          </div>
          <div className="lg:col-span-4 col-span-12">
            <SkillsProgressBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
