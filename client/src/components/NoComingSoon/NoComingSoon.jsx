import { FaCheckCircle, FaHome, FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../buttons/Button";
import { FaMessage, FaRocket, FaSpinner } from "react-icons/fa6";
import { useState } from "react";
import { motion } from "framer-motion";

const NoComingSoon = () => {
  const [label, setLabel] = useState(false);
  const [isBoxOpen, setIsBoxOpen] = useState();
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i = 1) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.3, type: "spring", stiffness: 50 },
    }),
  };

  const messages = [
    { id: 1, title: "It is a time-bound post declaration option." },
    { id: 2, title: "Comes generally on regular intervals." },
    { id: 3, title: "We are now actively working on it for you." },
    { id: 4, title: "Hope you will get a coming soon post message soon." },
  ];
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/");
  };

  const handleMessageLabelToggle = () => {
    setLabel((prev) => !prev);
  };

  const handLeMessageBoxToggle = () => {
    setIsBoxOpen((prev) => !prev);
    handleMessageLabelToggle();
  };

  return (
    <div className="lg:max-h-[calc(100vh-240px)] bg-base-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 lg:max-w-2xl mx-auto rounded-2xl shadow-lg overflow-y-auto">
      <div className="lg:p-8 p-2 flex items-center justify-center">
        <div className="lg:space-y-3 space-y-2">
          <div className="w-20 h-20 rounded-full border-2 border-slate-300 dark:border-slate-700 flex justify-center items-center mx-auto dark:bg-amber-700 bg-emerald-600 hover:bg-emerald-500">
            <FaTools
              size={35}
              className="text-slate-200 hover:text-slate-200 transition-all duration-300"
            />
          </div>
          <h1 className="lg:text-4xl text-xl font-extrabold flex justify-center">
            No coming soon post available.
          </h1>
          <p className="text-center font-bold text-slate-600 dark:text-slate-400">
            No upcoming posts at this moment. Open the message box for detail.
          </p>
          <div className="h-[1px] bg-slate-300 dark:bg-slate-700 "></div>
          <p className="flex items-center justify-center gap-2">
            <FaRocket /> We are sorry for the inconvenience. Thanks for the
            patience!
          </p>
          {isBoxOpen && (
            <div className="flex justify-center">
              <div className="grid grid-cols-1">
                {messages?.map((msg, index) => (
                  <motion.p
                    className="flex items-center gap-1"
                    key={msg.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                  >
                    <FaCheckCircle className="text-emerald-500" /> {msg?.title}
                  </motion.p>
                ))}
              </div>
            </div>
          )}
          <div className="lg:flex grid lg:gap-4 gap-2 items-center justify-center">
            <Button
              type="button"
              size="md"
              variant="outline"
              label="Home Page"
              icon={<FaHome />}
              onClick={handleRedirect}
            />
            <Button
              type="button"
              size="md"
              variant="outline"
              label={label ? "Close Message" : "Message"}
              icon={
                label ? <FaSpinner className="animate-spin" /> : <FaMessage />
              }
              onClick={handLeMessageBoxToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoComingSoon;
