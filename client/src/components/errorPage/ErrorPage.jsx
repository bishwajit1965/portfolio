import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="max-w-7xl mx-auto not-found-bg min-h-screen">
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="lg:space-y-6">
          <h1 className="lg:text-5xl font-bold">
            <span className="text-red-500">404 Error !</span> page is not found
          </h1>
          <Link to="/" className="m-0">
            <button className="btn btn-md btn-primary w-full lg:my-5 my-2">
              Go Home <FaArrowCircleRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
