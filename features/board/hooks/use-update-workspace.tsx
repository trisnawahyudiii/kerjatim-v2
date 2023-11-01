import { useMutation } from "@tanstack/react-query";
import { BoardService } from "../services";
import { Boards } from "../core";

export const useUpdateWorkspace = () => {
  const boardService = new BoardService();

  return useMutation({
    mutationFn: (params: { id: string; data: Boards }) =>
      boardService.update(params.data, params.id),
  });
};
