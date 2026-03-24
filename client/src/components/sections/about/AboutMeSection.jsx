import {
  FaCode,
  FaLayerGroup,
  FaProjectDiagram,
  FaRocket,
} from "react-icons/fa";
import SkillBadge from "../../skillBadge/SkillBadge";
import { Link } from "react-router-dom";
import Button from "../../buttons/Button";
import { FaCheck, FaCloud } from "react-icons/fa6";
import JourneyMilestones from "../parallax/JourneyMilestones";
import AnimatedBackground from "../animatedBackground/AnimateBackground";
import PageTitle from "../../../pages/pageTitle/PageTitle";
import { Helmet } from "react-helmet-async";

const AboutMeSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 dark:text-slate-400 space-y-12">
      <Helmet>
        <title>Bishwajit.dev || About Me</title>
      </Helmet>
      {/* Header */}
      <PageTitle
        title="About"
        decoratedText="Me"
        subtitle="Full‑Stack MERN Developer focused on building scalable, maintainable, and production‑ready web applications."
        icon={FaRocket}
      />

      {/* Intro */}
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-8 mb-16 text-base">
        <div className="lg:col-span-7 space-y-6 dark:text-slate-400">
          <Link to="/contact-me">
            <div
              className="flex items-center gap-2 relative tooltip tooltip-close tooltip-top tooltip-primary"
              data-tip="Click to Contact Me"
            >
              <img
                src="https://i.ibb.co.com/Gv6zHk5d/Gemini-Generated-Image-7h0z6s7h0z6s7h0z.png"
                alt="Portrait of Bishwajit Paul"
                className="lg:w-36 lg:h-36 w-16 h-16 p-1 shadow object-contain rounded-full border-4 border-stone-200"
              />

              <h2 className="lg:text-3xl text-lg font-extrabold flex items-center gap-2">
                Hi, I’m Bishwajit Paul
              </h2>

              <div className="absolute top-5 left-36 border dark:border-green-700 px-3 py-1 rounded-full bg-green-500 dark:bg-green-500 text-base-100 text-sm shadow flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-red-500 animate-pulse"></span>{" "}
                Open to Opportunities
              </div>
            </div>
          </Link>
          <p className="text-base leading-relaxed">
            I’m a Full‑Stack MERN Developer who enjoys building clean, scalable,
            and real‑world web applications. I don’t just aim to make things
            work — I focus on making them reliable, maintainable, and ready for
            growth.
          </p>
          <p className="leading-relaxed">
            I believe good software is built twice: once to make it work, and
            again to make it right. That mindset guides how I structure code,
            design APIs, and organize frontend architecture.
          </p>

          <div className="my-8">
            <Button
              label="Download CV"
              variant="outline"
              size="md"
              icon={<FaCloud />}
            />
          </div>
        </div>

        <div className="lg:col-span-5 bg-base-200 dark:bg-slate-800 dark:text-slate-400 rounded-xl p-6 shadow-md">
          <div className="dark:text-base">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaCode className="text-orange-500" /> Core Focus
            </h3>
            <ul className="text-base lg:space-y-4 space-y-2">
              <li className="flex items-center gap-2">
                <FaCheck size={16} /> Clean architecture & predictable data flow
              </li>
              <li className="flex items-center gap-2">
                <FaCheck size={16} /> Role‑based systems & authentication
              </li>
              <li className="flex items-center gap-2">
                <FaCheck size={16} /> Reusable, scalable React components
              </li>
              <li className="flex items-center gap-2">
                <FaCheck size={16} /> Backend APIs designed for real production
                use
              </li>
              <li className="flex items-center gap-2">
                <FaCheck size={16} /> Performance optimization & best practices
              </li>
              <li className="flex items-center gap-2">
                <FaCheck size={16} /> Thorough testing & error handling
              </li>
              <li className="flex items-center gap-2">
                <FaCheck size={16} /> Clear, maintainable code
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-16 dark:text-slate-400">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaLayerGroup className="text-orange-500" /> Tech Stack
        </h2>

        <div className="grid md:grid-cols-3 gap-6 dark:text-slate-400">
          <div className="border rounded-xl p-6 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="font-bold mb-3">🚀 Frontend</h3>
            <div className="flex flex-wrap justify-start">
              <ul>
                {[
                  "React(Hooks, Context)",
                  "JavaScript (ES6+)",
                  "HTML5 & CSS3",
                  "Tailwind CSS",
                  "Firebase",
                  "Vite",
                ].map((skill) => (
                  <>
                    <li key={skill} className="my-3 text-sm">
                      ✅&nbsp;
                      <SkillBadge label={skill} />
                    </li>
                  </>
                ))}
              </ul>
            </div>
          </div>

          <div className="border rounded-xl p-6 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="font-bold mb-3">🚀 Backend</h3>
            <div className="flex flex-wrap gap-2 space-y-2 justify-start">
              <ul>
                {[
                  "Node.js & Express",
                  "MongoDB & Mongoose",
                  "JWT Authentication",
                  "DB Design",
                  "API Design",
                  "React Query",
                ].map((skill) => (
                  <>
                    <li key={skill} className="my-3 text-sm">
                      ✅&nbsp;
                      <SkillBadge label={skill} />
                    </li>
                  </>
                ))}
              </ul>
            </div>
          </div>

          <div className="border rounded-xl p-6 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="font-bold mb-3">🚀 Other</h3>
            <div className="flex flex-wrap gap-2 space-y-2 justify-start">
              <ul>
                {[
                  "REST API Designs",
                  "Admin Dashboards",
                  "Git & GitHub Workflows",
                  "Postman",
                  "OAuth",
                  "Context API",
                ].map((skill) => (
                  <>
                    <li className="my-3 text-sm">
                      ✅&nbsp;
                      <SkillBadge key={skill} label={skill} />
                    </li>
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Project Highlight */}
      <div
        className="bg-gradient-to-br from-orange-100 to-orange-200
dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 mb-16 shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaProjectDiagram className="text-orange-500" /> Featured Projects
        </h2>
        <div className="">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FaCode size={20} className="text-orange-500 " />
            Nova‑Cart
          </h3>
          <p className="leading-relaxed max-w-4xl">
            Nova‑Cart is a full‑scale e‑commerce platform built with a
            production‑ready mindset. It includes authentication, role‑based
            dashboards, product variants, cart & wishlist systems, and
            structured admin management — designed with scalability and clarity
            from day one.
          </p>
        </div>
        <div className="">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FaCode size={20} className="text-orange-500 " />
            Blog Mongoose
          </h3>
          <p className="leading-relaxed max-w-4xl">
            Blog Mongoose is a full‑scale blogging platform built with a
            production‑ready mindset. It includes authentication, role‑based
            dashboards, product variants, cart & wishlist systems, and
            structured admin management — designed with scalability and clarity
            from day one.
          </p>
        </div>
        <div className="">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FaCode size={20} className="text-orange-500 " />
            Nova dashboard
          </h3>
          <p className="leading-relaxed max-w-4xl">
            Nova dashboard is a full‑scale admin dashboard built with a
            production‑ready mindset. It includes authentication, role‑based
            dashboards, product variants, cart & wishlist systems, and
            structured admin management — designed with scalability and clarity
            from day one.
          </p>
        </div>
      </div>

      {/* Closing */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <p className="">
          I enjoy refining systems, solving real problems, and building software
          that lasts. I’m not chasing trends — I’m building a strong engineering
          foundation.
        </p>
        <p className="font-semibold">Let’s build something solid.</p>
      </div>

      {/* Journey Milestones */}
      <JourneyMilestones />

      {/* Animated Background */}
      <AnimatedBackground />
    </section>
  );
};

export default AboutMeSection;
