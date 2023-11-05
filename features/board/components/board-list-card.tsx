"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { useGetWorkspaceMember } from "@/features/workspace/hooks";
import { MoreHorizontal, Settings2, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Boards } from "../core";
import { BoardUserModal } from "@/features/board-user/components";
import { useGetBoardUser } from "@/features/board-user/hooks";
import { User, WorkspaceUser } from "@/features/workspace/core";
import { BoardUser } from "@/features/board-user/core";
import { cn } from "@/lib";

type BoardListCardProps = {
  board: Boards;
};

type ModalConfigProps = {
  workspaceMember: WorkspaceUser[];
  boardMember: BoardUser[];
  refetch: () => void;
};

export const BoardListCard: React.FC<BoardListCardProps> = ({ board }) => {
  const { boardId, workspaceId } = useParams();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const {
    data: workspaceUser,
    isFetching: fethingWorkspaceUser,
    refetch: refetchWorkspaceUser,
  } = useGetWorkspaceMember(String(workspaceId), board.id === String(boardId));

  const {
    data: boardUser,
    isFetching: fethingBoardUser,
    refetch: refetchBoardUser,
  } = useGetBoardUser({
    boardId: String(boardId),
    enabled: board.id === String(boardId),
  });

  const handleRefetch = () => {
    refetchBoardUser();
    refetchWorkspaceUser();
  };

  const [modalConfig, setModalConfig] = useState<ModalConfigProps>({
    workspaceMember: [],
    boardMember: [],
    refetch: handleRefetch,
  });

  const areObjectsEqual = (obj1: User, obj2: User): boolean => {
    return obj1.id === obj2.id;
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    if (workspaceUser && boardUser) {
      let workspaceUsers: WorkspaceUser[] = [...workspaceUser];

      for (let j = 0; j < workspaceUser.length; j++) {
        for (let i = 0; i < boardUser.length; i++) {
          if (areObjectsEqual(boardUser[i].user, workspaceUser[j].user)) {
            workspaceUsers = workspaceUsers.filter(
              (member) => member.id !== workspaceUser[j].id,
            );
          }
        }
      }

      setModalConfig({
        workspaceMember: workspaceUsers,
        boardMember: boardUser,
        refetch: handleRefetch,
      });
    }
  }, [boardUser, workspaceUser]);

  return (
    <Link href={`/dashboard/${workspaceId}/${board.id}`}>
      <div
        className={cn(
          "relative flex items-center justify-between rounded-none px-4 text-base after:absolute after:bottom-0 after:left-0 after:top-0 after:w-0 after:bg-foreground after:transition-all after:duration-100 after:ease-in hover:bg-foreground/5 hover:after:left-0 hover:after:w-1 hover:after:content-['']",
          !board.isPublic ? "" : "py-2",
        )}
      >
        <p>{board.name}</p>
        {!board.isPublic ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" onClick={handleOpenModal}>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              <BoardUserModal
                open={openModal}
                loading={fethingBoardUser || fethingWorkspaceUser}
                setOpen={setOpenModal}
                refetch={modalConfig.refetch}
                workspaceMember={modalConfig.workspaceMember}
                boardMember={modalConfig.boardMember}
              />
              <DropdownMenuItem>
                <Settings2 className="mr-3 h-5 w-5" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 focus:text-red-500">
                <Trash2 className="mr-3 h-5 w-5" />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
        {board.id == boardId ? (
          <span className="absolute bottom-0 left-0 top-0 w-1 bg-foreground hover:w-1 hover:bg-transparent hover:content-['']" />
        ) : null}
      </div>
    </Link>
  );
};
