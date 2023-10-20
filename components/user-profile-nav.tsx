import { cn } from "@/lib";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "components/ui";
import { signOut, useSession } from "next-auth/react";

interface UserProfileNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export const UserProfileNav: React.FC<UserProfileNavProps> = ({
  className,
}) => {
  const { data: session } = useSession();

  return (
    <div className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={session?.user?.image!}
              alt={session?.user?.name!}
            />
            <AvatarFallback>{session?.user?.email}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">
            <button onClick={() => signOut()}>SignOut</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
