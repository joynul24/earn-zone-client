import Accordion from "./Accordion/Accordion";
import Banner from "./Banner/Banner";
import CtaSection from "./CtaSection/CtaSection";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
  return (
    <div className="bg-[#F9FAFB]">
      <Banner></Banner>
      <Testimonial></Testimonial>
      <CtaSection></CtaSection>
      <Accordion></Accordion>
    </div>
  );
};

export default Home;
