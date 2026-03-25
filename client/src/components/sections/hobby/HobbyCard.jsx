import { FaCheckCircle } from "react-icons/fa";

const HobbyCard = ({ hobby }) => {
  const { name, description, level } = hobby;
  return (
    <div className="lg:p-2 p-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm space-y-1">
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
        <span className="">{description}</span>
      </p>
      <p className="lg:flex grid gap-2 items-baseline">
        <span className="mr-2">
          <FaCheckCircle className="text-green-600" />
        </span>
        {level.map((lev, index) => (
          <span
            key={index}
            className="bg-green-600 text-white px-2 py-0.5 text-[12px] rounded-md capitalize mr-2"
          >
            {lev}
          </span>
        ))}
      </p>
    </div>
  );
};

export default HobbyCard;

// Data uploaded
// [
//   {
//     "_id": { "$oid": "66e9917b8fef8a03c1ade816" },
//     "name": "Reading Technical Blogs",
//     "level": ["beginner", "intermediate", "advanced"],
//     "description": "I follow blogs and documentation to stay updated with the latest technologies and best practices."
//   },
//   {
//     "_id": { "$oid": "66e9917b8fef8a03c1ade817" },
//     "name": "Problem Solving & Algorithm Practice",
//     "level": ["beginner", "intermediate", "advanced"],
//     "description": "I enjoy tackling challenging coding problems and improving my algorithmic thinking."
//   },
//   {
//     "_id": { "$oid": "66e9917b8fef8a03c1ade818" },
//     "name": "Exploring New Technologies",
//     "level": ["beginner", "intermediate", "advanced"],
//     "description": "I experiment with new frameworks, libraries, and tools to expand my skillset and efficiency."
//   },
//   {
//     "_id": { "$oid": "66e9917b8fef8a03c1ade819" },
//     "name": "Open Source Contribution",
//     "level": ["beginner", "intermediate", "advanced"],
//     "description": "I contribute to open-source projects to improve code quality and collaborate with the community."
//   },
//   {
//     "_id": { "$oid": "66e9917b8fef8a03c1ade81a" },
//     "name": "System Design & Architecture Planning",
//     "level": ["beginner", "intermediate", "advanced"],
//     "description": "I enjoy designing scalable systems, structuring backend and frontend architecture thoughtfully."
//   }
// ]
