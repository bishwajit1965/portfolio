import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="lg:max-w-7xl mx-auto not-found-bg lg:min-h-screen">
      <div className="flex justify-center items-center min-h-[calc(100vh-2rem)]">
        <div className="bg-base-300 lg:p-10 p-6 rounded-md border border-slate-400 shadow-md">
          <h1 className="lg:text-3xl font-extrabold">
            <span className="text-red-500 font-extrabold">404 Error !</span>{" "}
            <span className="text-slate-700">Page is not found</span>
          </h1>
          <Link to="/" className="m-0 flex justify-center">
            <button className="btn btn-md btn-primary text-lg lg:mt-4 mt-2">
              Go Home <FaArrowCircleRight size={20} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
