import { FaBookmark, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Button from "../buttons/Button";
import Swal from "sweetalert2";
const baseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const BookmarkButton = ({ postId, userId, initialBookmarked }) => {
  const [bookmarked, setBookmarked] = useState(initialBookmarked || false);

  // Restore bookmarked state from localStorage on mount
  useEffect(() => {
    const storedBookmarks =
      JSON.parse(localStorage.getItem(`bookmarks_${userId}`)) || [];
    setBookmarked(storedBookmarks.includes(postId));
  }, [postId, userId]);

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
        let updatedBookmarks =
          JSON.parse(localStorage.getItem(`bookmarks_${userId}`)) || [];
        setBookmarked(!bookmarked);

        if (bookmarked) {
          updatedBookmarks = updatedBookmarks.filter((id) => id !== postId);
          Swal.fire({
            icon: "success",
            title: "Bookmark Removed",
            text: "The post has been removed from your bookmarks.",
          });
        } else {
          updatedBookmarks.push(postId);
          Swal.fire({
            icon: response.alreadyBookmarked ? "info" : "success",
            title: response.alreadyBookmarked
              ? "Already Bookmarked"
              : "Post Bookmarked!",
            text: response.message,
          });
        }

        localStorage.setItem(
          `bookmarks_${userId}`,
          JSON.stringify(updatedBookmarks),
        );
        // alert(bookmarked ? "Bookmark removed" : "Post bookmarked!");
      } else {
        const errorData = await response.json();
        Swal.fire({ icon: "error", title: "Oops!", text: errorData.message });
        // alert("An error occurred. Please try again.");
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
      size="md"
      className="lg:text-lg text-xs"
      variant={`${bookmarked ? "danger" : "darkOutline"}`}
    />
  );
};

export default BookmarkButton;
