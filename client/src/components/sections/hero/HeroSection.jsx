import { Link } from "react-router-dom";
import CTAButton from "../../ctaButton/CTAButton";
import { FaArrowRight, FaCloud } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="min-h-[70vh] flex items-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 rounded-b-xl p-6">
      <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-8 gap-4 items-center justify-between">
        <div className="lg:col-span-9 col-span-12">
          <div className="lg:space-y-6 space-y-2 text-center">
            <h1 className="lg:text-4xl text-xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
              Hi, I’m <span className="text-amber-500">Bishwajit Paul</span>
            </h1>

            <h2 className="lg:text-2xl text-lg md:text-2xl font-bold text-slate-600 dark:text-slate-300">
              <span className="lg:text-3xl text-xl font-extrabold text-orange-500 mr-2">
                MERN
              </span>
              Full-Stack Web Developer
            </h2>

            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 lg:mx-32 mx-0">
              I build clean, scalable, and user-focused web applications using
              modern technologies — from solid backends to polished frontends.
            </p>

            <div className="lg:flex grid justify-center lg:gap-4 gap-2 pt-4 lg:space-x-12">
              <Link to="/portfolio-projects">
                <CTAButton
                  label="View Projects"
                  icon={<FaArrowRight size={20} />}
                  variant="info"
                  className="btn lg:btn-md btn-sm lg:w-40 w-36 lg:text-lg text-sm"
                />
              </Link>

              <a
                href="/assets/cv-bishwajit-paul.pdf"
                download="cv-bishwajit-paul.pdf"
              >
                <CTAButton
                  label="Download CV"
                  icon={<FaCloud size={20} />}
                  variant="amber"
                  className="btn lg:btn-md btn-sm lg:w-40 w-36 lg:text-xl text-sm"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 col-span-12 bg-slate-300 dark:bg-gray-800 relative shadow-xl p-4 rounded-md lg:h-[23.5rem] h-[17.5rem] lg:order-none order-first">
          <Link to="/contact-me">
            <div className="absolute right-4 top-4 bottom-4 w-full hover:skew-y-9 bg-slate-400 dark:bg-slate-600 lg:min-h-96 skew-x-9 p-4 shadow-xl rounded-md lg:h-[21.5rem] h-[15.5rem] hover:animate-pulses">
              <div className="bg-slate-300 dark:bg-slate-700 p-4 rounded-md relative">
                <figure className="relative">
                  <img
                    src="https://i.ibb.co.com/Gv6zHk5d/Gemini-Generated-Image-7h0z6s7h0z6s7h0z.png"
                    alt="developer"
                    className="rounded-xl hover:rounded-full hover:border-8 shadow-lg lg:h-auto w-full object-contain border-8 border-gray-400 dark:border-slate-500"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gray-800 opacity-60 text-base-100 lg:text-[14px] text-xs py-1 px-2 rounded-b-xl hover:opacity-100 text-center">
                    Bishwajit Paul, Full-stack MERN Developer
                  </figcaption>
                </figure>
              </div>

              <div className="w-44 bg-slate-400 rounded-full absolute lg:left-[15px] lg:top-[16px] p-1 top-[16px] right-[15px] flex items-center justify-center border border-slate-300 shadow-lg">
                <div className="w-44 rounded-full text-black bg-slate-300 shadow dark:text-slate border border-slate-400 flex items-center justify-center text-sm gap-1">
                  <span className="w-3 h-3 rounded-full bg-purple-500 animate-pulse text-black"></span>{" "}
                  Open to Opportunities
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

// import {
//   FaCloud,
//   FaFacebook,
//   FaGithub,
//   FaLinkedin,
//   FaTwitter,
//   FaUpload,
//   FaUser,
// } from "react-icons/fa";

// import AchievementsSection from "../achievements/AchievementsSection";
// import AdminInfoSection from "../adminInfo/AdminInfoSection";
// import BriefIntro from "../briefIntro/BriefIntro";
// import CTAButton from "../../ctaButton/CTAButton";
// import FeaturedProjects from "../featuredProjects/FeaturedProjects";
// import InspirationalQuoteSection from "../inspirationalQuote/InspirationalQuoteSection";
// import { Link } from "react-router-dom";
// import SkillsSection from "../skills/SkillsSection";
// import SocialLinksSection from "../socialLinks/SocialLinksSection";
// import TestimonialsSection from "../testimonials/TestimonialsSection";

// // import FeaturedProjectsSection from "../featuredProjects/FeaturedProjectsSection";

// // import HobbySection from "../hobby/HobbySection";

// const HeroSection = () => {
//   const handleClick = () => {
//     alert("Button clicked!");
//   };
//   return (
//     <div className="grid lg:grid-cols-6 gap-4 bg-[url('/assets/Dull.jpg')] bg-cover rounded-lg lg:p-2 p-4 dark:bg-none">
// <div className="lg:col-span-2 space-y-4 shadow-md p-2">
//   <AdminInfoSection />
//   <BriefIntro />
//   <AchievementsSection />

//   <div className="border-t border-slate-400 dark:border-slate-700 pt-2 flex justify-between">
//     <Link to="/contact-me">
//       <CTAButton label="Contact Me" className="" icon={<FaUser />} />
//     </Link>
//     <a
//       href="/assets/cv-bishwajit-paul.pdf"
//       download="cv-bishwajit-paul.pdf"
//     >
//       <CTAButton
//         type="submit"
//         label="Download CV"
//         className="flex"
//         icon={<FaCloud />}
//       />
//     </a>
//   </div>
// </div>
//       <div className="lg:col-span-4 p-2 shadow-lg relative">
//         <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-4 border-t border-slate-400 dark:border-slate-700 rounded-md">
//           <div className="">
//             <SkillsSection />
//             <TestimonialsSection />
//             <InspirationalQuoteSection />
//           </div>
//           <div className="">
//             <SocialLinksSection />
//             {/* <FeaturedProjectsSection /> */}
//             <FeaturedProjects />
//           </div>
//         </div>

//         <div className="lg:absolute bottom-2">
//           <div className="grid grid-cols-6 gap-2 justify-between pt-2 border-t border-slate-400 dark:border-slate-700">
//             <div className="lg:col-span-3 col-span-6 flex">
//               <Link to="">
//                 <FaFacebook className="w-8 h-8 text-blue-700 dark:text-amber-400" />
//               </Link>
//               <Link to="">
//                 <FaTwitter className="w-8 h-8 text-blue-700 dark:text-amber-400" />
//               </Link>
//               <Link to="">
//                 <FaLinkedin className="w-8 h-8 text-blue-700 dark:text-amber-400" />
//               </Link>
//               <Link to="">
//                 <FaGithub className="w-8 h-8 text-blue-700 dark:text-amber-400" />
//               </Link>
//             </div>
//             <div className="lg:col-span-3 col-span-6">
//               <div className="flex justify-between gap-2">
//                 <Link to="">
//                   <CTAButton
//                     label="Primary Action"
//                     icon={<FaCloud />}
//                     onClick={handleClick}
//                     variant="primary"
//                   />
//                 </Link>

//                 <Link to="">
//                   <CTAButton
//                     label="Secondary Action"
//                     icon={<FaUpload />}
//                     onClick={handleClick}
//                     variant="primary"
//                   />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
