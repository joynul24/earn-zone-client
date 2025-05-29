// import SplitText from "../AllFramerMotion/SplitText";

// const SectionTitle = ({ title, subTitle }) => {
//   return (
//     <div>
//       <h2 className="text-center text-xl text-[#111827] font-extrabold font-o md:text-3xl lg:text-4xl">
//         <SplitText
//           text={title}
//           delay={100}
//           duration={0.6}
//           ease="power3.out"
//           splitType="chars"
//           from={{ opacity: 0, y: 40 }}
//           to={{ opacity: 1, y: 0 }}
//           threshold={0.1}
//           rootMargin="-100px"
//           textAlign="center"
//         />
//       </h2>
//       <p className="px-3 md:px-0 md:w-md mx-auto mt-5 text-center font-i text-gray-600">
//         <SplitText
//           text={subTitle}
//           delay={150}
//           duration={0.5}
//           ease="power3.out"
//           splitType="words"
//           from={{ opacity: 0, y: 20 }}
//           to={{ opacity: 1, y: 0 }}
//           threshold={0.1}
//           rootMargin="-80px"
//           textAlign="center"
//         />
//       </p>
//     </div>
//   );
// };

// export default SectionTitle;





import SplitText from "../AllFramerMotion/SplitText";

const SectionTitle = ({ title, subTitle }) => {
  return (
    <div>
      {/* Title Animation */}
      <h2 className="text-center text-xl text-[#111827] font-extrabold font-o md:text-3xl lg:text-4xl">
        <SplitText
          key={`title-${title}`} // Unique key for GSAP target diff
          text={title}
          delay={0.1}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          textAlign="center"
        />
      </h2>

      {/* SubTitle Animation */}
      <div className="px-3 md:px-0 md:w-md mx-auto mt-5 text-center font-i text-gray-600">
        <SplitText
          key={`subtitle-${subTitle}`}
          text={subTitle}
          delay={0.2}
          duration={0.5}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          textAlign="center"
        />
      </div>
    </div>
  );
};

export default SectionTitle;
