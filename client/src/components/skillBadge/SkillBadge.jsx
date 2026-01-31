const SkillBadge = ({ label }) => {
  return (
    <span
      className="px-3 py-1 text-sm font-medium rounded-md
      bg-base-200 dark:bg-slate-700
      text-slate-700 dark:text-slate-200
      border border-slate-300 dark:border-slate-600
      hover:bg-emerald-100 dark:hover:bg-emerald-800
      transition"
    >
      {label}
    </span>
  );
};
export default SkillBadge;
