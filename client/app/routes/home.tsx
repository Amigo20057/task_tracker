import type { Route } from "./+types/home";
import type { IBoard } from "~/types/task.interface";
import MiniBoard from "~/components/ui/miniBoard";
import { useState } from "react";
import ModalCreateBoard from "~/components/modals/createBoard";
import { useBoards } from "~/hooks/board/useBoards";
import { useOutletContext } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Task Tracker" },
    { name: "Home", content: "Welcome to Task Tracker!" },
  ];
}

export default function Home() {
  const context = useOutletContext<Record<string, any>>();
  const { data } = useBoards(context.isAuth);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  return (
    <div className="w-full pt-[50px]">
      <h1 className="text-center text-[30px] font-semibold ">Welcome Home</h1>
      {context.isAuth && (
        <div className="w-full mt-[50px] flex p-[0_200px]">
          <>
            {data?.map((board: Pick<IBoard, "id" | "name" | "updatedAt">) => (
              <MiniBoard
                key={board.id}
                id={board.id}
                name={board.name}
                updatedAt={board.updatedAt}
              />
            ))}
            <button
              onClick={() => setIsOpenModal(true)}
              className="relative w-[150px] h-[150px] bg-[#252525] mr-[20px] flex justify-center rounded-[16px] items-center cursor-pointer
            border border-transparent text-[100px]
            hover:border hover:border-white/50
            transition-all duration-300 ease-in-out"
            >
              +
            </button>
          </>
        </div>
      )}
      {isOpenModal && <ModalCreateBoard setIsOpenModal={setIsOpenModal} />}
    </div>
  );
}
