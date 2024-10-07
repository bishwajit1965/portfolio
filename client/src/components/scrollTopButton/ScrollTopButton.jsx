import { useEffect, useState } from "react";

import { FaArrowAltCircleUp } from "react-icons/fa";

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
    if (window.scrollY > 1080) {
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
    <div>
      {showButton && (
        <button
          className="btn btn-circle bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-blue-400"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "90px",
            right: "118px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
            zIndex: 50,
          }}
        >
          <FaArrowAltCircleUp className="text-3xl" />
        </button>
      )}
    </div>
  );
};

export default ScrollTopButton;
