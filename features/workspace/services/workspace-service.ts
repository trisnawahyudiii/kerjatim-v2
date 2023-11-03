import { HttpClientService } from "@/services";
import { responseMapper } from "@/utilities/response-mapper";
import { WorkspaceUser, Workspaces } from "../core";
import { workspacePayloadMapper } from "../utilities";
import { JoinWorkspace } from "../components";
import { JoinRespose } from "../hooks";

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

  async getByCode(code: string): Promise<Workspaces> {
    return await HttpClientService.get("/workspace/get/" + code).then((res) =>
      responseMapper(res),
    );
  }

  async getMember(id: string): Promise<WorkspaceUser[]> {
    return await HttpClientService.get("/workspace-user/get/" + id).then(
      (res) => responseMapper(res),
    );
  }

  async create(payload: Workspaces) {
    return await HttpClientService.post(
      "/workspace",
      workspacePayloadMapper(payload),
    ).then((res) => responseMapper(res));
  }

  async join(payload: JoinWorkspace): Promise<JoinRespose> {
    return await HttpClientService.post(
      "/workspace/join/" + payload.workspaceCode,
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
