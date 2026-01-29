const VARIANTS = {
  base: `
    bg-base-100 border border-slate-600 text-slate-800
    hover:bg-slate-800 hover:text-white
    shadow-am dark:bg-slate-600 dark:text-base-100 dark:shadow-md dark:hover:bg-slate-900 dark:hover:text-base-100
  `,
  default: `
    bg-emerald-600 border border-emerald-700 text-base-100
    hover:bg-emerald-800 hover:text-white
    shadow-md dark:bg-emerald-600 dark:text-base-100 dark:shadow-md dark:hover:bg-emerald-900 dark:hover:text-base-100
  `,
  outline: `
    border border-slate-600 dark:border-slate-400 text-slate-600 dark:text-slate-400
    hover:bg-slate-600 hover:text-white
    shadow-sm
  `,
  ghost: `
    text-slate-600
    hover:bg-slate-200
  `,
  rounded: `
    border border-slate-600 text-slate-800
    hover:bg-slate-600 hover:text-white
    rounded-full shadow-md
  `,
  danger: `
    text-base-100 bg-red-500
    hover:bg-red-700 shadow-md
  `,
  success: `
    bg-base-100 border border-emerald-600 text-emerald-600
    hover:bg-emerald-600 hover:text-white
    shadow-sm dark:bg-emerald-600 dark:text-base-100 dark:shadow-md dark:hover:bg-emerald-700 dark:hover:text-base-100
  `,
  warning: `
    text-base-100 bg-amber-600
    hover:bg-amber-700 shadow-sm
  `,
};

const MiniButton = ({
  label,
  children,
  variant = "base",
  icon,
  iconPosition = "left",
  type = "button",
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        h-7 min-w-8 px-2
        rounded-md text-sm font-medium
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-slate-400
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant]}
        ${className}
      `}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="flex items-center mr-1">{icon}</span>
      )}
      <span className="flex items-center gap-1">{label ?? children}</span>
    </button>
  );
};

export default MiniButton;
//USAGE
// <MiniButton icon={<FaMailBulk />} variant="base" size="sm">
//   <FaMailBulk size={15} /> Send maintainable Mail
// </MiniButton>
// <MiniButton icon={<FaMailBulk />} variant="rounded">
//   <FaMailBulk size={15} /> Send maintainable Mail
// </MiniButton>
// <MiniButton icon={<FaMailBulk />} variant="danger">
//   <FaMailBulk size={15} /> Send maintainable Mail
// </MiniButton>
// <MiniButton icon={<FaMailBulk />} variant="outline">
//   <FaMailBulk size={15} /> Send maintainable Mail
// </MiniButton>
