import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="bg-[url('/bgs/1.png')] md:w-80 md:my-1 md:rounded-2xl  w-full h-svh  scrollbar-hide  md:h-[98vh] bg-cover bg-center bg-no-repeat  md:mx-auto">
      <Outlet />
    </div>
  );
}

export default Layout;
