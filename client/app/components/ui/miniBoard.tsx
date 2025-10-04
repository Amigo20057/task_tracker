import { useNavigate } from "react-router";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { useDeleteBoard } from "~/hooks/board/mutation/useDeleteBoard";

interface IProps {
  id: string;
  name: string;
  updatedAt: Date;
}

export default function MiniBoard({ id, name, updatedAt }: IProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { deleteBoardMutation } = useDeleteBoard(id);

  const handleDeleteBoard = () => {
    deleteBoardMutation.mutate();
  };

  return (
    <div
      className="relative w-[150px] h-[150px] bg-[#252525] mr-[20px] flex justify-center rounded-[16px] flex-col cursor-pointer
            border border-transparent
            hover:border hover:border-white/50
            transition-all duration-300 ease-in-out"
      onClick={() => navigate(`/board/${id}`)}
    >
      <div className="w-full h-[50px] absolute rounded-t-[16px] top-0 bg-[#2c2c2c]"></div>

      <div
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-[#3a3a3a] transition cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <MoreVertical size={18} className="text-white" />
      </div>

      {isOpen && (
        <div
          className="absolute top-8 right-2 w-[120px] bg-[#2c2c2c] rounded-md shadow-md border border-white/10 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              console.log("Удалить доску:", id);
              setIsOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#3a3a3a] rounded-md"
          >
            Перейменувати
          </button>
          <button
            onClick={() => {
              handleDeleteBoard();
              setIsOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-[#3a3a3a] rounded-md"
          >
            Видалити
          </button>
        </div>
      )}

      <p className="ml-[20px]">{name}</p>
    </div>
  );
}
