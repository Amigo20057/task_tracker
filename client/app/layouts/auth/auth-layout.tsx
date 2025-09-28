import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#191919] text-white">
      <Outlet />
    </div>
  );
}
