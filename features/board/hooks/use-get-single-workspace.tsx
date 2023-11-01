import { ErrorResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { BoardService } from "../services";
import { Boards } from "../core";
import { BOARD_QUERY_KEY } from "../constant";

export const useGetSingleWorkspace = (id: string) => {
  const boardService = new BoardService();

  return useQuery<Boards, ErrorResponse>({
    queryFn: () => boardService.getSingle(id),
    queryKey: BOARD_QUERY_KEY.concat([id]),
  });
};
