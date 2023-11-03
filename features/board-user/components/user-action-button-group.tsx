import { Toggle } from "@/components/ui/toggle";
import { Crown, Trash } from "lucide-react";
import { BoardUser } from "../core";
import { cn } from "@/lib";
import {
  Button,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui";
import { useSession } from "next-auth/react";

type UserActionButtonGroupProps = {
  user: BoardUser;
  handleRemove: (values: BoardUser) => void;
  handleMakeAdmin: (values: BoardUser) => void;
};

export const UserActionButtonGroup = ({
  user,
  handleMakeAdmin,
  handleRemove,
}: UserActionButtonGroupProps) => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-end gap-3 justify-self-end">
      <Tooltip defaultOpen={false}>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className={cn(
              user.isAdmin
                ? "bg-amber-500 hover:bg-amber-500/70"
                : "bg-foreground/10",
            )}
            onClick={() => handleMakeAdmin(user)}
          >
            <Crown className="h-7 w-7" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {user.isAdmin ? "this user is an admin" : "make an admin"}
        </TooltipContent>
      </Tooltip>
      {user.user.id !== session?.user.id ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className={cn(
                user.isAdmin
                  ? "bg-red-500 hover:bg-red-500/70"
                  : "bg-foreground/10",
              )}
              onClick={() => handleRemove(user)}
            >
              <Trash className="h-7 w-7" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove user from board</TooltipContent>
        </Tooltip>
      ) : null}
    </div>
  );
};
