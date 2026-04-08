import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaExternalLinkAlt,
  FaGithub,
  FaHome,
  FaListOl,
  FaRegEye,
  FaTools,
  FaTrashAlt,
} from "react-icons/fa";
import { FaReadme, FaSourcetree } from "react-icons/fa6";

import api from "../../services/api";
import PageTitle from "../../pages/pageTitle/PageTitle";
import Button from "../buttons/Button";
import MiniButton from "../buttons/MiniButton";
import SkillBadge from "../skillBadge/SkillBadge";
import Loader from "../loader/Loader";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExtended, setIsExtended] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const baseURL = `${apiUrl}/uploads/`;
  const getImageSrc = (img) => {
    if (!img) return "";
    if (typeof img === "string" && img.startsWith("http")) return img;
    if (img.url) return img.url;
    return `${baseURL}${img}`;
  };
  const description = project?.description || "";

  // Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/projects/${projectId}`);
        setProject(res.data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  // Modal ESC + focus trap
  useEffect(() => {
    if (!isModalOpen) return;

    document.body.style.overflow = "hidden";
    const handleEsc = (e) => e.key === "Escape" && setIsModalOpen(false);
    window.addEventListener("keydown", handleEsc);

    const modal = document.getElementById("modal");
    if (modal) {
      const focusableEls = modal.querySelectorAll(
        'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      const handleTab = (e) => {
        if (e.key !== "Tab") return;
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      };

      modal.addEventListener("keydown", handleTab);
      firstEl?.focus();

      return () => {
        window.removeEventListener("keydown", handleEsc);
        modal.removeEventListener("keydown", handleTab);
        document.body.style.overflow = "auto";
      };
    }
  }, [isModalOpen]);

  if (loading)
    return (
      <p className="text-center py-10">
        <Loader />
      </p>
    );
  if (!project) return <p className="text-center py-10">Project not found.</p>;

  return (
    <div className="max-w-7xl mx-auto lg:space-y-10 space-y-2">
      <PageTitle
        title="Project"
        decoratedText="Details"
        subtitle="Explore this project in detail and see the technologies I used."
        icon={FaReadme}
      />

      {/* Main info + image */}
      <div className="grid lg:grid-cols-12 gap-6 rounded-md">
        <div className="lg:col-span-8 col-span-12 bg-base-100 border dark:border-gray-700 rounded-md shadow-sm hover:shadow-xl transition">
          <Link to="/" className="m-0 cursor-pointer">
            <img
              src={getImageSrc(project.image)}
              alt={project.name}
              className="rounded-t-md w-full h-auto shadow-sm hover:shadow-md lg:object-fill object-fill lg:p-0 p-1 border hover:border-4 transition-all"
            />
          </Link>
          <figcaption className="text-center text-gray-800 dark:text-gray-800 font-medium py-1 bg-base-300 rounded-b-md border-t border-gray-300">
            Main Project Image {project.type ? `- ${project.type}` : ""}
          </figcaption>
        </div>

        <div className="lg:col-span-4 col-span-12 lg:space-y-5 space-y-2 dark:text-gray-400 bg-base-100 border dark:border-gray-700 dark:bg-gray-800 rounded-md lg:p-4 p-2 shadow-sm hover:shadow-xl transition">
          <h2 className="text-lg lg:text-xl font-extrabold text-gray-800 dark:text-gray-400">
            {project.name}
          </h2>
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-400">
              Type:
            </span>{" "}
            {project.type}
          </p>
          <div className="lg:max-h-[7.4rem] overflow-y-auto rounded-md flex flex-wrap gap-2 border dark:border-gray-700 dark:bg-gray-800 text-base-content p-2 bg-base-200">
            <p className="text-gray-700 dark:text-gray-400">
              <span className="font-semibold text-gray-700 dark:text-gray-400">
                Description:
              </span>{" "}
              {isExtended
                ? description
                : description.length > 122
                  ? description.slice(0, 122) + "..."
                  : description}
            </p>
            <button
              onClick={() => setIsExtended((prev) => !prev)}
              className="text-sm text-blue-500 hover:link"
            >
              {isExtended ? "Show Less" : "Show More"}
              {isExtended ? (
                <FaArrowCircleUp className="inline ml-1" />
              ) : (
                <FaArrowCircleDown className="inline ml-1" />
              )}
            </button>
          </div>

          {/* Tech stacks */}

          <div className="flex flex-wrap gap-2 items-center dark:text-gray-400">
            <h3 className="flex items-center gap-2 font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400 rounded-md border border-gray-300 dark:border-gray-600">
              <span className="flex items-center rounded-md bg-gray-300 dark:bg-gray-700 dark:text-base-100 shadow-sm">
                <span className="bg-emerald-500 p-1.5 rounded-tl-md rounded-bl-md">
                  <FaTools className="text-base-100" />
                </span>
                <span className="px-1.5 text-sm">Tech Stacks</span>
              </span>
            </h3>
            {project?.techStacks?.length > 0 ? (
              project.techStacks.map((tech, idx) => (
                <SkillBadge key={idx} label={tech} />
              ))
            ) : (
              <p className="text-gray-500 text-center dark:text-gray-400">
                No tech stacks listed.
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              href="/"
              icon={<FaHome />}
              label="Go Home"
              variant="outline"
              className="p-0 m-0 mt-4"
            />
          </div>
        </div>
      </div>

      {/* Screenshots */}
      {project?.screenshots?.length > 0 && (
        <div className="lg:space-y-8 space-y-2 px-2">
          <h2 className="flex items-center gap-2 lg:text-2xl text-lg font-bold text-gray-800 dark:text-gray-400">
            <FaSourcetree /> Project Screenshots
          </h2>
          {project?.screenshots?.map((category) => (
            <div key={category.id} className="space-y-2">
              <h3 className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-400">
                <FaListOl /> {category.category}
              </h3>
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 rounded-t-md">
                {category.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative group shadow-md rounded-t-md hover:shadow-xl"
                  >
                    <Link to="/" className="m-0 cursor-pointer">
                      <img
                        src={getImageSrc(item.image)}
                        alt={item.caption}
                        className="rounded-t-md w-full lg:h-56 h-auto lg:object-fill object-cover cursor-pointer lg:p-0 p-1 bg-base-100 border border-base-300 hover:border-4 transition-all shadow hover:shadow-md dark:border-gray-300"
                      />
                    </Link>
                    {item.caption && (
                      <p className="text-center text-gray-600 dark:text-gray-700 p-1 border-t bg-gray-200 dark:bg-base-300 rounded-b-md">
                        {item.caption.slice(0, 45)}...
                      </p>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition rounded-md">
                      <Button
                        icon={<FaRegEye />}
                        variant="base"
                        onClick={() => {
                          setModalData(item);
                          setIsModalOpen(true);
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="flex flex-wrap lg:gap-4 gap-2 lg:mt-6">
        <Link to="/">
          <Button
            label="Go Home"
            icon={<FaHome />}
            variant="outline"
            className="lg:btn-md btn-sm"
          />
        </Link>
        <a href="#" target="_blank">
          <Button
            label="GitHub Source"
            icon={<FaGithub />}
            variant="outline"
            className="lg:btn-md btn-sm"
          />
        </a>
        <a href="#" target="_blank">
          <Button
            label="Live Demo"
            icon={<FaExternalLinkAlt />}
            variant="outline"
            className="lg:btn-md btn-sm"
          />
        </a>
      </div>

      {/* Modal */}
      {isModalOpen && modalData && (
        <div
          id="modal"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-100 z-50 p-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg max-w-3xl w-full p-6 space-y-4">
            <h2 className="lg:text-2xl font-bold text-gray-800 dark:text-gray-400 ">
              {modalData.caption}
            </h2>
            <img
              src={getImageSrc(modalData.image)}
              alt={modalData.caption}
              className="w-full h-auto object-cover rounded-md shadow border border-base-300 hover:border-4 hover:shadow-md transition-all"
            />
            <p className="text-gray-700 dark:text-gray-300">
              {project.description}
            </p>

            {/* Tech stacks */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="flex items-center rounded-md bg-gray-300 shadow-sm dark:bg-gray-700 dark:text-base-100">
                <span className="bg-emerald-500 p-1.5 rounded-tl-md rounded-bl-md">
                  <FaTools className="text-base-100" />
                </span>
                <span className="px-1.5 text-sm">Tech Stacks</span>
              </span>
              {project?.techStacks?.length > 0 ? (
                project?.techStacks.map((tech, idx) => (
                  <SkillBadge key={idx} label={tech} />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No tech stacks listed.
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <MiniButton
                label="Close"
                icon={<FaTrashAlt />}
                variant="danger"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
