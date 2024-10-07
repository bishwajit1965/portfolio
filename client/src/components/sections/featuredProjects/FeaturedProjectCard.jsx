import { useState } from "react";
import useTextShortener from "../../../hooks/useTextShortener";

const FeaturedProjectCard = ({ project, data }) => {
  const { title, photoUrl } = project;
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 40;
  const fetchedData = data.length > 0 ? data[0].description : "";

  const { shortenedText, fullText } = useTextShortener(fetchedData, maxLength);

  return (
    <div className="border border-slate-400 dark:border-slate-700 rounded-md shadow-sm">
      <img src={photoUrl} alt="" className="lg:w-full lg:h-24 rounded-t-md" />
      <div className="p-2">
        <h2 className="text-1xl font-bold">{title}</h2>
        <p className="text-">
          {isExpanded ? fullText : shortenedText}
          <button
            className="text-blue-900 underline dark:text-slate-200"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default FeaturedProjectCard;
