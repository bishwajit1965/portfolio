import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const BlogsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${baseUrl}/blogPosts/random-latest`)
      .then((response) => response.json())
      .then((data) => setSlides(data.posts))
      .catch((error) => console.error("Error fetching posts:", error));
  }, [baseUrl]);

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
    <div className="grid grid-cols-12 gap- justify-between lg:min-h-40 min-h-60 mt-6">
      <div className="lg:col-span-12 col-span-12">
        <div className="carousel w-full lg:h-40 h-60 relative overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide._id}
              className={`carousel-item absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="w-full tooltip tooltip-top lg:min-h-40"
                data-tip={slide.title}
              >
                <Link
                  to={`/single-blog-post/${slide._id}`}
                  className="m-0 w-full"
                >
                  <img
                    src={`${apiUrl}${slide.imageUrl}`}
                    className="w-full h-full object-cover rounded-md shadow-md lg:min-h-40 min-h-60"
                    alt={slide.title}
                  />
                </Link>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between items-center">
                  <button
                    onClick={showPrevSlide}
                    className="btn btn-xs btn-circle text-white bg-gray-700"
                  >
                    ❮
                  </button>
                  <h2 className="m-0  py-1 bg-slate-800 text-xs text-white w-3/4 items-center opacity-70 rounded-full text-center">
                    {slide.title.slice(0, 24)} {"..."}
                  </h2>
                  <button
                    onClick={showNextSlide}
                    className="btn btn-xs btn-circle text-white bg-gray-700"
                  >
                    ❯
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsCarousel;
