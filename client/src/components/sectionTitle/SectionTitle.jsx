// SectionTitle.jsx
const SectionTitle = ({
  title,
  decoratedText,
  subtitle,
  icon: Icon,
  dataLength,
}) => {
  return (
    <div className="text-center lg:py-6 py-4 lg:mb-4 mb-2 lg:space-y-4 space-y-2">
      <h2 className="flex flex-wrap items-center justify-center gap-2 text-lg lg:text-3xl font-extrabold text-slate-700 dark:text-slate-300">
        {Icon && (
          <Icon className="text-slate-700 dark:text-slate-300" size={24} />
        )}
        {title && <span>{title}</span>}
        {decoratedText && (
          <span className="text-amber-700 dark:text-amber-500">
            {decoratedText}
          </span>
        )}
        {dataLength && (
          <span className="ml-2 w-6 lg:w-8 h-6 lg:h-8 flex items-center justify-center text-sm lg:text-base rounded-full bg-amber-600 dark:bg-amber-600 text-white shadow-sm">
            {dataLength}
          </span>
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-base lg:text-md font-serif max-w-2xl mx-auto text-gray-700 dark:text-slate-300">
          {subtitle}
        </p>
      )}

      {/* Accent Line */}
      {subtitle && (
        <div className="w-24 h-1 mx-auto bg-amber-800 dark:bg-amber-400 mt-2 lg:mt-4 rounded-full" />
      )}
    </div>
  );
};

export default SectionTitle;
