"use client";

import { cn } from "@/lib";
import { Tasks } from "../core";
import { Divider } from "@/components/ui";
import { TaskAssigneeAvatarGroup, TaskAttribute } from ".";
import { AlignJustify, CheckSquare, MessageSquare } from "lucide-react";
import { checklistCount } from "../utilities";

interface TaskCardProps extends React.HTMLAttributes<HTMLDivElement> {
  task: Tasks;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("flex w-full flex-col rounded-md bg-slate-100 ", className)}
      {...props}
    >
      <div className="px-4 py-2">
        <h3>{task.title}</h3>
      </div>

      <Divider />

      <div className="flex flex-wrap gap-3 p-4">
        {task.description ? (
          <TaskAttribute
            icon={<AlignJustify className="h-4 w-4 " />}
            count={1}
            text="This card has a description"
          />
        ) : null}

        {task.taskComment ? (
          <TaskAttribute
            icon={<MessageSquare className="h-4 w-4 " />}
            count={5}
            text="This card has comments"
          />
        ) : null}

        {task.checkList ? (
          <TaskAttribute
            icon={<CheckSquare className="h-4 w-4 " />}
            count={checklistCount(task.checkList)}
            text="Checklist items"
          />
        ) : null}

        {task.taskAssignee ? (
          <TaskAssigneeAvatarGroup taskAssignee={task.taskAssignee} />
        ) : null}
      </div>
    </div>
  );
};
