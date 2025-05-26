
const SectionTitle = ({title, subTitle}) => {
    return (
        <div>
             <h2 className="text-center text-xl font-extrabold font-o md:text-3xl lg:text-4xl">{title}</h2>
            <p className="px-3 md:px-0 md:w-md mx-auto mt-5 text-center font-i text-gray-600">{subTitle}</p>
        </div>
    );
};

export default SectionTitle;