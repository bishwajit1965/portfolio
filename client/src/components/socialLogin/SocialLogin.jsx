import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../providers/AuthProvider";
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
    await signInWithGoogle().then((result) => {
      const loggieInUser = result.user;
      console.log(loggieInUser);
      const saveUser = {
        name: loggieInUser.displayName,
        email: loggieInUser.email,
      };
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(saveUser),
      })
        .then((response) => response.json())
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully logged in with Google!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
        });
    });
  };
  return (
    <div className="">
      <div className="divider my-o"></div>
      <div className="text-center my-2 w-full">
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-circle btn-outline"
        >
          <FaGoogle />
        </button>
      </div>
    </div>
  );
};

export default SocialLogIn;
