import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useEffect, useState } from "react";

import CTAButton from "../ctaButton/CTAButton";
import ProjectCard from "./ProjectCard";
import SectionTitle from "../sectionTitle/SectionTitle";
import api from "../../services/api";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // State to control the number of visible projects

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        const visibleProjects = response.data.filter(
          (project) => project.visibility === "visible"
        );
        setProjects(visibleProjects);
      } catch (error) {
        console.error("Error in fetching data", error);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectVisibilityUpdate = async (
    projectId,
    currentVisibility
  ) => {
    try {
      const newVisibility =
        currentVisibility === "visible" ? "invisible" : "visible";

      // Call the backend API to update visibility
      await api.patch(`/projects/visibility/${projectId}`, {
        visibility: newVisibility,
      });

      // Update the project in the state after the visibility is updated
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === projectId
            ? { ...project, visibility: newVisibility }
            : project
        )
      );
    } catch (error) {
      console.error("Error in updating project visibility!", error);
    }
  };

  const showMoreProjects = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const showLessProjects = () => {
    setVisibleCount(6);
  };

  return (
    <div className="lg:p-0 p-2">
      <SectionTitle
        title="My Projects"
        subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.slice(0, visibleCount).map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onVisibilityChange={handleProjectVisibilityUpdate}
          />
        ))}
      </div>

      {/* Show More or Show Less Button */}
      <div className="flex justify-center lg:mt-10 mt-4">
        {visibleCount < projects.length ? (
          <CTAButton
            label="Show More"
            icon={<FaArrowAltCircleDown />}
            onClick={showMoreProjects}
          />
        ) : (
          <CTAButton
            label="Show Less"
            icon={<FaArrowAltCircleUp />}
            onClick={showLessProjects}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;
