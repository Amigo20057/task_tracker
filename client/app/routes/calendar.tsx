import { useMemo, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { CalendarEvent, CalendarTask } from "~/types/calendar.interface";

moment.locale("uk");
const localizer = momentLocalizer(moment);

interface Props {
  dataCalendar?: Record<string, CalendarTask[]>;
}

export default function TaskCalendar({ dataCalendar }: Props) {
  const [selectedTask, setSelectedTask] = useState<CalendarTask | null>(null);

  const events = useMemo<CalendarEvent[]>(() => {
    if (!dataCalendar) return [];

    return Object.entries(dataCalendar).flatMap(([, tasks]) =>
      tasks.map((task) => ({
        title: task.name,
        start: new Date(task.deadline),
        end: new Date(task.deadline),
        allDay: true,
        resource: task,
      }))
    );
  }, [dataCalendar]);

  return (
    <div style={{ height: "600px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        popup
        onSelectEvent={(event) => setSelectedTask(event.resource)}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor:
              event.resource.taskType === "Task" ? "#4f46e5" : "#16a34a",
            color: "white",
            borderRadius: "8px",
            padding: "2px 6px",
          },
        })}
      />

      {selectedTask && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setSelectedTask(null)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              minWidth: "300px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{selectedTask.name}</h3>
            <p>
              <b>Тип:</b> {selectedTask.taskType}
            </p>
            <p>
              <b>Дедлайн:</b>{" "}
              {new Date(selectedTask.deadline).toLocaleDateString("uk-UA")}
            </p>
            <button onClick={() => setSelectedTask(null)}>Закрити</button>
          </div>
        </div>
      )}
    </div>
  );
}
