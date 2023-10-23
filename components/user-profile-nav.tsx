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

import { BiUser, BiPowerOff } from "react-icons/bi";

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
            <AvatarFallback>
              {session?.user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white" align="end" sideOffset={10}>
          <DropdownMenuLabel className="text-center">
            <h1 className="text-xl font-bold">{session?.user?.name}</h1>
            <p>{session?.user?.email}</p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="flex gap-2">
            <BiUser /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 text-red-600 focus:text-red-600">
            <BiPowerOff />
            <button onClick={() => signOut()}>SignOut</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
