import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="lg:max-w-7xl mx-auto not-found-bg min-h-screen">
      <div className="flex justify-center items-center min-h-[calc(100vh-2rem)]">
        <div className="bg-indigo-800 p-6 rounded-md border border-indigo-300">
          <h1 className="lg:text-3xl font-bold">
            <span className="text-amber-400">404 Error !</span>{" "}
            <span className="text-base-200">Page is not found</span>
          </h1>
          <Link to="/" className="m-0">
            <button className="btn btn-sm btn-info w-full lg:mt-4 mt-2">
              Go Home <FaArrowCircleRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
