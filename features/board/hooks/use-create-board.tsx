import { useMutation } from "@tanstack/react-query";
import { BoardService } from "../services";
import { Boards } from "../core";

export const useCreateBoard = () => {
  const boardService = new BoardService();

  return useMutation({
    mutationFn: (data: Boards) => boardService.create(data),
  });
};
