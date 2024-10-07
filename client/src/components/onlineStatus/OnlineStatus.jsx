import { useEffect } from "react";
import { useState } from "react";

const OnlineStatus = () => {
  // State to track online or offline status
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Function to update the status based on network connectivity
  const updateOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("onLine", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-baseline space-x-4">
        {isOnline ? (
          <div className="flex items-center mb-2">
            <input
              type="radio"
              checked={isOnline}
              readOnly
              id="online"
              className={`mr-1 h-5 w-5 ${
                isOnline ? "radio radio-success" : "border-gray-400"
              }`}
            />
            <label htmlFor="online" className="text-green-600 font-bold">
              online
            </label>
          </div>
        ) : (
          <div className="flex items-center">
            <input
              type="radio"
              checked={!isOnline}
              id="offline"
              readOnly
              className={`mr-1 h-5 w-5 rounded-full border-2 ${
                !isOnline ? "radio radio-error" : "border-gray-400"
              }`}
            />
            <label htmlFor="offline" className="text-red-600 font-bold">
              offline
            </label>
          </div>
        )}
      </div>

      {/* Display the current status below the the radio button */}
      {/* <p className="mt-4 text-gray-700">
        Current Status:{" "}
        <span className={isOnline ? "text-green-600" : "text-red-600"}>
          {isOnline ? "online" : "offline"}
        </span>
      </p> */}
    </div>
  );
};

export default OnlineStatus;
