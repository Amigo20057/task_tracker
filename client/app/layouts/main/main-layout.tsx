import { useEffect, useState } from "react";
import { data, Outlet, useNavigate } from "react-router";
import Header from "~/components/header";
import SideBar from "~/components/sideBar";
import { useProfile } from "~/hooks/user/userProfile";

export default function MainLayout() {
  const navigation = useNavigate();
  const [searchParam, setSearchParam] = useState<string>("");
  const { data: userProfileData, isLoading: userIsLoading } = useProfile();
  const isAuth = !!userProfileData && !userIsLoading;

  const context = {
    user: userProfileData,
    isAuth,
  };

  return (
    <div className="min-h-screen w-full flex bg-[#191919] text-white">
      <SideBar isAuth={isAuth} />

      <div className="flex flex-col flex-1">
        <Header
          isAuth={isAuth}
          setSearchParam={setSearchParam}
          name={data.name}
        />
        <main className="flex-1 p-4">
          <Outlet context={context} />
        </main>
      </div>
    </div>
  );
}
