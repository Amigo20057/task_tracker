import type { Route } from "./+types/board";
import Task from "~/components/ui/task";
import { DndContext } from "@dnd-kit/core";
import { useBoard } from "~/hooks/board/useBoard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Board" }, { name: "Board", content: "Task Tracker Board" }];
}

export default function Board({ params }: Route.ComponentProps) {
  const { data: board, isLoading } = useBoard(params.boardId);

  if (isLoading) return <div>Loading...</div>;
  if (!board) return <div>Board not found</div>;

  console.log(board);

  return (
    <DndContext onDragEnd={(event) => console.log("Dropped:", event)}>
      <div className="p-6 flex flex-col h-full bg-gradient-to-br from-[#1a1a1a] via-[#222] to-[#2c2c2c] text-white">
        <h1 className="text-3xl font-bold mb-6">{board.name}</h1>

        <div className="flex gap-6 overflow-x-auto flex-1">
          {board.sections
            ? board.sections.map((section) => (
                <div
                  key={section.id}
                  className="w-72 flex-shrink-0 bg-[#202020]/80 backdrop-blur-md 
             rounded-2xl p-4 shadow-lg shadow-black/40 
             flex flex-col border border-white/10 transition 
             hover:shadow-xl  duration-200"
                >
                  <h2 className="text-lg font-semibold mb-3">{section.name}</h2>

                  <div className="space-y-3 flex-1">
                    {section.tasks.map((task) => (
                      <Task
                        key={task.id}
                        id={task.id}
                        name={task.name}
                        priority={task.priority}
                        assigned={task.assigned}
                        taskType={task.taskType}
                      />
                    ))}
                  </div>

                  <button className="mt-4 w-full bg-[#323231] cursor-pointer text-sm py-2 rounded-lg">
                    + Add task
                  </button>
                </div>
              ))
            : ""}
        </div>
      </div>
    </DndContext>
  );
}
