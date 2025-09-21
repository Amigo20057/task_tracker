import { useLocation } from "react-router";
import SideBarButton from "./ui/sideBarBtn";
import { Calendar, File, List, MessageCircle, Users } from "lucide-react";

export default function SideBar() {
  const location = useLocation();
  return (
    <aside className="w-[250px] bg-[#202020] h-screen relative left-0 p-[10px]">
      <h2 className="text-center">Logo</h2>
      <div className="mt-[10px] flex flex-col pt-[20px]">
        {buttons.map((el, index) => (
          <SideBarButton
            key={index}
            path={el.path}
            name={el.name}
            isActive={el.path === location.pathname}
            Icon={el.Icon}
          />
        ))}
      </div>
    </aside>
  );
}

const buttons = [
  {
    name: "Home",
    path: "/",
    Icon: List,
  },
  {
    name: "Users",
    path: "/users",
    Icon: Users,
  },
  {
    name: "Chats",
    path: "/chats",
    Icon: MessageCircle,
  },
  {
    name: "Documentations",
    path: "/documentation",
    Icon: File,
  },
  {
    name: "Calendar",
    path: "/calendar",
    Icon: Calendar,
  },
];
