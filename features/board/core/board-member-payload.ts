import { User } from "@prisma/client";

export type BoardMemberPayload = {
  boardId: string;
  member: string[];
};
