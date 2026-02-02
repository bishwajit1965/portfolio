import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import SectionTitle from "../sectionTitle/SectionTitle";
import api from "../../services/api";
import { FaLayerGroup } from "react-icons/fa6";
import Button from "../buttons/Button";

const ProjectsSection = () => {
  const INITIAL_VISIBLE = 3;
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  // Fetch visible projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        const visibleProjects = response.data.filter(
          (project) => project.visibility === "visible",
        );
        setProjects(visibleProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // Toggle visibility (admin feature)
  const handleVisibilityToggle = async (projectId, currentVisibility) => {
    try {
      const newVisibility =
        currentVisibility === "visible" ? "invisible" : "visible";

      await api.patch(`/projects/visibility/${projectId}`, {
        visibility: newVisibility,
      });

      setProjects((prev) =>
        prev.map((proj) =>
          proj._id === projectId
            ? { ...proj, visibility: newVisibility }
            : proj,
        ),
      );
    } catch (error) {
      console.error("Error updating project visibility:", error);
    }
  };

  const showMore = () => setVisibleCount((prev) => prev + INITIAL_VISIBLE);
  const showLess = () =>
    setVisibleCount((prev) =>
      Math.max(prev - INITIAL_VISIBLE, INITIAL_VISIBLE),
    );

  // Slice projects for display
  const displayedProjects = projects.slice(0, visibleCount);

  return (
    <section className="max-w-7xl mx-auto px-4">
      <SectionTitle
        title="Portfolio"
        decoratedText="Projects"
        subtitle="Some of my most impactful web development projects."
        icon={FaLayerGroup}
      />

      {projects.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
          No projects to display.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onVisibilityChange={handleVisibilityToggle}
              />
            ))}
          </div>

          {/* Show More / Show Less */}
          {projects.length > INITIAL_VISIBLE && (
            <div className="flex justify-center mt-8">
              {visibleCount < projects.length ? (
                <Button
                  label="Show More"
                  variant="outline"
                  size="lg"
                  icon={<FaArrowDown size={18} />}
                  onClick={showMore}
                />
              ) : (
                <Button
                  label="Show Less"
                  variant="outline"
                  size="lg"
                  icon={<FaArrowUp size={18} />}
                  onClick={showLess}
                />
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ProjectsSection;

// import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import ProjectCard from "./ProjectCard";
// import SectionTitle from "../sectionTitle/SectionTitle";
// import api from "../../services/api";
// import { FaLayerGroup } from "react-icons/fa6";
// import Button from "../buttons/Button";

// const ProjectsSection = () => {
//   const visibleCountInitial = 3;
//   const [projects, setProjects] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(visibleCountInitial); // State to control the number of visible projects

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await api.get("/projects");
//         const visibleProjects = response.data.filter(
//           (project) => project.visibility === "visible",
//         );
//         setProjects(visibleProjects);
//       } catch (error) {
//         console.error("Error in fetching data", error);
//       }
//     };
//     fetchProjects();
//   }, []);

//   const handleProjectVisibilityUpdate = async (
//     projectId,
//     currentVisibility,
//   ) => {
//     try {
//       const newVisibility =
//         currentVisibility === "visible" ? "invisible" : "visible";

//       // Call the backend API to update visibility
//       await api.patch(`/projects/visibility/${projectId}`, {
//         visibility: newVisibility,
//       });

//       // Update the project in the state after the visibility is updated
//       setProjects((prevProjects) =>
//         prevProjects.map((project) =>
//           project._id === projectId
//             ? { ...project, visibility: newVisibility }
//             : project,
//         ),
//       );
//     } catch (error) {
//       console.error("Error in updating project visibility!", error);
//     }
//   };

//   const showMoreProjects = () => {
//     setVisibleCount((prevCount) => prevCount + visibleCountInitial);
//   };

//   const showLessProjects = () => {
//     setVisibleCount((prevCount) => prevCount - visibleCountInitial);
//   };

//   return (
//     <div className="lg:max-w-7xl mx-auto lg:p-0 p-2">
//       <SectionTitle
//         title="Portfolio"
//         decoratedText="Projects"
//         subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
//         icon={FaLayerGroup}
//       />

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {projects.slice(0, visibleCount).map((project) => (
//           <ProjectCard
//             key={project._id}
//             project={project}
//             onVisibilityChange={handleProjectVisibilityUpdate}
//           />
//         ))}
//       </div>

//       {/* Show More or Show Less Button */}
//       <div className="flex justify-center lg:mt-10 mt-6">
//         {visibleCount < projects.length ? (
//           <Button
//             label="Show More"
//             variant="outline"
//             size="lg"
//             icon={<FaArrowAltCircleDown size={20} />}
//             onClick={showMoreProjects}
//           />
//         ) : (
//           <Button
//             label="Show Less"
//             variant="outline"
//             size="lg"
//             icon={<FaArrowAltCircleUp size={20} />}
//             onClick={showLessProjects}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectsSection;
