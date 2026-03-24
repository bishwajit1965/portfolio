import { FaEye, FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SkillBadge from "../skillBadge/SkillBadge";
import MiniButton from "../buttons/MiniButton";

const ProjectCard = ({ project }) => {
  const imageUrl = `http://localhost:5000/uploads/${project.image}`;
  const { _id, name, type, description } = project;
  const navigate = useNavigate();

  const viewProjectDetails = () => {
    navigate(`project-details/${_id}`);
  };

  return (
    <div className="border dark:border-slate-700 rounded-md shadow-md bg-base-100 dark:bg-slate-900 relative min-h-[33rem]">
      <div className="space-y-2 dark:text-gray-400">
        <img
          src={imageUrl}
          alt={project.name}
          className="rounded-t-md min-h-80 lg:w-full object-fill mb-4 border shadow-sm hover:shadow-lg"
        />
        <div className="p-2 space-y-2">
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
        </div>
      </div>

      <div className="absolute bottom-2 left-2 space-x-2 lg:space-x-4 pt-2">
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
  );
};

export default ProjectCard;
