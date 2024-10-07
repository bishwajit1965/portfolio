import { useMemo, useState } from "react";

import useFetchCollection from "../../../hooks/useFetchCollection";
import useTextShortener from "../../../hooks/useTextShortener";

const BriefIntro = () => {
  const queryParams = useMemo(() => ({ status: "active" }), []);
  const { data, loading, error } = useFetchCollection(
    "brief-intro",
    queryParams
  );
  const [isExpanded, setIsExpanded] = useState(false);

  if (loading) return <div className="test-center">Loading...</div>;
  if (error) return <div className="text-center"> {error.message}</div>;

  const maxLength = 100;
  const fetchedData = data.length > 0 ? data[0].briefIntro : "";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { shortenedText, fullText } = useTextShortener(fetchedData, maxLength);

  if (data.length === 0) return null; // Return nothing if no quotes

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">A Brief Introduction of mine</h2>

      {data
        ? data.slice(0, 1).map((introduction) => (
            <div key={introduction._id}>
              <p className="text-justify text-sm border rounded-md p-2 border-slate-400 dark:border-slate-700 shadow-sm">
                {isExpanded ? fullText : shortenedText}
                <button
                  className="text-blue-900 underline ml-2"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Show Less" : "Read More"}
                </button>
              </p>
            </div>
          ))
        : "No data found!"}
    </div>
  );
};

export default BriefIntro;
