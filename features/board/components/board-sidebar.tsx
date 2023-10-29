"use client";

import { Skeleton } from "@/components/ui";
import { Workspaces } from "@/features/workspace/core";
import { useGetSingleWorkspace } from "@/features/workspace/hooks";
import Link from "next/link";
import { Settings } from "lucide-react";
import { useCreateBoard, useGetAllBoard } from "../hooks";
import { ModalCreateBoard } from ".";
import { useState } from "react";

type BoardSidebarProps = {
  workspaceId: string;
};

export const BoardSidebar = ({ workspaceId }: BoardSidebarProps) => {
  const { data: workspace, isFetching: fethingWorkspace } =
    useGetSingleWorkspace(workspaceId);
  const {
    data: boards,
    isFetching: fethingBoard,
    refetch,
  } = useGetAllBoard({
    params: { workspaceId },
  });

  const [open, setOpen] = useState<boolean>(false);

  const initialValues: Workspaces = {
    name: "",
    description: "",
  };

  const createWorkspace = useCreateBoard();

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
    <div className="bg shadow-custom z-10 flex h-[calc(100vh-60px)] min-w-[250px] max-w-[250px] flex-col gap-3 bg-slate-50 py-2">
      {fethingWorkspace ? (
        <div className="space-y-3 px-4 py-5">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : (
        <div className="space-y-3 py-5">
          {/* workspace title, button create board, button setting */}
          <div className="px-4">
            <h2 className="text-xl font-semibold ">{workspace?.name}</h2>
          </div>

          <div>
            <ModalCreateBoard
              open={open}
              setOpen={setOpen}
              initialValue={initialValues}
              onSubmit={handleSubmit}
            />

            <button className="relative flex items-center rounded-none px-4 py-2 text-base after:absolute after:bottom-0 after:left-0 after:top-0 after:w-0 after:bg-foreground hover:bg-transparent hover:after:w-1 hover:after:content-['']">
              <Settings className="mr-2 h-5 w-5" /> Pengaturan
            </button>
          </div>
        </div>
      )}

      <div className="border-y px-4 py-2 font-medium text-slate-400">
        <p>Board Pulic</p>
      </div>

      {fethingBoard ? (
        <div className="space-y-3 px-4 py-5">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : (
        boards?.map((board) => (
          <div key={board.id}>
            <p>{board.name}</p>
          </div>
        ))
      )}

      <div className="border-y px-4 py-2 font-medium text-slate-400">
        <p>Board Privat</p>
      </div>

      <div className="space-y-3 px-4 py-5">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
};
