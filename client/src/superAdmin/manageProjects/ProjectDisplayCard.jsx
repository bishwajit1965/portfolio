import {
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaEdit,
  FaEye,
  FaTools,
  FaTrash,
} from "react-icons/fa";
import ProjectVisibilityToggle from "./ProjectVisibilityToggle";
import { useNavigate } from "react-router-dom";
import SkillBadge from "../../components/skillBadge/SkillBadge";
import MiniButton from "../../components/buttons/MiniButton";
import { useState } from "react";

const ProjectDisplayCard = ({ project, handleDelete }) => {
  const {
    _id,
    name,
    type,
    category,
    description,
    visibility,
    techStacks,
    image,
  } = project;
  const [isExtended, setIsExtended] = useState(false);
  const getImageSrc = (img) => {
    if (!img) return "";
    if (typeof img === "string" && img.startsWith("http")) return img;
    if (img.url) return img.url;
  };
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/super-admin/edit-project-details/${_id}`);
  };

  const viewProjectDetails = () => {
    navigate(`/super-admin/view-project-details/${_id}`);
  };

  return (
    <div className="border dark:border-slate-700 rounded-md shadow-md bg-base-100 dark:bg-slate-900 relative">
      <div className="rounded-t-md">
        <img
          src={getImageSrc(image)}
          alt={project.name}
          className="rounded-t-md lg:h-56 h-60 lg:w-full object-fill shadow-sm"
        />
        <div className="lg:min-h-[26rem] min-h-[27rem] space-y-2 p-2">
          <h2 className="font-bold">{name}</h2>
          <p>{type}</p>
          <p>{category}</p>
          <div className="lg:max-h-26 max-h-32 items-center overflow-hidden overflow-y-auto">
            <p>
              {isExtended
                ? description
                : description.length > 150
                  ? description.slice(0, 150) + "..."
                  : description}
            </p>
            <button
              onClick={() => setIsExtended((prev) => !prev)}
              className="text-sm text-blue-500 hover:link cursor-pointer"
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
          <div className="flex flex-wrap gap-2 items-center">
            <span className="bg-gray-300 rounded-md flex items-center gap-1 text-sm font-medium dark:bg-gray-800 border dark:border-gray-700 dark:text-gray-400">
              <span className="bg-emerald-500 px-2 py-1 rounded-l-md">
                <FaTools size={16} className="text-white" />{" "}
              </span>{" "}
              <span className="pr-2 dark:text-gray-400">Tech Stacks</span>
            </span>
            {techStacks?.length > 0 ? (
              techStacks.map((tech, idx) => (
                <SkillBadge key={idx} label={tech} />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No tech stacks listed.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-1.5 space-y-2 space-x-1 lg:space-x-2 p-2">
        <MiniButton
          onClick={() => handleEdit()}
          variant="success"
          label="Update"
          icon={<FaEdit />}
        />

        <MiniButton
          type="submit"
          size="sm"
          variant="success"
          label="Detail"
          icon={<FaEye />}
          className=""
          onClick={() => viewProjectDetails()}
        />

        <MiniButton
          onClick={() => handleDelete(_id)}
          type="submit"
          size="sm"
          variant="danger"
          label="Delete"
          icon={<FaTrash />}
        />

        {/* Project visibility functionality */}
        <div className="mt-1">
          <ProjectVisibilityToggle
            projectId={_id}
            initialVisibility={visibility}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDisplayCard;
