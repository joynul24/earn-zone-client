import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/Authcontext";
import { toast } from "react-toastify";


const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState();
  const [loading, setLoading] = useState(true);
  const [submissionDetails, setSubmissionDetails] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/tasks/details/${id}`
        );
        setTask(res.data);
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async () => {
    if (!submissionDetails.trim()) {
      return toast.warning("Submission details cannot be empty!");
    }

    const submission = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: user?.email,
      worker_name: user?.displayName,
      submission_details: submissionDetails,
      Buyer_name: task.buyerInfo.name,
      Buyer_email: task.buyerInfo.email,
      current_date: new Date().toISOString(),
      status: "pending",
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/submissions/task`, submission);
      if (res.data.id) {
        toast.success("Task submitted successfully!");
        setSubmissionDetails("");
        navigate('/dashboard/MySubmissions')
      }
    } catch (error) {
      toast.error(`Submission failed: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (!task)
    return (
      <p className="text-center py-10 text-xl text-gray-500 font-bold">
        Task not found.
      </p>
    );

  return (
    <div className="">
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-o font-bold mb-4">{task.task_title}</h2>
        <img
          src={task.task_image_url}
          alt="Task"
          className="w-full h-60 object-cover rounded mb-4"
        />
        <div>
          <img className="w-10 h-10 rounded-full border-green-600 border" src={task.buyerInfo?.photo || "https://i.ibb.co/4pDNDk1/avatar.jpg"} alt="" />
        </div>
        <p><strong className="font-o">Buyer:</strong> <span className="text-green-700 text-sm font-i uppercase">{task.buyerInfo.name}</span></p>
        <p><strong className="font-o">Buyer Email:</strong> <span className="text-sm font-i">{task.buyerInfo.email}</span></p>
        <p><strong className="font-o">Deadline:</strong> <span className="font-i">{new Date(task.completion_date).toLocaleDateString()}</span></p>
        <strong className="font-o">Payable:</strong> <span className="text-orange-400">{task.payable_amount}$</span>
        <p><strong className="font-o">Required Workers:</strong> <span className="font-i text-red-400">{task.required_workers}</span></p>
        <p className="mt-4"><strong className="font-o">Details:</strong> <span className="font-i text-sm text-gray-600">{task.task_detail}</span></p>

        {/* 🔥 Submission Form */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 font-o">Submit Your Work</h3>
          <textarea
            placeholder="Write your submission details here..."
            className="w-full border p-3 rounded mb-4"
            rows="5"
            value={submissionDetails}
            onChange={(e) => setSubmissionDetails(e.target.value)}
          ></textarea>
          <button
            onClick={handleSubmit}
            className="btn bg-green-600 text-white hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
