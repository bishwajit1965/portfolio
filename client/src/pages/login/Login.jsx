import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import SocialLogIn from "../../components/shared/socialLogin/SocialLogin";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
      .then((result) => {
        console.log("Result:", result);
        const user = result.user;
        if (user) {
          MySwal.fire({
            position: "top-end",
            icon: "success",
            title: "You are successfully logged in !",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        navigate(from, { replace: true });
        // Navigate based on user role
        if (user.role === "super-admin") {
          navigate("/super-admin-dashboard");
        } else {
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
        // Show an error message if login fails
        // MySwal.fire({
        //   position: "top-end",
        //   icon: "error",
        //   title: "Login failed!",
        //   text: error.message || "Something went wrong.",
        //   showConfirmButton: true,
        //   timer: 1500,
        // });
      });
  };

  const handleValidateCaptcha = (event) => {
    event.preventDefault();
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value) == true) {
      setDisabled(false);
      alert("Captcha Matched.");
    } else if (user_captcha_value.trim() === "") {
      alert("Fill up captcha.");
      setDisabled(true);
    } else {
      alert("Captcha Does Not Match.");
      setDisabled(true);
    }
  };
  return (
    <>
      <Helmet>
        <title>Web-tech-services || Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200 dark:bg-slate-900">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-slate-800">
            <form onSubmit={handleLogIn} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-slate-200">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  className="input input-bordered h-8 dark:bg-slate-700"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-slate-200">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  className="input input-bordered h-8 dark:bg-slate-700"
                  placeholder="password"
                />
                <label className="label">
                  <div className="label-text-alt link link-hover grid space-y-2">
                    <Link className="text-indigo-500 text-xs dark:text-slate-200">
                      Forgot password ?{" "}
                      <span className="text-amber-500 dark:text-slate-200">
                        Reset your password
                      </span>
                    </Link>
                    <Link
                      className="text-indigo-500 text-xs dark:text-slate-200"
                      to="/sign-up"
                    >
                      Not a member yet ?{" "}
                      <span className="text-amber-500 dark:text-slate-200">
                        Please Register
                      </span>
                    </Link>{" "}
                  </div>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  name="captcha"
                  ref={captchaRef}
                  className="input input-bordered h-8 dark:bg-slate-700 dark:border-slate-500"
                  placeholder="Type the captcha above..."
                />
                <button
                  onClick={handleValidateCaptcha}
                  className="btn btn-outline btn-xs mt-6 dark:text-slate-200"
                >
                  Validate
                </button>
              </div>
              <div className="form-control mt-4 dark:bg-slate-700 rounded-md">
                <button
                  disabled={disabled}
                  type="submit"
                  className="btn btn-info dark:text-slate-600 text-xl mb-0"
                >
                  Login{" "}
                </button>
              </div>
            </form>
            <SocialLogIn />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
