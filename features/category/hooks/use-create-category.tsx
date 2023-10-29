import { useMutation } from "@tanstack/react-query";
import { CategoryService } from "../services";
import { BoardCategory } from "@prisma/client";
import { Categories } from "../core/categories";

export const useCreateCategory = () => {
  const categoryService = new CategoryService();

  return useMutation({
    mutationFn: (values: Categories) => categoryService.create(values),
  });
};
