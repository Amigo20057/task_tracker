import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex bg-[#191919] text-white">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
