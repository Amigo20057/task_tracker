import type { Route } from "./+types/notFount";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Task Tracker" },
    { name: "description", content: "Welcome to Task Tracker!" },
  ];
}

export default function NotFound() {
  return (
    <div className="w-full h-screen bg-[#141414] flex items-center justify-center">
      <div className="text-[50px] text-[#fff] text-center">
        <h1 className="">404</h1>
        <h1>Page Not Found</h1>
      </div>
    </div>
  );
}
