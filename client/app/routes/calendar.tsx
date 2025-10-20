import { useEffect, useMemo, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  fetchCalendarByBoardId,
  type ResponseCalendarData,
} from "~/api/fetchCalendar";
import type { ITask } from "~/types/board.interface";
import { useOutletContext } from "react-router";
import type { IContext } from "~/types/base.interface";
import ModalFullTask from "~/components/modals/fullTask";
import { useBoards } from "~/hooks/board/useBoards";
import { useBoard } from "~/hooks/board/useBoard";

if (typeof window !== "undefined") {
  moment.locale("uk");
}

const localizer = momentLocalizer(moment);

export default function TaskCalendar() {
  const { boards } = useOutletContext<IContext>();

  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [dataCalendar, setDataCalendar] = useState<ResponseCalendarData>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<
    (typeof Views)[keyof typeof Views]
  >(Views.MONTH);
  const [currentBoardId, setCurrentBoardId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (boards && boards.length > 0 && !currentBoardId) {
      setCurrentBoardId(boards[0].id);
    }
  }, [boards]);

  useEffect(() => {
    if (!currentBoardId) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchCalendarByBoardId(currentBoardId);
        setDataCalendar(data);
      } catch (error) {
        console.error("Помилка при завантаженні календаря:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentBoardId]);

  const events = useMemo(() => {
    if (!dataCalendar) return [];

    return Object.values(dataCalendar).flatMap((tasks) =>
      tasks.map((task: ITask) => ({
        title: task.name,
        start: new Date(task.deadline),
        end: new Date(task.deadline),
        allDay: true,
        resource: task,
      }))
    );
  }, [dataCalendar]);

  const handleRefetch = async () => {
    if (!currentBoardId) return;
    try {
      const { data } = await fetchCalendarByBoardId(currentBoardId);
      setDataCalendar({ ...data });
    } catch (err) {
      console.error(err);
    }
  };

  if (!isMounted) {
    return (
      <div
        style={{
          height: "700px",
          backgroundColor: "#1e1e1e",
          borderRadius: "12px",
          padding: "16px",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Завантаження...
      </div>
    );
  }

  return (
    <div
      style={{
        height: "700px",
        backgroundColor: "#1e1e1e",
        borderRadius: "12px",
        padding: "16px",
        color: "white",
      }}
    >
      <div className="w-full h-[50px] bg-[#2a2a2a] mb-[10px] flex items-center px-4 rounded-md">
        <label htmlFor="boardSelect" className="text-sm mr-2 text-gray-300">
          Виберіть дошку:
        </label>
        <select
          id="boardSelect"
          value={currentBoardId ?? ""}
          onChange={(e) => setCurrentBoardId(e.target.value)}
          className="bg-[#1f1f1f] text-white px-3 py-2 rounded-lg border border-[#3b3b3b] focus:outline-none focus:ring-2 focus:ring-[#4f46e5] transition"
        >
          {boards?.map((board) => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-[600px] text-gray-400">
          Завантаження подій...
        </div>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          view={currentView}
          date={currentDate}
          onView={(view) => setCurrentView(view)}
          onNavigate={(date) => setCurrentDate(date)}
          popup
          onSelectEvent={(event) => {
            setSelectedTask(event.resource);
            setIsOpenModal(true);
          }}
          style={{
            height: "100%",
            color: "white",
            backgroundColor: "#2a2a2a",
            borderRadius: "12px",
          }}
          messages={{
            month: "Місяць",
            week: "Тиждень",
            day: "День",
            today: "Сьогодні",
            previous: "Назад",
            next: "Вперед",
            showMore: (total) => `+${total} ще`,
          }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor:
                event.resource.taskType === "Task" ? "#4f46e5" : "#16a34a",
              color: "white",
              borderRadius: "8px",
              padding: "2px 6px",
              border: "none",
            },
          })}
        />
      )}

      {isOpenModal && selectedTask && (
        <ModalFullTask
          boardId={currentBoardId!}
          setIsOpenModal={setIsOpenModal}
          task={selectedTask}
          refetch={handleRefetch}
        />
      )}

      <style>
        {`
          .rbc-toolbar {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            margin-bottom: 16px !important;
            padding: 8px 0 !important;
          }

          .rbc-toolbar button {
            color: #fff !important;
            background: #3b3b3b !important;
            border: 1px solid #4b4b4b !important;
            border-radius: 6px !important;
            padding: 6px 12px !important;
            margin: 0 4px !important;
            cursor: pointer !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            transition: all 0.2s ease !important;
            pointer-events: auto !important;
          }

          .rbc-toolbar button:hover {
            background: #4f46e5 !important;
            border-color: #4f46e5 !important;
            transform: translateY(-1px);
          }

          .rbc-toolbar button:active {
            background: #4338ca !important;
            transform: translateY(0);
          }

          .rbc-toolbar button.rbc-active {
            background: #4f46e5 !important;
            border-color: #6366f1 !important;
          }

          .rbc-btn-group {
            display: flex !important;
            gap: 4px !important;
          }

          .rbc-toolbar-label {
            font-size: 18px !important;
            font-weight: 600 !important;
            color: #fff !important;
          }

          .rbc-header {
            background: #1f1f1f !important;
            color: #f5f5f5 !important;
            padding: 8px 4px !important;
            font-weight: 600 !important;
          }

          .rbc-today {
            background: #2e3260 !important;
          }

          .rbc-off-range-bg {
            background: #1a1a1a !important;
          }

          .rbc-month-view {
            border-color: #3b3b3b !important;
          }

          .rbc-calendar {
            color: #fff !important;
          }

          .rbc-date-cell {
            color: #f5f5f5 !important;
          }

          .rbc-off-range {
            color: #888 !important;
          }

          .rbc-month-row {
            border-color: #3b3b3b !important;
          }

          .rbc-day-bg {
            border-color: #3b3b3b !important;
          }

          .rbc-event {
            padding: 2px 4px !important;
          }
        `}
      </style>
    </div>
  );
}
