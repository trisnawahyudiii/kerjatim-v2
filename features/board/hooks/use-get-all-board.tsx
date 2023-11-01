import { ErrorResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { BOARD_QUERY_KEY } from "../constant";
import { BoardParams, Boards } from "../core";
import { BoardService } from "../services";

type UseGetAllBoardProps = {
  params: BoardParams;
};

export const useGetAllBoard = ({ params }: UseGetAllBoardProps) => {
  const boardService = new BoardService();

  return useQuery<Boards[], ErrorResponse>({
    queryFn: () => boardService.getAll(params),
    queryKey: BOARD_QUERY_KEY,
  });
};
