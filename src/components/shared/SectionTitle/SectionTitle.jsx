import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const SectionTitle = ({ title, subTitle }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="px-3 md:px-0 md:w-md mx-auto mt-5 text-center font-i text-gray-600" data-aos="fade-down">
      <h2 className="text-center text-xl text-[#111827] font-extrabold font-o md:text-3xl lg:text-4xl">{title}</h2>
      <p className="px-3 md:px-0 md:w-md mx-auto mt-5 text-center font-i text-gray-600">{subTitle}</p>
    </div>
  );
};

export default SectionTitle;
