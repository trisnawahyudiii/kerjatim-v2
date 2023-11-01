import { useQuery } from "@tanstack/react-query";
import { TaskService } from "../services";
import { TaskParams, Tasks } from "../core";
import { ErrorResponse } from "@/types";
import { TASK_QUERY_KEY } from "../constant";

type UseGetAllTaskProps = {
  params: TaskParams;
};

export const useGetAllTask = ({ params }: UseGetAllTaskProps) => {
  const taskService = new TaskService();

  return useQuery<Tasks[], ErrorResponse>({
    queryKey: TASK_QUERY_KEY,
    queryFn: () => taskService.getAll(params),
  });
};
