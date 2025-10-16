import { Search, Menu } from "lucide-react";
import { Link } from "react-router";
import { useLogout } from "~/hooks/user/mutation/useLogout";
import MiniProfile from "./ui/miniProfile";
import { useState, useRef, useEffect } from "react";

interface IProps {
  toggleSidebar: () => void;
  isAuth: boolean;
  name: string;
  email: string;
}

export default function Header({ toggleSidebar, isAuth, name, email }: IProps) {
  const { logoutMutation } = useLogout();
  const [isOpenMiniProfile, setIsOpenMiniProfile] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsOpenMiniProfile(false);
      }
    };

    if (isOpenMiniProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenMiniProfile]);

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="w-full h-[50px] border-b-2 border-[#2f2f2f] flex items-center justify-between pr-[50px] pl-[20px] bg-[#1c1c1c]">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-[#2f2f2f] rounded-md transition"
        >
          <Menu size={22} />
        </button>
      </div>
      <div className="flex items-center justify-around">
        {isAuth ? (
          <>
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsOpenMiniProfile((prev) => !prev)}
                className="cursor-pointer w-[30px] h-[30px] rounded-full bg-[#565aee] ml-[20px] flex items-center justify-center text-white"
              >
                {name[0]?.toUpperCase()}
              </button>
              {isOpenMiniProfile && (
                <MiniProfile email={email} name={name} logout={logout} />
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              className="ml-[20px] mr-[10px] h-[30px] pointer text-[15px] p-2 rounded-[8px] pl-[10px] flex items-center bg-[#565aee]"
              to="/auth/register"
            >
              Реєстрація
            </Link>
            <Link
              to="/auth/login"
              className="h-[30px] pointer text-[15px] p-2 rounded-[8px] pl-[10px] flex items-center bg-[#565aee]"
            >
              Логін
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
