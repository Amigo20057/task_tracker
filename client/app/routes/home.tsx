import { Boards } from "~/consts";
import type { Route } from "./+types/home";
import type { IBoard } from "~/types/task.interface";
import MiniBoard from "~/components/ui/miniBoard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Task Tracker" },
    { name: "description", content: "Welcome to Task Tracker!" },
  ];
}

export default function Home() {
  return (
    <div className="w-full pt-[50px]">
      <h1 className="text-center text-[30px] font-semibold ">Welcome Home</h1>
      <div className="w-full mt-[50px] flex p-[0_200px]">
        {Boards.map((board: Pick<IBoard, "id" | "name" | "updatedAt">) => (
          <MiniBoard
            key={board.id}
            id={board.id}
            name={board.name}
            updatedAt={board.updatedAt}
          />
        ))}
      </div>
    </div>
  );
}
