import { FaCog } from "react-icons/fa";

const SuperAdminPageTitle = ({
  title,
  decoratedText,
  subtitle,
  icon: Icon,
}) => {
  return (
    <div className="text-center border-b border-slate-300 shadow-sm bg-base-300 lg:py-4 py-2">
      <h2 className="lg:text-2xl text-xl font-extrabold dark:text-emerald-400 flex items-center justify-center gap-2">
        {Icon ? (
          <Icon className="text-amber-600" size={24} />
        ) : (
          <FaCog size={24} />
        )}
        {title} <span className="text-orange-700">{decoratedText}</span>
      </h2>
      {subtitle && (
        <p className="lg:pb-1 text-md font-serif max-w-3xl mx-auto hidden lg:block dark:text-emerald-400">
          {subtitle}
        </p>
      )}

      <div className="w-24 h-1.5 shadow-md mx-auto bg-orange-900 dark:bg-emerald-400 hidden lg:block rounded-md"></div>
    </div>
  );
};

export default SuperAdminPageTitle;
