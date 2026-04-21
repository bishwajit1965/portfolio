import { FaTools, FaRocket, FaUserInjured } from "react-icons/fa";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";

const PageUnderConstruction = ({
  title = "Page Under Construction",
  subtitle = "I'm actively building this section.",
}) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center bg-base-200 admin-dark:bg-slate-800 border border-base-300 admin-dark:border-slate-700 rounded-xl shadow-lg p-8 space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 admin-dark:bg-amber-900">
            <FaTools className="text-4xl text-blue-600 admin-dark:text-amber-400 animate-pulse" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl lg:text-3xl font-extrabold text-base-content admin-dark:text-slate-300">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-base text-base-content/70 admin-dark:text-slate-400">
          {subtitle}
        </p>

        {/* Divider */}
        <div className="h-px bg-base-300 admin-dark:bg-slate-600 mx-auto w-2/3" />

        <div className="flex justify-center gap-6">
          <Button
            variant="success"
            label="Notify Me"
            icon={<FaUserInjured />}
            onClick={() =>
              alert("You will be notified when this page is live!")
            }
          />
          <Button
            variant="outline"
            label="Go Back"
            icon={<FaRocket />}
            onClick={handleGoBack}
          />
        </div>
        {/* Status */}
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-base-content/80 admin-dark:text-slate-400">
          <FaRocket className="text-green-600 admin-dark:text-green-400" />
          <span>Coming soon. Stay tuned.</span>
        </div>
      </div>
    </div>
  );
};

export default PageUnderConstruction;
