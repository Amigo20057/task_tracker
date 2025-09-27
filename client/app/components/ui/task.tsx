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
      className="bg-[#323231] p-3 rounded-xl shadow hover:shadow-lg transition text-white"
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <h3 className="font-medium">{name}</h3>
      <p
        className={`mt-[5px] mb-[5px] text-[13px] font-semibold px-2 py-1 rounded ${priorityColor} inline-block`}
      >
        {priority}
      </p>
      <div className="mt-2 flex flex-col gap-2">{renderAssignedUsers()}</div>
      <p
        className={`mt-[10px] mb-[5px] text-[13px] font-semibold px-2 py-1 rounded ${taskType === "Task" ? "bg-[#456483]" : "bg-[#894953]"} inline-block`}
      >
        {taskType}
      </p>
    </div>
  );
}
