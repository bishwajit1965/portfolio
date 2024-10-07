/**
 * A reusable CTA (Call to Action) button component.
 *
 * @param {string} label - The text to display on the button.
 * @param {function} onClick - The function to call when the button is clicked.
 * @param {string} variant - The style variant of the button ('primary', 'secondary', etc.).
 * @param {boolean} disabled - Whether the button is disabled.
 * @param {JSX.Element} icon - An optional icon to display inside the button.
 * @param {string} className - Additional Tailwind CSS classes for styling.
 * @returns {JSX.Element} The CTA button component.
 */
const CTAButton = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  icon = null,
  className = "",
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
  };

  // Combine styles with any additional class names provided
  const buttonClass = `${baseStyle} ${variantStyles[variant]} ${className}`;

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
