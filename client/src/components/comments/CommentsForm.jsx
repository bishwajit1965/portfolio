import { FaUpload } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const CommentsForm = ({ postId, onSubmitComment }) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [parentId, setParentId] = useState(null);
  const [error, setError] = useState("");
  console.log("User data in form:", user);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.trim() == "") {
      setError("Comment field is empty.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return; // Prevent further execution if content is empty
    }

    // Trigger the submission function passed from the parent
    await onSubmitComment({
      postId,
      content,
      parentId,
      authorId: user.uid,
      authorEmail: user.email,
      author: user.displayName,
      photoUrl: user.photoURL,
    });

    // Clear the input after submission
    setContent("");
    setParentId(null);
  };

  return (
    <div className="lg:max-w-3xl w-full mx-auto lg:p-6 p-2">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="form-control">
          <textarea
            name="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (error) setError(""); // Reset error when user starts typing
            }}
            placeholder="Add your comment..."
            id=""
            rows="4"
            className="textarea textarea-bordered w-full dark:bg-slate-700"
          ></textarea>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="form-control mt-2">
          <button
            type="submit"
            className="btn btn-primary mt-2 btn-md dark:btn-success"
          >
            <FaUpload /> Add Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentsForm;
