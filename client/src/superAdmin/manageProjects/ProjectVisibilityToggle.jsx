import { useEffect, useState } from "react";

import { FaEdit } from "react-icons/fa";
import axios from "axios";

const ProjectVisibilityToggle = ({ projectId, initialVisibility }) => {
  const [visibility, setVisibility] = useState(initialVisibility);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dropdownValue, setDropdownValue] = useState(
    initialVisibility === "visible" ? "visible" : "invisible"
  );
  console.log("dropdown value", dropdownValue);

  const handleVisibilitySubmit = async () => {
    setLoading(true);
    const newVisibility = dropdownValue; // Determine new visibility status

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/projects/visibility/${projectId}`,
        {
          visibility: newVisibility,
        }
      );

      if (response.data.success) {
        setVisibility(dropdownValue);
        setMessage(response.data.message);
      } else {
        setMessage("Failed to update project visibility.");
      }
    } catch (error) {
      console.error("Error toggling project visibility.", error);
      setMessage("Error in toggling project visibility.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setDropdownValue(visibility === "visible" ? "visible" : "invisible");
  }, [visibility]);

  return (
    <div className="">
      <div className="text-center">
        {message && <p className="text-xs">{message}</p>}
      </div>

      {/* Select value */}
      <div className="flex items-center mt-2 ml-[-8px]">
        <select
          name="visibility"
          id="visibility"
          value={dropdownValue}
          onChange={(e) => setDropdownValue(e.target.value)}
          disabled={loading}
          className="btn btn-xs mr-2 btn-outline items-center place-items-start"
        >
          <option value="visible">Visible</option>
          <option value="invisible">Invisible</option>
        </select>
        <button
          onClick={handleVisibilitySubmit}
          disabled={loading}
          className="btn btn-xs btn-primary"
        >
          <FaEdit /> {loading ? "Updating..." : "Update Project Visibility"}
        </button>
      </div>
    </div>
  );
};

export default ProjectVisibilityToggle;
