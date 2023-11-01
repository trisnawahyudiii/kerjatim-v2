import { useMutation } from "@tanstack/react-query";
import { TaskService } from "../services";
import { Tasks } from "../core";

export const useCreateTask = () => {
  const taskService = new TaskService();

  return useMutation({
    mutationFn: (values: Tasks) => taskService.create(values),
  });
};
