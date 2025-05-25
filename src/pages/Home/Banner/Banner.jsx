import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "./../../../assets/banner/banner-1.jpg"
import banner2 from "./../../../assets/banner/banner-2.jpg"
import banner4 from "./../../../assets/banner/banner-4.jpg"
import banner5 from "./../../../assets/banner/banner-5.jpg"

const Banner = () => {
    return (
        <div>
      <Carousel>
        <div>
          <img src={banner5} />
        </div>
        <div>
          <img src={banner2} />
        </div>
        <div>
          <img src={banner1} />
        </div>
        <div>
          <img src={banner4} />
        </div>
        <div>
          <img src={banner1} />
        </div>
      </Carousel>
    </div>
    );
};

export default Banner;