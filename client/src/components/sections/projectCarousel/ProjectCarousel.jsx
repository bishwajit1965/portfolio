import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${baseUrl}/projects`)
      .then((response) => response.json())
      .then((data) => {
        const visibleProjects = data.filter(
          (project) => project.visibility === "visible"
        );
        setSlides(visibleProjects);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, [baseUrl]);

  console.log("Slides data:", slides);
  // Automatically change slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [slides.length]);

  // Show next slide
  const showNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  // Show previous slide
  const showPrevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="grid grid-cols-12 gap-4 justify-between lg:min-h-80 min-h-40 mt-6">
      <div className="lg:col-span-6 col-span-12">
        <div className="carousel w-full lg:h-80 h-80 relative overflow-hidden rounded-md">
          {slides.length > 0
            ? slides.map((slide, index) => (
                <div
                  key={slide._id}
                  className={`carousel-item absolute top-0 left-0 w-full h-full transition-opacity duration-700 items-center rounded-md ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={`${apiUrl}/uploads/${slide.image}`}
                    className="w-full h-full object-cover rounded-md shadow-md"
                    alt={slide.name}
                  />

                  <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
                    <button
                      onClick={showPrevSlide}
                      className="btn btn-circle text-white bg-gray-700"
                    >
                      ❮
                    </button>

                    <h2 className="m-0 p-0 items-center flex justify-center bg-slate-800 font-bold text-white w-3/4 opacity-70 rounded-full text-center">
                      {index + 1}
                      {"."} {slide.name.slice(0, 20) + "..."}
                    </h2>

                    <button
                      onClick={showNextSlide}
                      className="btn btn-circle text-white bg-gray-700"
                    >
                      ❯
                    </button>
                  </div>
                </div>
              ))
            : "No project is available."}
        </div>
      </div>
      <div className="lg:col-span-6 col-span-12 bg-base-200 lg:h-80 rounded-md shadow-md lg:p-2 p-2 text-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:border border-slate-700">
        <h2 className="text-1xl text-slate-700 dark:text-slate-400 font-bold">
          Recent Projects:
        </h2>{" "}
        <hr className="border-slate-400" />
        {slides.length > 0
          ? slides.slice(0, 10).map((data, index) => (
              <Link
                to={`/project-details/${data._id}`}
                key={data._id}
                className="flex items-center hover:link space-y-1 m-0"
              >
                <div key={data._id} className="flex items-center space-y-1">
                  <span className="bg-slate-800 text-base-200 text-xs rounded-full h-4 w-4 flex justify-center items-center mr-2">
                    {index + 1}
                  </span>
                  <h2 className="font-bold">Title: {data.name}</h2>
                </div>
              </Link>
            ))
          : "No data to display."}
      </div>
    </div>
  );
};

export default ProjectCarousel;
