import { FaArrowAltCircleRight, FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
import SuperAdminPageSubHeader from "../superAdminPageSubHeader/SuperAdminPageSubHeader";
import { useNavigate } from "react-router-dom";
import MiniButton from "../../components/buttons/MiniButton";

const AddNotice = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft"); // Default status is 'draft'
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const apiURL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const navigate = useNavigate();

  const handleRedirectNoticeFormToggle = () => {
    navigate("/super-admin/manage-notices");
  };

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
      const response = await fetch(`${apiURL}/notices`, {
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
      <div className="mb-10">
        <SuperAdminPageSubHeader
          title="Add New"
          decoratedText="Notice"
          variant="success"
          buttonLabel="Manage Notices"
          icon={<FaArrowAltCircleRight />}
          onButtonClick={handleRedirectNoticeFormToggle}
        />
      </div>

      <div className="lg:max-w-xl flex mx-auto border rounded-xl shadow-lg p-6 bg-base-200 text-slate-700 admin-dark:text-slate-700 admin-dark:bg-slate-800 admin-dark:border-slate-600 ">
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="w-full">
            {message && (
              <p className="text-blue-800 admin-dark:text-slate-300 font-bold">
                {message}
              </p>
            )}
          </div>

          <input
            type="text"
            placeholder="Notice title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input input-bordered input-sm form-control max- w-full admin-dark:bg-slate-700 admin-dark:text-slate-300"
          />

          <textarea
            className="textarea textarea-bordered h-24 form-control max- w-full admin-dark:bg-slate-700 admin-dark:text-slate-300"
            placeholder="Notice content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>

          <select
            name="status"
            value={status}
            className="select select-sm rounded-md admin-dark:bg-slate-700 admin-dark:text-slate-300 admin-dark:border-slate-600 border w-full"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <div className="flex items-center justify-end gap-2">
            <MiniButton
              type="submit"
              label={loading ? "Uploading..." : "Add notice"}
              variant="success"
              icon={
                loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <FaCloudUploadAlt />
                )
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotice;
