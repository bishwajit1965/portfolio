import AnimatedBackground from "../../components/sections/animatedBackground/AnimateBackground";
import ContactMeSection from "../../components/sections/contact/ContactMeSection";
import { Helmet } from "react-helmet-async";
import HeroSection from "../../components/sections/hero/HeroSection";
import JourneyMilestones from "../../components/sections/parallax/JourneyMilestones";
import ProjectCarousel from "../../components/sections/projectCarousel/ProjectCarousel";
import ProjectsSection from "../../components/projects/ProjectsSection";
import RandomLatestPosts from "../../components/sections/randomLatestsPosts/RandomLatestPosts";
import ScrollTopButton from "../../components/scrollTopButton/ScrollTopButton";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import SkillsPreview from "../../components/skillsPreview/SkillsPreview";
import { FaHome } from "react-icons/fa";

const Home = () => {
  return (
    <div className="lg:p-0 p-3">
      <Helmet>
        <title>Web-tech || Home</title>
      </Helmet>

      <SectionTitle
        title="Web Tech"
        decoratedText="Portfolio"
        subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
        icon={FaHome}
      />

      <div className="lg:space-y-12 space-y-8">
        <HeroSection />

        <SkillsPreview />

        <ProjectCarousel />

        <ProjectsSection />

        <ContactMeSection />

        <JourneyMilestones />

        <AnimatedBackground />

        <RandomLatestPosts />

        <ScrollTopButton />
      </div>
    </div>
  );
};

export default Home;
