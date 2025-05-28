const PageLoading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <span className="loading loading-spinner text-[#FFAD5A] loading-lg"></span>
      <p className="mt-4 text-sm text-gray-600">Loading EarnZone...</p>
    </div>
  );
};

export default PageLoading;
