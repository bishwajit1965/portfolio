import {
  FaEdit,
  FaEye,
  FaPlus,
  FaSave,
  FaSpinner,
  FaTrashAlt,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import api from "../../services/api";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import Button from "../../components/buttons/Button";
import MiniButton from "../../components/buttons/MiniButton";
import Swal from "sweetalert2";

const ProjectUpdateForm = () => {
  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const baseURL = `${apiURL}/uploads/`;
  const { projectId } = useParams();

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    githubLink: "",
    liveLink: "",
    visibility: "visible",
    image: "",
    screenshots: [],
    techStacks: [],
  });

  const [mainImageFile, setMainImageFile] = useState(null);

  const getImageSrc = (img) => {
    if (!img) return "";
    if (typeof img === "string" && img.startsWith("http")) return img;
    if (img.url) return img.url;
    return `${baseURL}${img}`;
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${projectId}`);
        const normalizedScreenshots = res.data.screenshots.map((cat) => ({
          ...cat,
          items: cat.items.map((item) => ({
            ...item,
            image: item.image || item.image?.url || "",
          })),
        }));
        setFormData({ ...res.data, screenshots: normalizedScreenshots });
      } catch (err) {
        console.error(err);
        setErrors({ general: "Failed to load project data" });
      }
    };
    fetchProject();
  }, [projectId]);

  /* ------------------------------
     Handlers
  ------------------------------ */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMainImageChange = (e) => {
    setMainImageFile(e.target.files[0]);
  };

  const handleCategoryChange = (catIndex, value) => {
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots.map((cat, i) =>
        i === catIndex ? { ...cat, category: value } : cat,
      ),
    }));
  };

  const handleItemChange = (catIndex, itemIndex, field, value) => {
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots.map((cat, i) =>
        i === catIndex
          ? {
              ...cat,
              items: cat.items.map((item, j) =>
                j === itemIndex ? { ...item, [field]: value } : item,
              ),
            }
          : cat,
      ),
    }));
  };

  const handleAddNewCategory = () => {
    setFormData((prev) => ({
      ...prev,
      screenshots: [
        ...prev.screenshots,
        { id: Date.now().toString(), category: "", items: [] },
      ],
    }));
  };

  const handleAddNewItem = (catIndex) => {
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots.map((cat, i) =>
        i === catIndex
          ? {
              ...cat,
              items: [
                ...cat.items,
                { id: Date.now().toString(), image: "", caption: "" },
              ],
            }
          : cat,
      ),
    }));
  };

  const handleDeleteCategory = (catIndex) => {
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== catIndex),
    }));
  };

  const handleDeleteItem = (catIndex, itemIndex) => {
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots.map((cat, i) =>
        i === catIndex
          ? { ...cat, items: cat.items.filter((_, j) => j !== itemIndex) }
          : cat,
      ),
    }));
  };

  const handleScreenshotFileChange = (catIndex, itemIndex, file) => {
    handleItemChange(catIndex, itemIndex, "newImageFile", file);
  };

  /* ------------------------------
     Submit
  ------------------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();

    // Basic fields
    dataToSend.append("name", formData.name);
    dataToSend.append("type", formData.type);
    dataToSend.append("description", formData.description);
    dataToSend.append("githubLink", formData.githubLink);
    dataToSend.append("liveLink", formData.liveLink);
    dataToSend.append("visibility", formData.visibility);

    if (mainImageFile) {
      dataToSend.append("mainImage", mainImageFile);
    }

    // ✅ SINGLE SOURCE OF TRUTH
    const screenshotPayload = formData.screenshots.map((cat) => ({
      id: cat.id,
      category: cat.category,
      items: cat.items.map((item) => ({
        id: item.id,
        caption: item.caption,
        hasNewFile: !!item.newImageFile,
      })),
    }));

    dataToSend.append("screenshotsPayload", JSON.stringify(screenshotPayload));

    // ✅ Files separately
    formData.screenshots.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.newImageFile) {
          dataToSend.append("screenshotFiles", item.newImageFile);
          dataToSend.append("fileMap", item.id); // VERY IMPORTANT
        }
      });
    });

    formData.techStacks.forEach((tech) =>
      dataToSend.append("techStacks", tech),
    );

    try {
      setLoading(true);
      const response = await api.patch(`/projects/${projectId}`, dataToSend);
      if (response.status === 200) {
        setSuccessMessage("Project updated successfully!");
        Swal.fire({
          title: "Updated!",
          text: "Project updated successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        setErrors({ general: "Project update failed" });
        Swal.fire({
          title: "Update error!",
          text: "Project update failed.",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      setErrors({ general: "Project update failed" });
      console.error("Error updating project:", error);
      Swal.fire({
        title: "Update error!",
        text: "Project update failed.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------
     Render
  ------------------------------ */
  return (
    <>
      <Helmet>
        <title>Web-tech-services || Edit Project</title>
      </Helmet>

      <SuperAdminPageTitle title="Super Admin" decoratedText="Update Project" />

      <div className="lg:p-4 p-2 mt-2 dark:bg-slate-900 rounded-lg shadow-md space-y-6">
        {/* Header */}
        <div>
          <h2 className="lg:text-2xl text-lg font-bold mb-2 flex items-center border-b pb-2">
            <FaEdit className="mr-2" /> Update Project
          </h2>
        </div>

        {/* Success / error message */}
        <div>
          {successMessage && (
            <p className="text-green-600 text-sm">{successMessage}</p>
          )}
          {errors.general && (
            <p className="text-red-500 text-sm">{errors.general}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid lg:grid-cols-12 grid-cols-1 gap-4">
            <div className="lg:col-span-6 col-span-12 space-y-2">
              <div className="mb-3">
                <label className="text-sm">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              <div className="mb-3">
                <label className="text-sm">Type</label>
                <input
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              <div className="mb-3">
                <label className="text-sm">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* Screenshots */}
              <div className="mb-4">
                <label className="text-sm font-bold">
                  Category Wise Screenshots
                </label>
                {formData.screenshots.map((cat, catIndex) => (
                  <div
                    key={cat.id}
                    className="border-2 border-base-300 p-2 rounded-md mb-2 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={cat.category}
                        placeholder="Category name"
                        onChange={(e) =>
                          handleCategoryChange(catIndex, e.target.value)
                        }
                        className="input input-sm input-bordered w-full dark:bg-slate-800"
                      />
                      <MiniButton
                        type="button"
                        variant="danger"
                        icon={<FaTrashAlt />}
                        label="Delete"
                        onClick={() => handleDeleteCategory(catIndex)}
                      />
                    </div>

                    {cat.items.map((item, itemIndex) => (
                      <div
                        key={item.id}
                        className="grid lg:grid-cols-12 grid-cols-1 gap-2 items-center justify-between mb-2 border border-base-300 shadow-sm p-2 rounded-md hover:border-slate-400"
                      >
                        <div className="lg:col-span-4 col-span-12">
                          {(item.image || item.newImageFile) && (
                            <img
                              src={
                                item.newImageFile
                                  ? URL.createObjectURL(item.newImageFile)
                                  : getImageSrc(item.image)
                              }
                              alt={item.caption}
                              className="w-full h-28 object-cover rounded-md"
                            />
                          )}
                        </div>

                        <div className="lg:col-span-8 space-y-2">
                          <input
                            type="text"
                            value={item.caption}
                            placeholder="Caption"
                            onChange={(e) =>
                              handleItemChange(
                                catIndex,
                                itemIndex,
                                "caption",
                                e.target.value,
                              )
                            }
                            className="input input-sm w-full input-bordered dark:bg-slate-800"
                          />
                          <input
                            type="file"
                            onChange={(e) =>
                              handleScreenshotFileChange(
                                catIndex,
                                itemIndex,
                                e.target.files[0],
                              )
                            }
                            className="file-input input-sm w-full input-bordered pl-0"
                          />
                          <div className="flex justify-end">
                            <MiniButton
                              type="button"
                              variant="danger"
                              label="Delete"
                              icon={<FaTrashAlt />}
                              onClick={() =>
                                handleDeleteItem(catIndex, itemIndex)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <MiniButton
                      type="button"
                      variant="success"
                      label="Add Item"
                      icon={<FaPlus />}
                      onClick={() => handleAddNewItem(catIndex)}
                      className="btn btn-xs btn-primary flex items-center gap-1"
                    />
                  </div>
                ))}

                <div className="p-2">
                  <MiniButton
                    type="button"
                    variant="success"
                    label="Add Category"
                    icon={<FaPlus />}
                    onClick={handleAddNewCategory}
                  />
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-6 col-span-12 space-y-2">
              <div className="mb-3">
                <label className="text-sm">GitHub Link</label>
                <input
                  type="url"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              <div className="mb-3">
                <label className="text-sm">Live Demo Link</label>
                <input
                  type="url"
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              <div className="mb-4">
                <label className="text-sm">Main Image</label>
                <input
                  type="file"
                  onChange={handleMainImageChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* Tech Stacks */}
              <div>
                <label className="text-sm block mb-2">Tech Stack</label>
                {formData.techStacks.map((tech, i) => (
                  <div key={i} className="flex gap-2 items-center w-full mb-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => {
                        const updated = [...formData.techStacks];
                        updated[i] = e.target.value;
                        setFormData({ ...formData, techStacks: updated });
                      }}
                      className="input input-sm input-bordered w-full"
                    />
                    <MiniButton
                      type="button"
                      variant="danger"
                      label="Delete"
                      icon={<FaTrashAlt />}
                      onClick={() => {
                        const updated = [...formData.techStacks];
                        updated.splice(i, 1);
                        setFormData({ ...formData, techStacks: updated });
                      }}
                    />
                  </div>
                ))}
                <MiniButton
                  type="button"
                  variant="success"
                  icon={<FaPlus />}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      techStacks: [...(formData.techStacks || []), ""],
                    })
                  }
                >
                  Add Tech Stack
                </MiniButton>
              </div>
            </div>
          </div>
          <div className="divider">UPDATE FIELDS END</div>

          {/* Actions */}
          <div className="lg:flex grid gap-2 mt-4">
            <Button
              type="submit"
              variant="base"
              disabled={loading}
              icon={loading ? <FaSpinner /> : <FaEdit />}
              size="md"
            >
              {loading ? "Updating..." : "Update Project"}
            </Button>

            <Button
              href="/super-admin/manage-projects"
              label="View Projects"
              variant="outline"
              icon={<FaEye />}
              size="md"
              className="py-2"
            />

            <Button
              href="/super-admin/add-project"
              label="Add Projects"
              variant="outline"
              icon={<FaSave />}
              size="md"
              className="py-2"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProjectUpdateForm;

// import {
//   FaCog,
//   FaEdit,
//   FaHome,
//   FaPlus,
//   FaPlusCircle,
//   FaSpinner,
//   FaTrashAlt,
// } from "react-icons/fa";
// import { Link, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import api from "../../services/api";
// import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
// import Button from "../../components/buttons/Button";
// import MiniButton from "../../components/buttons/MiniButton";

// const ProjectUpdateForm = () => {
//   const apiURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
//   const baseURL = `${apiURL}/uploads/`;
//   const { projectId } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errors, setErrors] = useState({});

//   const [formData, setFormData] = useState({
//     name: "",
//     type: "",
//     description: "",
//     githubLink: "",
//     liveLink: "",
//     visibility: "visible",
//     image: "",
//     screenshots: [],
//     techStacks: [],
//   });

//   const [mainImageFile, setMainImageFile] = useState(null);

//   /* ----------------------------------
//      Helper to get proper image URL
//   ---------------------------------- */
//   const getImageSrc = (img) => {
//     if (!img) return "";
//     if (typeof img === "string" && img.startsWith("http")) return img; // Cloudinary URL
//     if (img.url) return img.url; // object form
//     return `${baseURL}${img}`; // fallback local
//   };

//   /* ----------------------------------
//      Fetch existing project
//   ---------------------------------- */
//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const res = await api.get(`/projects/${projectId}`);
//         const normalizedScreenshots = res.data.screenshots.map((cat) => ({
//           ...cat,
//           items: cat.items.map((item) => ({
//             ...item,
//             image: item.image || item.image?.url || "",
//           })),
//         }));
//         setFormData({ ...res.data, screenshots: normalizedScreenshots });
//       } catch (err) {
//         console.error(err);
//         setErrors({ general: "Failed to load project data" });
//       }
//     };
//     fetchProject();
//   }, [projectId]);

//   /* ----------------------------------
//      Handlers
//   ---------------------------------- */

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleMainImageChange = (e) => {
//     setMainImageFile(e.target.files[0]);
//   };
//   const handleScreenshotChange = (catIndex, itemIndex, e) => {
//     if (e.target.type === "file") {
//       const file = e.target.files[0];

//       setFormData((prev) => ({
//         ...prev,
//         screenshots: prev.screenshots.map((cat, i) =>
//           i === catIndex
//             ? {
//                 ...cat,
//                 items: cat.items.map((item, j) =>
//                   j === itemIndex ? { ...item, newImageFile: file } : item,
//                 ),
//               }
//             : cat,
//         ),
//       }));
//     } else {
//       const value = e.target.value;

//       setFormData((prev) => ({
//         ...prev,
//         screenshots: prev.screenshots.map((cat, i) =>
//           i === catIndex
//             ? {
//                 ...cat,
//                 items: cat.items.map((item, j) =>
//                   j === itemIndex ? { ...item, caption: value } : item,
//                 ),
//               }
//             : cat,
//         ),
//       }));
//     }
//   };

//   // const handleScreenshotChange = (catIndex, itemIndex, e) => {
//   //   const value = e.target.value;

//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     screenshots: prev.screenshots.map((cat, i) =>
//   //       i === catIndex
//   //         ? {
//   //             ...cat,
//   //             items: cat.items.map((item, j) =>
//   //               j === itemIndex ? { ...item, caption: value } : item,
//   //             ),
//   //           }
//   //         : cat,
//   //     ),
//   //   }));
//   // };

//   // const handleScreenshotChange = (catIndex, itemIndex, e) => {
//   //   const updated = [...formData.screenshots];
//   //   if (e.target.type === "file") {
//   //     updated[catIndex].items[itemIndex].newImageFile = e.target.files[0];
//   //   } else {
//   //     updated[catIndex].items[itemIndex].caption = e.target.value;
//   //   }
//   //   setFormData({ ...formData, screenshots: updated });
//   // };

//   const handleAddNewCategory = () => {
//     setFormData({
//       ...formData,
//       screenshots: [
//         ...formData.screenshots,
//         { id: Date.now().toString(), category: "", items: [] },
//       ],
//     });
//   };

//   const handleAddNewItem = (catIndex) => {
//     const updated = [...formData.screenshots];
//     updated[catIndex].items.push({
//       id: Date.now().toString(),
//       image: "",
//       caption: "",
//     });
//     setFormData({ ...formData, screenshots: updated });
//   };

//   /* ----------------------------------
//      Submit
//   ---------------------------------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const dataToSend = new FormData();

//     dataToSend.append("name", formData.name);
//     dataToSend.append("type", formData.type);
//     dataToSend.append("description", formData.description);
//     dataToSend.append("githubLink", formData.githubLink);
//     dataToSend.append("liveLink", formData.liveLink);
//     dataToSend.append("visibility", formData.visibility);

//     if (mainImageFile) dataToSend.append("mainImage", mainImageFile);

//     // Handle screenshots
//     formData.screenshots.forEach((cat) => {
//       cat.items.forEach((item) => {
//         if (item.newImageFile) {
//           dataToSend.append("screenshots", item.newImageFile);
//           dataToSend.append("captions", item.caption || "");
//           dataToSend.append("categories", cat.category);
//           dataToSend.append("itemIds", item.id);
//         }
//       });
//     });

//     // Handle Tech Stacks
//     formData.techStacks.forEach((techStack) => {
//       dataToSend.append("techStacks", techStack);
//     });

//     try {
//       setLoading(true);
//       const res = await api.patch(`/projects/${projectId}`, dataToSend);
//       if (res.status === 200) {
//         setSuccessMessage("Project updated successfully!");
//         setErrors({});
//         setTimeout(() => setSuccessMessage(""), 2000);
//       }
//     } catch (err) {
//       console.error(err);
//       setErrors({ general: "Project update failed" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ----------------------------------
//      Render
//   ---------------------------------- */
//   return (
//     <>
//       <Helmet>
//         <title>Web-tech-services || Edit Project</title>
//       </Helmet>

//       <SuperAdminPageTitle title="Super Admin" decoratedText="Update Project" />

//       <div className="lg:p-4 p-2 mt-2 dark:bg-slate-900 rounded-lg shadow-md space-y-6">
//         {/* Header */}
//         <div>
//           <h2 className="lg:text-2xl text-lg font-bold mb-2 flex items-center border-b pb-2">
//             <FaEdit className="mr-2" /> Update Project
//           </h2>
//         </div>

//         {/* Preview Main Image */}
//         <div>
//           {mainImageFile ? (
//             <img
//               src={URL.createObjectURL(mainImageFile)}
//               alt="Preview"
//               className="w-full h-full rounded-md object-cover shadow-lg"
//             />
//           ) : formData.image ? (
//             <img
//               src={getImageSrc(formData.image)}
//               alt={formData.name}
//               className="w-full h-auto rounded-md object-contain"
//             />
//           ) : (
//             <div className="h-full flex items-center justify-center border rounded-md dark:border-slate-700 text-slate-400">
//               No main image
//             </div>
//           )}
//         </div>

//         {/* Success / error message */}
//         <div>
//           {successMessage && (
//             <p className="text-green-600 text-sm">{successMessage}</p>
//           )}
//           {errors.general && (
//             <p className="text-red-500 text-sm">{errors.general}</p>
//           )}
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-4 gap-2">
//             {/* Left */}
//             <div className="lg:col-span-6 col-span-12 space-y-2">
//               {/* Name */}
//               <div className="mb-3">
//                 <label className="text-sm">Name</label>
//                 <input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md dark:bg-slate-800"
//                 />
//               </div>

//               {/* Type */}
//               <div className="mb-3">
//                 <label className="text-sm">Type</label>
//                 <input
//                   name="type"
//                   value={formData.type}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md dark:bg-slate-800"
//                 />
//               </div>

//               {/* Description */}
//               <div className="mb-3">
//                 <label className="text-sm">Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md dark:bg-slate-800"
//                 />
//               </div>

//               {/* Screenshots */}
//               <div className="mb-4">
//                 <label className="text-sm font-bold">
//                   Category Wise Screenshots
//                 </label>
//                 {formData?.screenshots?.map((cat, catIndex) => (
//                   <div
//                     key={cat.id}
//                     className="border-2 border-base-300 p-2 rounded-md mb-2 space-y-2"
//                   >
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="text"
//                         value={cat.category}
//                         placeholder="Category name"
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           setFormData((prev) => ({
//                             ...prev,
//                             screenshots: prev.screenshots.map((cat, i) =>
//                               i === catIndex
//                                 ? { ...cat, category: value }
//                                 : cat,
//                             ),
//                           }));
//                         }}
//                         className="input input-sm input-bordered w-full dark:bg-slate-800"
//                       />
//                       <MiniButton
//                         type="button"
//                         variant="danger"
//                         icon={<FaTrashAlt />}
//                         label="Delete"
//                         onClick={() => {
//                           const updated = [...formData.screenshots];
//                           updated.splice(catIndex, 1);
//                           setFormData({ ...formData, screenshots: updated });
//                         }}
//                       />
//                     </div>

//                     {cat?.items?.map((item, itemIndex) => (
//                       <div
//                         key={item.id}
//                         className="grid lg:grid-cols-12 grid-cols-1 gap-2 items-center justify-between mb-2 border border-base-300 shadow-sm p-2 rounded-md hover:border-slate-400"
//                       >
//                         <div className="lg:col-span-4 col-span-12">
//                           {(item.image || item.newImageFile) && (
//                             <img
//                               src={
//                                 item.newImageFile
//                                   ? URL.createObjectURL(item.newImageFile)
//                                   : getImageSrc(item.image)
//                               }
//                               alt={item.caption}
//                               className="w-full h-28 object-cover rounded-md"
//                             />
//                           )}
//                         </div>

//                         <div className="lg:col-span-8 space-y-2">
//                           <input
//                             type="text"
//                             value={item.caption}
//                             placeholder="Caption"
//                             onChange={(e) =>
//                               handleScreenshotChange(catIndex, itemIndex, e)
//                             }
//                             className="input input-sm w-full input-bordered dark:bg-slate-800"
//                           />

//                           <input
//                             type="file"
//                             onChange={(e) =>
//                               handleScreenshotChange(catIndex, itemIndex, e)
//                             }
//                             className="file-input input-sm w-full input-bordered pl-0"
//                           />

//                           <div className="flex justify-end">
//                             <MiniButton
//                               type="button"
//                               variant="danger"
//                               label="Delete"
//                               icon={<FaTrashAlt />}
//                               onClick={() => {
//                                 const updated = [...formData.screenshots];
//                                 updated[catIndex].items.splice(itemIndex, 1);
//                                 setFormData({
//                                   ...formData,
//                                   screenshots: updated,
//                                 });
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     ))}

//                     <MiniButton
//                       type="button"
//                       variant="success"
//                       label="Add Item"
//                       icon={<FaPlus />}
//                       onClick={() => handleAddNewItem(catIndex)}
//                       className="btn btn-xs btn-primary flex items-center gap-1"
//                     />
//                   </div>
//                 ))}
//                 <div className="p-2">
//                   <MiniButton
//                     type="button"
//                     variant="success"
//                     label="Add Category"
//                     icon={<FaPlus />}
//                     onClick={handleAddNewCategory}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Right */}
//             <div className="lg:col-span-6 col-span-12 space-y-2">
//               {/* GitHub Link */}
//               <div className="mb-3">
//                 <label className="text-sm">GitHub Link</label>
//                 <input
//                   type="url"
//                   name="githubLink"
//                   value={formData.githubLink}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md dark:bg-slate-800"
//                 />
//               </div>

//               {/* Live Demo Link */}
//               <div className="mb-3">
//                 <label className="text-sm">Live Demo Link</label>
//                 <input
//                   type="url"
//                   name="liveLink"
//                   value={formData.liveLink}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md dark:bg-slate-800"
//                 />
//               </div>

//               {/* Main Image Upload */}
//               <div className="mb-4">
//                 <label className="text-sm">Main Image</label>
//                 <input
//                   type="file"
//                   onChange={handleMainImageChange}
//                   className="w-full p-2 border rounded-md dark:bg-slate-800"
//                 />
//               </div>

//               {/* Tech Stack */}
//               <div>
//                 <label className="text-sm block mb-2">Tech Stack</label>
//                 {formData?.techStacks?.map((tech, i) => (
//                   <div key={i} className="flex gap-2 items-center w-full mb-2">
//                     <input
//                       type="text"
//                       value={tech}
//                       onChange={(e) => {
//                         const updated = [...formData.techStacks];
//                         updated[i] = e.target.value;
//                         setFormData({ ...formData, techStacks: updated });
//                       }}
//                       className="input input-sm input-bordered w-full"
//                     />
//                     <MiniButton
//                       type="button"
//                       variant="danger"
//                       label="Delete"
//                       icon={<FaTrashAlt />}
//                       onClick={() => {
//                         const updated = [...formData.techStacks];
//                         updated.splice(i, 1);
//                         setFormData({ ...formData, techStacks: updated });
//                       }}
//                     />
//                   </div>
//                 ))}
//                 <MiniButton
//                   type="button"
//                   variant="success"
//                   icon={<FaPlus />}
//                   onClick={() =>
//                     setFormData({
//                       ...formData,
//                       techStacks: [...(formData.techStacks || []), ""],
//                     })
//                   }
//                 >
//                   Add Tech Stack
//                 </MiniButton>
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="lg:flex grid gap-2 mt-4">
//             <Button
//               type="submit"
//               disabled={loading}
//               icon={loading ? <FaSpinner /> : <FaEdit />}
//               size="sm"
//               className="btn btn-sm btn-success text-white"
//             >
//               {loading ? "Updating..." : "Update Project"}
//             </Button>

//             <Link
//               to="/super-admin/manage-projects"
//               className="btn btn-sm btn-primary text-white flex items-center"
//             >
//               <FaHome className="mr-1" /> Home
//             </Link>

//             <Link
//               to="/super-admin/manage-projects"
//               className="btn btn-sm btn-success text-white flex items-center"
//             >
//               <FaCog className="mr-1" /> All Projects
//             </Link>
//             <Link
//               to="/super-admin/add-project"
//               className="btn btn-sm btn-success text-white flex items-center"
//             >
//               <FaPlusCircle className="mr-1" /> Add Project
//             </Link>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default ProjectUpdateForm;

// import {
//   FaCog,
//   FaEdit,
//   FaHome,
//   FaPlus,
//   FaPlusCircle,
//   FaSpinner,
//   FaTrashAlt,
// } from "react-icons/fa";
// import { Link, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import api from "../../services/api";
// import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
// import Button from "../../components/buttons/Button";
// import MiniButton from "../../components/buttons/MiniButton";

// const ProjectUpdateForm = () => {
//   const apiURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
//   const baseURL = `${apiURL}/uploads/`;
//   const { projectId } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errors, setErrors] = useState({});

//   const [formData, setFormData] = useState({
//     name: "",
//     type: "",
//     description: "",
//     githubLink: "",
//     liveLink: "",
//     visibility: "visible",
//     image: "",
//     screenshots: [],
//     techStacks: [],
//   });

//   const [mainImageFile, setMainImageFile] = useState(null);
//   // const [newScreenshots, setNewScreenshots] = useState([]);

//   /* ----------------------------------
//      Fetch existing project
//   ---------------------------------- */
//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const res = await api.get(`/projects/${projectId}`);
//         setFormData(res.data);
//       } catch (err) {
//         console.error(err);
//         setErrors({ general: "Failed to load project data" });
//       }
//     };
//     fetchProject();
//   }, [projectId]);

//   /* ----------------------------------
//      Handlers
//   ---------------------------------- */
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleMainImageChange = (e) => {
//     setMainImageFile(e.target.files[0]);
//   };

//   const handleScreenshotChange = (catIndex, itemIndex, e) => {
//     const updated = [...formData.screenshots];
//     if (e.target.type === "file") {
//       updated[catIndex].items[itemIndex].newImageFile = e.target.files[0];
//     } else {
//       updated[catIndex].items[itemIndex].caption = e.target.value;
//     }
//     setFormData({ ...formData, screenshots: updated });
//   };

//   const handleAddNewCategory = () => {
//     setFormData({
//       ...formData,
//       screenshots: [
//         ...formData.screenshots,
//         { id: Date.now().toString(), category: "", items: [] },
//       ],
//     });
//   };

//   const handleAddNewItem = (catIndex) => {
//     const updated = [...formData.screenshots];
//     updated[catIndex].items.push({
//       id: Date.now().toString(),
//       image: "",
//       caption: "",
//     });
//     setFormData({ ...formData, screenshots: updated });
//   };

//   /***====================================
//   | Submit
//   |====================================***/

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const dataToSend = new FormData();

//     dataToSend.append("name", formData.name);
//     dataToSend.append("type", formData.type);
//     dataToSend.append("description", formData.description);
//     dataToSend.append("githubLink", formData.githubLink);
//     dataToSend.append("liveLink", formData.liveLink);
//     dataToSend.append("visibility", formData.visibility);

//     if (mainImageFile) dataToSend.append("mainImage", mainImageFile);

//     // Handle screenshots
//     formData.screenshots.forEach((cat) => {
//       cat.items.forEach((item) => {
//         if (item.newImageFile) {
//           dataToSend.append("screenshots", item.newImageFile);
//           dataToSend.append("captions", item.caption || "");
//           dataToSend.append("categories", cat.category);
//           dataToSend.append("itemIds", item.id);
//         }
//       });
//     });

//     // Handle Tech Stacks
//     formData.techStacks.forEach((techStack) => {
//       dataToSend.append("techStacks", techStack);
//     });

//     try {
//       setLoading(true);
//       const res = await api.patch(`/projects/${projectId}`, dataToSend);
//       if (res.status === 200) {
//         setSuccessMessage("Project updated successfully!");
//         setErrors({});
//         setTimeout(() => setSuccessMessage(""), 2000);
//       }
//     } catch (err) {
//       console.error(err);
//       setErrors({ general: "Project update failed" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   /***====================================
//   | Render
//   | ==================================***/

//   return (
//     <>
//       <Helmet>
//         <title>Web-tech-services || Edit Project</title>
//       </Helmet>

//       <SuperAdminPageTitle title="Super Admin" decoratedText="Update Project" />

//       <div className="lg:p-4 p-2 mt-2 dark:bg-slate-900 rounded-lg shadow-md space-y-6">
//         <div className="">
//           <h2 className="lg:text-2xl text-lg font-bold mb-2 flex items-center border-b pb-2">
//             <FaEdit className="mr-2" /> Update Project
//           </h2>
//         </div>

//         {/* Preview Main Image */}
//         <div className="">
//           {formData.image && !mainImageFile ? (
//             <img
//               src={formData.image.url || `${baseURL}${formData.image}`}
//               alt={formData.name}
//               className="w-full h-auto rounded-md object-contain"
//             />
//           ) : mainImageFile ? (
//             <img
//               src={URL.createObjectURL(mainImageFile)}
//               alt="Preview"
//               className="w-full h-full rounded-md object-cover shadow-lg"
//             />
//           ) : (
//             <div className="h-full flex items-center justify-center border rounded-md dark:border-slate-700 text-slate-400">
//               No main image
//             </div>
//           )}
//         </div>
//         {/* Success / error message */}
//         <div className="">
//           {successMessage && (
//             <p className="text-green-600 text-sm">{successMessage}</p>
//           )}
//           {errors.general && (
//             <p className="text-red-500 text-sm">{errors.general}</p>
//           )}
//         </div>

//         <div className="">
//           {/* Form */}
//           <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-4 gap-2">
//               {/* Left */}
//               <div className="lg:col-span-6 col-span-12 space-y-2">
//                 {/* Name */}
//                 <div className="mb-3">
//                   <label className="text-sm">Name</label>
//                   <input
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded-md dark:bg-slate-800"
//                   />
//                 </div>

//                 {/* Type */}
//                 <div className="mb-3">
//                   <label className="text-sm">Type</label>
//                   <input
//                     name="type"
//                     value={formData.type}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded-md dark:bg-slate-800"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div className="mb-3">
//                   <label className="text-sm">Description</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded-md dark:bg-slate-800"
//                   />
//                 </div>

//                 {/* Screenshots */}
//                 <div className="mb-4 rounded-md bg-green-200s">
//                   <label className="text-sm font-bold">
//                     Category Wise Screenshots
//                   </label>
//                   {formData?.screenshots?.map((cat, catIndex) => (
//                     <div
//                       key={cat.id}
//                       className="border-2 border-base-300 p-2 rounded-md mb-2 space-y-2"
//                     >
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="text"
//                           value={cat.category}
//                           placeholder="Category name"
//                           onChange={(e) => {
//                             const updated = [...formData.screenshots];
//                             updated[catIndex].category = e.target.value;
//                             setFormData({ ...formData, screenshots: updated });
//                           }}
//                           className="input input-sm input-bordered w-full dark:bg-slate-800"
//                         />
//                         <MiniButton
//                           type="button"
//                           variant="danger"
//                           icon={<FaTrashAlt />}
//                           label="Delete"
//                           onClick={() => {
//                             const updated = [...formData.screenshots];
//                             updated.splice(catIndex, 1);
//                             setFormData({ ...formData, screenshots: updated });
//                           }}
//                         />
//                       </div>

//                       {cat?.items?.map((item, itemIndex) => (
//                         <div
//                           key={item.id}
//                           className="grid lg:grid-cols-12 grid-cols-1 gap-2 items-center justify-between mb-2 border border-base-300 shadow-sm p-2 rounded-md hover:border-slate-400"
//                         >
//                           <div className="lg:col-span-4 col-span-12">
//                             {/* Previously Uploaded */}
//                             {item.image && !item.newImageFile && (
//                               <img
//                                 src={
//                                   `${baseURL}${item.image}` || item.image.url
//                                 }
//                                 alt={item.caption}
//                                 className="w-full h-28 object-cover rounded-md"
//                               />
//                             )}

//                             {/* New Upload preview */}
//                             {item.newImageFile && (
//                               <img
//                                 src={URL.createObjectURL(item.newImageFile)}
//                                 alt="Preview"
//                                 className="w-full h-28 object-cover rounded-md"
//                               />
//                             )}
//                           </div>

//                           <div className="lg:col-span-8 space-y-2">
//                             <input
//                               type="text"
//                               value={item.caption}
//                               placeholder="Caption"
//                               onChange={(e) =>
//                                 handleScreenshotChange(catIndex, itemIndex, e)
//                               }
//                               className="input input-sm w-full input-bordered dark:bg-slate-800"
//                             />

//                             <div className="">
//                               <input
//                                 type="file"
//                                 onChange={(e) =>
//                                   handleScreenshotChange(catIndex, itemIndex, e)
//                                 }
//                                 className="file-input input-sm w-full input-bordered pl-0"
//                               />
//                             </div>
//                             <div className="flex justify-end">
//                               <MiniButton
//                                 type="button"
//                                 variant="danger"
//                                 label="Delete"
//                                 icon={<FaTrashAlt />}
//                                 onClick={() => {
//                                   const updated = [...formData.screenshots];
//                                   updated[catIndex].items.splice(itemIndex, 1);
//                                   setFormData({
//                                     ...formData,
//                                     screenshots: updated,
//                                   });
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       ))}

//                       <MiniButton
//                         type="button"
//                         variant="success"
//                         label="Add Item"
//                         icon={<FaPlus />}
//                         onClick={() => handleAddNewItem(catIndex)}
//                         className="btn btn-xs btn-primary flex items-center gap-1"
//                       />
//                     </div>
//                   ))}
//                   <div className="p-2">
//                     <MiniButton
//                       type="button"
//                       variant="success"
//                       label="Add Category"
//                       icon={<FaPlus />}
//                       onClick={handleAddNewCategory}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Right */}
//               <div className="lg:col-span-6 col-span-12 space-y-2">
//                 {/* GitHub Link */}
//                 <div className="mb-3">
//                   <label className="text-sm">GitHub Link</label>
//                   <input
//                     type="url"
//                     name="githubLink"
//                     value={formData.githubLink}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded-md dark:bg-slate-800"
//                   />
//                 </div>

//                 {/* Live Demo Link */}
//                 <div className="mb-3">
//                   <label className="text-sm">Live Demo Link</label>
//                   <input
//                     type="url"
//                     name="liveLink"
//                     value={formData.liveLink}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded-md dark:bg-slate-800"
//                   />
//                 </div>

//                 {/* Main Image Upload */}
//                 <div className="mb-4">
//                   <label className="text-sm">Main Image</label>
//                   <input
//                     type="file"
//                     onChange={handleMainImageChange}
//                     className="w-full p-2 border rounded-md dark:bg-slate-800"
//                   />
//                 </div>

//                 {/* Tech Stack */}
//                 <div className="">
//                   <label className="text-sm block mb-2">Tech Stack</label>
//                   {formData?.techStacks?.map((tech, i) => (
//                     <div
//                       key={i}
//                       className="flex gap-2 items-center w-full mb-2"
//                     >
//                       <input
//                         type="text"
//                         value={tech}
//                         onChange={(e) => {
//                           const updated = [...formData.techStacks];
//                           updated[i] = e.target.value;
//                           setFormData({ ...formData, techStacks: updated });
//                         }}
//                         className="input input-sm input-bordered w-full"
//                       />
//                       <MiniButton
//                         type="button"
//                         variant="danger"
//                         label="Delete"
//                         icon={<FaTrashAlt />}
//                         onClick={() => {
//                           const updated = [...formData.techStacks];
//                           updated.splice(i, 1);
//                           setFormData({ ...formData, techStacks: updated });
//                         }}
//                       />
//                     </div>
//                   ))}
//                   <MiniButton
//                     type="button"
//                     variant="success"
//                     icon={<FaPlus />}
//                     onClick={() =>
//                       setFormData({
//                         ...formData,
//                         techStacks: [...(formData.techStacks || []), ""],
//                       })
//                     }
//                   >
//                     Add Tech Stack
//                   </MiniButton>
//                 </div>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="lg:flex grid gap-2 mt-4">
//               <Button
//                 type="submit"
//                 disabled={loading}
//                 icon={loading ? <FaSpinner /> : <FaEdit />}
//                 size="sm"
//                 className="btn btn-sm btn-success text-white"
//               >
//                 {loading ? "Updating..." : "Update Project"}
//               </Button>

//               <Link
//                 to="/super-admin/manage-projects"
//                 className="btn btn-sm btn-primary text-white flex items-center"
//               >
//                 <FaHome className="mr-1" /> Home
//               </Link>

//               <Link
//                 to="/super-admin/manage-projects"
//                 className="btn btn-sm btn-success text-white flex items-center"
//               >
//                 <FaCog className="mr-1" /> All Projects
//               </Link>
//               <Link
//                 to="/super-admin/add-project"
//                 className="btn btn-sm btn-success text-white flex items-center"
//               >
//                 <FaPlusCircle className="mr-1" /> Add Project
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProjectUpdateForm;
