import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import SocialLogIn from "../../components/shared/socialLogin/SocialLogin";
import Swal from "sweetalert2";
import { useContext } from "react";
import { useForm } from "react-hook-form";

// import withReactContent from "sweetalert2-react-content";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        updateUserProfile(data.name, data.photoUrl)
          .then(() => {
            const saveUser = { name: data.name, email: data.email };
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(saveUser),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.insertedId) {
                  reset();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User profile picture updated !",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/");
                }
              });

            console.log("User profile picture updated");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Helmet>
        <title>Web-tech-services || Sign Up</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200 dark:bg-slate-900">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Sign up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Name..."
                  className="input input-bordered h-8"
                  aria-invalid={errors.name ? "true" : "false"}
                />

                {errors.name?.type === "required" && (
                  <p className="text-red-600 text-xs mt-2" role="alert">
                    Name is required
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoUrl", { required: true })}
                  name="photoUrl"
                  placeholder="Photo url..."
                  className="input input-bordered h-8"
                  aria-invalid={errors.photoUrl ? "true" : "false"}
                />

                {errors.name?.type === "required" && (
                  <p className="text-red-600 text-xs mt-2" role="alert">
                    Photo url is required
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered h-8"
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-600 text-xs mt-2" role="alert">
                    Email is required
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                  placeholder="password"
                  className="input input-bordered h-8"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600 text-xs mt-2" role="alert">
                    Password is required
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600 text-xs mt-2" role="alert">
                    Password should be at least 6 chars.
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600 text-xs mt-2" role="alert">
                    Password max length is 20 chars.
                  </p>
                )}
                <label className="label">
                  <div className="label-text-alt link link-hover">
                    <Link className="text-indigo-500" to="/login">
                      Already a member ?{" "}
                      <span className="text-amber-500">Please Login</span>
                    </Link>
                  </div>
                </label>
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Sign up{" "}
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

export default SignUp;
