import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "layouts/main/main-layout.tsx", [
    index("routes/home.tsx"),
    route("board/:boardId", "routes/board.tsx"),
    route("invite/:inviteId", "routes/invite.tsx"),
  ]),
  route("/auth", "layouts/auth/auth-layout.tsx", [
    route("register", "routes/register.tsx"),
    route("login", "routes/login.tsx"),
  ]),
  route("*", "routes/notFount.tsx"),
] satisfies RouteConfig;
