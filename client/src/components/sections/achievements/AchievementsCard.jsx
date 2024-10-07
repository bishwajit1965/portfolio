import { FaCheckCircle } from "react-icons/fa";

const AchievementsCard = ({ achievement }) => {
  const { completedProjects, experience, certification, awards } = achievement;

  return (
    <div className="border border-slate-400 dark:border-slate-700 rounded-md p-2 shadow-sm">
      <p className="flex items-baseline">
        <span className="mr-2">
          <FaCheckCircle className="text-blue-700 dark:text-amber-400" />
        </span>{" "}
        {completedProjects}
      </p>
      <p className="flex items-baseline">
        <span className="mr-2">
          <FaCheckCircle className="text-blue-700 dark:text-amber-400" />
        </span>{" "}
        {experience}
      </p>
      <p className="flex items-baseline">
        <span className="mr-2">
          <FaCheckCircle className="text-blue-700 dark:text-amber-400" />
        </span>
        {certification}
      </p>
      <p className="flex items-baseline">
        <span className="mr-2">
          <FaCheckCircle className="text-blue-700 dark:text-amber-400" />{" "}
        </span>{" "}
        {awards}
      </p>
    </div>
  );
};

export default AchievementsCard;
