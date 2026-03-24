import { SuperAdminAuthContext } from "../context/SuperAdminAuthProvider";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
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
    <div className="">
      <SuperAdminPageTitle
        title="Super Admin"
        decoratedText="Dashboard Home"
        subtitle="This dashboard is for Super Admin only."
      />

      <div className="p-4">
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

// import { SuperAdminAuthContext } from "../context/SuperAdminAuthProvider";
// import { useContext, useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
// } from "recharts";

// import supAdminDashboardStatusApi from "../utils/supAdminDashboardStatusApi";
// import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
// const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4"];
// const SuperAdminDashboard = () => {
//   const { user } = useContext(SuperAdminAuthContext);

//   const [blogPostData, setBlogPostData] = useState([]);
//   const [projectsData, setProjectsData] = useState([]);
//   const [noticesData, setNoticesData] = useState([]);
//   const [usersData, setUsersData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const [
//         blogPostsResponse,
//         projectsResponse,
//         noticesResponse,
//         usersResponse,
//       ] = await Promise.all([
//         supAdminDashboardStatusApi.getAllBlogPosts(),
//         supAdminDashboardStatusApi.getProjects(),
//         supAdminDashboardStatusApi.listNotice(),
//         supAdminDashboardStatusApi.getUsersForSuperAdmin(),
//       ]);

//       if (blogPostsResponse.ok) setBlogPostData(await blogPostsResponse.json());

//       if (projectsResponse.ok) setProjectsData(await projectsResponse.json());

//       if (noticesResponse.ok) setNoticesData(await noticesResponse.json());

//       if (usersResponse.ok) {
//         const data = await usersResponse.json();
//         setUsersData(data.data);
//       }
//     };

//     fetchData();
//   }, []);

//   // ===== HELPERS =====

//   const groupByDate = (data) => {
//     const map = {};

//     data?.forEach((item) => {
//       const date = item.createdAt
//         ? new Date(item.createdAt).toLocaleDateString()
//         : "Unknown";

//       if (!map[date]) map[date] = 0;
//       map[date]++;
//     });

//     return Object.keys(map).map((date) => ({
//       date,
//       count: map[date],
//     }));
//   };

//   const getUsersByRole = (users) => {
//     const map = {};

//     users.forEach((u) => {
//       const role = u.role || "unknown";

//       if (!map[role]) {
//         map[role] = { name: role, value: 0 };
//       }

//       map[role].value++;
//     });

//     return Object.values(map);
//   };

//   const getProjectsByStatus = (projects) => {
//     const map = {};

//     projects.forEach((p) => {
//       const status = p.status || "unknown";

//       if (!map[status]) {
//         map[status] = { name: status, value: 0 };
//       }

//       map[status].value++;
//     });

//     return Object.values(map);
//   };

//   // ===== DATA =====

//   const userGrowth = groupByDate(usersData);
//   const blogGrowth = groupByDate(blogPostData);
//   const projectGrowth = groupByDate(projectsData);

//   const usersByRole = getUsersByRole(usersData);
//   const projectsByStatus = getProjectsByStatus(projectsData);

//   const totalUsers = usersData.length;
//   const totalBlogs = blogPostData.length;
//   const totalProjects = projectsData.length;
//   const totalNotices = noticesData.length;

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="">
//       {/* TITLE */}
//       <SuperAdminPageTitle
//         title="Super Admin"
//         decoratedText="Dashboard"
//         subtitle="Monitor your platform activity"
//       />
//       <div className="p-4 space-y-10 bg-gray-50 min-h-screen">
//         {/* OVERVIEW CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <Card title="Users" value={totalUsers} icon="👤" />
//           <Card title="Projects" value={totalProjects} icon="🚀" />
//           <Card title="Blogs" value={totalBlogs} icon="📝" />
//           <Card title="Notices" value={totalNotices} icon="📢" />
//         </div>

//         {/* 🚀 PROJECTS SECTION */}
//         <div className="space-y-4">
//           <h2 className="text-xl font-bold">🚀 Projects Overview</h2>

//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Project Growth */}
//             <ChartCard title="Project Creation Trend">
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={projectGrowth}>
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartCard>

//             {/* Project Status */}
//             <ChartCard title="Project Status Distribution">
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={projectsByStatus}
//                     dataKey="value"
//                     nameKey="name"
//                     outerRadius={110}
//                     fill="#4F46E5"
//                     label
//                   />
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </ChartCard>
//           </div>
//         </div>

//         {/* 📊 PLATFORM ANALYTICS */}
//         <div className="space-y-4">
//           <h2 className="text-xl font-bold">📊 Platform Analytics</h2>

//           <div className="grid md:grid-cols-2 gap-6">
//             {/* User Growth */}
//             <ChartCard title="User Growth">
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={userGrowth}>
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartCard>

//             {/* Blog Growth */}
//             <ChartCard title="Blog Publishing Trend">
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={blogGrowth}>
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartCard>
//           </div>

//           {/* User Role Pie */}
//           <ChartCard title="User Role Distribution">
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={usersByRole}
//                   dataKey="value"
//                   nameKey="name"
//                   outerRadius={110}
//                   fill="#06B6D4"
//                   // fill="#4F46E5"
//                   label
//                 />
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </ChartCard>
//         </div>

//         {/* RECENT DATA */}
//         <div className="grid md:grid-cols-2 gap-6">
//           <ListCard title="Recent Users">
//             {usersData.slice(0, 5).map((u) => (
//               <p key={u._id}>{u.email}</p>
//             ))}
//           </ListCard>

//           <ListCard title="Recent Blogs">
//             {blogPostData.slice(0, 5).map((b) => (
//               <p key={b._id}>{b.title}</p>
//             ))}
//           </ListCard>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ===== UI COMPONENTS =====

// const Card = ({ title, value, icon }) => (
//   <div className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center hover:shadow-lg transition">
//     <div>
//       <p className="text-gray-500 text-sm">{title}</p>
//       <h2 className="text-2xl font-bold">{value}</h2>
//     </div>
//     <span className="text-3xl">{icon}</span>
//   </div>
// );

// const ChartCard = ({ title, children }) => (
//   <div className="bg-white rounded-xl shadow-md p-5">
//     <h2 className="font-semibold mb-4">{title}</h2>
//     {children}
//   </div>
// );

// const ListCard = ({ title, children }) => (
//   <div className="bg-white rounded-xl shadow-md p-5">
//     <h2 className="font-semibold mb-3">{title}</h2>
//     <div className="space-y-1 text-sm text-gray-700">{children}</div>
//   </div>
// );

// export default SuperAdminDashboard;
