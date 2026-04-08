import { FaTachometerAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import getSuperAdminPageTitle from "./getSuperAdminPageTitle";

const SuperAdminPageTitle = ({
  title,
  decoratedText,
  subtitle,
  icon: Icon,
}) => {
  const location = useLocation();
  console.log("Location:", location);
  const {
    title: dynamicTitle,
    decoratedText: dynamicDecoratedText,
    subtitle: dynamicSubtitle,
  } = getSuperAdminPageTitle(location.pathname);

  return (
    <div className="text-center border-b border-slate-300 shadow-sm bg-base-300 lg:py-3 py-2">
      <h1 className="lg:text-xl text-medium font-extrabold dark:text-emerald-400 flex items-center justify-center gap-2">
        {Icon ? (
          <Icon className="text-amber-600" size={24} />
        ) : (
          <FaTachometerAlt size={24} />
        )}
        {title ? title : dynamicTitle}{" "}
        <span className="text-orange-700">
          {decoratedText ? decoratedText : dynamicDecoratedText}
        </span>
      </h1>
      {subtitle || dynamicSubtitle ? (
        <p className="lg:pb-1 text-md font-serif max-w-3xl mx-auto hidden lg:block dark:text-emerald-400">
          {subtitle ? subtitle : dynamicSubtitle}
        </p>
      ) : null}

      <div className="w-24 h-1 shadow-md mx-auto bg-orange-900 dark:bg-emerald-400 hidden lg:block rounded-md"></div>
    </div>
  );
};

export default SuperAdminPageTitle;
