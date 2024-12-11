import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import { useEffect, useState } from "react";

import Loader from "../loader/Loader";

const LikeButton = ({ postId, token }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikes = async () => {
      setLoading(true); // Start loading
      setMessage("");
      try {
        const response = await fetch(
          `http://localhost:5000/api/likes/posts/${postId}/likes`,
          { method: "GET" }
        );
        if (response.ok) {
          const data = await response.json();
          setLikeCount(data.likeCount);
          setLiked(data.userHasLiked);
          setMessage(
            data.userHasLiked ? "You have already liked the post." : ""
          );
        } else {
          console.error("Error fetching like data");
        }
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      } finally {
        setLoading(false);
        console.log("Data fetched, loading complete");
      }
    };

    fetchLikes();
  }, [postId]);

  const handleLikeToggle = async () => {
    const url = `http://localhost:5000/api/likes/posts/${postId}/like`;
    const options = {
      method: liked ? "DELETE" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        setLiked(!liked);
        setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
        setMessage(liked ? "You unliked this post!" : "You liked this post!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        throw new Error("Failed to toggle like status");
      }
    } catch (error) {
      console.error("Error toggling like status:", error);
    }
  };

  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex border shadow-sm px-2 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-blue-400">
            <button onClick={handleLikeToggle} className="flex items-center">
              {liked ? (
                <FaThumbsDown className="mr-2 text-white ml-2" />
              ) : (
                <FaThumbsUp className="mr-2 text-white ml-2" />
              )}
              {/* ({likeCount}) */}
            </button>
            <div className="lg:flex lg:items-center grid grid-cols-1">
              <div className="mr-2 ml-2 badge badge-ghost badge-lg px-2 text-slate-900">
                Likes: {likeCount}
              </div>
              <div className="">
                {message && (
                  <p className="lg:test-md text-xs text-blue-800">{message}</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LikeButton;
