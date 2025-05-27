import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import AuthContext from "../../context/Authcontext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import coinImg from "../../assets/logos/coin.png";

const Register = () => {
  const { createUser, updateUserProfile, loginUserWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleGoogleRegister = async () => {
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
    }
  };

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      if (result.user) {
        // Wait until the profile is fully updated
        await updateUserProfile({
          displayName: data.name,
          photoURL: data.photo,
        });

        // Save user info to DB
        await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
          name: data.name,
          image: data.photo,
          email: data.email,
          role: data.selection || "worker",
          coin: data.selection === "buyer" ? 50 : 10,
        });

        toast.success(`Mr ${data.name} has successfully registered`);
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
    }
  };

  return (
    <div className="bg-gradient-to-bl from-[#E43EF8] to-[#6CCDDE] min-h-screen">
      {/* Register form */}
      <div className="card-body shadow-2xl w-[90%] md:w-[60%] lg:w-[50%] mx-auto bg-white rounded-bl-4xl rounded-br-4xl">
        <h1 className="text-xl font-o font-bold text-center  text-transparent bg-clip-text bg-gradient-to-r from-[#27d3f1] to-[#d310e9]">
          Sign Up
        </h1>
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
              className="rounded-full w-full input input-bordered"
            />
            {errors.name && (
              <span className="text-red-400">Name field is required</span>
            )}
          </div>
          {/* Photo Url */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Photo URL*</span>
            </label>
            <input
              {...register("photo", { required: true })}
              type="url"
              placeholder="Your photo URL"
              className="rounded-full focus:border-[#E43EF8] w-full input input-bordered"
            />
            {errors.name && (
              <span className="text-red-400">Photo Url field is required</span>
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
            {errors.name && (
              <span className="text-red-400">Email field is required</span>
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
              className="rounded-full focus:border-[#E43EF8] w-full input input-bordered"
            />
            {errors.password?.type === "minLength" && (
              <span className="text-red-400">
                Password must be at least 6 characters
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-400">
                Password be less than 20 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-400">
                Password must have one uppercase one lower case, one number and
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
            <input
              className="rounded-full btn  w-full text-white border-none bg-gradient-to-bl from-[#2ad4f1] to-[#E43EF8] hover:bg-gradient-to-bl hover:from-[#E43EF8] hover:to-[#6CCDDE]"
              type="submit"
              value="Register"
            />
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
          {/* Google */}
          <button
            onClick={handleGoogleRegister}
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

export default Register;
