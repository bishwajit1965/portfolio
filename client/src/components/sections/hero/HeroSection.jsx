import { motion } from "framer-motion";
import CTAButton from "../../ctaButton/CTAButton";
import SocialMediaLinks from "../../shared/socialMedia/SocialMediaLinks";
import TypingEffect from "./TypeEffect";
import HeroButton from "../../buttons/HeroButton";
import heroImage from "../../../assets/hero-1.png";
import { FaEye, FaRocket } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

const trustBuilders = [
  { id: 1, label: "2+ production-grade MERN systems built" },
  { id: 2, label: "Clean scalable backend architecture" },
  { id: 3, label: "Deployment support included" },
  { id: 4, label: "Post-launch support available" },
];

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
        <div className="lg:col-span-8 text-center lg:text-left space-y-4 lg:space-y-6">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            I build scalable web applications{" "}
            <span className="text-amber-500">for businesses & startups.</span>
          </motion.h1>

          <motion.div
            className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-300"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <p className="text-xl font-bold">
              <span className="text-amber-500">I build:</span>
            </p>

            <TypingEffect
              words={[
                "E-commerce Web Applications",
                "Admin Dashboards",
                "Full-Stack Platforms",
                "Custom Business Solutions",
              ]}
            />
          </motion.div>
          {/* SHORT BIO */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-slate-700 dark:text-slate-400"
          >
            I help startups and businesses turn ideas into scalable web
            platforms with clean architecture and reliable backend systems.
          </motion.p>
          <motion.p
            className="text-emerald-500 text-lg"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Available for freelance projects
          </motion.p>

          {/* TRUST BUILDERS */}
          <motion.div
            custom={4}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="lg:px- px- lg:grid flex flex-wrap">
              {trustBuilders.map((trustBuilder) => (
                <p
                  key={trustBuilder.id}
                  className="lg:text-lg text-sm text-slate-700 dark:text-slate-400 flex items-center gap-2"
                >
                  <FaCheckCircle className="text-emerald-500" />{" "}
                  {trustBuilder.label}
                </p>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center lg:justify-self-start gap-3"
            custom={5}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {/* PRIMARY CTA */}
            <HeroButton
              href="/contact-me"
              icon={<FaRocket size={25} />}
              label="Start Your Project"
              className="lg:w-52 w-52 lg:text-lg text-sm"
            />
            {/* SECONDARY CTA */}
            <CTAButton
              href="/portfolio-projects"
              icon={<FaEye size={25} />}
              label="View My Work"
              variant="success"
              className="lg:w-52 w-44 lg:text-lg text-sm"
            />
          </motion.div>
        </div>

        {/* RIGHT: Image Card */}
        <motion.div
          className="lg:col-span-4 flex justify-center mt-6 lg:mt-0"
          initial="hidden"
          animate="visible"
          whileHover="hover"
          variants={imageVariants}
        >
          <div className="relative w-64 sm:w-72 md:w-80 lg:w-96 bg-slate-300 dark:bg-slate-800 p-4 rounded-xl shadow-lg">
            <motion.div className="w-44 z-10 bg-emerald-400 rounded-full absolute lg:left-0 lg:top-0 p-1 top-2 right-[15px] flex items-center justify-center border border-emerald-300 shadow-lg">
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
              <figcaption className="mt-3 text-center text-sm sm:text-base text-slate-600 dark:text-slate-400 gap-2">
                Full-Stack{" "}
                <span className="text-gray-900 font-bold dark:text-amber-500">
                  MERN Developer
                </span>
                <span> building scalable business applications</span>
              </figcaption>
              <div className="absolute lg:bottom-[5rem] bottom-[3.2rem] lg:right-4.5 right-5 h-9 w-9 bg-emerald-500 border-2 border-emerald-400 rounded-full flex items-center justify-center text-base-100 font-semibold">
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
