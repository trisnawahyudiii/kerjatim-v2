import { HttpClientService } from "@/services";
import { responseMapper } from "@/utilities/response-mapper";
import { Workspaces } from "../core";
import { workspacePayloadMapper } from "../utilities";

export class WorkspaceService {
  async getAll(params?: any): Promise<Workspaces[]> {
    return await HttpClientService.get("/workspace", params).then((res) =>
      responseMapper(res),
    );
  }

  async getSingle(id: string): Promise<Workspaces> {
    return await HttpClientService.get("/workspace/" + id).then((res) =>
      responseMapper(res),
    );
  }

  async create(payload: Workspaces) {
    return await HttpClientService.post(
      "/workspace",
      workspacePayloadMapper(payload),
    ).then((res) => responseMapper(res));
  }

  async update(payload: Workspaces, id: string) {
    return await HttpClientService.put<Workspaces>(
      "/workspace/" + id,
      workspacePayloadMapper(payload),
    ).then((res) => res.data);
  }

  async delete(id: string) {
    return await HttpClientService.delete<Workspaces>("/workspace/" + id).then(
      (res) => res.data,
    );
  }
}
