import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import SectionTitle from "../sectionTitle/SectionTitle";
import { FaCalendar, FaCheckCircle, FaEnvelope } from "react-icons/fa";

export default function HomeNoticePreview() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      const res = await api.get("/notices");
      setNotices(res.data);
    };

    fetchNotices();
  }, []);

  const latest = notices
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="">
      <SectionTitle
        title="Live Development"
        decoratedText="Update Messages"
        subtitle="Live updates from admin on ongoing development, system improvements, and deployed features across the portfolio."
        icon={FaEnvelope}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Live Dev Updates</h2>

          <Link to="/pdf" className="text-blue-500 text-sm dark:text-amber-400">
            View All →
          </Link>
        </div>

        <div className="space-y-3">
          {latest.map((n) => (
            <div
              key={n._id}
              className="p-4 rounded-lg border dark:border-gray-700 bg-base-100 dark:bg-gray-800 hover:shadow-md transition space-y-2"
            >
              <h3 className="font-semibold text-sm dark:text-slate-300 flex items-center gap-2">
                <FaCheckCircle className="dark:text-amber-400" />
                {n.title}
              </h3>

              <p className="text-normal text-gray-700 dark:text-slate-400 mt-1 line-clamp-2">
                {n.content}
              </p>

              <span className="text-sm text-gray-700 dark:text-slate-400 mt-2 flex items-center gap-2">
                <FaCalendar className="dark:text-amber-400" />{" "}
                {new Date(n.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
