import type { Route } from "./+types/register";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Task Tracker" },
    { name: "Register", content: "Welcome to Task Tracker!" },
  ];
}

export default function Register() {
  return (
    <div className="w-full h-screen bg-[#141414] flex items-center justify-center"></div>
  );
}
