import { useQuery } from "@tanstack/react-query";
import { Categories } from "../core/categories";
import { CategoryService } from "../services";
import { CATEOGRY_QUERY_KEY } from "../constant/category-query-key";
import { ErrorResponse, SuccessResponse } from "@/types";
import { CategoryParams } from "../core";

type UseGetAllCategoryProps = {
  params: CategoryParams;
};

export const useGetAllCategory = ({ params }: UseGetAllCategoryProps) => {
  const categoryService = new CategoryService();

  return useQuery<Categories[], ErrorResponse>({
    queryKey: CATEOGRY_QUERY_KEY,
    queryFn: () => categoryService.getAll(params),
  });
};
