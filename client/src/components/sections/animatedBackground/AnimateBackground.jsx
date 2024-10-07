import HobbySection from "../hobby/HobbySection";
import SectionTitle from "../../sectionTitle/SectionTitle";
import SkillsProgressBar from "../skillsProgressBar/SkillsProgressBar";

const AnimatedBackground = () => {
  return (
    <>
      <SectionTitle
        title={"My Hobby & Skills Progress Bar"}
        subtitle={
          "Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
        }
      />

      <div className="w-full rounded-md">
        <div className="flex justify-between"></div>
        {/* Content here */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-between items-center p-4">
          <div className="">
            <HobbySection />
          </div>
          <div className="">
            <SkillsProgressBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedBackground;
