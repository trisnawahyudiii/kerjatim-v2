import { useMutation } from "@tanstack/react-query";
import { BoardUserService } from "../service";
import { BoardUserPayload } from "../core";

export const UseCreateBoardUser = () => {
  const boardUserService = new BoardUserService();

  return useMutation({
    mutationFn: (payload: BoardUserPayload) => boardUserService.create(payload),
  });
};
