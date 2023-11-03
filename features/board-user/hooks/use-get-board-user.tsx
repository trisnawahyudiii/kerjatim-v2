import { useQuery } from "@tanstack/react-query";
import { BoardUserService } from "../service";
import { ErrorResponse } from "@/types";
import { BoardUser } from "../core";

type UseGetBoardUserProps = {
  boardId: string;
  enabled: boolean;
};

export const useGetBoardUser = ({
  boardId,
  enabled = true,
}: UseGetBoardUserProps) => {
  const boardUserService = new BoardUserService();

  return useQuery<BoardUser[], ErrorResponse>({
    queryFn: () => boardUserService.get(boardId),
    queryKey: ["board-user"].concat([boardId]),
    enabled: enabled,
  });
};
