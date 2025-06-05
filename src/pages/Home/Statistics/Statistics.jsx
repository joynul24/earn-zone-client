import { toast } from "react-toastify";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";
import useUsers from "../../../components/shared/hooks/useUsers";

const Statistics = () => {
  const { users, loading, error } = useUsers();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if(error) {
    return toast.error(error.message)
  }

  const cardStyle =
    "bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition";

  return (
    <section className="bg-gray-100 py-16 px-4 text-center mt-20 md:mt-28 rounded-xl my-12">
      <SectionTitle
        title="Platform Statistics"
        subTitle=" Get a glimpse of our platform’s success and growth in real numbers."
      ></SectionTitle>

      <div className="grid mt-16 md:mt-24 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div className={cardStyle}>
          <h3 className="text-4xl font-bold text-purple-700">
            {users.length || 0}+
          </h3>
          <p className="mt-2 text-gray-700">Total Users</p>
        </div>

        <div className={cardStyle}>
          <h3 className="text-4xl font-bold text-green-600">1500+</h3>
          <p className="mt-2 text-gray-700">Tasks Completed</p>
        </div>

        <div className={cardStyle}>
          <h3 className="text-4xl font-bold text-yellow-500">$50000</h3>
          <p className="mt-2 text-gray-700">Total Payments</p>
        </div>

        <div className={cardStyle}>
          <h3 className="text-4xl font-bold text-blue-600">12000</h3>
          <p className="mt-2 text-gray-700">Active Tasks</p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
