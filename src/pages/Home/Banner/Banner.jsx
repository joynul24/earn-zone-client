import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "./../../../assets/banner/banner-1.jpg";
import banner2 from "./../../../assets/banner/banner-2.jpg";
import banner4 from "./../../../assets/banner/banner-4.jpg";
import banner5 from "./../../../assets/banner/banner-5.jpg";

const Banner = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-16">
      <Carousel
        autoPlay
        interval={3000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        stopOnHover={true}
        swipeable={true}
        emulateTouch={true}
        dynamicHeight={false}
      >
        <div>
          <img src={banner5} alt="Banner 5" />
        </div>
        <div>
          <img src={banner2} alt="Banner 2" />
        </div>
        <div>
          <img src={banner1} alt="Banner 1" />
        </div>
        <div>
          <img src={banner4} alt="Banner 4" />
        </div>
        <div>
          <img src={banner1} alt="Banner 1" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
