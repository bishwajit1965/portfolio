import { FaBookmark, FaTrash } from "react-icons/fa";
import { useState } from "react";
import Button from "../buttons/Button";
const baseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const BookmarkButton = ({ postId, userId, initialBookmarked }) => {
  const [bookmarked, setBookmarked] = useState(initialBookmarked || false);

  const toggleBookmark = async () => {
    const endpoint = bookmarked
      ? `${baseUrl}/blog/remove-bookmark`
      : `${baseUrl}/blog/bookmark`;

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
    <Button
      onClick={toggleBookmark}
      label={`${bookmarked ? "Remove Bookmark" : "Bookmark"}`}
      icon={bookmarked ? <FaTrash /> : <FaBookmark />}
      className=""
      variant={`${bookmarked ? "danger" : "darkOutline"}`}
    />
  );
};

export default BookmarkButton;
