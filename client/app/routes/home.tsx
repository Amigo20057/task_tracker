import type { Route } from "./+types/home";
import type { IBoard } from "~/types/board.interface";
import MiniBoard from "~/components/ui/miniBoard";
import { useState } from "react";
import ModalCreateBoard from "~/components/modals/createBoard";
import { useBoards } from "~/hooks/board/useBoards";
import { Link, useOutletContext } from "react-router";

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
  console.log("DATA: ", data);
  return (
    <div className="w-full pt-[50px]">
      <h1 className="text-center text-[30px] font-semibold ">
        Головна сторінка
      </h1>
      {context.isAuth && (
        <div className="w-full mt-[50px] flex p-[0_200px]">
          <>
            {data?.map(
              (
                board: Pick<
                  IBoard,
                  "id" | "name" | "updatedAt" | "userCreatorId"
                >
              ) => (
                <MiniBoard
                  key={board.id}
                  id={board.id}
                  name={board.name}
                  updatedAt={board.updatedAt}
                  userCreatorId={board.userCreatorId}
                  userId={context.user.id}
                />
              )
            )}
            <button
              onClick={() => setIsOpenModal(true)}
              className="relative w-[150px] h-[150px] bg-[#252525] mr-[20px] flex justify-center rounded-[16px] items-center cursor-pointer border border-transparent text-[100px] hover:border hover:border-white/50 transition-all duration-300 ease-in-out"
            >
              +
            </button>
          </>
        </div>
      )}
      {!context.isAuth && (
        <div className="flex flex-col items-center justify-center mt-[80px]">
          <h2 className="text-[40px] font-bold text-white mb-4 animate-pulse">
            Ласкаво просимо до
            <span className="text-blue-400">Task Tracker</span>
          </h2>
          <p className="text-gray-400 text-[18px] max-w-[600px] text-center mb-10">
            Керуй своїми проектами, став мети і відстежуй прогрес — все в одному
            місці.
          </p>
          <div className="flex gap-6">
            <Link
              to="/auth/login"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl text-[18px] transition-all duration-300"
            >
              Увійти
            </Link>
            <Link
              to="/auth/register"
              className="px-8 py-3 bg-transparent border border-gray-500 hover:border-white text-white rounded-2xl text-[18px] transition-all duration-300"
            >
              Зареєструватися
            </Link>
          </div>
          <div className="mt-[100px] opacity-40 flex flex-wrap justify-center gap-8">
            <span className="text-[80px]">📋</span>
            <span className="text-[80px]">✅</span>
            <span className="text-[80px]">🧠</span>
            <span className="text-[80px]">📅</span>
            <span className="text-[80px]">🚀</span>
          </div>
        </div>
      )}
      {isOpenModal && <ModalCreateBoard setIsOpenModal={setIsOpenModal} />}
    </div>
  );
}
