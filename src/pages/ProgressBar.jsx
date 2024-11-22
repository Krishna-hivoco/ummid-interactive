const ProgressBar = ({ progress = "90" }) => {
  return (
    <div className="w-full bg-white rounded-full mt-3 ">
      <div
        style={{
          width: `${progress}%`,
        }}
        className={`appearance-none h-2 bg-[#1BAB29] w-full rounded-2xl "`}
      ></div>
    </div>
  );
};

export default ProgressBar;
