import { FaRecycle, FaSearch } from "react-icons/fa";
import MiniButton from "../../components/buttons/MiniButton";

const SuperAdminPageSubHeader = ({
  title,
  dataLength,
  decoratedText,
  buttonLabel,
  icon,
  labelIcon,
  variant = "base",
  onButtonClick,
  searchBox = false,
  filterText,
  setFilterText,
  refreshVariant = "refresh",
  refreshButton = false,
  refreshLabel,
  onRefreshBtnClick,
}) => {
  return (
    <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-2 gap-2 items-center lg:mb-2 mb-2 bg-base-200 p-2 shadow-sm admin-dark:bg-slate-800 admin-dark:text-slate-300 border-b border-slate-300 admin-dark:border-slate-700 w-full">
      {/* Top Bar */}
      <div className="lg:col-span-3 col-span-12">
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

      <div className="lg:col-span-6 col-span-12">
        {/* Title + Count */}
        {title && (
          <h2 className="lg:text-lg text-sm font-bold text-center lg:flex-1 flex-full text-base-content admin-dark:text-slate-300 gap-2 flex items-center justify-center">
            {labelIcon && (
              <span className="text-slate-600 admin-dark:text-slate-300">
                {labelIcon}
              </span>
            )}
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
      <div className="lg:col-span-3 col-span-12justify-end">
        <div className="flex items-center justify-between gap-2">
          <div className="">
            {/* Search */}
            {searchBox && (
              <div className="relative flex items-center gap-1">
                <input
                  type="text"
                  placeholder=" Search text..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  className="input input-bordered input-sm w-full transition-all focus:outline-none admin-dark:bg-slate-700 admin-dark:border-slate-600 text-base-content/80 admin-dark:text-slate-300 lg:pl-6"
                />
                <span>
                  <FaSearch className="absolute top-[9px] left-2 flex transition-all z-5 items-center text-base-content/30  admin-dark:text-slate-500" />
                </span>
                <span className="dark:admin-dark admin-dark dark:relative">
                  {refreshButton && filterText && (
                    <MiniButton
                      icon={<FaRecycle />}
                      variant={refreshVariant}
                      label={refreshLabel}
                      onClick={onRefreshBtnClick}
                    />
                  )}
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
