"use client";

import { Boards } from "../core";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { MoreHorizontal, Settings2, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

type BoardListCardProps = {
  board: Boards;
};

export const BoardListCard: React.FC<BoardListCardProps> = ({ board }) => {
  const { boardId, workspaceId } = useParams();

  return (
    <Link href={`/dashboard/${workspaceId}/${board.id}`}>
      <div className="relative flex items-center justify-between rounded-none px-4 text-base after:absolute after:bottom-0 after:left-0 after:top-0 after:w-0 after:bg-foreground after:transition-all after:duration-100 after:ease-in hover:bg-transparent hover:after:left-0 hover:after:w-1 hover:after:content-['']">
        <p>{board.name}</p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            <DropdownMenuItem>
              <Users className="mr-3 h-5 w-5" />
              Anggota
            </DropdownMenuItem>
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
        {board.id == boardId ? (
          <span className="absolute bottom-0 left-0 top-0 w-1 bg-foreground hover:w-1 hover:bg-transparent hover:content-['']" />
        ) : null}
      </div>
    </Link>
  );
};
