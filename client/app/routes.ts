import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "layouts/main/main-layout.tsx", [
    index("routes/home.tsx"),
    route("board/:boardId", "routes/board.tsx"),
  ]),
] satisfies RouteConfig;
