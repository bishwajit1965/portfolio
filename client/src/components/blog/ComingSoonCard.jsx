import { useEffect, useState } from "react";

import CountdownTimer from "./CountDownTimer";

const ComingSoonCard = ({ post }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [autoSummary, setAutoSummary] = useState("");
  const { _id, author, title, summary, content, imageUrl, willPublishAt } =
    post;

  // Blog post summary
  const generateSummary = (content) => {
    const plainText = content.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tag
    return plainText.length > 150 ? plainText.slice(0, 150) : plainText;
  };

  useEffect(() => {
    if (content) {
      setAutoSummary(generateSummary(content));
    }
  }, [content]);
  return (
    <div className="lg:col-span-12 col-span-12 lg:my-6 bg-base-100 dark:bg-slate-800 dark:text-base-200 shadow-md rounded-b-md">
      <div key={_id}>
        <img
          src={
            imageUrl
              ? `${apiUrl}${imageUrl}`
              : "https://via.placeholder.com/400"
          }
          alt={post.title || "Coming soon"}
          className="w-full h-96 object-cover rounded-md"
        />
        <div className="lg:space-y-2 lg:my-6 lg:px-4 px-2">
          <h2 className="text-3xl font-bold dark:text-gray-500">
            {title || "Coming Soon"}
          </h2>
          <p className="text-gray-500 italic text-lg">
            Author: {author || "Author not available"}
          </p>
          <p className="text-gray-500 italic text-lg">
            Will Publish on:{" "}
            {new Date(willPublishAt ? willPublishAt : "").toLocaleDateString(
              "en-GB",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </p>
          <p className="text-gray-500 italic text-lg">
            {" "}
            <span className="text-gray-500 italic text-lg">Summary:</span>{" "}
            {summary ? summary : autoSummary || "N/A"}
          </p>

          {willPublishAt && <CountdownTimer releaseDate={willPublishAt} />}
        </div>
      </div>
    </div>
  );
};

export default ComingSoonCard;
