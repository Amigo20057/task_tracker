import { useDraggable } from "@dnd-kit/core";
import { PriorityColor } from "~/consts/colors";
import type { ITask } from "~/types/task.interface";
import { CSS } from "@dnd-kit/utilities";

export default function Task({
  id,
  name,
  assigned,
  deadline,
  priority,
  taskType,
}: Partial<ITask> & { id: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.6 : 1,
    cursor: "grab",
    transition: "transform 0.15s ease, opacity 0.15s ease",
  };

  const priorityColor =
    PriorityColor[priority as keyof typeof PriorityColor] ??
    PriorityColor.DEFAULT;

  const renderAssignedUsers = () => {
    if (Array.isArray(assigned)) {
      return assigned.map((el) => (
        <div key={el.id} className="flex items-center gap-2">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-bold text-white ${el.color}`}
          >
            {el.name[0]}
          </span>
          <span className="text-sm">{el.name}</span>
        </div>
      ));
    }

    if (assigned) {
      return (
        <div className="flex items-center gap-2">
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${assigned.color}`}
          >
            {assigned.name[0]}
          </span>
          <span className="text-sm">{assigned.name}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className="bg-[#323231]/90 p-3 rounded-xl shadow-md 
             hover:shadow-xl hover:-translate-y-1 
             transition-all duration-200 text-white border border-white/10"
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <h3 className="font-medium">{name}</h3>
      <p
        className={`mt-2 text-[12px] font-semibold px-3 py-1 rounded-full 
              ${priorityColor} shadow-sm shadow-black/30`}
      >
        {priority}
      </p>
      <div className="mt-2 flex flex-col gap-2">{renderAssignedUsers()}</div>
      <p
        className={`mt-2 text-[12px] font-semibold px-3 py-1 rounded-full 
              ${taskType === "Task" ? "bg-[#3b82f6]/70" : "bg-[#ef4444]/70"} 
              shadow-sm shadow-black/30`}
      >
        {taskType}
      </p>
    </div>
  );
}
