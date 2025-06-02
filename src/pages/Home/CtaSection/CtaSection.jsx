import { Link } from "react-router-dom";

const CtaSection = () => {
    return (
         <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white text-center py-16 rounded-2xl my-12 shadow-lg px-4">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Start Earning?</h2>
      <p className="text-lg md:text-xl mb-8">
        Sign up now and complete tasks to earn coins. Simple, Fast & Secure.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <Link to="/register">
          <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full hover:scale-105 transition">
            Sign Up
          </button>
        </Link>

        <Link to="/">
          <button className="bg-indigo-100 text-indigo-800 px-6 py-3 rounded-full font-medium hover:bg-white transition">
            Start Task
          </button>
        </Link>

        <Link to="/dashboard">
          <button className="bg-white text-purple-700 px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
            Go to Dashboard
          </button>
        </Link>

        <Link to="/">
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition">
            Subscribe Now
          </button>
        </Link>

        <a href="https://play.google.com/store/apps/details?id=yourapp" target="_blank" rel="noopener noreferrer">
          <button className="bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition">
            Download App
          </button>
        </a>
      </div>

      <p className="text-sm text-gray-200 mt-4">
        EarnZone is trusted by 10,000+ users. Your success starts here.
      </p>
    </section>
    );
};

export default CtaSection;