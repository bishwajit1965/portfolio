import { useEffect, useState } from "react";

import CommentsForm from "./CommentsForm";
import CommentsList from "./CommentsList";

const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    // Fetch all comments for the post
    const fetchComments = async () => {
      const response = await fetch(
        `http://localhost:5000/api/comments/${postId}`
      );
      if (!response.ok) throw new Error("Failed to fetch comments");
      const data = await response.json();
      setComments(data);
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async (newComment) => {
    const token = localStorage.getItem("token");
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
  );
};

export default CommentsSection;
