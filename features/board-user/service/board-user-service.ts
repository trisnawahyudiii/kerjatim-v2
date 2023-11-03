import { HttpClientService } from "@/services";
import { responseMapper } from "@/utilities/response-mapper";
import { BoardUser, BoardUserPayload } from "../core";

export class BoardUserService {
  async get(boardId: string): Promise<BoardUser[]> {
    return await HttpClientService.get("/board-user/get/" + boardId).then(
      (res) => responseMapper(res),
    );
  }

  async getCurrentUser(boardId: string): Promise<BoardUser> {
    return await HttpClientService.get(
      "/board-user/get-current-user/" + boardId,
    ).then((res) => responseMapper(res));
  }

  async create(payload: BoardUserPayload) {
    return await HttpClientService.post("/board-user", payload).then((res) =>
      responseMapper(res),
    );
  }

  async update(id: string) {
    return await HttpClientService.put("/board-user/" + id).then((res) =>
      responseMapper(res),
    );
  }

  async delete(id: string) {
    return await HttpClientService.delete("/board-user/" + id).then((res) =>
      responseMapper(res),
    );
  }
}
