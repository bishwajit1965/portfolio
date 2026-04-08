import { SuperAdminAuthContext } from "../context/SuperAdminAuthProvider";

import { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { PieChart, Pie, Legend } from "recharts";
import supAdminDashboardStatusApi from "../utils/supAdminDashboardStatusApi";
import Loader from "../../components/loader/Loader";
import {
  FaBlog,
  FaCheckCircle,
  FaList,
  FaMailBulk,
  FaProductHunt,
  FaUser,
} from "react-icons/fa";

const SuperAdminDashboard = () => {
  const { user } = useContext(SuperAdminAuthContext);

  const [blogPostData, setBlogPostData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [noticesData, setNoticesData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [
        blogPostsResponse,
        projectsResponse,
        noticesResponse,
        usersResponse,
      ] = await Promise.all([
        supAdminDashboardStatusApi.getAllBlogPosts(),
        supAdminDashboardStatusApi.getProjects(),
        supAdminDashboardStatusApi.listNotice(),
        supAdminDashboardStatusApi.getUsersForSuperAdmin(),
      ]);

      if (blogPostsResponse.ok) setBlogPostData(await blogPostsResponse.json());
      if (projectsResponse.ok) setProjectsData(await projectsResponse.json());
      if (noticesResponse.ok) setNoticesData(await noticesResponse.json());
      if (usersResponse.ok) setUsersData((await usersResponse.json()).data);
    };
    fetchData();
  }, []);

  if (!user)
    return (
      <p className="text-center">
        <Loader />
      </p>
    );

  const totalBlogs = blogPostData?.length;
  const totalUsers = usersData?.length;
  const totalProjects = projectsData?.length;
  const totalNotices = noticesData?.length;

  const groupByDate = (data) => {
    const map = {};
    data?.forEach((item) => {
      const date = new Date(item.createdAt).toLocaleDateString();
      map[date] = (map[date] || 0) + 1;
    });
    return Object.keys(map).map((date) => ({ date, count: map[date] }));
  };

  const getUsersByRole = (users) => {
    const roleColors = {
      user: "#4F46E5",
      admin: "#22C55E",
      "super-admin": "#F59E0B",
      unknown: "#EF4444",
    };
    const map = {};
    users.forEach((u) => {
      const role = u.role || "unknown";
      if (!map[role])
        map[role] = {
          name: role,
          value: 0,
          fill: roleColors[role] || "#8884d8",
        };
      map[role].value++;
    });
    return Object.values(map);
  };

  const getProjectsByStatus = (projects) => {
    const statusColors = {
      pending: "#FBBF24",
      active: "#22C55E",
      completed: "#4F46E5",
      cancelled: "#EF4444",
    };
    const map = {};
    projects.forEach((p) => {
      const status = p.status || "pending";
      if (!map[status])
        map[status] = {
          name: status,
          value: 0,
          fill: statusColors[status] || "#8884d8",
        };
      map[status].value++;
    });
    return Object.values(map);
  };

  const usersByRole = getUsersByRole(usersData);
  const projectsByStatus = getProjectsByStatus(projectsData);
  const userGrowth = groupByDate(usersData);
  const blogGrowth = groupByDate(blogPostData);
  const projectGrowth = groupByDate(projectsData);

  // Assign colors to growth bars dynamically
  const growthColors = ["#4F46E5", "#22C55E", "#F59E0B"]; // Users, Blogs, Projects

  const renderColoredBars = (data, index) => (
    <Bar dataKey="count">
      {data.map((entry, i) => (
        <Cell key={i} fill={growthColors[index % growthColors.length]} />
      ))}
    </Bar>
  );

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Users" value={totalUsers} icon="👤" />
        <Card title="Projects" value={totalProjects} icon="🚀" />
        <Card title="Blogs" value={totalBlogs} icon="📝" />
        <Card title="Notices" value={totalNotices} icon="📢" />
      </div>

      <div className="grid md:grid-cols-3 gap-4 my-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowth}>
              {renderColoredBars(userGrowth, 0)}
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Blog Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={blogGrowth}>
              {renderColoredBars(blogGrowth, 1)}
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Project Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectGrowth}>
              {renderColoredBars(projectGrowth, 2)}
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Charts */}
      <div className="grid md:grid-cols-2 gap-4 my-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Users by Role</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={usersByRole}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(1)}%`
                }
              >
                {usersByRole.map((entry, idx) => (
                  <Cell key={idx} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, "Count"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Projects by Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectsByStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {projectsByStatus.map((entry, idx) => (
                  <Cell key={idx} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, "Count"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Lists */}
      <div className="grid md:grid-cols-3 gap-4 my-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2 underline">
            <FaUser size={16} />
            Recent Users
          </h2>
          {usersData.slice(0, 5).map((u) => (
            <p key={u._id} className="flex items-center gap-2">
              <FaMailBulk size={15} /> {u.email}
            </p>
          ))}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2 flex items-center gap-2 tex-lg underline">
            <FaBlog size={16} /> Recent Blogs
          </h2>
          {blogPostData.slice(0, 5).map((b) => (
            <p key={b._id} className="flex items-center gap-2">
              <FaCheckCircle /> {b.title.slice(0, 38) + "..."}
            </p>
          ))}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2 flex items-center gap-2 text-lg underline">
            <FaList size={16} /> Recent Projects
          </h2>
          {projectsData.slice(0, 5).map((p) => (
            <p key={p._id} className="flex items-center gap-2">
              <FaProductHunt size={15} />
              {p.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center hover:shadow-lg transition">
    <div>
      <p className="text-gray-500 text-sm font-semibold">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
    <span className="text-3xl">{icon}</span>
  </div>
);

export default SuperAdminDashboard;
