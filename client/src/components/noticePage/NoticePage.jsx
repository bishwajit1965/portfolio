import { useEffect, useState } from "react";

import CTAButton from "../ctaButton/CTAButton";
import { FaFilePdf } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Loader from "../loader/Loader";
import PageTitle from "../../pages/pageTitle/PageTitle";
import api from "../../services/api";

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const response = await api.get("/notices");
        console.log("Response:", response.data);
        const visibleNotices = response.data.filter(
          (notice) => notice.status === "published",
        );
        setNotices(visibleNotices);
      } catch (error) {
        console.error("Error in fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // if (!notices) return <div className="text-center">Loading...</div>;

  const handleDownloadPdf = (noticeId) => {
    window.open(`${baseUrl}/notices/generate-pdf/${noticeId}`, "_blank");
  };

  let serial = 1;

  return (
    <div className="lg:max-w-7xl mx-auto lg:p-0 p-2 mb-10">
      <Helmet>
        <title>Web-tech-services || Notices</title>
      </Helmet>

      {loading && <Loader />}

      <PageTitle
        title="Latest Notices from"
        decoratedText="Super Admin"
        subtitle="You are most welcome here. Keep yourself updated of the latest development of out policies, need, and information."
        dataLength={notices.length > 0 ? notices.length : "None"}
      />

      {notices && notices.length === 0 ? (
        <div className="text-center text-slate-500 font-bold">
          <p className="text-center font-bold text-red-600">
            No notice from super-admin found !
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-sm dark:text-gray-400">
            <thead className="dark:text-gray-400">
              <tr className="font-bold dark:border-gray-700">
                <th className="lg:col-span-1">#</th>
                <th className="lg:col-span-10">Notice Title:</th>
                <th className="lg:col-span-10">Notice Date:</th>
                <th className="lg:col-span-1 flex justify-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => (
                <tr key={notice._id} className="dark:border-gray-700">
                  <td className="lg:col-span-1">{serial++}</td>
                  <td className="lg:col-span-10">{notice.title}</td>
                  <td className="lg:col-span-10">
                    {new Date(notice.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="lg:col-span-1 flex justify-end">
                    <CTAButton
                      onClick={() => handleDownloadPdf(notice._id)}
                      label="Download PDF"
                      icon={<FaFilePdf />}
                      className="btn btn-sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NoticePage;
