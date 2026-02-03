import { useEffect, useState } from "react";

import { FaEdit } from "react-icons/fa";
import axios from "axios";
import MiniButton from "../../components/buttons/MiniButton";

const ProjectVisibilityToggle = ({ projectId, initialVisibility }) => {
  const [visibility, setVisibility] = useState(initialVisibility);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dropdownValue, setDropdownValue] = useState(
    initialVisibility === "visible" ? "visible" : "invisible",
  );
  console.log("dropdown value", dropdownValue);
  const baseURL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const handleVisibilitySubmit = async () => {
    setLoading(true);
    const newVisibility = dropdownValue; // Determine new visibility status

    try {
      const response = await axios.patch(
        `${baseURL}/projects/visibility/${projectId}`,
        {
          visibility: newVisibility,
        },
      );

      if (response?.data?.success) {
        setVisibility(dropdownValue);
        setMessage(response?.data?.message);
        const timer = setTimeout(() => {
          setMessage("");
        }, 2000);
        return () => clearTimeout(timer);
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
      <di className="flex items-center mt-2 ml-[-8px] gap-2">
        <select
          className="select select-xs border"
          name="visibility"
          id="visibility"
          value={dropdownValue}
          onChange={(e) => setDropdownValue(e.target.value)}
          disabled={loading}
        >
          <option value="visible">Visible</option>
          <option value="invisible">Invisible</option>
        </select>

        <MiniButton
          onClick={handleVisibilitySubmit}
          size="sm"
          disabled={loading}
          variant="success"
          label={loading ? "Updating..." : "Update Project Visibility"}
          icon={<FaEdit />}
          className=""
        />
      </di>
    </div>
  );
};

export default ProjectVisibilityToggle;
