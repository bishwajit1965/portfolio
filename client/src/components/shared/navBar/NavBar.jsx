import "./NavBar.css";

import {
  FaBars,
  FaMoon,
  FaSignInAlt,
  FaSignOutAlt,
  FaSun,
  FaTimes,
  FaUserFriends,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { AuthContext } from "../../../providers/AuthProvider";
import Logo from "/assets/favicon/webDevProF.png";
import { ThemeContext } from "../../../providers/ThemeProvider";

const NavBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, handleSignOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };

  const routes = [
    { id: 1, route: "/", name: "Home" },
    { id: 2, route: "/about-me", name: "About Me" },
    { id: 3, route: "/contact-me", name: "Contact" },
    { id: 4, route: "/blog-posts", name: "Blogs" },
    { id: 5, route: "/portfolio-projects", name: "Projects" },
    { id: 6, route: "/blog-coming-soon", name: "Blog Coming Soon" },
    user ? { id: 7, route: "/bookmarked-posts", name: "Blogs Bookmarked" } : "",
    { id: 8, route: "/rss", name: "Rss" },
    {
      id: 9,
      route: "/pdf",
      name: "Notice",
    },
    {
      id: 10,
      isThemeToggle: true, // Differentiator key
    },
  ];

  const handleLogOut = () => {
    handleSignOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={`navbar py-0 px-0 ${
        theme === "dark" ? "bg-gray-900" : "bg-base-200"
      } lg:py-0 md:py-0 py-0 sm:py-0 lg:bg-base-200 shadow-lg sticky top-0 lg:max-w-full z-50 mx-auto`}
    >
      <div className="navbar dark:border-b dark:bg-slate-900 dark:border-slate-700 m-0 p-0 lg:px-12">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <div
                className="md:hidden text-2xl dropdown"
                onClick={() => handleOpen(setOpen(!open))}
              >
                {open === true ? (
                  <FaTimes
                    size={24}
                    className="m- w- h- border border-slate-300 p-1 rounded-sm"
                  />
                ) : (
                  <FaBars
                    size={24}
                    className="m- w- h-  border border-slate-300 p-1 rounded-sm"
                  />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className={`bg-base-200 border lg:hidden md:hidden lg:ml-2 -ml-4 space-y-1 z-[1] shadow-lg w-72 absolute duration-1000 md:static rounded-b-md ${
                open ? "top-[62px] pl-4" : "-top-80"
              } dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:shadow-lg`}
            >
              {routes.map((item) =>
                item ? (
                  item.isThemeToggle ? ( // Check for the theme toggle button
                    <li key={item.id}>
                      <button
                        className={`theme-toggle-btn items-center ml-3 ${theme}`}
                        onClick={toggleTheme}
                      >
                        {theme === "light" ? <FaMoon /> : <FaSun />}
                      </button>
                    </li>
                  ) : (
                    <li key={item.id}>
                      <a href={item.route}>{item.name}</a>
                    </li>
                  )
                ) : null,
              )}
              {/* {routes.map((route) => (
                <li key={route.id} className="">
                  <NavLink
                    to={route.route}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                  >
                    {route.name}
                  </NavLink>
                </li>
              ))}
              <li>
                <button
                  className={`theme-toggle-btn items-center ${theme}`}
                  onClick={toggleTheme}
                >
                  {theme === "light" ? <FaMoon /> : <FaSun />}
                </button>
              </li> */}
            </ul>
          </div>

          <img src={Logo} alt="Logo" className="lg:w-10 lg:h-10 h-6 w-6" />
          <Link to="/" className="ml-0">
            <span className="xl:text-xl xl:w-48 md:w-32 lg:block xl:block lg:text-xs md:hidden md:ml-0 hidden lg:font-bold text-emerald-500">
              Web-tech
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden md:block lg:flex p-0 m-0">
          <ul className="menu-horizontal">
            {routes?.map((route) => (
              <li key={route.id} className="p-0 m-0">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  to={route.route}
                >
                  {route.name}
                </NavLink>
              </li>
            ))}
            <li className="flex items-center lg:ml-">
              <button
                className={`theme-toggle-btn ${theme}`}
                onClick={toggleTheme}
              >
                {theme === "light" ? <FaMoon size={16} /> : <FaSun size={16} />}
              </button>
            </li>
          </ul>
        </div>
        <div className="navbar-end dark:bg-slate-900">
          <div className="dropdown dropdown-bottom dropdown-end">
            <label
              tabIndex={0}
              className="btn m-1 dark:bg-slate-900 border-none"
            >
              <div className="flex items-center lg:w- w-">
                {user ? (
                  user.photoURL ? (
                    <>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs capitalize">
                          {user ? user.displayName : " "}
                        </span>
                        <img
                          src={user.photoURL}
                          alt="Profile pic"
                          className="lg:w-10 lg:h-10 w-8 h-8 p-1 border-2 border-slate-300 rounded-full shadow-lg"
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] p-2 mt-3 shadow bg-base-100 dark:bg-slate-900 rounded-md w-56 space-y-2"
            >
              {user ? (
                <>
                  <li className="text-xs capitalize bg-base-200 rounded-md p-1 dark:bg-slate-900 dark:text-white">
                    Name: {user?.displayName}
                  </li>
                  <li className="text-xs bg-base-200 rounded-sm p-1 dark:bg-slate-900 dark:text-white">
                    Email: {user?.email}
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
          <div className="flex justify-end items-center">
            {user ? (
              <button
                className="btn btn-sm w-9 lg:w-24 capitalize dark:text-slate-300 dark:bg-slate-900 dark:border-none"
                onClick={handleLogOut}
              >
                <FaSignOutAlt size={18} />
                <span className="hidden lg:block">Logout</span>
              </button>
            ) : (
              <>
                <NavLink to="/login" className="flex items-center">
                  <FaSignInAlt size={18} className="mr-1" />
                  <span className="hidden md:block">Login</span>
                </NavLink>
                <NavLink to="/sign-up" className="flex items-center">
                  <FaUserFriends size={20} className="mr-1" />
                  <span className="hidden md:block">Signup</span>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
