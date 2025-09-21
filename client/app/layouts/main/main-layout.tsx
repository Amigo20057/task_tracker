import { useState } from "react";
import { Outlet } from "react-router";
import Header from "~/components/header";
import SideBar from "~/components/sideBar";

export default function MainLayout() {
  const [searchParam, setSearchParam] = useState<string>("");

  return (
    <div className="min-h-screen w-full flex bg-[#191919] text-white">
      {/* Sidebar слева на всю высоту */}
      <SideBar />

      {/* Правая часть (header + контент) */}
      <div className="flex flex-col flex-1">
        <Header setSearchParam={setSearchParam} />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
