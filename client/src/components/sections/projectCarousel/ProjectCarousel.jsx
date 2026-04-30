import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../../sectionTitle/SectionTitle";
import Button from "../../buttons/Button";
import { FaAlignCenter } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageSrc = (img) => {
    if (!img) return "";
    if (typeof img === "string" && img.startsWith("http")) return img;
    if (img.url) return img.url;
    return "";
  };

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetch(`${baseUrl}/projects`)
      .then((res) => res.json())
      .then((data) => {
        const visible = data.filter(
          (project) => project.visibility === "visible",
        );
        setProjects(visible);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => setLoading(false));
  }, [baseUrl]);

  // Calm auto-slide (UX-friendly)
  useEffect(() => {
    if (projects.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [projects.length]);

  const activeProject = projects[currentIndex];

  return (
    <section className="max-w-7xl mx-auto">
      <SectionTitle
        title="Featured"
        decoratedText="Projects"
        subtitle="A curated selection of projects that reflect my skills and problem-solving approach."
        icon={FaAlignCenter}
      />

      <div className="grid grid-cols-12 lg:gap-6 gap-4 mt-8">
        {/* LEFT: Featured Project */}
        <div className="col-span-12 lg:col-span-7">
          <div className="relative lg:h-80 h-56 rounded-xl overflow-hidden shadow-md group">
            {loading && (
              <div className="flex items-center justify-center h-full text-sm opacity-70">
                Loading featured projects…
              </div>
            )}

            {!loading && activeProject && (
              <>
                <img
                  src={getImageSrc(activeProject.image)}
                  alt={activeProject.name}
                  className="w-full lg:h-80 h-56 h-autos lg:object-cover object-fill border rounded-xl bg-slate-800 border-slate-300 dark:border-slate-700"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Project info */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
                  <h3 className="lg:text-xl text-sm font-bold">
                    {activeProject.name}
                  </h3>
                  <p className="text-sm opacity-80">
                    {activeProject.type || "Web Application"}
                  </p>

                  <Button
                    href={`/project-details/${activeProject._id}`}
                    label="View Project"
                    icon={<FaEye />}
                    size="sm"
                    variant="outline"
                  />
                </div>
              </>
            )}

            {!loading && projects.length === 0 && (
              <div className="flex items-center justify-center h-full text-sm opacity-70">
                Projects are being polished. Check back soon 🚧
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Supporting list */}
        <div className="col-span-12 lg:col-span-5">
          <div className="h-80 rounded-xl bg-base-200 dark:bg-slate-800 border dark:border-slate-700 p-4 space-y-3 overflow-y-auto">
            <h4 className="font-semibold text-lg dark:text-base-300">
              Other Projects
            </h4>

            {projects.slice(0, 8).map((project, index) => (
              <Link
                key={project._id}
                to={`/project-details/${project._id}`}
                className={`block p-2 rounded-md transition m-0
                  ${
                    index === currentIndex
                      ? "bg-base-300 dark:bg-gray-700 dark:text-base-300 font-semibold"
                      : "hover:bg-base-200/50"
                  }`}
              >
                <p className="text-sm">{project.name}</p>
                <p className="text-xs opacity-60">
                  {project.type || "Web App"}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="col-span-12 flex justify-center pt-6">
          <Button
            href="/portfolio-projects"
            label="View All Projects"
            icon={<FaEye size={18} />}
            variant="outline"
            size="md"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel;
