import { useMutation } from "@tanstack/react-query";
import { BoardService } from "../services";

export const useDeleteBoard = () => {
  const boardService = new BoardService();

  return useMutation({
    mutationFn: (id: string) => boardService.delete(id),
  });
};
