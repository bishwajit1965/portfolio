import ContactMeSection from "../../components/sections/contact/ContactMeSection";
import { Helmet } from "react-helmet-async";
import HeroSection from "../../components/sections/hero/HeroSection";
import ProjectCarousel from "../../components/sections/projectCarousel/ProjectCarousel";
import ProjectsSection from "../../components/projects/ProjectsSection";
import ScrollTopButton from "../../components/scrollTopButton/ScrollTopButton";
import SkillsPreview from "../../components/skillsPreview/SkillsPreview";

const Home = () => {
  return (
    <div className="lg:p-0 p-3">
      <Helmet>
        <title>Web-tech || Home</title>
      </Helmet>

      <div className="lg:space-y-12 space-y-8">
        <HeroSection />

        <ProjectCarousel />

        <SkillsPreview />

        <ProjectsSection />

        <ContactMeSection />

        <ScrollTopButton />
      </div>
    </div>
  );
};

export default Home;
