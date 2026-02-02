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

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${baseUrl}/projects`)
      .then((res) => res.json())
      .then((data) => {
        const visible = data.filter(
          (project) => project.visibility === "visible",
        );
        setProjects(visible);
      })
      .catch(console.error)
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
    <section className="max-w-7xl mx-auto lg:px-4 px-2">
      <SectionTitle
        title="Featured"
        decoratedText="Projects"
        subtitle="A curated selection of projects that reflect my skills and problem-solving approach."
        icon={FaAlignCenter}
      />

      <div className="grid grid-cols-12 gap-6 mt-8">
        {/* LEFT: Featured Project */}
        <div className="col-span-12 lg:col-span-7">
          <div className="relative h-80 rounded-xl overflow-hidden shadow-md group">
            {loading && (
              <div className="flex items-center justify-center h-full text-sm opacity-70">
                Loading featured projects…
              </div>
            )}

            {!loading && activeProject && (
              <>
                <img
                  src={`${apiUrl}/uploads/${activeProject.image}`}
                  alt={activeProject.name}
                  className="w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Project info */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <h3 className="text-xl font-bold">{activeProject.name}</h3>
                  <p className="text-sm opacity-80">
                    {activeProject.type || "Web Application"}
                  </p>

                  <Link
                    to={`/project-details/${activeProject._id}`}
                    className="inline-block mt-2"
                  >
                    <Button label="View Project" size="sm" variant="outline" />
                  </Link>
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
          <div className="h-80 rounded-xl border p-4 space-y-3 overflow-y-auto">
            <h4 className="font-semibold text-lg">Other Projects</h4>

            {projects.slice(0, 8).map((project, index) => (
              <Link
                key={project._id}
                to={`/project-details/${project._id}`}
                className={`block p-2 rounded-md transition
                  ${
                    index === currentIndex
                      ? "bg-base-200 font-semibold"
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
          <Link to="/portfolio-projects">
            <Button
              label="View All Projects"
              icon={<FaEye size={18} />}
              variant="outline"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel;

// import { useEffect, useState } from "react";

// import { Link } from "react-router-dom";
// import SectionTitle from "../../sectionTitle/SectionTitle";
// import { FaAlignCenter } from "react-icons/fa";
// import Button from "../../buttons/Button";
// import { FaEye } from "react-icons/fa6";

// const ProjectCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [slides, setSlides] = useState([]);
//   const baseUrl =
//     import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
//   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

//   useEffect(() => {
//     fetch(`${baseUrl}/projects`)
//       .then((response) => response.json())
//       .then((data) => {
//         const visibleProjects = data.filter(
//           (project) => project.visibility === "visible",
//         );
//         setSlides(visibleProjects);
//       })
//       .catch((error) => console.error("Error fetching posts:", error));
//   }, [baseUrl]);

//   console.log("Slides data:", slides);
//   // Automatically change slide every 6 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
//     }, 3000);

//     return () => clearInterval(interval); // Cleanup on component unmount
//   }, [slides.length]);

//   // Show next slide
//   const showNextSlide = () => {
//     setCurrentIndex((currentIndex + 1) % slides.length);
//   };

//   // Show previous slide
//   const showPrevSlide = () => {
//     setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
//   };

//   return (
//     <div className="lg:max-w-7xl mx-auto lg:p-0 p-2">
//       <SectionTitle
//         title="Latest"
//         decoratedText="Project Carousel"
//         subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
//         icon={FaAlignCenter}
//       />
//       <div className="grid grid-cols-12 gap-4 justify-between lg:min-h-80 min-h-40 mt-6">
//         <div className="lg:col-span-6 col-span-12">
//           <div className="carousel w-full lg:h-80 h-80 relative overflow-hidden rounded-md">
//             {slides.length > 0
//               ? slides.map((slide, index) => (
//                   <div
//                     key={slide._id}
//                     className={`carousel-item absolute top-0 left-0 w-full h-full transition-opacity duration-700 items-center rounded-md ${
//                       index === currentIndex ? "opacity-100" : "opacity-0"
//                     }`}
//                   >
//                     <img
//                       src={`${apiUrl}/uploads/${slide.image}`}
//                       className="w-full h-full object-cover rounded-md shadow-md"
//                       alt={slide.name}
//                     />

//                     <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
//                       <button
//                         onClick={showPrevSlide}
//                         className="btn btn-circle text-white bg-gray-700"
//                       >
//                         ❮
//                       </button>

//                       <h2 className="m-0 p-0 items-center flex justify-center bg-slate-800 font-bold text-white w-3/4 opacity-60 rounded-full text-center z-50">
//                         {index + 1}
//                         {"."} {slide.name.slice(0, 20) + "..."}
//                       </h2>

//                       <button
//                         onClick={showNextSlide}
//                         className="btn btn-circle text-white bg-gray-700"
//                       >
//                         ❯
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               : "No project is available."}
//           </div>
//         </div>
//         <div className="lg:col-span-6 col-span-12 bg-base-200s lg:h-80 rounded-md shadow-mds lg:p-2 p-2 text-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600 border-base-300 border">
//           <h2 className="lg:text-2xl text-slate-700 dark:text-slate-400 font-bold">
//             Recent Projects:
//           </h2>{" "}
//           {/* <hr className="border-slate-400" /> */}
//           {slides.length > 0
//             ? slides.slice(0, 10).map((data, index) => (
//                 <Link
//                   to={`/project-details/${data._id}`}
//                   key={data._id}
//                   className="flex items-center hover:link space-y-1 m-0"
//                 >
//                   <div key={data._id} className="flex items-center space-y-1">
//                     <span className="bg-slate-500 text-base-100 text-xs rounded-full h-4 w-4 flex justify-center items-center mr-2">
//                       {index + 1}
//                     </span>
//                     <h2 className="font-bold">Title: {data.name}</h2>
//                   </div>
//                 </Link>
//               ))
//             : "No data to display."}
//         </div>

//         {/* View All Projects */}
//         <div className="lg:col-span-12 col-span-12 flex justify-center lg:pt-8 pt-4">
//           <Link to="/portfolio-projects" className="m-">
//             <Button
//               label="View All Projects"
//               icon={<FaEye size={20} />}
//               variant="outline"
//               size="md"
//             />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectCarousel;
