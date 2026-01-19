import {
  FaCode,
  FaLayerGroup,
  FaProjectDiagram,
  FaRocket,
} from "react-icons/fa";
import SkillBadge from "../../skillBadge/SkillBadge";
import SectionTitle from "../../sectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const AboutMeSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 dark:text-slate-400 space-y-12">
      {/* Header */}
      <SectionTitle
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
                src="https://i.ibb.co.com/MgsDqCZ/FB-IMG-1678691214526.jpg"
                alt=""
                className="lg:w-36 lg:h-36 w-16 h-16 p-1 shadow object-contain rounded-full border-4 border-stone-200"
              />

              <h2 className="lg:text-3xl text-lg font-extrabold flex items-center gap-2">
                Hi, I’m Bishwajit Paul
              </h2>

              <div className="absolute top-5 left-36 border dark:border-green-700 px-3 py-1 rounded-full bg-green-500 dark:bg-green-500 text-base-100 text-sm shadow flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-red-500 animate-pulse"></span>{" "}
                Available - 24/7
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
        </div>

        <div className="lg:col-span-5 bg-base-200 dark:bg-slate-800 dark:text-slate-400 rounded-xl p-6 shadow-md">
          <div className="dark:text-base">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaCode className="text-orange-500" /> Core Focus
            </h3>
            <ul className="space-y-3 text-base">
              <li className="">• Clean architecture & predictable data flow</li>
              <li className="">• Role‑based systems & authentication</li>
              <li className="">• Reusable, scalable React components</li>
              <li className="">
                • Backend APIs designed for real production use
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
                  "Node.js",
                  "MongoDB",
                  "Tailwind CSS",
                  "Firebase",
                  "Vite",
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
                    <li className="my-3 text-sm">
                      ✅&nbsp;
                      <SkillBadge key={skill} label={skill} />
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
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 mb-16 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaProjectDiagram className="text-orange-500" /> Featured Project
        </h2>
        <h3 className="text-xl font-semibold mb-2">Nova‑Cart</h3>
        <p className="leading-relaxed max-w-4xl">
          Nova‑Cart is a full‑scale e‑commerce platform built with a
          production‑ready mindset. It includes authentication, role‑based
          dashboards, product variants, cart & wishlist systems, and structured
          admin management — designed with scalability and clarity from day one.
        </p>
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
    </section>
  );
};

export default AboutMeSection;

// import { Helmet } from "react-helmet-async";
// import SectionTitle from "../../sectionTitle/SectionTitle";

// const AboutMeSection = () => {
//   return (
//     <div className="lg:pt-10">
//       <Helmet>
//         <title>Web-tech-services || About Me</title>
//       </Helmet>
//       <SectionTitle
//         title={" About Me"}
//         subtitle={
//           "Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
//         }
//       />

//       <div className="container mx-auto px-4">
//         {/* <h2 className="text-4xl font-bold text-center mb-8">About Me</h2> */}
//         <p className="text-lg text-gray-700 leading-relaxed mb-6 dark:text-slate-200">
//           Hi, I am Bishwajit Paul, a passionate web developer with a love for
//           creating intuitive and dynamic user experiences. With a strong
//           foundation in HTML, CSS, JavaScript, and React, I strive to build
//           applications that are not only functional but also enjoyable to use.
//         </p>
//         <p className="text-lg text-gray-700 leading-relaxed mb-6 dark:text-slate-200">
//           I have worked on a variety of projects ranging from small business
//           websites to more complex web applications. I am constantly learning
//           and improving my skills to stay on top of the latest trends and
//           technologies in web development.
//         </p>
//         <div className="skills mt-8 lg:grid grid-cols-3 gap-4 justify-between">
//           <div className="rounded-md shadow-md p-4 dark:bg-slate-800 dark:border-slate-700">
//             <h3 className="text-2xl font-semibold mb-4">Skills & Expertise</h3>
//             <ul className="list-disc list-inside text-left text-gray-700 dark:text-slate-200">
//               <li>Responsive Web Design</li>
//               <li>JavaScript (ES6+)</li>
//               <li>React & Redux</li>
//               <li>Node.js & Express.js</li>
//               <li>MongoDB & Mongoose</li>
//               <li>Version Control (Git)</li>
//               <li>API Development & Integration</li>
//             </ul>
//           </div>
//           <div className="rounded-md shadow-md dark:text-slate-200 dark:bg-slate-800 dark:border-slate-700 p-4">
//             <h3 className="text-2xl font-semibold mb-4">Skills & Expertise</h3>
//             <ul className="list-disc list-inside text-left text-gray-700 dark:text-slate-200">
//               <li>Responsive Web Design</li>
//               <li>JavaScript (ES6+)</li>
//               <li>React & Redux</li>
//               <li>Node.js & Express.js</li>
//               <li>MongoDB & Mongoose</li>
//               <li>Version Control (Git)</li>
//               <li>API Development & Integration</li>
//             </ul>
//           </div>
//           <div className="rounded-md shadow-md dark:text-slate-200 p-4 dark:bg-slate-800 dark:border-slate-700">
//             <h3 className="text-2xl font-semibold mb-4">Skills & Expertise</h3>
//             <ul className="list-disc list-inside text-left text-gray-700 dark:text-slate-200">
//               <li>Responsive Web Design</li>
//               <li>JavaScript (ES6+)</li>
//               <li>React & Redux</li>
//               <li>Node.js & Express.js</li>
//               <li>MongoDB & Mongoose</li>
//               <li>Version Control (Git)</li>
//               <li>API Development & Integration</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutMeSection;
