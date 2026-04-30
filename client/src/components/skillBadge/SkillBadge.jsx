const SkillBadge = ({ label }) => {
  return (
    <span
      className="px-2 py-0.5 text-sm font-medium rounded-md dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600
      border border-slate-300
      hover:bg-emerald-100
      transition-colors duration-200 bg-base-200 text-slate-700dark:text-gray-300"
    >
      {label}
    </span>
  );
};
export default SkillBadge;
