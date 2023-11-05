import { BoardCategory, Prisma, Task } from "@prisma/client";

export type Categories = Partial<Pick<BoardCategory, "boardId" | "name">> & {
  id?: string;
  Task?: Task[];
};

export type CategoryWithAttributes = Prisma.BoardCategoryGetPayload<{
  select: {
    id: true;
    name: true;
    Task: {
      select: {
        id: true;
        title: true;
        description: true;
        priority: true;
        progress: true;
        startedAt: true;
        endedAt: true;
        Checklist: {
          select: {
            id: true;
            label: true;
            isChecked: true;
          };
        };
        TaskAssignee: {
          select: {
            id: true;
            user: {
              select: {
                id: true;
                name: true;
                email: true;
                image: true;
              };
            };
          };
        };
        TaskComment: true;
      };
    };
  };
}>;
