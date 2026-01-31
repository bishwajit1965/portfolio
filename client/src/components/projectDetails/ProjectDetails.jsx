import {
  FaArrowCircleDown,
  FaExternalLinkAlt,
  FaGithub,
  FaHome,
  FaReadme,
  FaRegEye,
  FaSourcetree,
  FaTools,
  FaTrashAlt,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../../services/api";
import PageTitle from "../../pages/pageTitle/PageTitle";
import MiniButton from "../buttons/MiniButton";
import Button from "../buttons/Button";
import { FaCircleRight } from "react-icons/fa6";
import SkillBadge from "../skillBadge/SkillBadge";

const ProjectDetails = () => {
  const [loading, setLoading] = useState(false);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [data, setData] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const baseURL = `${apiUrl}/uploads/`;
  const { projectId } = useParams();
  console.log(projectId);
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    type: "",
    description: "",
    captions: "",
    techStacks: [],
  });

  const imageUrl = `${baseURL}${projectDetails.image}`;

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
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/projects/${projectId}`);
        if (response) {
          setProjectDetails(response.data);
        } else {
          alert("No data is available.");
        }
      } catch (error) {
        console.error("Failed to fetch project", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [projectId]);

  const handleOpenDetailModal = (item) => {
    setIsOpenDetailModal(true);
    if (item) {
      setData(item);
    }
  };

  return (
    <div className="lg:max-w-7xl mx-auto lg:p-0 p-2">
      {loading && (
        <div className="text-center py-10">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      )}
      <PageTitle
        title="Project"
        decoratedText="Details"
        subtitle={
          "Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
        }
        icon={FaReadme}
      />

      <div className="lg:py-4 rounded-md shadow-lg">
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-base-100 dark:bg-gray-800 dark:text-gray-400 rounded-md shadow-md lg:p-4 p-2">
            <div className="lg:col-span-6 col-span-12">
              <figure>
                <img
                  src={imageUrl}
                  alt={projectDetails?.name}
                  className="rounded-md h-auto w-full"
                />
                <figureCaption className="text-center text-gray-800 dark:text-gray-400 font-bold">
                  Main Project Image
                </figureCaption>
              </figure>
            </div>
            <div className="lg:col-span-6 col-span-12 lg:space-y-4 space-y-2 p-2">
              <h2 className="font-bold lg:text-3xl text-gray-600 dark:text-slate-400">
                <span className="text-stone-600 dark:text-stone-500 pr-2 font-bold">
                  Name:
                </span>
                {projectDetails.name}
              </h2>
              <p>
                {" "}
                <span className="text-stone-600 dark:text-stone-500 pr-2 font-bold">
                  Type:
                </span>
                {projectDetails.type}
              </p>
              <p>
                {" "}
                <span className="text-stone-600 dark:text-stone-500 pr-2 font-bold">
                  Description:
                </span>
                {projectDetails.description}
              </p>

              <div className="lg:flex lg:flex-wrap grid items-center gap-2">
                <h2 className="flex items-center gap-2 font-semibold bg-base-100 text-base-content rounded-md border border-gray-300 dark:border-slate-600 dark:bg-gray-600 dark:text-base-100 pr-2">
                  <span className="bg-emerald-500 text-base-100 py-1.5 px-2 rounded-l-md">
                    <FaTools />
                  </span>
                  Tech Stacks
                </h2>
                {projectDetails && projectDetails?.techStacks?.length > 0 ? (
                  projectDetails?.techStacks?.map((techStack, i) => (
                    <SkillBadge key={i} label={techStack} />
                  ))
                ) : (
                  <p className="text-center text-gray-600 font-bold dark:text-base-100">
                    No techStack !
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-base-100 lg:p-4 p-2 lg:col-span-6 space-y-2 rounded-md dark:bg-slate-900">
            <div className="lg:space-y-4 space-y-2 mb-12">
              <div className="lg:space-y-4 space-y-2">
                <div className="">
                  <h2 className="lg:text-3xl text-lg font-bold flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FaSourcetree /> Project Screenshots
                  </h2>
                </div>
                <div className="min-h-96">
                  {projectDetails?.screenshots?.map((category) => (
                    <div key={category.id} className=" ">
                      <h2 className="text-lg font-bold mt-4 mb-2 text-gray-700 dark:text-gray-400 flex items-center gap-2">
                        <FaArrowCircleDown /> {category.category}
                      </h2>

                      <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-4 gap-2">
                        {category?.items?.map((item, index) => (
                          <div
                            key={index}
                            className="lg:col-span-4 col-span-12 relative group"
                          >
                            <figure>
                              <img
                                src={`${baseURL}${item.image}`}
                                alt={item.caption}
                                className="w-full p-2 h-72 object-cover rounded-md mb-2 shadow-md bg-gray-1000 dark:border-stone-700 border"
                              />
                              {item?.caption && (
                                <figcaption className="font- dark:text-gray-400">
                                  {item?.caption}
                                </figcaption>
                              )}
                            </figure>

                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-400 opacity-0 group-hover:opacity-100">
                              <Button
                                variant="base"
                                icon={<FaRegEye />}
                                onClick={() => handleOpenDetailModal(item)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:flex lg:space-x-6 grid space-y-2 lg:space-y-0">
              <Link to="/" className="m-0">
                <Button label="Go Home" variant="outline" icon={<FaHome />} />
              </Link>

              <Link to="#" className="m-0">
                <Button
                  label="GitHub Source Code"
                  variant="outline"
                  icon={<FaGithub />}
                />
              </Link>
              <Link to="#" className="m-0">
                <Button
                  label="Live Demo"
                  variant="outline"
                  icon={<FaExternalLinkAlt />}
                />
              </Link>
            </div>

            {/* Modal toggler panel */}
            {isOpenDetailModal && (
              <div
                id="modal"
                data={data}
                className="fixed max-w-full mx-auto inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              >
                <div className="bg-white dark:bg-gray-800 lg:p-8 p-2 rounded-md shadow-sm max-w-3xl w-full space-y-2">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <FaCircleRight className="dark:text-amber-500 text-indigo-500" />{" "}
                    {data?.caption}
                  </h2>

                  <div className="mb-2">
                    <figure>
                      <img
                        src={`${baseURL}${data.image}`}
                        alt={data.caption}
                        className="w-full h-96 object-contain rounded-md mb-2 shadow-md border dark:border-slate-600"
                      />
                      <figcaption>{data?.caption}</figcaption>
                    </figure>
                  </div>
                  <p>{projectDetails?.description}</p>

                  <div className="lg:flex lg:flex-wrap grid items-center gap-2">
                    <h2 className="flex items-center gap-2 font-semibold bg-base-100 text-base-content rounded-md border border-gray-300 dark:border-slate-600 dark:bg-gray-600 dark:text-base-100 pr-2">
                      <span className="bg-emerald-500 text-base-100 py-1.5 px-2 rounded-l-md">
                        <FaTools />
                      </span>
                      Tech Stacks
                    </h2>
                    {projectDetails &&
                    projectDetails?.techStacks?.length > 0 ? (
                      projectDetails?.techStacks?.map((techStack, i) => (
                        <SkillBadge key={i} label={techStack} />
                      ))
                    ) : (
                      <p className="text-center text-gray-600 font-bold dark:text-base-100">
                        No techStack !
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end pt-2">
                    <MiniButton
                      label="Close"
                      icon={<FaTrashAlt />}
                      variant="danger"
                      onClick={() => setIsOpenDetailModal(false)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
