"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";

import { Categories, CategoryWithAttributes } from "../core/categories";
import { cn } from "@/lib";
import { MoreHorizontal, Settings2, Trash2 } from "lucide-react";
import { useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ModalCrateTask, TaskCard } from "@/features/task/components";
import { Tasks } from "@/features/task/core";
import { useCreateTask } from "@/features/task/hooks";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { useGetBoardUser } from "@/features/board-user/hooks";

interface categoryContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  workspaceId: string;
  category: CategoryWithAttributes;
  refetch: () => void;
  handleDelete: (values: CategoryWithAttributes) => void;
}

export const CategoryContainer: React.FC<categoryContainerProps> = ({
  workspaceId,
  category,
  refetch,
  handleDelete,
  className,
  ...props
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false); ///for delete
  const [openCreateTask, setOpenCreateTask] = useState<boolean>(false);

  const { toast } = useToast();

  const initialTaskValue: Tasks = {
    title: "",
    description: "",
    categoryId: category.id,
    priority: "NOT_SET",
    progress: "NOT_STARTED",
    startedAt: undefined,
    endedAt: undefined,
    checkList: [],
    taskAssignee: [],
    taskComment: [],
  };

  const closeModal = () => setOpenCreateTask(false);

  const createTask = useCreateTask();
  const handleCreateTaskSubmit = (values: Tasks) => {
    return createTask.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Berhasil membuat task",
        });
        refetch();
        closeModal();
      },
    });
  };

  return (
    <div className="flex h-fit w-[350px] flex-col gap-3 rounded-md bg-background p-4 shadow-custom">
      <div className={cn("flex  items-center justify-between ", className)}>
        <h2 className="font-semibold">{category.name}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            <DropdownMenuItem>
              <Settings2 className="mr-3 h-5 w-5" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 focus:text-red-500"
              onClick={() => setOpenDialog(true)}
            >
              <Trash2 className="mr-3 h-5 w-5" />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={openDialog} modal onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogTitle className="text-xl font-semibold">
              Are you absolutely sure?
            </DialogTitle>
            <p>
              This action cannot be undone. This will permanently delete your
              data and remove your data from our servers.
            </p>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(category)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* task mapping */}

      {category.Task?.map((task) => <TaskCard key={task.id} task={task} />)}

      {/* button tambah task */}
      <ModalCrateTask
        open={openCreateTask}
        setOpen={setOpenCreateTask}
        initialValue={initialTaskValue}
        onSubmit={handleCreateTaskSubmit}
      />
    </div>
  );
};
