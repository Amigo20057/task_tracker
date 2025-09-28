import FormCommon from "~/components/ui/form";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Task Tracker" },
    { name: "Login", content: "Welcome to Task Tracker!" },
  ];
}

export default function Login() {
  return (
    <div className="w-full h-screen bg-[#141414] flex items-center justify-center">
      <FormCommon formType="login" />
    </div>
  );
}
