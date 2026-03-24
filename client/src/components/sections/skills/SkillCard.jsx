import { FaCheckCircle } from "react-icons/fa";

const SkillCard = ({ skill }) => {
  const { skillName, level, category } = skill;

  return (
    <div className="border border-slate-300 dark:border-slate-700 shadow-md rounded-xl p-4 flex flex-col h-full transition-transform duration-300 hover:scale-105">
      <h3 className="font-bold text-lg flex items-center mb-2">
        <FaCheckCircle className="text-blue-700 dark:text-amber-400 mr-2" />
        {skillName}
      </h3>

      <p className="flex items-center mb-2">
        <FaCheckCircle className="text-blue-700 dark:text-amber-400 mr-2" />
        Level: <span className="font-medium ml-1">{level}</span>
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {category.map((cat, index) => (
          <span
            key={index}
            className="px-2 py-1 border text-xs rounded-md bg-blue-600 dark:bg-amber-600 text-white border-blue-900 dark:border-amber-400"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;
