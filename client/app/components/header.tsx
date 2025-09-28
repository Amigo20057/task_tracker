import { Search } from "lucide-react";
import { Link } from "react-router";
import { ISAUTH } from "~/consts";

interface IProps {
  setSearchParam: (param: string) => void;
}

export default function Header({ setSearchParam }: IProps) {
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
        {ISAUTH ? (
          <button className="h-[30px] pointer text-[15px] p-2 rounded-[8px] pl-[10px] flex items-center bg-[#565aee]">
            + New Project
          </button>
        ) : (
          ""
        )}
        {ISAUTH ? (
          <Link
            to="/profile"
            className="w-[30px] h-[30px] rounded-full bg-[#565aee] ml-[20px]"
          ></Link>
        ) : (
          <>
            <Link
              className="ml-[20px] mr-[10px] h-[30px] pointer text-[15px] p-2 rounded-[8px] pl-[10px] flex items-center bg-[#565aee]"
              to="/register"
            >
              Register
            </Link>
            <Link
              to="/login"
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
