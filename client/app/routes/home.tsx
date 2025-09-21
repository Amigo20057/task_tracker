import { Boards } from "~/consts";
import type { Route } from "./+types/home";
import type { IBoard } from "~/types/task.interface";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Task Tracker" },
    { name: "description", content: "Welcome to Task Tracker!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full pt-[50px]">
      <h1 className="text-center text-[30px] font-semibold ">Welcome Home</h1>
      <div className="w-full mt-[50px] flex p-[0_200px]">
        {Boards.map((board: Pick<IBoard, "id" | "name" | "updatedAt">) => (
          <div
            onClick={() => navigate(`/board/${board.id}`)}
            key={board.id}
            className="relative w-[150px] h-[150px] bg-[#252525] mr-[20px] flex justify-center rounded-[16px] flex-col cursor-pointer
            border border-transparent
            hover:border hover:border-white/50
            transition-all duration-300 ease-in-out
            "
          >
            <div className="w-full h-[50px] absolute rounded-t-[16px] top-0 bg-[#2c2c2c] pointer cursor-pointer"></div>
            <p className="ml-[20px]">{board.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
