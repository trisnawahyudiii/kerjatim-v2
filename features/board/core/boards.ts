import { Board, User } from "@prisma/client";

export type Boards = Partial<
  Pick<Board, "id" | "name" | "isPublic" | "workspaceId">
> & {
  BoardUser?: {
    id: string;
    user: Pick<User, "id" | "name" | "email" | "image">;
  }[];
};
