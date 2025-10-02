import { Search } from "lucide-react";
import { Link } from "react-router";
import { useLogout } from "~/hooks/user/mutation/useLogout";

interface IProps {
  setSearchParam: (param: string) => void;
  isAuth: boolean;
}

export default function Header({ setSearchParam, isAuth }: IProps) {
  const { logoutMutation } = useLogout();

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="w-full h-[50px] border-b-2 border-[#2f2f2f] flex items-center justify-between pr-[50px] pl-[50px]">
      <div className="bg-[#282828] h-[30px] w-[400px] flex rounded-[5px] items-center p-[10px]">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search"
          className="outline-none ml-[10px] w-full"
        />
      </div>
      <div className="flex items-center justify-around">
        {isAuth ? (
          <button className="h-[30px] pointer text-[15px] p-2 rounded-[8px] pl-[10px] flex items-center bg-[#565aee]">
            + New Project
          </button>
        ) : (
          ""
        )}
        {isAuth ? (
          // <Link
          //   to="/profile"
          //   className="w-[30px] h-[30px] rounded-full bg-[#565aee] ml-[20px]"
          // ></Link>
          <button
            onClick={logout}
            className="w-[30px] h-[30px] rounded-full bg-[#565aee] ml-[20px]"
          ></button>
        ) : (
          <>
            <Link
              className="ml-[20px] mr-[10px] h-[30px] pointer text-[15px] p-2 rounded-[8px] pl-[10px] flex items-center bg-[#565aee]"
              to="/auth/register"
            >
              Register
            </Link>
            <Link
              to="/auth/login"
              className="h-[30px] pointer text-[15px] p-2 rounded-[8px] pl-[10px] flex items-center bg-[#565aee]"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
