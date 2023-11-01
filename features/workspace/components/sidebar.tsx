"use client";

import { LoadingSpiner } from "@/components/loading-spiner";
import { ModeToggle } from "@/components/mode-toogle";
import {
  Avatar,
  AvatarFallback,
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { useToast } from "@/components/ui/use-toast";
import { CreateWorkspaceModal } from "@/features/workspace/components";
import { Workspaces } from "@/features/workspace/core";
import { useCreateWorkspace } from "@/features/workspace/hooks";
import { cn } from "@/lib";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";

type SidebarProps = {
  data?: Workspaces[];
  isFetching: boolean;
  refetch: () => void;
};

export const Sidebar = ({ data, isFetching, refetch }: SidebarProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { workspaceId } = useParams();
  const { toast } = useToast();

  const initialValues: Workspaces = {
    name: "",
    description: "",
  };

  const createWorkspace = useCreateWorkspace();

  const handleSubmit = (values: Workspaces) => {
    return createWorkspace.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Berhasil Membuat Workspace",
        });
        closeModal();
        refetch();
      },
    });
  };

  const closeModal = () => setOpen(false);

  const getAvatarClassname = (workspace: Workspaces) =>
    workspaceId === workspace.id
      ? "bg-foreground text-white hover:bg-foreground/90"
      : "bg-slate-200";

  return (
    <div className="z-20 flex h-[calc(100vh-60px)] min-w-[100px] max-w-[100px] flex-col items-center gap-3 bg-slate-50 py-2 shadow-custom">
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
                        <AvatarFallback
                          className={cn(
                            "hover:bg-foreground/20",
                            getAvatarClassname(workspace),
                          )}
                        >
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
    </div>
  );
};
