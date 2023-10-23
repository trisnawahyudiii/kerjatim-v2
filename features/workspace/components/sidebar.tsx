"use client";

import { LoadingSpiner } from "@/components";
import {
  Avatar,
  AvatarFallback,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { FormWorkspace } from "@/features/workspace/components";
import { Workspaces } from "@/features/workspace/core";
import {
  useCreateWorkspace,
  useGetAllWorkspace,
} from "@/features/workspace/hooks";
import { workspaceValidationSchema } from "@/features/workspace/utilities";
import { Formik, Form } from "formik";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";

export const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const initialValues: Workspaces = {
    name: "",
    description: "",
  };

  const { data, isFetching, refetch } = useGetAllWorkspace();

  const createWorkspace = useCreateWorkspace();

  const handleSubmit = (values: Workspaces) => {
    return createWorkspace.mutate(values, {
      onSuccess: () => {
        closeModal();
        refetch();
      },
    });
  };

  const closeModal = () => setOpen(false);

  return (
    <div className="flex h-[calc(100vh-60px)] w-[100px] flex-col items-center gap-3 py-2 shadow">
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <Button asChild={true} variant="outline">
            <DialogTrigger>
              <AiOutlinePlus />
            </DialogTrigger>
          </Button>
          <DialogOverlay />
          <DialogPortal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Workspace</DialogTitle>
              </DialogHeader>

              <Formik
                initialValues={initialValues}
                validationSchema={workspaceValidationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <FormWorkspace />
                  <div className="mt-3 text-end">
                    <Button type="submit">Submit</Button>
                  </div>
                </Form>
              </Formik>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
      <div className="flex h-[calc(100vh-60px)] w-full flex-col items-center border p-2">
        {isFetching ? (
          <LoadingSpiner />
        ) : (
          <div className="flex flex-col gap-3">
            {data?.map((workspace) => (
              <Tooltip key={workspace.id}>
                <TooltipTrigger>
                  <Avatar>
                    <AvatarFallback>
                      {workspace.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{workspace.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
