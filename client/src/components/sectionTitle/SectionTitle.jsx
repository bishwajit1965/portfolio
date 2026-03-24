// SectionTitle.jsx
const SectionTitle = ({
  title,
  decoratedText,
  subtitle,
  icon: Icon,
  dataLength,
}) => {
  return (
    <div className="text-center lg:py-6 py-4 mb-4 lg:space-y-4 space-y-2">
      <h2 className="flex items-center justify-center gap-2 text-xl lg:text-3xl font-extrabold text-amber-600 dark:text-emerald-400">
        {Icon && (
          <Icon className="text-amber-600 dark:text-emerald-400" size={24} />
        )}
        {title && <span>{title}</span>}
        {decoratedText && (
          <span className="text-green-700">{decoratedText}</span>
        )}
        {dataLength && (
          <span className="ml-2 w-6 lg:w-8 h-6 lg:h-8 flex items-center justify-center text-sm lg:text-base rounded-full bg-amber-600 dark:bg-emerald-500 text-white shadow-sm">
            {dataLength}
          </span>
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm lg:text-md font-serif max-w-2xl mx-auto text-gray-700 dark:text-emerald-400">
          {subtitle}
        </p>
      )}

      {/* Accent Line */}
      {subtitle && (
        <div className="w-24 h-1 mx-auto bg-orange-800 dark:bg-emerald-400 mt-2 lg:mt-4 rounded-full" />
      )}
    </div>
  );
};

export default SectionTitle;
