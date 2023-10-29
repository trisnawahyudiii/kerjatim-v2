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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Categories } from "../core/categories";
import { cn } from "@/lib";
import { MoreHorizontal, Settings2, Trash2 } from "lucide-react";
import { useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

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

  return (
    <div className="flex w-[350px] flex-col gap-3 rounded-md bg-slate-100 px-4">
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

      {/* button tambah task */}
    </div>
  );
};
