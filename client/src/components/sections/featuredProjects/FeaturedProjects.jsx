import { useMemo, useState } from "react";

import Modal from "./Modal";
import useFetchCollection from "../../../hooks/useFetchCollection";

const FeaturedProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const queryParams = useMemo(() => ({ status: "active" }), []);
  const { data, loading, error } = useFetchCollection("featured-projects", {
    queryParams,
  });

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">{error.message}</div>;
  if (data.length === 0) return null;

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // Will shorten the text as set in maxLength variable
  const shortenText = (maxLength, text) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="hero-section">
      <h2 className="text-2xl font-bold mb-2 font-playfair">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-2">
        {data.length > 0
          ? data.slice(0, 4).map((project) => (
              <div
                key={project._id}
                className="project-card shadow-sm rounded-lg hover:shadow-md cursor-pointer border border-slate-400 dark:border-slate-700"
                onClick={() => openModal(project)}
              >
                <img
                  src={project.photoUrl}
                  alt="Project photo"
                  className="h-24 w-full rounded-t-md"
                />
                <div className="p-2">
                  <h3 className="text-1xl font-bold">
                    {shortenText(19, project.title)}
                  </h3>
                  {/* Display a description or limited data here */}
                  <p className="">{shortenText(80, project.description)}</p>
                </div>
              </div>
            ))
          : "No featured project is available."}
      </div>

      {selectedProject && (
        <Modal project={selectedProject} onClose={closeModal} />
      )}
    </div>
  );
};

export default FeaturedProjects;
