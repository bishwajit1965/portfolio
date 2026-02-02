import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaPlusCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";

import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import ProjectDisplayCard from "./ProjectDisplayCard";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import api from "../../services/api";
import Swal from "sweetalert2";
import Button from "../../components/buttons/Button";

const ManageProjects = () => {
  const STEP = 3;
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(STEP); // State to control the number of visible project

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Error in fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`projects/${id}`);
        setProjects(projects.filter((project) => project._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Project deleted successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the project.",
          icon: "error",
        });
        console.error("Encountered an error!", error);
      }
    }
  };

  const showMoreProjects = () => {
    setVisibleCount((prev) => prev + visibleCount);
  };

  const showLessProjects = () => {
    setVisibleCount(STEP);
  };

  return (
    <>
      <Helmet>
        <title>Web-tech-services || Manage Projects</title>
      </Helmet>
      <div>
        <SuperAdminPageTitle
          title="Manage"
          decoratedText="Projects"
          subtitle="Only super admin can manage projects!"
        />

        <div className="flex lg:justify-start justify-between items-center lg:mb-4 bg-base-200 p-2 shadow-sm">
          <NavLink to="/super-admin/add-project" className="m-0">
            <button className="btn btn-xs btn-primary">
              <FaPlusCircle />
              Add Project
            </button>
          </NavLink>

          <h2 className="text-xl font-bold text-center lg:ml-72">
            Total Projects:{" "}
            {projects.length > 0
              ? projects.length
              : "No project is uploaded yet"}
          </h2>
        </div>

        <div className="text-center">
          {loading && <span className="loading loading-ring loading-lg"></span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between mt-2">
          {projects.slice(0, visibleCount).map((project) => (
            <ProjectDisplayCard
              key={project._id}
              project={project}
              handleDelete={handleDelete}
            />
          ))}
        </div>

        {/* Show More or Show Less Button */}
        <div className="flex justify-center lg:mt-5 mt-2 pb-6">
          {visibleCount < projects?.length ? (
            <Button
              label="Show More"
              variant="outline"
              icon={<FaArrowAltCircleDown />}
              onClick={showMoreProjects}
              className="cursor-pointer"
            />
          ) : (
            <Button
              label="Show Less"
              variant="outline"
              icon={<FaArrowAltCircleUp />}
              onClick={showLessProjects}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ManageProjects;
