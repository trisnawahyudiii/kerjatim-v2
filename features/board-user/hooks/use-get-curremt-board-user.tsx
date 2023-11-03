import { useQuery } from "@tanstack/react-query";
import { BoardUserService } from "../service";
import { ErrorResponse } from "@/types";
import { BoardUser } from "../core";

type UseGetCurrentBoardUserProps = {
  boardId: string;
};

export const useGetCurrentBoardUser = ({
  boardId,
}: UseGetCurrentBoardUserProps) => {
  const boardUserService = new BoardUserService();

  return useQuery<BoardUser, ErrorResponse>({
    queryFn: () => boardUserService.getCurrentUser(boardId),
    queryKey: ["board-user"].concat(["current"]).concat([boardId]),
  });
};
