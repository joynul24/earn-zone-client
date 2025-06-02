import Accordion from "./Accordion/Accordion";
import Banner from "./Banner/Banner";
import CtaSection from "./CtaSection/CtaSection";
import Statistics from "./Statistics/Statistics";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
  return (
    <div className="bg-[#F9FAFB]">
      <Banner></Banner>
      <Statistics></Statistics>
      <Testimonial></Testimonial>
      <CtaSection></CtaSection>
      <Accordion></Accordion>
    </div>
  );
};

export default Home;
