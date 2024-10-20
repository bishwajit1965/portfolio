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
    // { id: 4, route: "/add-project", name: "Add Project" },
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
    <>
      <div
        className={`navbar ${
          theme === "dark" ? "bg-grey-900" : "bg-base-200"
        } md:py-1 py-0 lg:px- md:px-2 lg:bg-base- bg-base- shadow-lg`}
      >
        <div className="navbar dark:border-b dark:border-slate-700">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <div
                  className="md:hidden text-2xl dropdown"
                  onClick={() => handleOpen(setOpen(!open))}
                >
                  {open === true ? (
                    <FaTimes className="m- w-7 h-7 border-2 border-slate-300 p-1 rounded-sm" />
                  ) : (
                    <FaBars className="m- w-7 h-7  border-2 border-slate-300 p-1 rounded-sm" />
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className={`bg-base-200 border lg:hidden md:hidden mt-3 lg:ml-0 -ml-4 py-2 space-y-1 z-[1] shadow-lg w-56 absolute duration-1000 md:static rounded-b-md ${
                  open ? "top-[49px]" : "-top-60"
                } `}
              >
                {routes.map((route) => (
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
                </li>
              </ul>
            </div>

            <img src={Logo} alt="Logo" className="lg:w-14 lg:h-14 h-8 w-8" />
            <Link to="/" className="ml-0">
              <span className="xl:text-xl xl:w-48 md:w-32 lg:block xl:block lg:text-xs md:hidden md:ml-0 hidden lg:font-bold text-emerald-500">
                Web-tech-services
              </span>
            </Link>
          </div>
          <div className="navbar-center hidden md:block lg:flex">
            <ul className="menu-horizontal">
              {routes.map((route) => (
                <li key={route.id} className="">
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
              <li className="flex items-center lg:ml-8">
                <button
                  className={`theme-toggle-btn ${theme}`}
                  onClick={toggleTheme}
                >
                  {theme === "light" ? <FaMoon /> : <FaSun />}
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
                  <FaSignOutAlt />
                  <span className="hidden lg:block">Logout</span>
                </button>
              ) : (
                <>
                  <NavLink to="/login" className="flex items-center">
                    <FaSignInAlt className="mr-1" />
                    <span className="hidden md:block">Login</span>
                  </NavLink>
                  <NavLink to="/sign-up" className="flex items-center">
                    <FaUserFriends className="mr-1" />
                    <span className="hidden md:block">Signup</span>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
