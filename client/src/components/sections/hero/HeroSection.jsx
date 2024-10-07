import {
  FaCloud,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaUpload,
  FaUser,
} from "react-icons/fa";

import AchievementsSection from "../achievements/AchievementsSection";
import AdminInfoSection from "../adminInfo/AdminInfoSection";
import BriefIntro from "../briefIntro/BriefIntro";
import CTAButton from "../../ctaButton/CTAButton";
import FeaturedProjects from "../featuredProjects/FeaturedProjects";
import InspirationalQuoteSection from "../inspirationalQuote/InspirationalQuoteSection";
import { Link } from "react-router-dom";
import SkillsSection from "../skills/SkillsSection";
import SocialLinksSection from "../socialLinks/SocialLinksSection";
import TestimonialsSection from "../testimonials/TestimonialsSection";

// import FeaturedProjectsSection from "../featuredProjects/FeaturedProjectsSection";

// import HobbySection from "../hobby/HobbySection";

const HeroSection = () => {
  const handleClick = () => {
    alert("Button clicked!");
  };
  return (
    <div className="grid lg:grid-cols-6 gap-4 bg-[url('/assets/Dull.jpg')] bg-cover rounded-lg lg:p-2 p-4 dark:bg-none">
      <div className="lg:col-span-2 space-y-4 shadow-md p-2">
        <AdminInfoSection />
        <BriefIntro />
        <AchievementsSection />

        <div className="border-t border-slate-400 dark:border-slate-700 pt-2 flex justify-between">
          <Link to="/contact-me">
            <CTAButton label="Contact Me" className="" icon={<FaUser />} />
          </Link>
          <a
            href="/assets/cv-bishwajit-paul.pdf"
            download="cv-bishwajit-paul.pdf"
          >
            <CTAButton
              type="submit"
              label="Download CV"
              className="flex"
              icon={<FaCloud />}
            />
          </a>
        </div>
      </div>
      <div className="lg:col-span-4 p-2 shadow-lg relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-4 border-t border-slate-400 dark:border-slate-700 rounded-md">
          <div className="">
            <SkillsSection />
            <TestimonialsSection />
            <InspirationalQuoteSection />
          </div>
          <div className="">
            <SocialLinksSection />
            {/* <FeaturedProjectsSection /> */}
            <FeaturedProjects />
          </div>
        </div>

        <div className="lg:absolute bottom-2">
          <div className="grid grid-cols-6 gap-2 justify-between pt-2 border-t border-slate-400 dark:border-slate-700">
            <div className="lg:col-span-3 col-span-6 flex">
              <Link to="">
                <FaFacebook className="w-8 h-8 text-blue-700 dark:text-amber-400" />
              </Link>
              <Link to="">
                <FaTwitter className="w-8 h-8 text-blue-700 dark:text-amber-400" />
              </Link>
              <Link to="">
                <FaLinkedin className="w-8 h-8 text-blue-700 dark:text-amber-400" />
              </Link>
              <Link to="">
                <FaGithub className="w-8 h-8 text-blue-700 dark:text-amber-400" />
              </Link>
            </div>
            <div className="lg:col-span-3 col-span-6">
              <div className="flex justify-between gap-2">
                <Link to="">
                  <CTAButton
                    label="Primary Action"
                    icon={<FaCloud />}
                    onClick={handleClick}
                    variant="primary"
                  />
                </Link>

                <Link to="">
                  <CTAButton
                    label="Secondary Action"
                    icon={<FaUpload />}
                    onClick={handleClick}
                    variant="primary"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
