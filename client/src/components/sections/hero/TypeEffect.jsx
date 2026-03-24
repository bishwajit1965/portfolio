import { useState, useEffect } from "react";

const TypingEffect = ({
  words = ["MERN Full-Stack Web Developer"],
  speed = 400,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplayedText(currentWord.slice(0, charIndex + 1));
          if (charIndex + 1 === currentWord.length) {
            setDeleting(true);
          } else {
            setCharIndex(charIndex + 1);
          }
        } else {
          setDisplayedText(currentWord.slice(0, charIndex - 1));
          if (charIndex - 1 === 0) {
            setDeleting(false);
            setWordIndex(wordIndex + 1);
          }
          setCharIndex(charIndex - 1);
        }
      },
      deleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed]);

  return (
    <span className="text-orange-500 font-extrabold">
      {displayedText}{" "}
      <span className="text-gray-900 dark:text-base-200 animate-pulse">|</span>
    </span>
  );
};

export default TypingEffect;
