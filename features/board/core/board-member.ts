export type BoardMember = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

export type BoardMemberInitialValue = {
  members: BoardMember[];
};
