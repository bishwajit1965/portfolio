import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaArrowAltCircleRight,
  FaArrowCircleDown,
  FaDatabase,
  FaHome,
  FaPlusCircle,
} from "react-icons/fa";
import api from "../../services/api";
import Button from "../../components/buttons/Button";
import SuperAdminPageSubHeader from "../superAdminPageSubHeader/SuperAdminPageSubHeader";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const baseURL = `${apiUrl}/uploads/`;

const ViewProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    type: "",
    description: "",
  });
  console.log("Project Details", projectDetails);
  const imageUrl = `${apiUrl}${projectDetails.image}`;

  const handleNavigate = () => {
    navigate("/super-admin/manage-projects");
  };

  const handleClearSearchText = () => {
    setFilterText("");
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await api.get(`projects/${projectId}`);
        if (response) {
          setProjectDetails(response.data);
        } else {
          alert("No data is available.");
        }
      } catch (error) {
        console.error("Failed to fetch project", error);
      }
    };
    fetchProjectDetails();
  }, [projectId]);

  const screenShotData = projectDetails.screenshots;
  console.log("DATA", screenShotData);
  // Filtered screenshots calculated directly from props and input
  const filteredScreenShots = screenShotData?.filter(
    (shot) =>
      typeof shot.category === "string" &&
      shot.category.toLowerCase().includes(filterText.toLowerCase()),
  );

  console.log("Filtered shots", filteredScreenShots);

  return (
    <div className="">
      <SuperAdminPageSubHeader
        title="Screenshots"
        decoratedText="Details Table"
        dataLength={projectDetails?.screenshots?.length}
        variant="success"
        buttonLabel="Add Project"
        icon={<FaPlusCircle />}
        labelIcon={<FaDatabase />}
        size="lg"
        searchBox={true}
        setFilterText={setFilterText}
        // onButtonClick={handleAddProjectFormToggle}
        // ✅ For refreshing search input field
        filterText={filterText} //important for clearing field
        refreshButton={true}
        onRefreshBtnClick={handleClearSearchText}
      />

      <div className="lg:p-4 p-2">
        <div className="rounded-md border border-slate-200 admin-dark:border-slate-700 shadow-lg">
          <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-4 gap-2">
            <div className="lg:col-span-6 col-span-12 rounded-md">
              <img
                src={projectDetails?.image?.url || imageUrl}
                alt={projectDetails.name}
                className="min-h-auto lg:min-h-80 w-full object-cover rounded-md"
              />
            </div>
            <div className="lg:col-span-6 col-span-12 lg:space-y-2 lg:p-4 p-2">
              <h2 className="font-bold lg:text-2xl text-lg text-slate-700 admin-dark:text-slate-300">
                {projectDetails.name}
              </h2>
              <p className="text-slate-700 admin-dark:text-slate-300">
                {projectDetails.type}
              </p>
              <p className="text-slate-700 admin-dark:text-slate-300">
                {projectDetails.description}
              </p>

              <Button
                type="submit"
                size="md"
                variant="outline"
                label="Project Management"
                icon={<FaArrowAltCircleRight />}
                onClick={handleNavigate}
              />
            </div>
          </div>

          <div className="bg-base-100 lg:p-4 p-2 lg:col-span-6 space-y-2 rounded-md text-slate-700 admin-dark:bg-slate-800 admin-dark:text-slate-300">
            <div className="">
              {filteredScreenShots?.map((category) => (
                <div key={category.id} className="">
                  <h2 className="text-lg font-bold lg:mt-6 mt-4 mb-2 text-slate-700 admin-dark:bg-slate-800 admin-dark:text-slate-300 flex items-center gap-2 bg-base-300 lg:p-2 p-1 rounded-t-md">
                    <FaArrowCircleDown /> {category.category}
                  </h2>

                  <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-5 gap-2">
                    {category.items.map((item, index) => (
                      <div key={index} className="lg:col-span-4 col-span-12">
                        <figure>
                          <img
                            src={item?.image?.url || `${baseURL}${item.image}`}
                            alt={item.caption}
                            className="w-full lg:h-52 h-auto lg:object-fill object-cover rounded-md mb-2 shadow-md border border-slate-200 admin-dark:border-slate-700"
                          />
                          {item?.caption && (
                            <figcaption className="font-semibold">
                              {item?.caption}
                            </figcaption>
                          )}
                        </figure>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:pt-4 pt-2">
              <Link to="/super-admin/manage-projects" className="m-0">
                <Button
                  label="Go Home"
                  variant="outline"
                  icon={<FaHome />}
                  className=""
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProjectDetails;
