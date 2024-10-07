import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useContext } from "react";

const SocialLogIn = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
    try {
      const result = await signInWithGoogle(); //Await the result directly

      if (result && result.user) {
        const loggedInUser = result.user;
        console.log("Google logged in user", loggedInUser);
        // Prepare user data to send to the backend
        const saveUser = {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
        };

        // Send user data to backend
        const response = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(saveUser),
        });

        // const responseData = await response.json();

        if (response.ok) {
          // Redirect user after successful login
          navigate(from, { replace: true });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully logged in with Google!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          const responseData = await response.json();
          console.error("Failed to save user:", responseData);
        }
      } else {
        throw new Error("Google login failed. No user data returned.");
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      // Show an error alert if Google login fails
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Google Login Failed",
        text: error.message,
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };
  return (
    <div className="">
      <div className="border-t border-slate-300 dark:border-slate-700"></div>
      <div className="text-center my-2 w-full">
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-circle dark:btn-info border-slate-400 dark:border-slate-600 btn-outline dark:bg-cyan-400 dark:text-base-100 my-1"
        >
          <FaGoogle className="dark:text-red-700 text-xl" />
        </button>
      </div>
    </div>
  );
};

export default SocialLogIn;
