"use client";

import { LoadingSpiner } from "@/components/loading-spiner";
import { ModeToggle } from "@/components/mode-toogle";
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
import {
  CreateWorkspaceModal,
  FormWorkspace,
} from "@/features/workspace/components";
import { Workspaces } from "@/features/workspace/core";
import {
  useCreateWorkspace,
  useGetAllWorkspace,
} from "@/features/workspace/hooks";
import { workspaceValidationSchema } from "@/features/workspace/utilities";
import { Formik, Form } from "formik";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";

type SidebarProps = {
  data?: Workspaces[];
  isFetching: boolean;
  refetch: () => void;
};

export const Sidebar = ({ data, isFetching, refetch }: SidebarProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const initialValues: Workspaces = {
    name: "",
    description: "",
  };

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
    <div className="flex h-[calc(100vh-60px)] min-w-[100px] max-w-[100px] flex-col items-center gap-3 py-2 shadow">
      <div className="flex h-[calc(100vh-60px)] w-full flex-col items-center p-2">
        <Link href="/dashboard" className="my-3">
          <Button>
            <AiOutlineHome />
          </Button>
        </Link>
        {isFetching ? (
          <LoadingSpiner />
        ) : (
          <div className="flex flex-col gap-3">
            {data &&
              data?.map((workspace) => (
                <Tooltip key={workspace.id}>
                  <TooltipTrigger>
                    <Link href={`/dashboard/${workspace.id}`}>
                      <Avatar>
                        <AvatarFallback>
                          {workspace.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{workspace.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
          </div>
        )}
      </div>

      {/* create workspace */}
      <div>
        <CreateWorkspaceModal
          open={open}
          setOpen={setOpen}
          initialValue={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
      {/* <ModeToggle /> */}
    </div>
  );
};
