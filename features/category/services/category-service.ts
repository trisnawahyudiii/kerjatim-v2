import { HttpClientService } from "@/services";
import { CategoryParams, CategoryPayload } from "../core";
import { responseMapper } from "@/utilities/response-mapper";
import { categoryPayloadMapper } from "../utilities";
import { Categories, CategoryWithAttributes } from "../core/categories";

export class CategoryService {
  async getAll(params: CategoryParams): Promise<CategoryWithAttributes[]> {
    return await HttpClientService.get("/category/get/" + params.boardId).then(
      (res) => responseMapper(res),
    );
  }

  async create(payload: Categories) {
    return await HttpClientService.post(
      "/category",
      categoryPayloadMapper(payload),
    ).then((res) => responseMapper(res));
  }

  async delete(id: string) {
    return await HttpClientService.delete<Categories>("/category/" + id).then(
      (res) => res.data,
    );
  }
}
