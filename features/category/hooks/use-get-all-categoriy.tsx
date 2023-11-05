import { useQuery } from "@tanstack/react-query";
import { CategoryWithAttributes } from "../core/categories";
import { CategoryService } from "../services";
import { CATEOGRY_QUERY_KEY } from "../constant/category-query-key";
import { ErrorResponse, SuccessResponse } from "@/types";
import { CategoryParams } from "../core";

type UseGetAllCategoryProps = {
  params: CategoryParams;
  enabled: boolean;
};

export const useGetAllCategory = ({
  params,
  enabled,
}: UseGetAllCategoryProps) => {
  const categoryService = new CategoryService();

  return useQuery<CategoryWithAttributes[], ErrorResponse>({
    queryKey: CATEOGRY_QUERY_KEY.concat([params.boardId]),
    queryFn: () => categoryService.getAll(params),
  });
};
