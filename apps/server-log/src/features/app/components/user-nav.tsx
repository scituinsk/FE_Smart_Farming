import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { useLogout } from "@/features/login/queries/use-logout";
import { useMemo } from "react";
import CryptoJS from "crypto-js";

const getInitial = (firstName?: string, lastName?: string): string => {
  const first = firstName?.trim()?.[0] ?? "John";
  const last = lastName?.trim()?.[0] ?? "Doe";
  return (first + last).toUpperCase();
};

export function UserNav() {
  const { user } = useAuth();
  const logoutMutation = useLogout();

  const hashedEmail = useMemo(() => CryptoJS.MD5(user?.email ?? "John@gmail.com"), [user]);

  if (!user) {
    return;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={`https://www.gravatar.com/avatar/${hashedEmail}?s=500&d=retro&r=g`}
              alt="@shadcn"
            />
            <AvatarFallback>{getInitial(user?.firstName, user?.lastName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{user.username}</p>
            <p className="text-muted-foreground text-xs leading-none">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logoutMutation.mutate(undefined)}
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
