import Logo from "/assets/favicon/webDevProF.png";
import SuperAdImage from "/assets/bishwajit-1.jpg";
import { SuperAdminAuthContext } from "../context/SuperAdminAuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaMailBulk,
  FaMoon,
  FaSignOutAlt,
  FaSun,
  FaTimes,
  FaUser,
} from "react-icons/fa";

const SuperAdminNavBar = ({
  onBtnClick,
  onMenuClick,
  isOpen,
  adminTheme,
  toggleAdminTheme,
}) => {
  const navigate = useNavigate();
  const { user, logoutSuperAdmin } = useContext(SuperAdminAuthContext);
  console.log("User:", user);

  const handleLogOut = () => {
    logoutSuperAdmin();
    navigate("/super-admin/login");
  };

  return (
    <div
      className={`navbar py-0 px-0 border-b border-base-300 admin-dark:border-slate-700 shadow-sm ${adminTheme === "admin-light" ? "bg-base-200 text-slate-800" : "bg-gray-800 text-slate-300 border-slate-700"} sticky top-0 z-50`}
    >
      <div className="flex-1 space-x-1 justify-between items-center">
        {isOpen ? (
          <button
            onClick={onBtnClick}
            className="border border-base-300 rounded-sm shadow p-1 cursor-pointer"
          >
            <FaTimes size={20} />
          </button>
        ) : (
          <button
            onClick={onMenuClick}
            className="lg:hidden border border-base-300 rounded-sm shadow p-1 cursor-pointer"
          >
            <FaBars size={20} />
          </button>
        )}
        <div className="flex items-center gap-2">
          <img
            src={Logo}
            alt="Portfolio logo"
            className="w-8 h-8 rounded-full"
          />
          <a className="btn btn-ghost btn-sm font-bold lg:text-xl text-sm p-0 m-0">
            Bishwajit.dev • Portfolio
          </a>
        </div>
        <div className="">
          <span onClick={toggleAdminTheme} className=" ">
            {adminTheme === "admin-light" ? (
              <span className="text-md cursor-pointer">
                <FaMoon />
              </span>
            ) : (
              <span className="text-md cursor-pointer">
                <FaSun className="" />
              </span>
            )}
          </span>
        </div>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 h-10 overscroll-y-auto rounded-full">
              {user ? (
                <img
                  src={SuperAdImage}
                  alt={user.email}
                  className="w-10 h-10 overscroll-y-auto rounded-full"
                />
              ) : (
                "Login"
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 admin-dark:bg-slate-700 admin-dark:text-slate-300 rounded-box z-[1] mt-3 w-52 p-2 shadow admin-dark:shadow-lg"
          >
            <li>
              <p>
                <FaUser /> {user.role}
              </p>
            </li>
            <li>
              <p className="flex items-center">
                <FaMailBulk /> {user.email}
              </p>
            </li>
            <li>
              <a onClick={handleLogOut} className="m-0">
                <FaSignOutAlt /> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminNavBar;
