const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      

      <p className="mt-4 text-emerald-700 font-medium animate-pulse">
        Updating Dashboard...
      </p>
    </div>
  );
};

export default Loader;