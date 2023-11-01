import { useMutation } from "@tanstack/react-query";
import { CategoryService } from "../services";

export const useDeleteCategory = () => {
  const categoryService = new CategoryService();

  return useMutation({
    mutationFn: (categoryId: string) => categoryService.delete(categoryId),
  });
};
