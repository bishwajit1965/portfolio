import "./SkillProgressBar.css"; // CSS for additional styling

// Skills data - an array of objects containing skill name and percentage level
const skillsData = [
  { skill: "JavaScript", level: 85 },
  { skill: "React", level: 80 },
  { skill: "Node.js", level: 75 },
  { skill: "Express", level: 70 },
  { skill: "MongoDB", level: 65 },
];

const SkillsProgressBar = () => {
  return (
    <>
      <h2 className="lg:text-2xl text-lg font-bold mb-2 dark:text-green-400">
        My skills
      </h2>

      <div className="skills-container mx-auto border border-slate-300 dark:border-slate-700 shadow-md lg:space-y-3">
        {skillsData.map((skill, index) => (
          <div
            key={index}
            className="skill rounded-lg border border-slate-300 lg:p-2 p-2 dark:border-slate-700"
          >
            <p className="skill-name">{skill.skill}</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            <p className="skill-level dark:text-white">{skill.level}%</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkillsProgressBar;
