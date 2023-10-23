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

  async create(payload: Workspaces) {
    return await HttpClientService.post(
      "/workspace",
      workspacePayloadMapper(payload),
    ).then((res) => responseMapper(res));
  }
}
