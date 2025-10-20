import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import SideBarButton from "./ui/sideBarBtn";
import { Calendar, File, List } from "lucide-react";
import { useBoards } from "~/hooks/board/useBoards";

interface IProps {
  isAuth: boolean;
  isCollapsed: boolean;
}

interface IButtonsSideBar {
  name: string;
  path: string;
  Icon: React.FC;
  nameSection?: string;
}

export default function SideBar({ isAuth, isCollapsed }: IProps) {
  const { data: boards, isLoading } = useBoards({ isAuth });
  const location = useLocation();

  const [buttons, setButtons] = useState<IButtonsSideBar[]>([
    { name: "Home", path: "/", Icon: List },
  ]);

  useEffect(() => {
    if (!isAuth) {
      setButtons([{ name: "Home", path: "/", Icon: List }]);
      return;
    }

    const mainButtons = [
      { name: "Home", path: "/", Icon: List },
      { name: "Calendar", path: "/calendar", Icon: Calendar },
    ];

    const boardButtons =
      boards?.map((b) => ({
        nameSection: "Boards",
        name: b.name,
        path: `/board/${b.id}`,
        Icon: List,
      })) || [];

    setButtons([...mainButtons, ...boardButtons]);
  }, [isAuth, boards]);

  if (isLoading && isAuth) {
    return <div></div>;
  }

  const grouped = buttons.reduce<Record<string, IButtonsSideBar[]>>(
    (acc, btn) => {
      const section = btn.nameSection || "Main";
      if (!acc[section]) acc[section] = [];
      acc[section].push(btn);
      return acc;
    },
    {}
  );

  return (
    <aside
      className={`
        bg-[#202020] h-full relative left-0 p-[10px]
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-[70px]" : "w-[250px]"}
      `}
    >
      <h2
        className={`text-center text-lg font-bold transition-opacity duration-300 `}
      >
        {!isCollapsed && (
          <>
            Task<span className="text-[#565aee]"> Tracker</span>
          </>
        )}
        {isCollapsed && (
          <>
            T<span className="text-[#565aee]"> T</span>
          </>
        )}
      </h2>

      <div className="mt-[10px] flex flex-col pt-[20px]">
        {Object.entries(grouped).map(([section, items]) => (
          <div key={section} className="mb-4">
            {!isCollapsed && section !== "Main" && (
              <div className="text-[15px] text-gray-400 mb-2 ">{section}</div>
            )}
            {items.map((el, index) => (
              <SideBarButton
                key={index}
                path={el.path}
                name={isCollapsed ? "" : el.name}
                isActive={el.path === location.pathname}
                Icon={el.Icon}
              />
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
