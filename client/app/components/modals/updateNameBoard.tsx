import { useState } from "react";
import { useUpdateBoard } from "~/hooks/board/mutation/useUpdateBoard";

interface IProps {
  setIsOpenModal: (val: boolean) => void;
  boardId: string;
}

export default function ModalUpdateNameBoard({
  setIsOpenModal,
  boardId,
}: IProps) {
  const { updateBoardMutation } = useUpdateBoard(boardId);
  const [name, setName] = useState<string>("");

  const handleUpdateBoardName = () => {
    const data = {
      name,
    };
    updateBoardMutation.mutate(data);
    setIsOpenModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="w-[500px] max-w-[90%] rounded-2xl bg-[#1c1c1c] p-6 shadow-2xl 
                   transform transition-all duration-300 scale-100 hover:scale-[1.02]"
      >
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
          New name
        </h2>

        <input
          onChange={(val) => setName(val.target.value)}
          type="text"
          placeholder="Enter new board name..."
          className="w-full rounded-lg bg-[#2a2a2a] text-white px-4 py-2 mb-6 
                     border border-transparent focus:border-white/30 focus:outline-none"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsOpenModal(false)}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white 
                       hover:bg-gray-600 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateBoardName}
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium
                       hover:bg-green-500 transition-all shadow-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
