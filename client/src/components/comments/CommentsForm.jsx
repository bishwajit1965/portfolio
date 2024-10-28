import { FaUpload } from "react-icons/fa6";
import { useState } from "react";

const CommentsForm = ({ postId, onSubmitComment }) => {
  const [content, setContent] = useState("");
  const [parentId, setParentId] = useState(null);
  const [error, setError] = useState("");

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
    await onSubmitComment({ postId, content, parentId });

    // Clear the input after submission
    setContent("");
    setParentId(null);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="form-control">
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add your comment..."
            id=""
            rows="3"
            className="textarea textarea-bordered w-full dark:bg-slate-700"
          ></textarea>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="form-control">
          <button
            type="submit"
            className="btn btn-primary mt-2 btn-sm dark:btn-success"
          >
            <FaUpload /> Add comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentsForm;
