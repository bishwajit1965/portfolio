import { FaBookmark, FaTrash } from "react-icons/fa";

import CTAButton from "../ctaButton/CTAButton";
import { useState } from "react";

const BookmarkButton = ({ postId, userId, initialBookmarked }) => {
  const [bookmarked, setBookmarked] = useState(initialBookmarked || false);

  const toggleBookmark = async () => {
    const endpoint = bookmarked
      ? "http://localhost:5000/api/blog/remove-bookmark"
      : "http://localhost:5000/api/blog/bookmark";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ postId, userId }),
      });

      if (response.ok) {
        setBookmarked(!bookmarked);
        alert(bookmarked ? "Bookmark removed" : "Post bookmarked!");
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      alert("Failed to toggle bookmark. Please try again later.");
    }
  };

  return (
    <CTAButton
      onClick={toggleBookmark}
      label={`${bookmarked ? "Remove Bookmark" : "Bookmark"}`}
      icon={bookmarked ? <FaTrash /> : <FaBookmark />}
      className="btn btn-sm"
      variant={`${bookmarked ? "danger" : "primary"}`}
    />
  );
};

export default BookmarkButton;
