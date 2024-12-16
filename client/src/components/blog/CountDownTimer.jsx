import { useEffect, useState } from "react";

const CountdownTimer = ({ releaseDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
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
      const minutes = Math.floor((timeRemaining % (1000 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % 1000) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer(); // Run once immediately
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval); // Cleanup on unmount
  }, [releaseDate]);

  return (
    <div style={{ fontSize: "1.5rem", margin: "10px 0", color: "#555" }}>
      {timeLeft}
    </div>
  );
};

export default CountdownTimer;
