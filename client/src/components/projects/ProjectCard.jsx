import { FaEye, FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SkillBadge from "../skillBadge/SkillBadge";
import MiniButton from "../buttons/MiniButton";

const ProjectCard = ({ project }) => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const baseURL = `${apiUrl}/uploads/`;
  // const imageUrl = `${baseURL}${project.image}`;
  const { _id, name, type, description } = project;
  const navigate = useNavigate();

  const viewProjectDetails = () => {
    navigate(`project-details/${_id}`);
  };
  const getImageSrc = (img) => {
    if (!img) return "";
    if (typeof img === "string" && img.startsWith("http")) return img;
    if (img.url) return img.url;
    return `${baseURL}${img}`;
  };

  return (
    <div className="border dark:border-slate-700 rounded-md shadow-md dark:bg-slate-900 min-h-[37rem] hover:shadow-xl">
      <div className="dark:text-gray-400">
        <img
          src={getImageSrc(project.image)}
          alt={project.name}
          className="rounded-t-md lg:min-h-80 lg:w-full lg:object-fill object-cover shadow-sm"
        />
        <div className="lg:p-6 p-2 lg:space-y-4 space-y-2">
          <h2 className="font-bold">{name}</h2>
          <p>{type}</p>
          <p>{description}</p>
          <div className="lg:flex lg:flex-wrap grid items-center gap-2 dark:text-gray-400">
            <h2 className="flex items-center gap-2 font-semibold bg-base-100 text-base-content rounded-md border border-gray-300 dark:border-slate-600 dark:bg-gray-600 dark:text-gray-400 pr-2">
              <span className="bg-emerald-500 text-base-100 py-1.5 px-2 rounded-l-md">
                <FaTools />
              </span>
              Tech Stacks
            </h2>
            {project && project?.techStacks?.length > 0 ? (
              project?.techStacks?.map((techStack, i) => (
                <SkillBadge key={i} label={techStack} />
              ))
            ) : (
              <p className="text-center text-gray-600 font-bold dark:text-base-100">
                No techStack !
              </p>
            )}
          </div>
          <div className="">
            <MiniButton
              type="submit"
              variant="success"
              label="View Details"
              icon={<FaEye />}
              className=""
              onClick={viewProjectDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
