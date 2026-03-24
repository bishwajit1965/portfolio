import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaLayerGroup } from "react-icons/fa6";
import ProjectCard from "./ProjectCard";
import SectionTitle from "../sectionTitle/SectionTitle";
import api from "../../services/api";
import Button from "../buttons/Button";

const ProjectsSection = () => {
  const INITIAL_VISIBLE = 2;
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

  const displayedProjects = projects.slice(0, visibleCount);

  return (
    <section className="max-w-7xl mx-auto dark:text-gray-400">
      {/* Section Title */}
      <SectionTitle
        title="Portfolio"
        decoratedText="Projects"
        subtitle="Some of my most impactful web development projects."
        icon={FaLayerGroup}
      />

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
          No projects to display.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 mt-6 lg:mt-8">
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onVisibilityChange={handleVisibilityToggle}
              />
            ))}
          </div>

          {/* Show More / Show Less */}
          <div className="flex justify-center mt-6 lg:mt-8 gap-4">
            {/* Show More */}
            {visibleCount < projects.length && (
              <Button
                label="Show More"
                variant="outline"
                size="lg"
                icon={<FaArrowDown size={18} />}
                onClick={showMore}
                className="w-40 sm:w-44 lg:w-48"
              />
            )}

            {/* Show Less */}
            {visibleCount > INITIAL_VISIBLE && (
              <Button
                label="Show Less"
                variant="outline"
                size="lg"
                icon={<FaArrowUp size={18} />}
                onClick={showLess}
                className="w-40 sm:w-44 lg:w-48"
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default ProjectsSection;
