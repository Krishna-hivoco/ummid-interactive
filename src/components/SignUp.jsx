const SignUp = () => {
  return (
    <div className="w-full h-full flex flex-col gap-y-[90px] ">

      <div className="flex flex-col gap-y-[34px] px-[60px] pt-[60px]">
        <img className="max-w-full object-cover " src="/images/logo-col.png" alt="" />

        <p className= "font-Montserrat text-white text-lg font-semibold leading-[25.2px] text-center">
          Register to continue...
        </p>
      </div>

      <form className="w-full flex flex-col gap-[18px] ">
        <input
          className="mx-6 font-Montserrat text-base  leading-[22.4px] text-center border-[2px] border-[#E6F3FF80] rounded-xl bg-transparent py-[13.5px] px-3 outline-none text-[#1E1E1E] placeholder:text-[#FFFFFFB2] caret-[#FFFFFFB2]"
          type="text"
          placeholder="Enter Name"
        />

        <input
          className="mx-6 font-Montserrat text-base  leading-[22.4px] text-center border-[2px] border-[#E6F3FF80] rounded-xl bg-transparent py-[13.5px] px-3 outline-none text-[#1E1E1E] placeholder:text-[#FFFFFFB2] caret-[#FFFFFFB2]"
          type="text"
          placeholder="Enter Mobile number"
        />
      </form>

      

    </div>
  );
};

export default SignUp;
