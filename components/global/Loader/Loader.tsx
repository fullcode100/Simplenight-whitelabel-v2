const Loader = () => {
  return (
    <div className="relative bg-white mt-10 mx-auto w-full h-full flex items-center justify-center">
      <svg
        className="text-primary-200"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" />
      </svg>
      <svg
        className="animate-spin text-primary-1000 absolute"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40 4C50.3516 4 59.6827 8.36906 66.25 15.3637"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default Loader;
