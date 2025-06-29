import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SiFreelancer } from "react-icons/si";
import { FaUserAstronaut } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div className="my-10 md:my-20">
      <SectionTitle title='What Our Users Are Saying' subTitle='Real feedback from real people who are earning daily by completing simple micro tasks — join them today!'></SectionTitle>
      <div className="px-2 mt-10 md:mt-15 md:px-20">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="flex flex-col justify-center px-3 md:px-28">
                <div className="mx-auto">
                  <Rating
                    style={{ maxWidth: 180 }}
                    value={review.rating}
                    readOnly
                  />
                </div>
                <div className="text-5xl md:text-7xl my-3 mx-auto">
                  <div className="avatar avatar-online avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-16 rounded-full">
                      <img src={review.clinetImg} alt="" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#CD9003] text-center font-m">
                  {review.clientName}
                </h3>
                <div className="px-10 md:px-0 my-3 flex flex-col md:flex-row text-center gap-3 justify-center">
                  <p className="btn text-gray-600">
                    <FaUserAstronaut />
                    {review.clientId}
                  </p>
                  <p className="btn text-gray-600">
                    <SiFreelancer />
                    {review.freelancerId}
                  </p>
                  <p className="btn text-gray-600">
                    <FaTasks />
                    {review.taskId}
                  </p>
                  <p className="btn text-gray-600">
                    <IoMdTimer />
                    {review.timestamp}
                  </p>
                </div>
                <p className="font-i my-3 text-gray-600 text-center">
                  {review.comment}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
