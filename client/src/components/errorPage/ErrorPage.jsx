import { Helmet } from "react-helmet-async";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import NotFound from "../../assets/404 not found page i.png";

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>Bishwajit.dev || Error Page</title>
      </Helmet>
      <div className="lg:max-w-7xl mx-auto not-found-bg lg:min-h-screen lg:py-10 py-4">
        <div className="flex justify-center items-center min-h-[calc(100vh-2rem)]">
          <div className="bg-base-300 lg:p-10 p-6 rounded-md border border-slate-400 shadow-md">
            <img
              src={NotFound}
              alt="Page Not Found"
              className="w-full lg:max-h-[calc(100vh-24rem)] object-fill rounded-md shadow-md"
            />
            {/* <h1 className="lg:text-3xl text-center font-extrabold">
              <span className="text-red-500 font-extrabold">404 Error !</span>{" "}
              <span className="text-slate-700">Page is not found</span>
            </h1> */}
            <Link to="/" className="m-0 flex justify-center">
              <button className="btn lg:btn-md btn-sm btn-primary lg:text-lg lg:mt-4 mt-2">
                <FaHome /> Go Home{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
