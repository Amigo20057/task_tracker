import { Outlet } from "react-router";
import Header from "~/components/header";
import SideBar from "~/components/sideBar";

export default function MainLayout() {
  return (
    <div className="min-h-screen w-full flex bg-[#1f1f1f] text-white">
      {/* Sidebar слева на всю высоту */}
      <SideBar />

      {/* Правая часть (header + контент) */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
