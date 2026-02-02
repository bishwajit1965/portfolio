const baseStyle =
  "px-2 py-1 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm dark:shadow-lg transform transition-transform duration-300 inline-block text-center";

const variantStyles = {
  base: "bg-emerald-600 text-white hover:bg-emerald-700 justify-center flex dark:bg-slate-600 dark:text-base-100 dark:shadow-lg dark:hover:bg-slate-900 dark:hover:text-base-100",

  darkOutline:
    "bg-base-100 border border-gray-600 dark:border-slate-600 text-gray-600 hover:bg-gray-600 hover:text-white dark:bg-slate-600 dark:text-base-100 dark:shadow-lg dark:hover:bg-slate-900 dark:hover:text-base-100 focus:ring-gray-600",

  outline:
    "bg-base-100 border border-emerald-600 dark:border-slate-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:bg-slate-600 dark:text-base-100 dark:shadow-lg dark:hover:bg-slate-900 dark:hover:text-base-100 focus:ring-emerald-600",

  ghost: "text-emerald-600 hover:bg-emerald-100",

  danger: "bg-red-600 text-white hover:bg-red-700",

  rounded:
    "border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-full dark:bg-slate-600 dark:text-base-100 dark:shadow-lg dark:hover:bg-slate-900 dark:hover:text-base-100",
};

const SIZES = {
  sm: "h-8 px-2 text-sm",
  md: "h-10 px-3 text-base",
  lg: "h-12 px-5 text-lg",
};

const Button = ({
  label,
  href = null,
  target = "_self",
  rel = "noopener noreferrer",
  children,
  variant = "base",
  size = "md",
  type = "button",
  disabled = false,
  className = "",
  icon,
  iconPosition = "left",
  ...props
}) => {
  // Combine styles with any additional class names provided
  const buttonClass = `${baseStyle} ${variantStyles[variant]} ${className}`;

  // Conditionally render as <a> or <button>
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`${buttonClass} ${
          disabled ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <span className="flex items-center justify-center space-x-2">
          {icon && <span>{icon}</span>}
          <span>{label}</span>
        </span>
      </a>
    );
  }
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-1.5
        rounded-md font-medium
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${buttonClass}
        ${SIZES[size]}
        ${className}
      `}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="flex items-center">{icon}</span>
      )}

      {/* label has priority, children is fallback */}
      <span>{label ?? children}</span>

      {icon && iconPosition === "right" && (
        <span className="flex items-center">{icon}</span>
      )}
    </button>
  );
};

export default Button;
