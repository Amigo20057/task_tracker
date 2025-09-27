import type { Route } from "./+types/board";
import { Boards } from "~/consts";
import Task from "~/components/ui/task";
import { DndContext } from "@dnd-kit/core";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Board" },
    { name: "description", content: "Task Tracker Board" },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  // const res = await fetch(`/api/boards/${params.boardId}`);
  // const product: IBoard = await res.json();
  // return product;
  return params.boardId;
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}
export default function Board({ loaderData }: Route.ComponentProps) {
  const boardId = loaderData;
  const board = Boards.find((b) => b.id === boardId);

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <DndContext onDragEnd={(event) => console.log("Dropped:", event)}>
      <div className="p-6 flex flex-col h-full">
        <h1 className="text-3xl font-bold mb-6">{board.name}</h1>

        <div className="flex gap-6 overflow-x-auto flex-1">
          {board.sections
            ? board.sections.map((section) => (
                <div
                  key={section.id}
                  className="w-72 flex-shrink-0 bg-[#202020] rounded-2xl p-4 shadow-md flex flex-col"
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
