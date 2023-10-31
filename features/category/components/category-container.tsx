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

import { Categories } from "../core/categories";
import { cn } from "@/lib";
import { MoreHorizontal, Settings2, Trash2 } from "lucide-react";
import { useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ModalCrateTask } from "@/features/task/components";
import { Tasks } from "@/features/task/core";
import { useCreateTask, useGetAllTask } from "@/features/task/hooks";
import { useToast } from "@/components/ui/use-toast";

interface categoryContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  category: Categories;
  handleDelete: (values: Categories) => void;
}

export const CategoryContainer: React.FC<categoryContainerProps> = ({
  className,
  category,
  handleDelete,
  ...props
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openCreateTask, setOpenCreateTask] = useState<boolean>(false);
  const { toast } = useToast();

  const closeModal = () => setOpenCreateTask(false);

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

  const createTask = useCreateTask();
  const handleCreateTaskSubmit = (values: Tasks) => {
    return createTask.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Berhasil membuat task",
        });
        closeModal();
      },
    });
  };

  return (
    <div className="flex w-[350px] flex-col gap-3 rounded-md bg-background p-4 shadow-custom">
      <div className={cn("flex  items-center justify-between ", className)}>
        <h2 className="font-semibold">{category.name}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
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
      {category.Task?.map((task) => (
        <div
          key={task.id}
          className="flex w-full flex-col gap-3 rounded-md bg-slate-100 px-4"
        >
          <p>{task.title}</p>
        </div>
      ))}

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
