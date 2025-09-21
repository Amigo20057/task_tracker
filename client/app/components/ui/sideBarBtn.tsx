import type React from "react";
import { Link } from "react-router";

interface IProps {
  path: string;
  name: string;
  isActive: boolean;
  Icon?: React.ElementType;
}

export default function SideBarButton({ path, name, isActive, Icon }: IProps) {
  return (
    <Link
      to={`${path}`}
      className={`pointer text-[15px] p-1 pt-[10px] pb-[10px] mb-1 rounded-[8px] pl-[10px] flex items-center
    ${isActive ? "bg-[#565aee]" : ""}`}
    >
      {Icon && <Icon className="inline-block mr-2" size={18} />} {name}
    </Link>
  );
}
