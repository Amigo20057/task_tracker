import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Header from "~/components/header";
import SideBar from "~/components/sideBar";
import { useProfile } from "~/hooks/user/userProfile";

export default function MainLayout() {
  const navigation = useNavigate();
  const [searchParam, setSearchParam] = useState<string>("");
  const { data: userProfileData, isLoading: userIsLoading } = useProfile();
  const isAuth = !!userProfileData && !userIsLoading;

  return (
    <div className="min-h-screen w-full flex bg-[#191919] text-white">
      {/* Sidebar слева на всю высоту */}
      <SideBar />

      {/* Правая часть (header + контент) */}
      <div className="flex flex-col flex-1">
        <Header isAuth={isAuth} setSearchParam={setSearchParam} />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
