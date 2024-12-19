import { useEffect, useState } from "react";

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slides data
  const slides = [
    {
      id: 1,
      image:
        "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
      title: "Slide 1",
    },
    {
      id: 2,
      image:
        "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
      title: "Slide 2",
    },
    {
      id: 3,
      image:
        "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
      title: "Slide 3",
    },
    {
      id: 4,
      image:
        "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
      title: "Slide 4",
    },
  ];

  // Automatically change slide every 3 seconds
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
        <div className="carousel w-full lg:h-80 h-80 relative overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                className="w-full h-full object-cover rounded-md shadow-md"
                alt={slide.title}
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
                <button
                  onClick={showPrevSlide}
                  className="btn btn-circle text-white bg-gray-700"
                >
                  ❮
                </button>
                <h2 className="m-0 p-0 text-2xl bg-slate-800 font-bold text-white w-3/4 items-center pt-2 opacity-70 rounded-full text-center">
                  {slide.title}
                </h2>
                <button
                  onClick={showNextSlide}
                  className="btn btn-circle text-white bg-gray-700"
                >
                  ❯
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-6 col-span-12 bg-blue-900 lg:h-80 rounded-md shadow-md lg:p-4 p-2 text-base-300 dark:bg-slate-800 dark:text-slate-400 dark:border border-slate-700">
        <h2 className="text-2xl text-base-300 dark:text-slate-400 font-bold">
          Right Side
        </h2>
        <p>Content for the right side can go here.</p>
      </div>
    </div>
  );
};

export default ProjectCarousel;
