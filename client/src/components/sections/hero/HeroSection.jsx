import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CTAButton from "../../ctaButton/CTAButton";
import { FaArrowRight, FaCloud, FaMailBulk } from "react-icons/fa";
import SocialMediaLinks from "../../shared/socialMedia/SocialMediaLinks";
import TypingEffect from "./TypeEffect";
import HeroButton from "../../buttons/HeroButton";
import heroImage from "../../../assets/hero-1.png";

const HeroSection = () => {
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i = 1) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.3, type: "spring", stiffness: 50 },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8 } },
    hover: {
      rotateY: 5,
      rotateX: 5,
      scale: 1.02,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="lg:min-h-[75vh] flex items-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 rounded-b-xl px-4 sm:px-6 lg:px-12 py-6 lg:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 grid-cols-1 gap-6 lg:gap-12 items-center">
        {/* LEFT: Text Content */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-6">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Hi, I’m{" "}
            <span className="text-amber-500">
              Bishwajit <span className="text-amber-600">Paul</span>
            </span>
          </motion.h1>

          <motion.h2
            className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-slate-700 dark:text-slate-300"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <span className="text-orange-500 font-extrabold mr-2">
              A Learner
            </span>
            of Modern Web Apps
          </motion.h2>

          <motion.h2
            className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-300"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <TypingEffect
              words={[
                "MERN Full-Stack Web Developer",
                "MongoDB Learner",
                "React Developer",
                "Node.js Enthusiast",
              ]}
            />
          </motion.h2>

          <motion.p
            className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg md:text-lg text-slate-600 dark:text-slate-400"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            I build scalable, user-focused web applications — dashboards,
            authentication systems, and production-ready platforms from backend
            to frontend.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-4 sm:pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Link to="/portfolio-projects">
              <CTAButton
                label="View Projects"
                icon={<FaArrowRight size={18} />}
                variant="info"
                className="w-40 sm:w-44 lg:w-44 text-sm sm:text-base lg:text-lg hover:scale-105 transition-transform duration-300 border-emerald-500 hover:bg-emerald-600"
              />
            </Link>

            <a
              href="/assets/cv-bishwajit-paul.pdf"
              download="cv-bishwajit-paul.pdf"
            >
              <CTAButton
                label="Download CV"
                icon={<FaCloud size={18} />}
                variant="outline"
                className="w-40 sm:w-44 lg:w-40 text-sm sm:text-base lg:text-lg hover:scale-105 transition-transform duration-300 bg-blue-500 border-blue-600 text-white hover:bg-blue-600"
              />
            </a>

            <HeroButton
              href="/contact-me"
              icon={<FaMailBulk />}
              label="Contact Me"
              className="w-40 py-1.5 sm:w-44 lg:w-40 text-sm sm:text-base lg:text-lg"
            />
          </motion.div>
        </div>

        {/* RIGHT: Image Card */}
        <motion.div
          className="lg:col-span-5 flex justify-center mt-6 lg:mt-0"
          initial="hidden"
          animate="visible"
          whileHover="hover"
          variants={imageVariants}
        >
          <div className="relative w-64 sm:w-72 md:w-80 lg:w-96 bg-slate-300 dark:bg-slate-800 p-4 rounded-xl shadow-lg">
            <motion.div className="w-44 z-10 bg-emerald-400 rounded-full absolute lg:left-[12px] lg:top-[8] p-1 top-[8px] right-[15px] flex items-center justify-center border border-emerald-300 shadow-lg">
              <div className="w-44 rounded-full text-black bg-emerald-300 shadow dark:text-slate border border-emerald-400 flex items-center justify-center text-sm gap-1">
                <span className="w-3 h-3 rounded-full bg-purple-500 animate-pulse text-black"></span>{" "}
                Open to Opportunities
              </div>
            </motion.div>

            <figure>
              <img
                src={heroImage}
                alt="Bishwajit Paul"
                className="rounded-xl border border-slate-400 dark:border-slate-600 shadow-md object-cover w-full relative"
              />
              {/* <img
                src="https://i.ibb.co.com/Gv6zHk5d/Gemini-Generated-Image-7h0z6s7h0z6s7h0z.png"
                alt="Bishwajit Paul"
                className="rounded-xl border border-slate-400 dark:border-slate-600 shadow-md object-cover w-full"
              /> */}
              <figcaption className="mt-3 text-center text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Full-Stack{" "}
                <span className="text-gray-900 font-bold dark:text-amber-500">
                  MERN Developer
                </span>
              </figcaption>
              <div className="absolute lg:bottom-[3.5rem] bottom-[3.2rem] lg:right-4.5 right-5 h-9 w-9 bg-emerald-500 border-2 border-emerald-400 rounded-full flex items-center justify-center text-base-100 font-semibold">
                BP
              </div>
            </figure>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="lg:col-span-12 flex justify-center lg:mt-6 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <SocialMediaLinks />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
