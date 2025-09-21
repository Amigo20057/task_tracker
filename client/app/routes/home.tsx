import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Task Tracker" },
    { name: "description", content: "Welcome to Task Tracker!" },
  ];
}

export default function Home() {
  return (
    <div className="w-full pt-[50px]">
      <h1 className="text-center text-[30px] font-semibold ">Welcome Home</h1>
    </div>
  );
}
