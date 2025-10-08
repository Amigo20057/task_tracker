import { Search, Menu } from "lucide-react";
import { Link } from "react-router";
import { useLogout } from "~/hooks/user/mutation/useLogout";

interface IProps {
  setSearchParam: (param: string) => void;
  toggleSidebar: () => void;
  isAuth: boolean;
  name: string;
}

export default function Header({
  setSearchParam,
  toggleSidebar,
  isAuth,
  name,
}: IProps) {
  const { logoutMutation } = useLogout();

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

        <div className="bg-[#282828] h-[30px] w-[300px] flex rounded-[5px] items-center p-[10px]">
          <Search size={18} />
          <input
            type="text"
            placeholder="Пошук"
            onChange={(e) => setSearchParam(e.target.value)}
            className="outline-none ml-[10px] w-full bg-transparent"
          />
        </div>
      </div>

      <div className="flex items-center justify-around">
        {isAuth ? (
          <>
            <button className="h-[30px] pointer text-[15px] p-2 rounded-[8px] pl-[10px] flex items-center bg-[#565aee]">
              + New Project
            </button>
            <button
              onClick={logout}
              className="w-[30px] h-[30px] rounded-full bg-[#565aee] ml-[20px] flex items-center justify-center text-white"
            >
              {name[0]?.toUpperCase()}
            </button>
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
