import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui";
import { User } from "@prisma/client";

type TaskAssigneeAvatarGroupProps = {
  taskAssignee: {
    id?: string;
    user: Pick<User, "id" | "name" | "email" | "image">;
  }[];
};

export const TaskAssigneeAvatarGroup: React.FC<
  TaskAssigneeAvatarGroupProps
> = ({ taskAssignee }) => {
  return (
    <div className="ml-3 flex flex-1 flex-wrap items-center justify-end">
      {taskAssignee.map(({ id, user }) => (
        <Avatar key={id} className="-ml-3 h-8 w-8">
          <AvatarImage src={user?.image!} alt={user?.name!} />
          <AvatarFallback>
            {user?.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
};
