import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import AuthContext from "../../context/Authcontext";
import { useForm } from "react-hook-form";

const Login = () => {
  const { loginUser, loginUserWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleGoogleLogin = () => {
    const result = loginUserWithGoogle();
    if (result) {
      navigate("/");
    }
  };

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data.email, data.password);
      if (result.user) {
        console.log(result.user);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-bl from-[#E43EF8] to-[#6CCDDE] min-h-screen">
      {/* Register form */}
      <div className="card-body shadow-2xl w-[90%] md:w-[60%] lg:w-[50%] mx-auto bg-white rounded-bl-4xl rounded-br-4xl">
        <h1 className="text-xl font-o font-bold text-center  text-transparent bg-clip-text bg-gradient-to-r from-[#27d3f1] to-[#d310e9]">
          Sign In
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 font-i">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email*</span>
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Your email"
              className="rounded-full focus:border-[#E43EF8] w-full input input-bordered"
            />
            {errors.email && (
              <span className="text-red-400">
                These credentials do not match our records.
              </span>
            )}
          </div>
          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password*</span>
            </label>
            <input
             {...register("password", { required: true })}
              type="password"
              placeholder="Your password"
              className="rounded-full focus:border-[#E43EF8] w-full input input-bordered"
            />
          </div>
          <div className="form-control mt-3">
            <input
              className="rounded-full btn  w-full text-white border-none bg-gradient-to-bl from-[#2ad4f1] to-[#E43EF8] hover:bg-gradient-to-bl hover:from-[#E43EF8] hover:to-[#6CCDDE]"
              type="submit"
              value="Continue"
            />
          </div>
          <p className="font-semibold text-center text-[#2ea6bb]">
            Already have an account? please{" "}
            <Link className="text-[#E43EF8]" to="/register">
              Register
            </Link>
            .
          </p>
        </form>
        <h2 className="text-center mt-5 md:text-xl font-bold">
          Or Sign Up With
        </h2>
        <div className="flex justify-center gap-5 mt-3">
          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            className="btn bg-white text-black w-full rounded-full border-[#ecaff3] hover:border-none hover:text-white  hover:bg-gradient-to-bl from-[#E43EF8] to-[#6CCDDE]"
          >
            <FcGoogle />
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
