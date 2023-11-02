import { HttpClientService } from "@/services";
import { responseMapper } from "@/utilities/response-mapper";
import { BoardUser } from "@prisma/client";

export class BoardUserService {
  async get(boardId: string): Promise<BoardUser> {
    return await HttpClientService.get(
      "/board-user/-get-current-user/" + boardId,
    ).then((res) => responseMapper(res));
  }
}
