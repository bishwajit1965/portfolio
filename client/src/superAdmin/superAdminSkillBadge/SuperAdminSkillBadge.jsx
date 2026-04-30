const SuperAdminSkillBadge = ({ label }) => {
  return (
    <span
      className="px-2 py-0.5 text-sm font-medium rounded-md dark:border-slate-600
       admin-dark:bg-slate-700
       admin-dark:text-slate-300
      border border-slate-300 admin-dark:border-slate-600
      hover:bg-emerald-100 admin-dark:hover:bg-emerald-800
      transition-colors duration-200 bg-base-200 text-slate-700"
    >
      {label}
    </span>
  );
};
export default SuperAdminSkillBadge;
