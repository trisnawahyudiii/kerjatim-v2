import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui";
import { User } from "@/features/workspace/core";
import { TaskAssignee } from "../core";

type TaskAssigneeAvatarGroupProps = {
  taskAssignee: TaskAssignee[];
};

export const TaskAssigneeAvatarGroup: React.FC<
  TaskAssigneeAvatarGroupProps
> = ({ taskAssignee }) => {
  return (
    <div className="ml-3 flex flex-1 flex-wrap items-center justify-end">
      {taskAssignee.map(({ user }) => (
        <Avatar key={user.id} className="-ml-3 h-8 w-8">
          <AvatarImage src={user?.image!} alt={user?.name!} />
          <AvatarFallback>
            {user?.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
};
