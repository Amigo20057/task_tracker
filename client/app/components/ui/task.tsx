import { useDraggable } from "@dnd-kit/core";
import { PriorityColor } from "~/constants/colors";
import type { ITask } from "~/types/board.interface";
import { CSS } from "@dnd-kit/utilities";

export default function Task({
  id,
  name,
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

  const renderDeadline = () => {
    if (!deadline) return null;
    const date = new Date(deadline);
    const now = new Date();

    const isOverdue = date < now;
    const formatted = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });

    return (
      <p
        className={`mt-3 text-xs font-medium px-3 py-1 rounded-md w-fit
          ${isOverdue ? "bg-red-500/70 text-white" : "bg-gray-700/70 text-gray-200"}
        `}
      >
        📅 {formatted}
      </p>
    );
  };

  return (
    <div
      className="bg-[#323231]/90 p-4 rounded-xl shadow-md 
             hover:shadow-xl hover:-translate-y-1 
             transition-all duration-200 text-white border border-white/10"
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <h3 className="font-medium mb-2">{name}</h3>

      <p
        className={`text-[12px] font-semibold px-3 py-1 rounded-full 
              ${priorityColor} shadow-sm shadow-black/30 w-fit`}
      >
        {priority}
      </p>

      <p
        className={`mt-3 text-[12px] font-semibold px-3 py-1 rounded-full w-fit
              ${taskType === "Task" ? "bg-[#3b82f6]/70" : "bg-[#ef4444]/70"} 
              shadow-sm shadow-black/30`}
      >
        {taskType}
      </p>

      {renderDeadline()}
    </div>
  );
}
