import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";
import Lottie from "lottie-react";
import animationFaq from "../../../assets/lottie-files/lottie-faq.json"

const Accordion = () => {
  return (
    <div className="mt-20 md:mt-32 px-2 md:px-3.5 lg:px-5">
      <SectionTitle
        title="Frequently Asked Questions"
        subTitle="Have questions about how EarnZone works? Find answers to the most common queries below."
      ></SectionTitle>
      {/* Accordion */}
      <div className="mt-16 md:mt-20 flex flex-col md:flex-row items-center">
        <div className="w-72 md:w-[300px] lg:w-[400px]">
              <Lottie animationData={animationFaq}></Lottie>
        </div>
        <div className="flex-1 join join-vertical bg-base-100">
          {/* row-1 */}
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title font-semibold font-o">
              How does EarnZone work?
            </div>
            <div className="collapse-content text-sm font-i">
              EarnZone is a micro-task-based platform where users can complete
              small tasks and earn coins. These coins can later be converted
              into cash or used to unlock premium features.
            </div>
          </div>
          {/* row-2 */}
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold ext-gray-700 font-o">
              What types of tasks are available?
            </div>
            <div className="collapse-content text-sm font-i">
              Tasks on EarnZone include simple actions like following Facebook
              pages, subscribing to YouTube channels, installing apps, filling
              out surveys, solving captchas, and more.
            </div>
          </div>
          {/* row-3 */}
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold font-o">
              How can I withdraw or cash out my coins?
            </div>
            <div className="collapse-content text-sm font-i">
              Once you reach the minimum coin threshold, you can submit a
              withdrawal request. Your coins can be cashed out through bKash,
              Nagad, Rocket, or a bank transfer.
            </div>
          </div>
          {/* row-4 */}
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold font-o">
              Does it cost money to create an account?
            </div>
            <div className="collapse-content text-sm font-i">
              No, creating an EarnZone account is completely free. You can sign
              up using your email or Google account and start earning right
              away.
            </div>
          </div>
          {/* row-5 */}
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold font-o">
              How can I become a top worker?
            </div>
            <div className="collapse-content text-sm font-i">
              To become a top worker, complete tasks accurately and
              consistently. Avoid fake or invalid work. Active and quality users
              are featured in the “Best Worker” section and may receive bonus
              rewards.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
