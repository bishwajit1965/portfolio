import { useEffect, useState } from "react";

import {
  FaLayerGroup,
  FaTools,
  FaRegEye,
  FaGithub,
  FaExternalLinkAlt,
  FaTrashAlt,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";

import { Helmet } from "react-helmet-async";
import api from "../../services/api";
import Button from "../../components/buttons/Button";
import MiniButton from "../../components/buttons/MiniButton";
import PageTitle from "../pageTitle/PageTitle";
import SkillBadge from "../../components/skillBadge/SkillBadge";
import Loader from "../../components/loader/Loader";
import { FaCircleRight, FaListCheck } from "react-icons/fa6";
import { ICONS } from "./ReactIcons";
import { normalizeKey } from "./ReactIcons";

const PortfolioProjects = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalProject, setModalProject] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const baseURL = `${apiUrl}/uploads/`;

  // Manage Images
  const getImageSrc = (img) => {
    if (!img) return "";
    if (typeof img === "string" && img.startsWith("http")) return img;
    if (img.url) return img.url;
    return `${baseURL}${img}`;
  };

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await api.get("/projects");
        const visibleProjects = response.data.filter(
          (p) => p.visibility === "visible",
        );
        setProjects(visibleProjects);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      const cats = [
        "All",
        ...new Set(
          projects.flatMap((p) => p.screenshots.map((s) => s.category)),
        ),
      ];
      setCategories(cats);
    }
  }, [projects]);

  console.log("Categories", categories);

  const filteredScreenshots = (screenshots) =>
    activeCategory === "All"
      ? screenshots
      : screenshots.filter((s) => s.category === activeCategory);

  const openDetailModal = (item, project) => {
    setModalData(item);
    setModalProject(project);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => setIsDetailModalOpen(false);

  return (
    <div className="relative">
      <Helmet>
        <title>Bishwajit.dev || Projects</title>
      </Helmet>

      {loading && <Loader />}

      {/* Sidebar toggle for mobile */}
      <div className="lg:hidden fixed top-[4.3rem] z-50 ml-2 w-full rounded-md">
        <Button
          icon={<FaBars />}
          label="Categories"
          size="sm"
          onClick={() => setIsSidebarOpen(true)}
          variant="outline"
        />
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-100 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <section className="max-w-7xl mx-auto lg:px-4 px-2 flex flex-col lg:flex-row gap-6 mt-8 lg:mt-0">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static top-0 left-0 lg:z-10 z-50 h-full w-64 bg-base-200 dark:bg-slate-800 overflow-y-auto transform transition-transform duration-300 rounded-tl-sm
            ${isSidebarOpen ? "translate-x-0 mt-16" : "-translate-x-full lg:mt-0 mt-16"} lg:translate-x-0 lg:h-auto lg:max-h-[calc(100vh-6rem)] lg:sticky lg:top-20
          `}
        >
          <div className="flex items-center justify-between lg:hidden p-2 border-b dark:border-slate-700">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FaLayerGroup className="text-amber-600" /> Categories
            </h3>
            <Button
              label="Close"
              size="sm"
              icon={<FaTimes />}
              variant="outline"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
          <div className="">
            <div className="sticky top-0 hidden lg:block px-4 py-2 bg-base-300 dark:bg-gray-700 shadow-sm">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FaLayerGroup className="text-amber-600" />
                Portfolio Categories
              </h3>
            </div>

            <div className="px- py-2">
              {/* ALL */}
              <div className="px-2 mt-2">
                <button
                  className={`w-full text-left px-2 py-1.5 mb-3 rounded ${
                    activeCategory === "All"
                      ? "bg-emerald-600 text-white flex items-center gap-1"
                      : "hover:bg-emerald-100 flex items-center gap-1"
                  }`}
                  onClick={() => {
                    setActiveCategory("All");
                  }}
                >
                  <FaHome /> All Projects
                </button>
              </div>

              <div className="px-3">
                {projects && projects.length > 0 ? (
                  Object.entries(
                    projects.reduce((acc, project) => {
                      const label = project.projectLabel || "Other";

                      if (!acc[label]) acc[label] = [];

                      project.screenshots?.forEach((s) => {
                        if (s?.category && !acc[label].includes(s.category)) {
                          acc[label].push(s.category);
                        }
                      });

                      return acc;
                    }, {}),
                  ).map(([parent, cats]) => (
                    <div key={parent}>
                      {/* 🔷 Parent Label */}
                      <p className="text-normal font-bold text-gray-700 dark:text-gray-300 my-1">
                        {parent}
                      </p>

                      {/* 🔹 Categories */}
                      <div className="px-2">
                        {cats.map((cat) => {
                          const safeCat = cat || "default";
                          const iconKey = normalizeKey(safeCat);
                          const Icon = ICONS[iconKey] || ICONS.default;

                          return (
                            <button
                              key={cat}
                              className={`w-full p-0 text-left py-1.5 px-2 rounded mb-1 font-medium flex items-center gap-1.5 ${
                                activeCategory === cat
                                  ? "bg-emerald-600 text-white border-l-4 border-emerald-300 text-sm"
                                  : "hover:bg-emerald-100 dark:hover:text-gray-800"
                              }`}
                              onClick={() => {
                                setActiveCategory(cat);
                                setIsSidebarOpen(false);
                              }}
                            >
                              <Icon />
                              {cat}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No categories found!</p>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          <PageTitle
            title="Portfolio of "
            decoratedText="Projects"
            subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
            icon={FaLayerGroup}
            dataLength={projects && projects?.length > 0 ? projects?.length : 0}
          />

          {projects?.map((project) => {
            const filtered = filteredScreenshots(project.screenshots);
            if (!filtered || filtered.length === 0) return null;

            return (
              <div key={project?._id} className="">
                <h2 className="lg:text-2xl text-sm font-bold text-gray-700 dark:text-slate-300 flex items-center gap-2 mb-4">
                  <FaLayerGroup className="text-amber-600" /> {project.name}
                </h2>

                {filtered?.map((group) => (
                  <div key={group.id} className="lg:mb-10 space-y-4">
                    <h3 className="lg:text-xl font-bold text-gray-700 dark:text-slate-400 mb-4 flex items-center gap-2">
                      <FaListCheck className="text-amber-600" />{" "}
                      {group.category}
                    </h3>
                    <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-6 gap-4">
                      {group?.items?.map((item) => (
                        <div
                          key={item.id}
                          className="lg:col-span-6 col-span-12 relative group border dark:border-slate-700 rounded-lg shadow-sm hover:shadow-xl"
                        >
                          <figure>
                            <img
                              src={getImageSrc(item.image.url)}
                              alt={item.caption || project.name}
                              className="rounded-t-md w-full lg:h-64 h-auto lg:object-fill object-cover border hover:border-2 transition-transform duration-300 group-hover:scale-100 dark:border-gray-800"
                            />
                            {item.caption && (
                              <figcaption className="text-medium border-t border-gray-300 text-center text-gray-600 dark:text-gray-700 p-1.5 rounded-b-md bg-base-200">
                                {item.caption.slice(0, 55) + " ..."}
                              </figcaption>
                            )}
                          </figure>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100">
                            <Button
                              variant="base"
                              icon={<FaRegEye />}
                              onClick={() => openDetailModal(item, project)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Project description & tech stack */}
                    <div className="mt-4 flex flex-col lg:flex-row lg:gap-4 gap-2 items-start">
                      {project.description && (
                        <p className="text-gray-600 dark:text-gray-300">
                          {project.description}
                        </p>
                      )}
                    </div>

                    {/* Tech Stacks */}
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-2 font-bold bg-base-100 text-base-content rounded-md border dark:border-slate-600 dark:bg-gray-600 dark:text-base-100">
                        <span className="bg-base-300 flex items-center gap-2 rounded-md shadow-sm dark:bg-gray-700 text-base-content">
                          <span className="bg-emerald-500 py-1 px-2 rounded-l-md text-white">
                            <FaTools size={20} />
                          </span>
                          <span className="px-1 text-base-content dark:text-gray-300">
                            Tech Stacks
                          </span>
                        </span>{" "}
                      </div>
                      {project.techStacks && project.techStacks.length > 0 ? (
                        project.techStacks.map((t, i) => (
                          <SkillBadge key={i} label={t} />
                        ))
                      ) : (
                        <p className="text-gray-600 dark:text-base-100">
                          No techStack mentioned!
                        </p>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex lg:gap-4 gap-2 mt-2">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="m-0"
                        >
                          <Button variant="outline" icon={<FaGithub />}>
                            GitHub
                          </Button>
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="m-0"
                        >
                          <Button variant="base" icon={<FaExternalLinkAlt />}>
                            Live Demo
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* Detail Modal */}
      {isDetailModalOpen && (
        <div
          id="modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black dark:bg-opacity-100 bg-opacity-50"
        >
          <div className="bg-white dark:bg-gray-800 max-w-3xl w-full rounded-md lg:p-8 p-4 space-y-4 max-h-screen overflow-y-auto">
            <h2 className="lg:text-xl text-lg font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FaCircleRight className="text-amber-500" /> {modalProject?.name}
            </h2>

            <figure>
              <img
                src={getImageSrc(modalData?.image?.url || modalData?.image)}
                alt={modalData?.caption || modalProject?.name}
                className="w-full lg:h-auto lg:object-fill h-auto  object-cover rounded-md mb-2 shadow hover:shadow-mg border hover:border-2 hover: border-base-300 dark:border-slate-600 transition-all duration:300"
              />
              {modalData?.caption && (
                <figcaption className="text-gray-700 dark:text-gray-300">
                  {modalData.caption}
                </figcaption>
              )}
            </figure>

            {modalProject?.description && (
              <p className="text-gray-700 dark:text-gray-300">
                {modalProject.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <h4 className="flex items-center gap-2 font-bold bg-base-100 text-base-content py-0.5 px-2 rounded-md border dark:border-slate-600 dark:bg-gray-600 dark:text-base-100">
                <FaTools /> Tech Stacks
              </h4>
              {modalProject?.techStacks &&
              modalProject?.techStacks?.length > 0 ? (
                modalProject?.techStacks?.map((t, i) => (
                  <SkillBadge key={i} label={t} />
                ))
              ) : (
                <p className="text-gray-600 dark:text-base-100">
                  No techStack mentioned!
                </p>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <MiniButton
                label="Close"
                icon={<FaTrashAlt />}
                variant="danger"
                onClick={closeDetailModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioProjects;
