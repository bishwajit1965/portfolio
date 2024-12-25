import "./BookmarkButton.css";

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
    <button
      onClick={toggleBookmark}
      className={`bookmark-btn ${
        bookmarked ? "active" : ""
      } btn btn-sm btn-success`}
    >
      {bookmarked ? "Remove Bookmark" : "Bookmark"}
    </button>
  );
};

export default BookmarkButton;
