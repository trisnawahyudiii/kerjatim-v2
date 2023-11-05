"use client";

import { cn } from "@/lib";
import { TaskWithAttributes, Tasks } from "../core";
import { Divider } from "@/components/ui";
import { TaskAssigneeAvatarGroup, TaskAttribute } from ".";
import { AlignJustify, CheckSquare, MessageSquare } from "lucide-react";
import { checklistCount } from "../utilities";

interface TaskCardProps extends React.HTMLAttributes<HTMLDivElement> {
  task: TaskWithAttributes;
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
            text="This card has a description"
          />
        ) : null}

        {task.TaskComment.length !== 0 ? (
          <TaskAttribute
            icon={<MessageSquare className="h-4 w-4 " />}
            count={task.TaskComment.length}
            text="This card has comments"
          />
        ) : null}

        {task.Checklist.length !== 0 ? (
          <TaskAttribute
            icon={<CheckSquare className="h-4 w-4 " />}
            count={checklistCount(task.Checklist)}
            text="Checklist items"
          />
        ) : null}

        {task.TaskAssignee ? (
          <TaskAssigneeAvatarGroup taskAssignee={task.TaskAssignee} />
        ) : null}
      </div>
    </div>
  );
};
