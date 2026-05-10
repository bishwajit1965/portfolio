import { Helmet } from "react-helmet-async";
import { FaRocket, FaTools, FaUserInjured } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../buttons/Button";

const ErrorPage = ({
  title = "Page Not Founds",
  subtitle = "The page you are looking for does not exist, perhaps you have the wrong address.",
  error = "404 • Error !!!",
}) => {
  const location = window.location.pathname;
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
    <>
      <Helmet>
        <title>Bishwajit.dev || Error Page</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="flex justify-center items-center">
          <div className="max-w-3xl w-full text-center bg-base-200s dark:bg-slate-800 border border-base-300 dark:border-slate-700 rounded-xl shadow-lg lg:p-8 p-6 lg:space-y-6 space-y-4">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="lg:w-20 lg:h-20 flex items-center justify-center rounded-full bg-blue-100 dark:bg-gray-800">
                <FaTools className="lg:text-4xl text-2xl text-blue-600 admin-dark:text-amber-400 animate-pulse" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="lg:flex grid gap-2 items-center justify-center lg:text-3xl text-2xl font-extrabold text-base-content admin-dark:text-slate-300">
              {title}
              {error}
            </h1>

            {/* Subtitle */}
            <p className="text-base text-base-content/70 admin-dark:text-slate-400">
              {subtitle}
            </p>

            {/* Divider */}
            <div className="h-[1px] bg-base-content/15 admin-dark:bg-slate-600 w-2/3 flex mx-auto" />

            <div className="lg:flex grid justify-center lg:gap-6 gap-4">
              <Button
                variant="success"
                label="Where Am I ?"
                icon={<FaUserInjured />}
                onClick={() =>
                  alert(
                    location === "/"
                      ? "You are on the Home Page!"
                      : `You are on: ${location} a wrong address!`,
                  )
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
              <span>Sorry for the inconvenience. Check back later.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
