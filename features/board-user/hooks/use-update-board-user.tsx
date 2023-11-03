import { useMutation } from "@tanstack/react-query";
import { BoardUserService } from "../service";

export const useUpdateBoardUser = () => {
  const boardUserService = new BoardUserService();

  return useMutation({
    mutationFn: (id: string) => boardUserService.update(id),
  });
};
