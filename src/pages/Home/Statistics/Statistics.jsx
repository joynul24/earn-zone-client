import { useEffect } from "react";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";
import useUsers from "../../../components/shared/hooks/useUsers";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const Statistics = () => {
  const { users, loading, error } = useUsers();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to load users: ${error.message}`);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  const cardStyle =
    "bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105 duration-300";

  return (
    <section className="bg-gray-100 py-16 px-4 text-center mt-20 md:mt-28 rounded-xl my-12">
      <SectionTitle
        title="Platform Statistics"
        subTitle="Get a glimpse of our platform’s success and growth in real numbers."
      />

      <div className="grid mt-16 md:mt-24 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div className={cardStyle} data-aos="fade-up" data-aos-delay="0">
          <h3 className="text-4xl font-bold text-purple-700">
            {users.length || 0}+
          </h3>
          <p className="mt-2 text-gray-700">Total Users</p>
        </div>

        <div className={cardStyle} data-aos="fade-up" data-aos-delay="100">
          <h3 className="text-4xl font-bold text-green-600">1500+</h3>
          <p className="mt-2 text-gray-700">Tasks Completed</p>
        </div>

        <div className={cardStyle} data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-4xl font-bold text-yellow-500">$50000</h3>
          <p className="mt-2 text-gray-700">Total Payments</p>
        </div>

        <div className={cardStyle} data-aos="fade-up" data-aos-delay="300">
          <h3 className="text-4xl font-bold text-blue-600">12000</h3>
          <p className="mt-2 text-gray-700">Active Tasks</p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
