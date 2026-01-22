import { FaLayerGroup } from "react-icons/fa6";
import PageTitle from "../pageTitle/PageTitle";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaGithub, FaExternalLinkAlt, FaArrowCircleDown } from "react-icons/fa";
import Button from "../../components/buttons/Button";
import { useEffect, useState } from "react";
import api from "../../services/api";

const PortfolioProjects = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const baseURL = `${apiUrl}/uploads/`;
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        const visibleProjects = response.data.filter(
          (project) => project.visibility === "visible",
        );
        setProjects(visibleProjects);
      } catch (error) {
        console.error("Error in fetching data", error);
      }
    };
    fetchProjects();
  }, []);
  console.log("Projects data", projects);
  return (
    <div>
      <PageTitle
        title="Portfolio of"
        decoratedText="Projects"
        subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
        icon={FaLayerGroup}
      />
      <section className="max-w-7xl mx-auto py- px-4">
        <Tabs>
          <TabList className="flex justify-center gap-4 mb-6 border-b">
            {projects && projects.length > 0 ? (
              projects?.map((project) => (
                <Tab
                  key={project._id}
                  className="cursor-pointer px-4 py-2 rounded-md text-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700"
                  selectedClassName="bg-emerald-600 text-white"
                >
                  {project.name}
                </Tab>
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400">
                No projects available at the moment. Please check back later.
              </p>
            )}
          </TabList>

          {projects.map((project) => (
            <TabPanel key={project._id}>
              <div className="lg:space-y-10 space-y-4">
                <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-6 gap-4 justify-between">
                  <div className="lg:col-span-6 col-span-12">
                    <figure>
                      <img
                        src={project?.image && `${baseURL}${project?.image}`}
                        alt={project.name}
                        className="rounded-lg shadow-md w-full object-cover"
                      />
                      <figcaption>Main Project Image</figcaption>
                    </figure>
                  </div>
                  <div className="lg:col-span-6 col-span-12 lg:space-y-6 space-y-2">
                    <h3 className="text-2xl font-bold">{project.name}</h3>
                    <p className="font-bold">{project.type}</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="lg:space-y-4 space-y-2">
                    <div className="">
                      <h2 className="lg:text-3xl text-lg font-bold flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <FaLayerGroup size={30} className="text-amber-600" />{" "}
                        Project Screenshots
                      </h2>
                    </div>
                    <div className="">
                      {project?.screenshots?.map((category) => (
                        <div key={category.id} className=" ">
                          <h2 className="text-lg font-bold mt-4 mb-2 text-gray-700 dark:text-gray-400 flex items-center gap-2">
                            <FaArrowCircleDown /> {category.category}
                          </h2>

                          <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-4 gap-2">
                            {category?.items?.map((item, index) => (
                              <div
                                key={index}
                                className="lg:col-span-4 col-span-12"
                              >
                                <figure>
                                  <img
                                    src={`${baseURL}${item.image}`}
                                    alt={item.caption}
                                    className="w-full h-80 object-cover rounded-md mb-2 p-2 shadow-md bg-gray-1000 dark:border-stone-700 border"
                                  />
                                  {item?.caption && (
                                    <figcaption className=" dark:text-gray-400">
                                      {item?.caption}
                                    </figcaption>
                                  )}
                                </figure>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 lg:pt-8 pt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="m-0"
                    >
                      <Button variant="outline" icon={<FaGithub />}>
                        GitHub Source Code
                      </Button>
                    </a>
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="m-0"
                    >
                      <Button variant="base" icon={<FaExternalLinkAlt />}>
                        Live Demo
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </section>
    </div>
  );
};

export default PortfolioProjects;
