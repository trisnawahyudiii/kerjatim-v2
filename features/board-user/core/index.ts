export type BoardUser = {
  id: string;
  userId: string;
  workspaceId: string;
  isAdmin: boolean;
};

export type BoardUserParams = {
  boardId: string;
};
