import { useLocation } from "react-router-dom";
import getPageTitle from "./getPageTitle";

// PageTitle.jsx
const PageTitle = ({
  title,
  decoratedText,
  subtitle,
  dataLength,
  icon: Icon,
}) => {
  const location = useLocation();
  console.log("Location:", location);
  const {
    title: dynamicTitle,
    decoratedText: dynamicDecoratedText,
    subtitle: dynamicSubtitle,
  } = getPageTitle(location.pathname);

  return (
    <div className="text-center lg:my-8 my-4 lg:space-y-3 space-y-2">
      {/* Title Row */}
      <h1 className="flex flex-wrap justify-center items-center gap-2 text-lg lg:text-3xl font-extrabold text-gray-900 dark:text-white">
        {Icon && <Icon className="text-indigo-500" size={24} />}
        <span>
          {title ||
            (dynamicTitle && <span>{title ? title : dynamicTitle}</span>)}
        </span>
        <span>
          {decoratedText ||
            (dynamicDecoratedText && (
              <span className="text-indigo-500">
                {decoratedText ? decoratedText : dynamicDecoratedText}
              </span>
            ))}
        </span>
        {typeof dataLength === "number" && (
          <span className="ml-2 w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center text-xs lg:text-sm rounded-full bg-indigo-500 text-white">
            {dataLength}
          </span>
        )}
      </h1>

      {/* Subtitle */}
      <div className="max-w-5xls mx-auto">
        {subtitle ||
          (dynamicSubtitle && (
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              {subtitle ? subtitle : dynamicSubtitle}
            </p>
          ))}
      </div>

      {/* Accent Line */}
      <div className="w-20 h-[2px] mx-auto bg-indigo-500 rounded-full" />
    </div>
  );
};

export default PageTitle;
