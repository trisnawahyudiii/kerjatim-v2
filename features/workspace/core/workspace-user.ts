export type User = {
  id: string;
  name?: string;
  email: string;
  image?: string;
};

export type WorkspaceUser = {
  id: string;
  user: User;
};
