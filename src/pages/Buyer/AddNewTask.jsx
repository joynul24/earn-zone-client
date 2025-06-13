import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import AuthContext from "../../context/Authcontext";
import { toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";
import imageUpload from "../../components/api/utils";

const AddNewTask = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const {
      task_title,
      task_detail,
      required_workers,
      payable_amount,
      completion_date,
      submission_info,
    } = data;

    const totalCost = required_workers * payable_amount;
    try {
      const buyerRes = await axios.get(`${import.meta.env.VITE_API_URL}/users/${user.email}`);
      const availableCoin = buyerRes.data.coin;
      if (totalCost > availableCoin) {
        alert("Not enough coin. Please purchase more coins.");
        return navigate("/dashboard/purchaseCoin");
      }
      const task = {
        task_title,
        task_detail,
        required_workers,
        payable_amount,
        completion_date,
        submission_info,
        task_image_url: imageUrl,
        buyer_email: user.email,
        status: "pending",
        assigned: 0,
        created_at: new Date(),
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/buyer/tasks`, task);
      
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/deduct-coin/${user.email}`, {
        coin: totalCost,
      });

      toast.success("✅ Task added successfully!");
      reset();
      navigate("/dashboard/myTask");
    } catch (error) {
      console.error(error);
      toast.error(`❌ Failed to add task: ${error.message}`);
    }
  };

  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setLoadingImage(true);
  try {
    const url = await imageUpload(file);
    setImageUrl(url);
    toast.success("✅ Image uploaded successfully!");
  } catch (error) {
    toast.error(`❌ Image upload failed: ${error.message}`);
  } finally {
    setLoadingImage(false);
  }
};


  return (
    <div className="pt-24 px-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center font-o text-gray-800">
        Add New Task
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6 space-y-5"
      >
        {/* Task Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Task Title
          </label>
          <input
            type="text"
            {...register("task_title", { required: true })}
            placeholder="e.g. Watch a YouTube video and comment"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.task_title && (
            <p className="text-red-500 text-sm mt-1">Title is required</p>
          )}
        </div>

        {/* Task Detail */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Task Detail
          </label>
          <textarea
            {...register("task_detail", { required: true })}
            placeholder="Detailed task instruction..."
            className="w-full border border-gray-300 rounded px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {errors.task_detail && (
            <p className="text-red-500 text-sm mt-1">Detail is required</p>
          )}
        </div>

        {/* Required Workers */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Required Workers
          </label>
          <input
            type="number"
            {...register("required_workers", { required: true, min: 1 })}
            placeholder="e.g. 10"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.required_workers && (
            <p className="text-red-500 text-sm mt-1">
              Enter a valid number (min: 1)
            </p>
          )}
        </div>

        {/* Payable Amount */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Payable Amount (Per Worker)
          </label>
          <input
            type="number"
            {...register("payable_amount", { required: true, min: 1 })}
            placeholder="e.g. 5"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.payable_amount && (
            <p className="text-red-500 text-sm mt-1">
              Enter a valid amount (min: 1)
            </p>
          )}
        </div>

        {/* Completion Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Completion Date
          </label>
          <input
            type="date"
            {...register("completion_date", { required: true })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.completion_date && (
            <p className="text-red-500 text-sm mt-1">Date is required</p>
          )}
        </div>

        {/* Submission Info */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Submission Requirement
          </label>
          <input
            type="text"
            {...register("submission_info", { required: true })}
            placeholder="e.g. Screenshot"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.submission_info && (
            <p className="text-red-500 text-sm mt-1">
              Submission info is required
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Task Image (Optional)
          </label>

          <div>
            <label
              htmlFor="taskImage"
              className="flex items-center justify-center w-full sm:w-64 px-4 py-3 bg-blue-50 text-blue-600 border border-dashed border-blue-400 rounded-lg cursor-pointer hover:bg-blue-100 transition"
            >
              <FaCloudUploadAlt className="text-2xl mr-2" />
              <span>{loadingImage ? "Uploading..." : "Upload Image"}</span>
              <input
                id="taskImage"
                type="file"
                accept="image/*"
                {...register("task_image", {
                  onChange: handleImageUpload,
                })}
                className="hidden"
              />
            </label>
          </div>

          {imageUrl && (
            <div className="mt-4">
              <p className="text-gray-600 text-sm mb-1">Preview:</p>
              <img
                src={imageUrl}
                alt="Task"
                className="w-40 h-40 object-cover rounded border shadow"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loadingImage}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddNewTask;