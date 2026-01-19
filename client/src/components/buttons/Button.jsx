const VARIANTS = {
  base: "bg-emerald-600 text-white hover:bg-emerald-700",
  outline:
    "border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white",
  ghost: "text-emerald-600 hover:bg-emerald-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
  rounded:
    "border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-full",
};

const SIZES = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-5 text-base",
  lg: "h-12 px-6 text-lg",
};

const Button = ({
  label,
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
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-md font-medium
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant]}
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
