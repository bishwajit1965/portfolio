import CopyRightTextCard from "./CopyRightTextCard";
import useFetchCollection from "../../../hooks/useFetchCollection";
import { useMemo } from "react";

const CopyrightText = () => {
  const queryParams = useMemo(() => ({ status: "active" }), []);
  const { data, loading, error } = useFetchCollection("copyright", queryParams);

  if (loading) {
    return <h2 className="text-center">Loading...</h2>;
  }
  if (error) {
    return <h2 className="text-center">{error}</h2>;
  }
  if (data.length === 0) return null;

  return (
    <div>
      {data.length > 0
        ? data
            .slice(0, 1)
            .map((copyrightData) => (
              <CopyRightTextCard
                key={copyrightData._id}
                copyrightData={copyrightData}
              />
            ))
        : "No copyright data is available"}
    </div>
  );
};

export default CopyrightText;
