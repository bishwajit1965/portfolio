import { FaSearch } from "react-icons/fa";
import MiniButton from "../../components/buttons/MiniButton";

const SuperAdminPageSubHeader = ({
  title,
  dataLength,
  decoratedText,
  buttonLabel,
  icon,
  variant = "base",
  onButtonClick,
  searchBox = false,
  filterText,
  setFilterText,
}) => {
  return (
    <div className="flex justify-between items-center lg:mb-2 mb-2 bg-base-200 p-2 shadow-sm admin-dark:bg-slate-800 admin-dark:text-slate-300 border-b border-slate-300 admin-dark:border-slate-600 w-[100%]">
      {/* Top Bar */}
      <div className="flex mx-auto w-[33.3%]">
        {/* Button */}
        {buttonLabel && (
          <MiniButton
            icon={icon}
            variant={variant}
            label={buttonLabel}
            onClick={onButtonClick}
          />
        )}
      </div>
      <div className="flex mx-auto w-[33.3%]">
        {/* Title + Count */}
        {title && (
          <h2 className="lg:text-lg text-sm font-bold text-center flex-1 text-base-content admin-dark:text-slate-300 gap-2 flex items-center justify-center">
            {title}
            {decoratedText && (
              <span className="admin-dark:text-amber-400 text-amber-600">
                {decoratedText}
              </span>
            )}
          </h2>
        )}
      </div>

      {/* Optional empty state */}
      <div className="flex mx-auto w-[33.3%] justify-end">
        <div className="flex items-center justify-between gap-4">
          <div className="">
            {/* Search */}
            {searchBox && (
              <div className="relative">
                <input
                  type="text"
                  placeholder=" Search text..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  className="input input-bordered input-sm w-full transition-all focus:outline-none admin-dark:bg-slate-700 admin-dark:border-slate-600 text-base-content/80 admin-dark:text-slate-300 pl-6"
                />
                <span>
                  <FaSearch className="absolute top-[9px] left-2 flex transition-all z-5 items-center text-base-content/30  admin-dark:text-slate-500" />
                </span>
              </div>
            )}
          </div>
          <div className="">
            {dataLength && (
              <div className="flex items-center gap-2">
                <span>
                  {title && (
                    <span className="text-sm font-medium text-base-content admin-dark:text-slate-300">
                      {title}:
                    </span>
                  )}
                </span>
                <span className="text-center font-semibold text-base-content/70 admin-dark:text-slate-300 w-6 h-6 rounded-full border-2 border-base-content/25 admin-dark:border-slate-500 flex items-center justify-center text-xs">
                  {typeof dataLength === "number" &&
                    ` ${dataLength ? dataLength : "N/A"}`}{" "}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminPageSubHeader;
