import { FaCheckCircle } from "react-icons/fa";

const HobbyCard = ({ hobby }) => {
  const { name, description, level } = hobby;
  return (
    <div className="lg:p-3 p-3 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm space-y-1">
      <h2 className="font-bold flex items-baseline">
        <span className="mr-2">
          <FaCheckCircle className="text-green-600" />
        </span>
        {name}
      </h2>
      <p className="flex items-baseline">
        <span className="mr-2">
          <FaCheckCircle className="text-green-600" />
        </span>
        {description}
      </p>
      <p className="flex items-baseline">
        <span className="mr-2">
          <FaCheckCircle className="text-green-600" />
        </span>
        {level.map((lev, index) => (
          <span
            key={index}
            className="bg-green-600 text-white px-2 py-1 text-[12px] rounded-md capitalize mr-2"
          >
            {lev}
          </span>
        ))}
      </p>
    </div>
  );
};

export default HobbyCard;
