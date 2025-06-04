import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner9 } from "react-icons/im";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import AuthContext from "../../context/Authcontext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import coinImg from "../../assets/logos/coin.png";
import Lottie from "lottie-react";
import registerLottie from "../../assets/lottie-files/register-lottie.json";
import { FiEye, FiEyeOff } from "react-icons/fi";
import imageUpload from "../../components/api/utils";

const Register = () => {
  const { createUser, updateUserProfile, loginUserWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const result = await loginUserWithGoogle();
      if (result.user) {
        await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
          name: result.user.displayName,
          image: result.user.photoURL,
          email: result.user.email,
          role: "worker",
          coin: 10,
        });
        toast.success(
          `Welcome ${
            result.user?.displayName || "User"
          }! You registered successfully with Google`
        );
        navigate("/");
        Swal.fire({
          position: "center",
          title: "You have received 10 coins as a new User!",
          imageUrl: `${coinImg}`,
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: "Success Image",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await createUser(data.email, data.password);
      const imageUrl = await imageUpload(data.image[0]);
      if (result.user) {
        await updateUserProfile({
          displayName: data.name,
          photoURL: imageUrl,
        });

        await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
          name: data.name,
          image: imageUrl,
          email: data.email,
          role: data.selection || "worker",
          coin: data.selection === "buyer" ? 50 : 10,
        });

        toast.success(`Dear! ${data.name} has successfully registered`);
        navigate("/");
        Swal.fire({
          position: "center",
          title: "You have received some coins as a new User!",
          imageUrl: `${coinImg}`,
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: "Success Image",
          showConfirmButton: false,
          timer: 2000,
        });
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
            <Lottie animationData={registerLottie}></Lottie>
          </div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-o text-transparent bg-clip-text bg-gradient-to-r from-[#27d3f1] to-[#d310e9]">
            Sign Up
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 font-i">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name*</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Your name"
              className="rounded-full w-full input focus:border-[#E43EF8] input-bordered"
            />
            {errors.name && (
              <span className="text-red-400">Name field is required</span>
            )}
          </div>

          {/* Photo URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Upload Photo*</span>
            </label>

            <div className="relative w-full">
              <input
                {...register("image", { required: true })}
                type="file"
                accept="image/*"
                className="file-input file-input-ghost btn"
              />
            </div>

            {errors.image && (
              <span className="text-red-400 text-sm mt-1">
                Photo is required
              </span>
            )}
          </div>

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
              <span className="text-red-400">Email field is required</span>
            )}
          </div>

          {/* Password */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text font-semibold">Password*</span>
            </label>

            {/* input with icon inside */}
            <div className="relative">
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                className="rounded-full focus:border-[#E43EF8] w-full input input-bordered pr-12"
              />

              {/* Eye Icon */}
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-black cursor-pointer z-10"
                onClick={togglePassword}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* Error messages */}
            {errors.password?.type === "minLength" && (
              <span className="text-red-400 text-sm">
                Password must be at least 6 characters
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-400 text-sm">
                Password must be less than 20 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-400 text-sm">
                Password must have one uppercase, one lowercase, one number and
                one special character.
              </span>
            )}
          </div>

          {/* Category */}
          <div className="form-control">
            <p className="text-gray-600 font-semibold">Select your category*</p>
            <select
              defaultValue=""
              {...register("selection", { required: true })}
              className="select w-full rounded-full focus:border-[#E43EF8]"
            >
              <option value="" disabled>
                Choose your role
              </option>
              <option value="worker">Worker</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>

          <div className="form-control mt-3">
            <button
              disabled={loading}
              className={`rounded-full btn w-full text-white border-none 
              bg-gradient-to-bl from-[#2ad4f1] to-[#E43EF8] 
              hover:bg-gradient-to-bl hover:from-[#E43EF8] hover:to-[#6CCDDE]
              ${loading && "opacity-50 cursor-not-allowed"}`}
              type="submit"
            >
              {loading ? (
                <ImSpinner9 className="animate-spin text-xl" />
              ) : (
                "Register"
              )}
            </button>
          </div>

          <p className="font-semibold text-center text-[#2ea6bb]">
            Already have an account? please{" "}
            <Link className="text-[#E43EF8]" to="/login">
              Login
            </Link>
            .
          </p>
        </form>

        <h2 className="text-center mt-5 md:text-xl font-bold">
          Or Sign Up With
        </h2>
        <div className="flex justify-center gap-5 mt-3">
          <button
            onClick={handleGoogleRegister}
            disabled={loading}
            className={`btn bg-white text-black w-full rounded-full border-[#ecaff3] 
            hover:border-none hover:text-white hover:bg-gradient-to-bl from-[#E43EF8] to-[#6CCDDE]
            ${loading && "opacity-50 cursor-not-allowed"}`}
          >
            <>
              <FcGoogle />
              Google
            </>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
