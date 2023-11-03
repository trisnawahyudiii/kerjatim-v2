import { User } from "@/features/workspace/core";

export type BoardUser = {
  id?: string;
  isAdmin: boolean;
  user: User;
};
