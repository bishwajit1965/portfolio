import { FaCog, FaEdit, FaHome } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import api from "../../services/api";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";

const ProjectUpdateForm = () => {
  const { projectId } = useParams();

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    visibility: "visible",
    screenshots: [],
  });

  const [mainImage, setMainImage] = useState(null);
  const [screenshotFiles, setScreenshotFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [captions, setCaptions] = useState([]);

  /* ----------------------------------
     Fetch existing project
  ---------------------------------- */
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${projectId}`);
        const data = res.data;

        setFormData({
          name: data.name,
          type: data.type,
          description: data.description,
          visibility: data.visibility,
          screenshots: data.screenshots || [],
        });

        setCategory(""); // start empty for new screenshots
        setCaptions([]);
      } catch (err) {
        console.error(err);
        setErrors({ general: "Failed to load project data" });
      }
    };
    fetchProject();
  }, [projectId]);

  /* ----------------------------------
     Preview
  ---------------------------------- */
  const mainImagePreview = formData.image
    ? `http://localhost:5000/uploads/${formData.image}`
    : null;

  /* ----------------------------------
     Handlers
  ---------------------------------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleScreenshotsChange = (e) => {
    setScreenshotFiles([...e.target.files]);
  };

  const handleCaptionChange = (index, value) => {
    const newCaptions = [...captions];
    newCaptions[index] = value;
    setCaptions(newCaptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (screenshotFiles.length > 0 && !category.trim()) {
      setErrors({ category: "Category is required for screenshots" });
      return;
    }

    const formToSend = new FormData();
    formToSend.append("name", formData.name);
    formToSend.append("type", formData.type);
    formToSend.append("description", formData.description);
    formToSend.append("visibility", formData.visibility);

    if (mainImage) {
      formToSend.append("mainImage", mainImage);
    }

    if (screenshotFiles.length > 0) {
      formToSend.append("category", category);
      screenshotFiles.forEach((file) => formToSend.append("screenshots", file));
      captions.forEach((cap) => formToSend.append("captions", cap));
    }

    try {
      setLoading(true);
      const res = await api.patch(`/projects/${projectId}`, formToSend);

      if (res.status === 200) {
        setSuccessMessage("Project updated successfully");
        setErrors({});
        setTimeout(() => setSuccessMessage(""), 2000);
        setMainImage(null);
        setScreenshotFiles([]);
        setCategory("");
        setCaptions([]);
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: "Project update failed" });
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------
     Render
  ---------------------------------- */
  return (
    <>
      <Helmet>
        <title>Edit Project || Web-tech-services</title>
      </Helmet>

      <SuperAdminPageTitle title="Super Admin" decoratedText="Update Project" />

      <div className="lg:p-4 p-2 mt-2 dark:bg-slate-900 rounded-lg shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Preview Main Image */}
          <div className="w-full">
            {mainImagePreview ? (
              <img
                src={mainImagePreview}
                alt={formData.name}
                className="w-full h-full rounded-md"
              />
            ) : (
              <div className="h-full flex items-center justify-center border rounded-md dark:border-slate-700 text-slate-400">
                No main image
              </div>
            )}
          </div>

          {/* Form */}
          <div className="dark:border dark:border-slate-700 p-3 rounded-md">
            <h2 className="text-2xl font-bold mb-2 flex items-center border-b pb-2">
              <FaEdit className="mr-2" /> Update Project
            </h2>

            {successMessage && (
              <p className="text-green-600">{successMessage}</p>
            )}
            {errors.general && <p className="text-red-500">{errors.general}</p>}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Name */}
              <div className="mb-3">
                <label className="text-sm">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* Type */}
              <div className="mb-3">
                <label className="text-sm">Type</label>
                <input
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="text-sm">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* Main Image */}
              <div className="mb-3">
                <label className="text-sm">Main Image</label>
                <input
                  type="file"
                  name="mainImage"
                  onChange={handleMainImageChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* Screenshot Category */}
              <div className="mb-3">
                <label className="text-sm">Screenshot Category</label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="UI Screens / Admin Panel / Mobile"
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
                {errors.category && (
                  <p className="text-red-500 text-xs">{errors.category}</p>
                )}
              </div>

              {/* Screenshots */}
              <div className="mb-3">
                <label className="text-sm">Screenshots</label>
                <input
                  type="file"
                  multiple
                  name="screenshots"
                  onChange={handleScreenshotsChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
                {screenshotFiles.map((file, idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder="Caption"
                    value={captions[idx] || ""}
                    onChange={(e) => handleCaptionChange(idx, e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-slate-800 mt-1"
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-sm btn-success text-white"
                >
                  {loading ? "Updating..." : "Update Project"}
                </button>

                <Link
                  to="/super-admin/manage-projects"
                  className="btn btn-sm btn-primary text-white flex items-center"
                >
                  <FaHome className="mr-1" /> Home
                </Link>

                <Link
                  to="/super-admin/manage-projects"
                  className="btn btn-sm btn-success text-white flex items-center"
                >
                  <FaCog className="mr-1" /> All Projects
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectUpdateForm;

// import { FaEdit, FaHome } from "react-icons/fa";
// import { Link, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// import api from "../../services/api";

// const ProjectUpdateForm = () => {
//   const { projectId } = useParams(); //Will get the projectId from the url
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     type: "",
//     description: "",
//   });
//   console.log(formData);
//   const imageUrl = `http://localhost:5000/uploads/${formData.image}`;

//   const [image, setImage] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const response = await api.get(`/projects/${projectId}`);
//         setFormData(response.data); //Populate the data
//       } catch (error) {
//         console.error("Failed to fetch project", error);
//         setErrors({ general: "An error occurred while updating project" });
//       }
//     };
//     fetchProject();
//   }, [projectId]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setImage(e.target.files[0]); //Store the selected file
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create formData object to handle both text and file inputs
//     const formDataToSend = new FormData();
//     formDataToSend.append("name", formData.name);
//     formDataToSend.append("type", formData.type);
//     formDataToSend.append("description", formData.description);

//     if (image) {
//       formDataToSend.append("image", image);
//     }
//     // Log FormData to see what's being sent
//     for (let [key, value] of formDataToSend.entries()) {
//       console.log(`${key}: ${value}`);
//     }
//     try {
//       setLoading(true);
//       const response = await api.patch(
//         `/projects/${projectId}`,
//         formDataToSend
//       );

//       if (response.status === 200) {
//         setSuccessMessage("Project updated successfully!");
//         setErrors({});
//         // Remove success message
//         setTimeout(() => {
//           setSuccessMessage("");
//         }, 2000);
//       }
//     } catch (error) {
//       console.error("Failed to updated project", error);
//       setErrors({ general: "Project has not been updated" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg- dark:bg-slate-900 rounded-lg shadow-md">
//       <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-4">
//         <div className="">
//           <img
//             src={imageUrl}
//             alt={formData.name}
//             className="h-full rounded-md"
//           />
//         </div>

//         <div className="dark:border dark:border-slate-700 p-2 rounded-md">
//           <h2 className="text-2xl dark:text-slate-400 font-bold text-slate-800 mb-2 flex items-center pb-2 border-b dark:border-slate-700">
//             <FaEdit className="mr-1" /> Update Project
//           </h2>

//           {successMessage && (
//             <p className="text-green-600 text-sm">{successMessage}</p>
//           )}
//           {errors.general && <p className="text-red-500">{errors.general}</p>}

//           <form
//             onSubmit={handleSubmit}
//             encType="multipart/form-data"
//             method="post"
//           >
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
//                 Name:
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-600"
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-xs">{errors.name}</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
//                 Type:
//               </label>
//               <input
//                 type="text"
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-600"
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-xs">{errors.name}</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
//                 Description:
//               </label>

//               <textarea
//                 type="text"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-600"
//                 id=""
//               ></textarea>

//               {errors.name && (
//                 <p className="text-red-500 text-xs">{errors.name}</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
//                 Image:
//               </label>
//               <input
//                 type="file"
//                 name="image"
//                 onChange={handleFileChange}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-600"
//               />
//               {errors.image && (
//                 <p className="text-red-500 text-xs">{errors.image}</p>
//               )}
//             </div>
//             <button
//               type="submit"
//               className="btn btn-sm btn-success text-white mr-4"
//               disabled={loading}
//             >
//               {loading ? "Updating data..." : "Update Project"} <FaEdit />
//             </button>

//             <button type="submit" className="btn btn-sm btn-primary text-white">
//               <Link to="/" className="flex">
//                 <FaHome className="mr-2" /> Go Home
//               </Link>
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectUpdateForm;
