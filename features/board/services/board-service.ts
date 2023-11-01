import { HttpClientService } from "@/services";
import { responseMapper } from "@/utilities/response-mapper";
import { BoardParams, Boards } from "../core";
import { boardPayloadMapper } from "../utilities";

export class BoardService {
  async getAll(params: BoardParams): Promise<Boards[]> {
    return await HttpClientService.get(
      "/board/from-workspace/" + params.workspaceId,
    ).then((res) => responseMapper(res));
  }

  async getSingle(id: string): Promise<Boards> {
    return await HttpClientService.get("/board/" + id).then((res) =>
      responseMapper(res),
    );
  }

  async create(payload: Boards) {
    return await HttpClientService.post(
      "/board",
      boardPayloadMapper(payload),
    ).then((res) => responseMapper(res));
  }

  async update(payload: Boards, id: string) {
    return await HttpClientService.put<Boards>(
      "/board/" + id,
      boardPayloadMapper(payload),
    ).then((res) => res.data);
  }

  async delete(id: string) {
    return await HttpClientService.delete<Boards>("/board/" + id).then(
      (res) => res.data,
    );
  }
}
