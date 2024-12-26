import { useEffect, useState } from "react";

import CTAButton from "../ctaButton/CTAButton";
import { FaBlogger } from "react-icons/fa";
import { Link } from "react-router-dom";

const CountdownTimer = ({ releaseDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!releaseDate || isNaN(new Date(releaseDate).getTime())) {
      setTimeLeft("Invalid release date");
      return;
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const targetDate = new Date(releaseDate).getTime();
      const timeRemaining = targetDate - now;

      if (timeRemaining <= 0) {
        setTimeLeft("Released!");
        return;
      }

      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d: ${hours}h: ${minutes}m: ${seconds}s`);
    };

    updateTimer(); // Run once immediately
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval); // Cleanup on unmount
  }, [releaseDate]);

  return (
    <div className="lg:text-3xl text-2xl font-bold text-gray-500">
      <span className="text-amber-700">Time Remaining:</span> {timeLeft}
      <div className="lg:mt-4 mt-2">
        <Link to="/blog-posts" className="m-0">
          <CTAButton
            label="Blog posts"
            icon={<FaBlogger />}
            className="btn btn-sm btn-primary"
          />
        </Link>
      </div>
    </div>
  );
};

export default CountdownTimer;
