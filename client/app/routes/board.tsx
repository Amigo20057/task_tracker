import type { Route } from "./+types/board";
import { DndContext } from "@dnd-kit/core";
import { useBoard } from "~/hooks/board/useBoard";
import { useState } from "react";
import ModalCreateSection from "~/components/modals/createSection";
import { useDeleteSection } from "~/hooks/board/mutation/useDeleteSection";
import ModalCreateTask from "~/components/modals/createTask";
import Section from "~/components/ui/section";
import { useSwitchTaskSection } from "~/hooks/board/mutation/useSwitchTaskSection";
import ModalUpdateNameSection from "~/components/modals/updateNameSection";
import ModalFullTask from "~/components/modals/fullTask";
import type { ITask } from "~/types/board.interface";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Board" }, { name: "Board", content: "Task Tracker Board" }];
}

export default function Board({ params }: Route.ComponentProps) {
  const { data: board, isLoading, refetch } = useBoard(params.boardId);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { createSectionMutation } = useDeleteSection(params.boardId);
  const [isOpenModalCreateTask, setIsOpenModalCreateTask] = useState(false);
  const [isOpenModalUpdateSectionName, setIsOpenUpdateSectionName] =
    useState(false);
  const [isOpenModalFullTask, setIsOpenModalFullTask] = useState(false);
  const [taskData, setTaskData] = useState<ITask | null>(null);
  const [sectionId, setSectionId] = useState<undefined | string>(undefined);
  const { mutateAsync: switchTask } = useSwitchTaskSection(params.boardId);

  if (isLoading) return <div></div>;
  if (!board) return <div>Board not found</div>;

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over || !active) return;
    if (active.id === over.id) return;

    const taskId = active.id;
    const newSectionId = over.id;

    const oldSection = board?.sections?.find((s) =>
      s.tasks?.some((t) => t.id === taskId)
    );
    if (!oldSection) return;

    if (oldSection.id !== newSectionId) {
      await switchTask({
        boardId: params.boardId,
        oldSectionId: oldSection.id,
        newSectionId,
        taskId,
      });
      await refetch();
    }
  };

  const handleDeleteSection = (sectionId: string) => {
    const data = {
      boardId: params.boardId,
      sectionId: sectionId,
    };
    createSectionMutation.mutate(data);
  };

  const handleOpenFullTask = (task: ITask) => {
    setTaskData(task);
    setIsOpenModalFullTask(true);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-6 flex flex-col h-full bg-gradient-to-br from-[#1a1a1a] via-[#222] to-[#2c2c2c] text-white">
        <h1 className="text-3xl font-bold mb-6">{board.name}</h1>

        <div className="flex gap-6 overflow-x-auto flex-1">
          {board.sections
            ? board.sections.map((section) => (
                <Section
                  key={section.id}
                  section={section}
                  onAddTask={(id: string) => {
                    setSectionId(id);
                    setIsOpenModalCreateTask(true);
                  }}
                  onUpdateSectionName={(id: string) => {
                    setSectionId(id);
                    setIsOpenUpdateSectionName(true);
                  }}
                  onDeleteSection={handleDeleteSection}
                  setIsOpenModalFullTask={handleOpenFullTask}
                />
              ))
            : ""}
          <div
            onClick={() => setIsOpenModal(true)}
            className="w-72 h-[50px] bg-[#202020]/80 backdrop-blur-md cursor-pointer
             rounded-2xl p-4 shadow-lg shadow-black/40 
             flex flex-col border border-white/10 transition 
             hover:shadow-xl  duration-200 justify-center text-[20px]"
          >
            Створити секцію
          </div>
        </div>
      </div>
      {isOpenModal && (
        <ModalCreateSection
          setIsOpenModal={setIsOpenModal}
          boardId={params.boardId}
        />
      )}
      {isOpenModalCreateTask && (
        <ModalCreateTask
          boardId={params.boardId}
          sectionId={sectionId!}
          setIsOpenModal={setIsOpenModalCreateTask}
          refetch={refetch}
        />
      )}
      {isOpenModalUpdateSectionName && (
        <ModalUpdateNameSection
          boardId={params.boardId}
          sectionId={sectionId!}
          setIsOpenModal={setIsOpenUpdateSectionName}
        />
      )}
      {isOpenModalFullTask && (
        <ModalFullTask
          boardId={params.boardId}
          task={taskData!}
          setIsOpenModal={setIsOpenModalFullTask}
          refetch={refetch}
        />
      )}
    </DndContext>
  );
}
