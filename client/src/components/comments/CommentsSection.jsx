import { useEffect, useState } from "react";

import CommentsForm from "./CommentsForm";
import CommentsList from "./CommentsList";
import { fetchComments } from "../../services/manageComments";

const CommentsSection = ({ postId }) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const loadComments = async () => {
      try {
        const commentsData = await fetchComments(postId);
        setComments(commentsData);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      } finally {
        setLoading(false);
      }
    };
    loadComments();
  }, [postId]); // Fetch comments when postId changes

  const handleAddComment = async (newComment) => {
    const token = localStorage.getItem("jwt");
    const response = await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ensure token is included here
      },
      body: JSON.stringify(newComment),
    });

    if (!response.ok) {
      throw new Error("Failed to add comment");
    }

    return await response.json();
  };

  return (
    <>
      {loading && <span className="">Loading...</span>}

      <div className="grid lg:grid-cols-12 justify-between gap-6 p-4">
        <div className="lg:col-span-6 col-span-12 border p-2 dark:border-slate-700 rounded-md shadow-sm">
          <h3 className="text-lg dark:text-slate-400 font-bold border-b border-slate-300 dark:border-slate-700 mb-4">
            Add Comment:
          </h3>
          <CommentsForm postId={postId} onSubmitComment={handleAddComment} />
        </div>
        <div className="lg:col-span-6 col-span-12 border p-2 dark:border-slate-700 rounded-md shadow-sm">
          <h2 className="text-lg dark:text-slate-400 font-bold border-b border-slate-300 dark:border-slate-600">
            Users Comments:
          </h2>
          <CommentsList
            comments={comments}
            onReply={(replyToId) => console.log("Reply to:", replyToId)}
          />
        </div>
      </div>
    </>
  );
};

export default CommentsSection;
