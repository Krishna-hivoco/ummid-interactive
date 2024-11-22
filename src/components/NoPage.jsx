import { useNavigate } from "react-router-dom";

function NoPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col p-6 justify-center items-center gap-4">
      <h1 className="font-semibold text-5xl text-center opacity-65 text-gray-200 ">404 Page Not Found </h1>
      <button
        onClick={() => navigate("/")}
        className="text-base font-semibold px-3 py-[13px] text-white border-4  border-[#E6F3FF80] rounded-xl mx-auto min-w-min mt-20 text-center"
      >
        Go To Home Page
      </button>
    </div>
  );
}

export default NoPage;
