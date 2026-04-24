import ContactMeSection from "../../components/sections/contact/ContactMeSection";
import { Helmet } from "react-helmet-async";
import HeroSection from "../../components/sections/hero/HeroSection";
import ProjectCarousel from "../../components/sections/projectCarousel/ProjectCarousel";
import ProjectsSection from "../../components/projects/ProjectsSection";
import ScrollTopButton from "../../components/scrollTopButton/ScrollTopButton";
import SkillsPreview from "../../components/skillsPreview/SkillsPreview";
import TestimonialSection from "../../components/sections/testimonials/TestimonialsSection";
import ServicesSection from "../../components/sections/serviceSection/ServiceSection";

const Home = () => {
  return (
    <div className="lg:p-0 p-2">
      <Helmet>
        <title>Bishwajit.dev || Home</title>
      </Helmet>

      <div className="lg:space-y-12 space-y-4">
        <HeroSection />

        <ServicesSection />

        <ProjectCarousel />

        <SkillsPreview />

        <ProjectsSection />

        <TestimonialSection />

        <ContactMeSection />

        <ScrollTopButton />
      </div>
    </div>
  );
};

export default Home;
