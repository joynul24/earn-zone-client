import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import AuthContext from "../../context/Authcontext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import Lottie from "lottie-react";
import loginLottie from "../../assets/lottie-files/login-lottie.json"

const Login = () => {
  const { loginUser, loginUserWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // default: false

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await loginUserWithGoogle();

      if (result.user) {
        await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${result.user.email}`,
          {
            name: result.user.displayName,
            image: result.user.photoURL,
            email: result.user.email,
            role: "worker",
            coin: 10,
          }
        );

        toast.success("User Google login successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed!");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await loginUser(data.email, data.password);

      if (result.user) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/users/${data.email}`,
          {
            email: data.email,
            role: data.selection || "worker",
          }
        );

        toast.success(
          `Dear! ${result.user?.displayName || "User"} has successfully logged in`
        );
        navigate("/");
      }
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-bl from-[#E43EF8] to-[#6CCDDE] min-h-screen">
      <div className="card-body shadow-2xl w-[90%] md:w-[60%] lg:w-[50%] mx-auto bg-white rounded-bl-4xl rounded-br-4xl">
         {/* React Lottie */}
        <div className="flex items-center justify-center">
          <div className="w-[200px]">
             <Lottie animationData={loginLottie}></Lottie>
          </div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-o text-transparent bg-clip-text bg-gradient-to-r from-[#27d3f1] to-[#d310e9]">Sign In</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email*</span>
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Your email"
              className="rounded-full w-full input input-bordered"
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
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
              type="password"
              placeholder="Your password"
              className="rounded-full w-full input input-bordered"
            />
            {errors.password?.type === "minLength" && (
              <span className="text-red-400">
                Password must be at least 6 characters
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-400">
                Password must be less than 20 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-400">
                Must include upper, lower, number & special character
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-3">
            <button
              disabled={loading}
              type="submit"
              className="rounded-full btn w-full text-white border-none bg-gradient-to-bl from-[#2ad4f1] to-[#E43EF8] hover:from-[#E43EF8] hover:to-[#6CCDDE]"
            >
              {loading ? (
                <ImSpinner9 className="animate-spin text-xl" />
              ) : (
                "Continue"
              )}
            </button>
          </div>

          <p className="text-center text-[#2ea6bb]">
            Don't have an account?{" "}
            <Link className="text-[#E43EF8]" to="/register">
              Register
            </Link>
            .
          </p>
        </form>

        <h2 className="text-center mt-5 font-bold">Or Sign In With</h2>

        <div className="flex justify-center gap-5 mt-3">
          <button
            onClick={handleGoogleLogin}
            className="btn bg-white text-black w-full rounded-full border-[#ecaff3] hover:text-white hover:bg-gradient-to-bl from-[#E43EF8] to-[#6CCDDE]"
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
