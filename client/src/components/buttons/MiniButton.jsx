const VARIANTS = {
  base: `
    bg-base-200 border border-slate-600 text-slate-800
    hover:bg-slate-800 hover:text-white
    shadow-sm
  `,
  outline: `
    border border-slate-600 text-slate-600
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
    rounded-full shadow-sm
  `,
  danger: `
    text-red-600
    hover:bg-red-100
  `,
};

const MiniButton = ({
  children,
  variant = "base",
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
        h-8 min-w-8 px-2.5
        rounded-md text-sm font-medium
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-slate-400
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant]}
        ${className}
      `}
      {...props}
    >
      <span className="flex items-center gap-1">{children}</span>
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
