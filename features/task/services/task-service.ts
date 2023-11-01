import { HttpClientService } from "@/services";
import { TaskParams, Tasks } from "../core";
import { responseMapper } from "@/utilities/response-mapper";
import { taskPayloadMapper } from "../utilities";

export class TaskService {
  async getAll(params: TaskParams): Promise<Tasks[]> {
    return HttpClientService.get("/task/get/" + params.categoryId).then((res) =>
      responseMapper(res),
    );
  }

  async getSingle(id: string): Promise<Tasks> {
    return await HttpClientService.get("/task/" + id).then((res) =>
      responseMapper(res),
    );
  }

  async create(payload: Tasks) {
    return await HttpClientService.post(
      "/task",
      taskPayloadMapper(payload),
    ).then((res) => responseMapper(res));
  }

  async update(id: string, payload: Tasks) {
    return await HttpClientService.put(
      "/task/" + id,
      taskPayloadMapper(payload),
    ).then((res) => responseMapper(res));
  }

  async delete(id: string) {
    return await HttpClientService.delete("/task/" + id).then((res) =>
      responseMapper(res),
    );
  }
}
