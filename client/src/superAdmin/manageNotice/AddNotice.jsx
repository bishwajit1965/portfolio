import { FaPlusCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import { useState } from "react";

const AddNotice = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft"); // Default status is 'draft'
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the notice data
    const newNotice = {
      title,
      content,
      status,
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNotice),
      });

      if (response.ok) {
        setMessage("Notice added successfully!");
        setTimeout(() => {
          setMessage("");
        }, 2000);
        setTitle("");
        setContent("");
        setStatus("draft");
      } else {
        setMessage("Failed to add notice.");
      }
    } catch (error) {
      console.error("Error adding notice:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <SuperAdminPageTitle
        title="Add"
        decoratedText="Notice"
        subtitle="Super admin only!"
      />
      <div className="flex lg:justify-start items-center justify-between lg:mb-2 bg-base-200 p-2 shadow-sm">
        <NavLink to="/super-admin/manage-notices" className="m-0">
          <button className="btn btn-xs btn-primary">
            <FaPlusCircle />
            Manage Notices
          </button>
        </NavLink>
      </div>
      <div className="lg:max-w-xl flex mx-auto border rounded-md shadow-sm p-4 mb-2 bg-base-200">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full">
            {message && <p className="text-blue-800 font-bold">{message}</p>}
          </div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Title:</span>
            </div>
            <input
              type="text"
              placeholder="Notice title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input input-sm input-bordered form-control w-full"
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Notice Content:</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Notice content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Status:</span>
            </div>
            <select
              name="status"
              value={status}
              className="form-control py-1 px-2 rounded-md"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
          <div className="lg:pt-4">
            <button type="submit" className="btn btn-sm btn-primary">
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <FaPlusCircle />
              )}
              {/* <FaPlusCircle /> Add */}
              {loading ? "Uploading..." : "Add notice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotice;
