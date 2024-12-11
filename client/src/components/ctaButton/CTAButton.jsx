/**
 * A reusable CTA (Call to Action) button or link component.
 *
 * @param {string} label - The text to display on the button/link.
 * @param {function} onClick - The function to call when the button is clicked (ignored for links).
 * @param {string} variant - The style variant of the button ('primary', 'secondary', etc.).
 * @param {boolean} disabled - Whether the button is disabled.
 * @param {JSX.Element} icon - An optional icon to display inside the button.
 * @param {string} className - Additional Tailwind CSS classes for styling.
 * @param {string} href - The URL for the link (renders an <a> tag instead of a <button> if provided).
 * @param {string} target - Specifies where to open the linked document (e.g., "_blank").
 * @param {string} rel - Specifies the relationship between the current document and the linked document.
 * @returns {JSX.Element} The CTA button or link component.
 */
const CTAButton = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  icon = null,
  className = "",
  href = null,
  target = "_self",
  rel = "noopener noreferrer",
}) => {
  // Define styles based on the variant prop
  const baseStyle =
    "px-4 py-2 font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg transform transition-transform duration-300 inline-block lg:block";
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-blue-400",
    secondary:
      "bg-gradient-to-r from-gray-500 to-gray-700 text-white hover:from-gray-600 hover:to-gray-800 focus:ring-gray-400",
    danger:
      "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-400",
    success:
      "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-400",

    info: "bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 focus:ring-cyan-400",

    warning:
      "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 focus:ring-yellow-400",
  };

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
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <span className="flex items-center justify-center space-x-2">
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </span>
    </button>
  );
};

export default CTAButton;
