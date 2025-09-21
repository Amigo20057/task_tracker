import type { IBoard } from "~/types/task.interface";
import type { Route } from "./+types/board";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Board" },
    { name: "description", content: "Task Tracker Board" },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch(`/api/boards/${params.boardId}`);
  const product: IBoard = await res.json();
  return product;
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Board({ loaderData }: Route.ComponentProps) {
  const { name } = loaderData;
  return <div>{name}</div>;
}
