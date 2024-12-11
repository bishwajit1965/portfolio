import AnimatedBackground from "../../components/sections/animatedBackground/AnimateBackground";
import ContactMeSection from "../../components/sections/contact/ContactMeSection";
import { Helmet } from "react-helmet-async";
import HeroSection from "../../components/sections/hero/HeroSection";
import JourneyMilestones from "../../components/sections/parallax/JourneyMilestones";
import ProjectsSection from "../../components/projects/ProjectsSection";
import RandomLatestPosts from "../../components/sections/randomLatestsPosts/RandomLatestPosts";
import ScrollTopButton from "../../components/scrollTopButton/ScrollTopButton";
import SectionTitle from "../../components/sectionTitle/SectionTitle";

const Home = () => {
  return (
    <>
      <div className="lg:pt-10">
        <Helmet>
          <title>Web-tech-services || Home</title>
        </Helmet>
        <SectionTitle
          title="Welcome to"
          decoratedText="My Portfolio Site"
          subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
        />

        {/* Hero section */}
        <div className="lg:py-3">
          <HeroSection />
        </div>

        {/* Projects Section */}
        <div className="lg:py-3">
          <ProjectsSection />
        </div>

        {/* Contact Me Section */}
        <div className="lg:py-3">
          <ContactMeSection />
        </div>

        {/* Parallax Section */}
        <div className="lg:py-3">
          <JourneyMilestones />
        </div>

        {/* Animate Background */}
        <div className="lg:py-3">
          <AnimatedBackground />
        </div>

        {/* Random latest posts */}
        <div className="lg:py-3">
          <RandomLatestPosts />
        </div>

        {/* Scroll to top button */}
        <div className="height-[2000px]">
          <ScrollTopButton />
        </div>
      </div>
    </>
  );
};

export default Home;
