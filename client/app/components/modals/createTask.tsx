import { useState } from "react";
import { useCreateTask } from "~/hooks/board/mutation/useCreateTask";
import type { Priority, TaskType } from "~/types/board.interface";

interface IProps {
  setIsOpenModal: (val: boolean) => void;
  sectionId: string;
  boardId: string;
  refetch: () => void;
}

export default function ModalCreateTask({
  setIsOpenModal,
  sectionId,
  boardId,
  refetch,
}: IProps) {
  const { createTaskMutation } = useCreateTask(boardId);
  const [name, setName] = useState<string>("");
  const [taskType, setTaskType] = useState<TaskType>("Task");
  const [deadline, setDeadline] = useState<Date>(new Date());
  const [priority, setPriority] = useState<Priority>("P1");

  const handleCreateTask = async () => {
    const data = {
      name,
      sectionId,
      taskType,
      deadline,
      priority,
    };
    try {
      await createTaskMutation.mutateAsync(data);
      await refetch();
      setIsOpenModal(false);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="w-[500px] max-w-[90%] rounded-2xl bg-[#1c1c1c] p-6 shadow-2xl 
                      transform transition-all duration-300 scale-100 hover:scale-[1.02]"
      >
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
          Створити тікет
        </h2>

        <input
          value={name}
          onChange={(val) => setName(val.target.value)}
          type="text"
          placeholder="Введіть назву..."
          className="w-full rounded-lg bg-[#2a2a2a] text-white px-4 py-2 mb-4 
                     border border-transparent focus:border-white/30 focus:outline-none"
        />

        <select
          value={taskType}
          onChange={(e) => setTaskType(e.target.value as TaskType)}
          className="w-full rounded-lg bg-[#2a2a2a] text-white px-4 py-2 mb-4
                     border border-transparent focus:border-white/30 focus:outline-none"
        >
          <option value="Task">Task</option>
          <option value="Bag">Bug</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="w-full rounded-lg bg-[#2a2a2a] text-white px-4 py-2 mb-4
                     border border-transparent focus:border-white/30 focus:outline-none"
        >
          <option value="P1">Priority 1</option>
          <option value="P2">Priority 2</option>
          <option value="P3">Priority 3</option>
        </select>

        <input
          type="date"
          value={deadline.toISOString().split("T")[0]}
          onChange={(e) => setDeadline(new Date(e.target.value))}
          className="w-full rounded-lg bg-[#2a2a2a] text-white px-4 py-2 mb-6
                     border border-transparent focus:border-white/30 focus:outline-none"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsOpenModal(false)}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white 
                       hover:bg-gray-600 transition-all"
          >
            Скасувати
          </button>
          <button
            onClick={handleCreateTask}
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium
                       hover:bg-green-500 transition-all shadow-md"
          >
            Створити
          </button>
        </div>
      </div>
    </div>
  );
}
