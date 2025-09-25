import type { IBoard } from "~/types/task.interface";
import type { IUser } from "~/types/user.interface";

export const MainUser: IUser = {
  id: "user_1",
  name: "amigo",
  email: "denrizuk@gmail.com",
  password: "dasjrkl;;qwnrd",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const Boards: IBoard[] = [
  {
    id: "1",
    name: "Board 1",
    sections: [],
    userCreator: MainUser,
    users: [],
    accessability: "private",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Board 2",
    sections: [],
    userCreator: MainUser,
    users: [],
    accessability: "private",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
