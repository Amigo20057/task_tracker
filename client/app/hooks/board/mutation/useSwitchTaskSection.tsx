import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useSwitchTaskSection = (boardId: string) => {
  return useMutation({
    mutationFn: async (data: {
      boardId: string;
      oldSectionId: string;
      newSectionId: string;
      taskId: string;
    }) => {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/boards/section/task/switch`,
        data,
        { withCredentials: true }
      );
      return res.data;
    },
  });
};
