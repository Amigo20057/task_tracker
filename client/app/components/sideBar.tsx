import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import SideBarButton from "./ui/sideBarBtn";
import { Calendar, File, List, MessageCircle, Users } from "lucide-react";
import { useBoards } from "~/hooks/board/useBoards";

interface IProps {
  isAuth: boolean;
}

interface IButtonsSideBar {
  name: string;
  path: string;
  Icon: React.FC;
  nameSection?: string;
}
export default function SideBar({ isAuth }: IProps) {
  const { data: boards, isLoading } = useBoards({ isAuth });
  const location = useLocation();
  const [buttons, setButtons] = useState<IButtonsSideBar[]>([
    { name: "Home", path: "/", Icon: List },
    { name: "Users", path: "/users", Icon: Users },
    { name: "Chats", path: "/chats", Icon: MessageCircle },
    { name: "Documentations", path: "/documentation", Icon: File },
    { name: "Calendar", path: "/calendar", Icon: Calendar },
  ]);

  useEffect(() => {
    if (boards) {
      setButtons((prev) => [
        ...prev,
        ...boards.map((b) => ({
          nameSection: "Boards",
          name: b.name,
          path: `/board/${b.id}`,
          Icon: List,
        })),
      ]);
    }
  }, [boards]);

  if (isLoading) {
    return <div>Loading...</div>;
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
    <aside className="w-[250px] bg-[#202020] h-screen relative left-0 p-[10px]">
      <h2 className="text-center">Logo</h2>
      <div className="mt-[10px] flex flex-col pt-[20px]">
        {Object.entries(grouped).map(([section, items]) => (
          <div key={section} className="mb-4">
            {section !== "Main" && (
              <div className="text-[15px] text-gray-400 mb-2">{section}</div>
            )}
            {items.map((el, index) => (
              <SideBarButton
                key={index}
                path={el.path}
                name={el.name}
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
