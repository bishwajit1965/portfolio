import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const ScrollTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  // This function will be called when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", //Smooth scroll effect
    });
  };

  // Checks if the user has scrolled down
  const checkScrollPosition = () => {
    if (window.scrollY > 800) {
      setShowButton(true); // Show the button if scrolled more thn 1080px
    } else {
      setShowButton(false); // Hide the button if scrolled less than 1080px
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);
    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  return (
    <div className="lg:max-w-7xl w-full">
      <div className="flex justify-end">
        {showButton && (
          <button
            className="fixed btn btn-circle lg:bg-base-200 bg-base-300 border lg:bottom-80 bottom-10 flex mx-auto lg:right-32 right-1 border-gray-400 lg:opacity-50 opacity-50 hover:bg-base-300 dark:bg-slate-700 dark:text-base-100 dark:hover:text-amber-500 z-50 shadow-lg hover:text-amber-500"
            onClick={scrollToTop}
            // style={{
            //   position: "fixed",
            //   bottom: "80px",
            //   right: "125px",
            //   backgroundColor: "#007BFF",
            //   color: "white",
            //   border: "none",
            //   cursor: "pointer",
            //   zIndex: 50,
            // }}
          >
            <FaArrowUp size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ScrollTopButton;
