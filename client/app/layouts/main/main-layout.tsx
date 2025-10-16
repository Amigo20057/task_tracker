import { useEffect, useState } from "react";
import { data, Outlet, useNavigate } from "react-router";
import Header from "~/components/header";
import SideBar from "~/components/sideBar";
import GlobalLoadingSpinner from "~/components/ui/globalLoadingSpinner";
import { useProfile } from "~/hooks/user/userProfile";

export default function MainLayout() {
  const { data: userProfileData, isLoading: userIsLoading } = useProfile();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const isAuth = !!userProfileData && !userIsLoading;

  const context = {
    user: userProfileData,
    isAuth,
  };

  return (
    <div className="min-h-screen w-full flex bg-[#191919] text-white">
      <SideBar isAuth={isAuth} isCollapsed={isCollapsed} />

      <div className="flex flex-col flex-1">
        <Header
          isAuth={isAuth}
          name={context.user?.name ?? ""}
          toggleSidebar={() => setIsCollapsed((p) => !p)}
          email={context.user?.email ?? ""}
        />
        <main className="flex-1 p-4">
          <GlobalLoadingSpinner />
          <Outlet context={context} />
        </main>
      </div>
    </div>
  );
}
