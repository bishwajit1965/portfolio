import { Helmet } from "react-helmet-async";
import SectionTitle from "../../sectionTitle/SectionTitle";

const AboutMeSection = () => {
  return (
    <>
      <Helmet>
        <title>Web-tech-services || About Me</title>
      </Helmet>
      <div>
        <SectionTitle
          title={" About Me"}
          subtitle={
            "Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
          }
        />

        <div className="container mx-auto px-4">
          {/* <h2 className="text-4xl font-bold text-center mb-8">About Me</h2> */}
          <p className="text-lg text-gray-700 leading-relaxed mb-6 dark:text-slate-200">
            Hi, I am Bishwajit Paul, a passionate web developer with a love for
            creating intuitive and dynamic user experiences. With a strong
            foundation in HTML, CSS, JavaScript, and React, I strive to build
            applications that are not only functional but also enjoyable to use.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6 dark:text-slate-200">
            I have worked on a variety of projects ranging from small business
            websites to more complex web applications. I am constantly learning
            and improving my skills to stay on top of the latest trends and
            technologies in web development.
          </p>
          <div className="skills mt-8 lg:grid grid-cols-3 gap-4 justify-between">
            <div className="rounded-md shadow-md p-4 dark:bg-slate-800 dark:border-slate-700">
              <h3 className="text-2xl font-semibold mb-4">
                Skills & Expertise
              </h3>
              <ul className="list-disc list-inside text-left text-gray-700 dark:text-slate-200">
                <li>Responsive Web Design</li>
                <li>JavaScript (ES6+)</li>
                <li>React & Redux</li>
                <li>Node.js & Express.js</li>
                <li>MongoDB & Mongoose</li>
                <li>Version Control (Git)</li>
                <li>API Development & Integration</li>
              </ul>
            </div>
            <div className="rounded-md shadow-md dark:text-slate-200 dark:bg-slate-800 dark:border-slate-700 p-4">
              <h3 className="text-2xl font-semibold mb-4">
                Skills & Expertise
              </h3>
              <ul className="list-disc list-inside text-left text-gray-700 dark:text-slate-200">
                <li>Responsive Web Design</li>
                <li>JavaScript (ES6+)</li>
                <li>React & Redux</li>
                <li>Node.js & Express.js</li>
                <li>MongoDB & Mongoose</li>
                <li>Version Control (Git)</li>
                <li>API Development & Integration</li>
              </ul>
            </div>
            <div className="rounded-md shadow-md dark:text-slate-200 p-4 dark:bg-slate-800 dark:border-slate-700">
              <h3 className="text-2xl font-semibold mb-4">
                Skills & Expertise
              </h3>
              <ul className="list-disc list-inside text-left text-gray-700 dark:text-slate-200">
                <li>Responsive Web Design</li>
                <li>JavaScript (ES6+)</li>
                <li>React & Redux</li>
                <li>Node.js & Express.js</li>
                <li>MongoDB & Mongoose</li>
                <li>Version Control (Git)</li>
                <li>API Development & Integration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMeSection;
