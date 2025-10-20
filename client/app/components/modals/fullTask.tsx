import { Trash } from "lucide-react";
import { useState } from "react";
import { useDeleteTask } from "~/hooks/board/mutation/useDeleteTask";
import { useUpdateTask } from "~/hooks/board/mutation/useUpdateTask";
import type { ITask, Priority, TaskType } from "~/types/board.interface";

interface IProps {
  task: ITask;
  boardId: string;
  setIsOpenModal: (val: boolean) => void;
  refetch: () => void;
}

export default function ModalFullTask({
  task,
  setIsOpenModal,
  boardId,
  refetch,
}: IProps) {
  const { deleteTaskMutation } = useDeleteTask(task.id, boardId);
  const { updateTaskMutation } = useUpdateTask(boardId, task.id);
  const [name, setName] = useState(task.name);
  const [taskType, setTaskType] = useState<TaskType>(task.taskType);
  const [priority, setPriority] = useState<Priority>(task.priority);
  const [deadline, setDeadline] = useState<Date>(
    task.deadline instanceof Date ? task.deadline : new Date(task.deadline)
  );
  const [description, setDescription] = useState<string>(task.description!);

  const handleUpdateTask = () => {
    const data: Partial<ITask> = {
      name,
      taskType,
      priority,
      deadline,
      description,
    };
    updateTaskMutation.mutate(data);
    setIsOpenModal(false);
  };

  const handleDeleteTask = async () => {
    try {
      setIsOpenModal(false);
      await deleteTaskMutation.mutateAsync();
      await refetch();
    } catch (err) {
      console.error("Error deleting task: ", err);
      setIsOpenModal(true);
    }
  };

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="w-[500px] max-w-[90%] rounded-2xl bg-[#1c1c1c] p-6 shadow-2xl 
                      transform transition-all duration-300 scale-100 hover:scale-[1.02]"
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Інформація про тікет
          </h2>
          <Trash
            color="red"
            className="cursor-pointer"
            onClick={handleDeleteTask}
          />
        </div>

        <input
          value={name}
          onChange={(val) => setName(val.target.value)}
          type="text"
          placeholder="Введіть назву"
          className="w-full rounded-lg bg-[#2a2a2a] text-white px-4 py-2 mb-4 
                     border border-transparent focus:border-white/30 focus:outline-none"
        />

        <textarea
          name="textarea"
          placeholder="Введіть опис"
          value={description}
          onChange={(val) => setDescription(val.target.value)}
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
            onClick={handleUpdateTask}
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium
                       hover:bg-green-500 transition-all shadow-md"
          >
            Оновити
          </button>
        </div>
      </div>
    </div>
  );
}
