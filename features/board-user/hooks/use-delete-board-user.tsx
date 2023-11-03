import { useMutation } from "@tanstack/react-query";
import { BoardUserService } from "../service";

export const useDeleteBoardUser = () => {
  const boardUserService = new BoardUserService();

  return useMutation({
    mutationFn: (id: string) => boardUserService.delete(id),
  });
};
