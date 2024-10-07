import { FaCheckCircle } from "react-icons/fa";

const SkillCard = ({ skill }) => {
  const { skillName, level, category } = skill;
  return (
    <div className="border border-slate-300 dark:border-slate-700 shadow-sm rounded-md p-2 mb-2">
      <h2 className="font-bold flex items-center">
        <FaCheckCircle className="text-blue-700 dark:text-amber-400 mr-2" />
        Skill: {skillName}
      </h2>
      <p>
        <span className="font-bold flex items-center">
          <FaCheckCircle className="text-blue-700 dark:text-amber-400 mr-2" />
          Level: {level}
        </span>{" "}
      </p>
      <p>
        <span className="font-bold flex items-center">
          <FaCheckCircle className="text-blue-700 dark:text-amber-400 mr-2" />
          Category:{" "}
          {category.map((cat, index) => (
            <span
              className="ml-1 px-2 py-1 mr-2 border text-xs border-blue-900 rounded-md bg-blue-600 dark:bg-amber-600 text-white"
              key={index}
            >
              {cat}
            </span>
          ))}
        </span>
      </p>
    </div>
  );
};

export default SkillCard;
