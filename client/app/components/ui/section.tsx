import { Pen, Trash } from "lucide-react";
import type { ISectionBoard, ITask } from "~/types/board.interface";
import Task from "./task";
import { useDroppable } from "@dnd-kit/core";

interface IProps {
  section: ISectionBoard;
  onAddTask: (id: string) => void;
  onDeleteSection: (sectionId: string) => void;
  onUpdateSectionName: (id: string) => void;
  setIsOpenModalFullTask: (task: ITask) => void;
}

export default function Section({
  section,
  onAddTask,
  onDeleteSection,
  onUpdateSectionName,
  setIsOpenModalFullTask,
}: IProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: section.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-72 flex-shrink-0 rounded-2xl p-4 border border-white/10 transition duration-200 
    ${isOver ? "bg-[#2a2a2a]" : "bg-[#202020]/80"} relative min-h-[150px]`}
    >
      <div className="flex justify-between">
        <div className="flex ">
          <h2 className="text-lg font-semibold mb-3">{section.name}</h2>
          <Pen
            size={20}
            className="mt-[5px] ml-[20px] cursor-pointer"
            onClick={() => onUpdateSectionName(section.id)}
          />
        </div>
        <Trash
          color="red"
          className="cursor-pointer"
          onClick={() => onDeleteSection(section.id)}
        />
      </div>

      <div className="space-y-3 flex-1 relative z-999">
        {section.tasks?.map((task) => (
          <Task
            key={task.id}
            {...task}
            openModal={(task: ITask) => setIsOpenModalFullTask(task)}
          />
        ))}
      </div>

      <button
        onClick={() => onAddTask(section.id)}
        className="mt-4 w-full bg-[#323231] cursor-pointer text-sm py-2 rounded-lg"
      >
        + Створмти таску
      </button>
    </div>
  );
}
