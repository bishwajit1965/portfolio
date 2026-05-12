import { FaEye, FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SkillBadge from "../skillBadge/SkillBadge";
import MiniButton from "../buttons/MiniButton";

const ProjectCard = ({ project }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
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
    <div className="border dark:border-slate-700 rounded-md shadow-md dark:bg-slate-800 min-h-[37rem] hover:shadow-xl">
      <div className="dark:text-slate-400">
        <img
          src={getImageSrc(project.image)}
          alt={project.name}
          className="rounded-t-md lg:min-h-80 lg:w-full lg:object-fill object-cover shadow-sm"
        />
        <div className="lg:p-6 p-2 lg:space-y-4 space-y-2">
          <h2 className="font-bold">{name}</h2>
          <p>{type}</p>
          <p
            dangerouslySetInnerHTML={{
              __html: description
                ? description.slice(0, 120) + "..."
                : "No content to display...",
            }}
          />
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 font-bold bg-base-100 text-base-content rounded-md border dark:border-slate-600 dark:bg-gray-600 dark:text-base-100">
              <span className="bg-base-300 flex items-center gap-2 rounded-md shadow-sm dark:bg-gray-700 text-base-content">
                <span className="bg-emerald-500 py-1 px-2 rounded-l-md text-white">
                  <FaTools size={20} />
                </span>
                <span className="px-1 text-base-content dark:text-gray-400">
                  Tech Stacks
                </span>
              </span>{" "}
            </div>
            {project.techStacks && project.techStacks.length > 0 ? (
              project.techStacks.map((t, i) => <SkillBadge key={i} label={t} />)
            ) : (
              <p className="text-gray-600 dark:text-base-100">
                No techStack mentioned!
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
