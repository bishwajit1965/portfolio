import { FaCircleRight, FaLayerGroup, FaListCheck } from "react-icons/fa6";
import PageTitle from "../pageTitle/PageTitle";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaTrashAlt,
  FaRegEye,
  FaChevronCircleRight,
} from "react-icons/fa";
import Button from "../../components/buttons/Button";
import { useEffect, useState } from "react";
import api from "../../services/api";
import MiniButton from "../../components/buttons/MiniButton";
import Loader from "../../components/loader/Loader";

const PortfolioProjects = () => {
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [data, setData] = useState(null);
  const [projectData, setProjectData] = useState({});
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const baseURL = `${apiUrl}/uploads/`;
  const [projects, setProjects] = useState([]);

  const categories = [
    "All",
    ...new Set(
      projects.flatMap((project) => project.screenshots.map((s) => s.category)),
    ),
  ];

  const filterScreenshotsByCategory = (screenshots) => {
    if (activeCategory === "All") return screenshots;
    return screenshots.filter((group) => group.category === activeCategory);
  };

  // ---------------------------------------
  // Effects for ESC, scroll, and focus trap
  // ---------------------------------------
  useEffect(() => {
    if (!isOpenDetailModal) return;

    // Lock background scroll
    document.body.style.overflow = "hidden";

    // Handle ESC key
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpenDetailModal(false);
    };
    window.addEventListener("keydown", handleEsc);

    // Focus trap
    const modal = document.getElementById("modal");
    if (modal) {
      const focusableEls = modal.querySelectorAll(
        'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      const handleTab = (e) => {
        if (e.key !== "Tab") return;
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      };

      modal.addEventListener("keydown", handleTab);
      firstEl?.focus();

      // Cleanup
      return () => {
        window.removeEventListener("keydown", handleEsc);
        modal.removeEventListener("keydown", handleTab);
        document.body.style.overflow = "auto"; // restore scroll
      };
    }
  }, [isOpenDetailModal]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await api.get("/projects");
        const visibleProjects = response.data.filter(
          (project) => project.visibility === "visible",
        );
        setProjects(visibleProjects);
      } catch (error) {
        console.error("Error in fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      setActiveCategory("All");
    }
  }, [projects]);

  const handleOpenDetailModal = ({ item, project }) => {
    setIsOpenDetailModal(true);
    if ((item, project)) {
      setData(item);
      setProjectData(project);
    }
  };

  return (
    <div>
      {loading && <Loader />}

      <section className="max-w-7xl mx-auto lg:px-4 px-2">
        <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-6 gap-2">
          <div className="lg:col-span-3 col-span-12 lg:max-h-[38.4rem] max-h-[9.5rem] lg:overflow-y-auto overflow-y-auto sticky lg:top-[5.5rem] top-12 bg-base-200 dark:bg-slate-800 rounded-lg shadow z-50">
            <h3 className="lg:text-2xl text-xl font-bold lg:px-4 lg:py-2 p-2 flex items-center gap-2 sticky top-0 z-50 bg-base-300 dark:border-slate-700 dark:bg-slate-800 ">
              <FaLayerGroup className="text-amber-600" /> Categories
            </h3>

            <div className="lg:min-h-screen min-h-10 sticky top-0 lg:px-4 px-2 lg:py-6 py-3 dark:border-slate-700 dark:bg-slate-900">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`w-full text-left px-3 py-2 rounded mb-2 font-medium flex items-center gap-2 ${
                    activeCategory === cat
                      ? "bg-emerald-600 text-white"
                      : "hover:bg-emerald-100 dark:hover:bg-emerald-100 dark:hover:text-gray-800"
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  <FaChevronCircleRight /> {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-9 col-span-12">
            <PageTitle
              title="Portfolio of"
              decoratedText="Projects"
              subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
              icon={FaLayerGroup}
            />
            {projects.map((project) => {
              const filteredScreenshots = filterScreenshotsByCategory(
                project.screenshots,
              );
              if (filteredScreenshots.length === 0) return null;

              return (
                <div key={project._id} className="lg:mb-10 mb-5">
                  <div className="">
                    <h2 className="lg:text-2xl text-sm font-bold text-gray-700 dark:text-slate-300 flex items-center gap-2">
                      <FaLayerGroup className="text-amber-600" /> Name:{" "}
                      {project.name}
                    </h2>
                  </div>

                  {filteredScreenshots.map((group) => (
                    <div key={group.id} className="">
                      <div className="lg:pl-8">
                        <h3 className="lg:text-xl font-bold text-gray-700 dark:text-slate-400 mb-4 flex items-center gap-2">
                          <FaListCheck className="text-amber-600" /> Category:{" "}
                          {group.category}
                        </h3>
                      </div>
                      <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-6 gap-4">
                        {group.items.map((item) => (
                          <div
                            key={item.id}
                            className="lg:col-span-6 col-span-12 relative group border dark:border-slate-700 rounded-lg shadow-sm hover:shadow-xl"
                          >
                            <figure>
                              <img
                                src={`${baseURL}${item.image}`}
                                alt={item.caption}
                                className="rounded w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <figcaption>
                                {item.caption && (
                                  <p className="mt-1 text-medium text-gray-600 dark:text-gray-400 p-2">
                                    {item.caption}
                                  </p>
                                )}
                              </figcaption>
                            </figure>

                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-400 opacity-0 group-hover:opacity-100 transition">
                              <Button
                                variant="base"
                                icon={<FaRegEye />}
                                onClick={() =>
                                  handleOpenDetailModal({ item, project })
                                }
                              >
                                Open Modal
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="lg:space-y-6 space-y-2 lg:pb-6 pb-2">
                        <div className="">
                          {project?.description && (
                            <p className="mt-4 text-gray-600 dark:text-gray-300">
                              {project?.description}
                            </p>
                          )}
                        </div>
                        <div className="lg:flex grid lg:gap-4 gap-2">
                          {project.githubLink && (
                            <a
                              href={project?.githubLink}
                              target="_blank"
                              rel="noreferrer"
                              className="m-0"
                            >
                              <Button variant="outline" icon={<FaGithub />}>
                                GitHub Source Code
                              </Button>
                            </a>
                          )}
                          {project.liveLink && (
                            <a
                              href={project?.liveLink}
                              target="_blank"
                              rel="noreferrer"
                              className="m-0"
                            >
                              <Button
                                variant="base"
                                icon={<FaExternalLinkAlt />}
                                className="lg:text-medium text-xs"
                              >
                                Live Demo
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal toggler panel */}
      {isOpenDetailModal && (
        <div
          id="modal"
          className="fixed max-w-full mx-auto inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white dark:bg-gray-800 lg:p-8 p-2 rounded-md max-w-3xl w-full">
            <div className="mb-4 space-y-1">
              <h2 className="lg:text-xl text-lg font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaCircleRight className="dark:text-amber-500 text-indigo-500" />
                {projectData?.name}
              </h2>
              <p className="text-medium pl-7 text-gray-700 dark:text-gray-300">
                {projectData?.description}
              </p>
            </div>

            <div className="mb-2">
              <figure>
                <img
                  src={`${baseURL}${data.image}`}
                  alt={data.caption}
                  className="w-full h-96 object-contain rounded-md mb-2 shadow hover:shadow-lg border border-stone-200 dark:border-slate-600"
                />
                {data.caption && (
                  <figcaption>
                    <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FaCircleRight className="dark:text-amber-500 text-indigo-500" />{" "}
                      {data.caption}
                    </p>
                  </figcaption>
                )}
              </figure>
            </div>
            <div className="flex justify-end pt-2">
              <MiniButton
                label="Close"
                icon={<FaTrashAlt />}
                variant="danger"
                onClick={() => setIsOpenDetailModal(false)}
                className="outline-none focus:outline-none border-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioProjects;
