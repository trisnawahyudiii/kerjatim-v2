export type User = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
};

export type WorkspaceUser = {
  id: string;
  user: User;
};
