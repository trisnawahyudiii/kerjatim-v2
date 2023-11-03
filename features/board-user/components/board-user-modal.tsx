import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  LoadingComponent,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { WorkspaceUser } from "@/features/workspace/core";
import { BoardUser, BoardUserPayload } from "../core";
import { Dispatch, SetStateAction } from "react";
import { Plus, Users } from "lucide-react";
import { UserActionButtonGroup } from "./user-action-button-group";
import {
  UseCreateBoardUser,
  useDeleteBoardUser,
  useGetCurrentBoardUser,
  useUpdateBoardUser,
} from "../hooks";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types";
import { useSession } from "next-auth/react";

type BoardUserModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  workspaceMember: WorkspaceUser[];
  boardMember: BoardUser[];
  loading: boolean;
  refetch: () => void;
};

export const BoardUserModal = ({
  open,
  setOpen,
  workspaceMember,
  boardMember,
  loading,
  refetch,
}: BoardUserModalProps) => {
  const { toast } = useToast();
  const { boardId, workspaceId } = useParams();

  const { data: currentUser } = useGetCurrentBoardUser({
    boardId: String(boardId),
  });

  const createBordUser = UseCreateBoardUser();
  const handleCreateBoardUser = (values: BoardUserPayload) => {
    return createBordUser.mutate(values, {
      onSuccess: (res) => {
        toast({
          title: "Success",
          description: "berhasil menambahkan user ke board",
        });
        refetch();
      },
      onError: (err: any) => {
        toast({
          title: "Error",
          description: err.response.data.message,
        });
        refetch();
      },
    });
  };

  const updateBoardUser = useUpdateBoardUser();
  const handleMakeAdmin = (values: BoardUser) => {
    return updateBoardUser.mutate(values.id!, {
      onSuccess: (res) => {
        toast({
          title: "Success",
          description: "berhasil menjadikan user sebagai admin",
        });
        refetch();
      },
      onError: (err: any) => {
        toast({
          title: "Error",
          description: err.response.data.message,
        });
        refetch();
      },
    });
  };

  const deleteBoardUser = useDeleteBoardUser();
  const handleDeleteBoardUser = (values: BoardUser) => {
    return deleteBoardUser.mutate(values.id!, {
      onSuccess: (res) => {
        toast({
          title: "Success",
          description: "berhasil mengeluarkan user dari board",
        });
        refetch();
      },
      onError: (err: any) => {
        toast({
          title: "Error",
          description: err.response.data.message,
        });
        refetch();
      },
    });
  };

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex w-full px-2 py-1.5 hover:bg-slate-100">
        <Users className="mr-3 h-5 w-5" />
        Anggota
      </DialogTrigger>
      <DialogContent className="max-w-screen mx-12 flex h-fit min-h-[300px] w-screen flex-col items-center gap-3 overflow-hidden rounded-xl bg-background shadow-custom lg:max-h-[500px] lg:w-2/3 lg:max-w-4xl">
        <DialogTitle>Manage Board Member</DialogTitle>
        {/* board user  */}
        {loading ? (
          <div className="flex h-full max-h-[300px] w-full flex-col items-center justify-center overflow-hidden">
            <LoadingComponent className="scale-50" />
          </div>
        ) : (
          <>
            <div className="flex w-full flex-col gap-3 rounded-md bg-slate-100 p-5">
              <h1>Current Member</h1>
              {boardMember?.map((member) => (
                <div
                  key={member.id}
                  className="flex w-full items-center justify-between gap-2 rounded-md bg-foreground/10 px-3 py-2"
                >
                  <div className="flex flex-1 gap-3">
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        src={member.user.image}
                        alt={member.user.email}
                      />
                      <AvatarFallback className="flex items-center justify-center text-center">
                        {member.user.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <p>{member.user.email}</p>
                  </div>
                  {currentUser?.isAdmin ? (
                    <UserActionButtonGroup
                      user={member}
                      handleMakeAdmin={handleMakeAdmin}
                      handleRemove={handleDeleteBoardUser}
                    />
                  ) : null}
                </div>
              ))}
            </div>
            <div className="flex w-full flex-col gap-3 rounded-md bg-slate-100 p-5">
              <h1>Workspace Member</h1>
              {workspaceMember?.map((member) => (
                <div
                  key={member.id}
                  className=" justify-betwen flex w-full items-center gap-2 rounded-md bg-foreground/10 px-3 py-2"
                >
                  <div className="flex flex-1 gap-3">
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        src={member.user.image}
                        alt={member.user.email}
                      />
                      <AvatarFallback className="flex items-center justify-center text-center">
                        {member.user.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <p>{member.user.email}</p>
                  </div>
                  {currentUser?.isAdmin ? (
                    <Tooltip defaultOpen={false}>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          onClick={() =>
                            handleCreateBoardUser({
                              userId: member.user.id,
                              boardId: String(boardId),
                              workspaceId: String(workspaceId),
                            })
                          }
                        >
                          <Plus className="h-7 w-7" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Add user to board</TooltipContent>
                    </Tooltip>
                  ) : null}
                </div>
              ))}
            </div>
          </>
        )}
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
