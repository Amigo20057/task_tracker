import { useEffect, useState } from "react";
import { fetchCalendarByBoardId } from "~/api/fetchCalendar";
import { useBoard } from "~/hooks/board/useBoard";
import { useBoards } from "~/hooks/board/useBoards";

export default function Calendar({ isAuth }: { isAuth: boolean }) {
  const { data: boardsData, isLoading: boardsIsLoading } = useBoards({
    isAuth,
  });
  const [dataCalendar, setDataCalendar] = useState<any>(null);

  const firstBoardId = boardsData?.[0]?.id;

  const { data: boardData, isLoading: boardIsLoading } = useBoard(
    firstBoardId!
  );

  useEffect(() => {
    if (!boardData?.id) return;

    const fetchCalendar = async () => {
      try {
        const response = await fetchCalendarByBoardId(boardData.id);
        setDataCalendar(response);
      } catch (error) {
        console.error("Error get calendar:", error);
      }
    };

    fetchCalendar();
  }, [boardData?.id]);

  if (boardsIsLoading || boardIsLoading)
    return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="w-full h-screen bg-[#141414] flex items-center justify-center">
      <pre className="text-white">
        {dataCalendar ? JSON.stringify(dataCalendar, null, 2) : "Нет данных"}
      </pre>
    </div>
  );
}
