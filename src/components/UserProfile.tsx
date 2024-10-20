import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/providers/storageProvider";
import { logOut } from "@/utils/storage";
import { LogOut, User } from "lucide-react";

const getInitials = (name?: string | null) => {
  if (!name) return "NA";
  const words = name.split(" ");
  let initials = "";
  words.forEach((word) => {
    initials += word.charAt(0).toUpperCase();
  });
  return initials;
};

const getInitialFromEmail = (email?: string | null) => {
  if (!email) return "NA";
  return email.charAt(0).toUpperCase();
};

const UserProfile = () => {
  const {
    state: { token, userData },
    dispatch,
  } = useStore();

  const onLogoutButtonClick = async () => {
    try {
      await logOut();
      dispatch({ type: "SET_TOKEN", payload: null });
      dispatch({ type: "SET_USER_DATA", payload: null });
    } catch (error) {
      console.error(error);
    }
  };

  console.log({ token, userData });
  if (!token) return null;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="dark:bg-[#4a4a50] dark:border-gray-300">
            <AvatarImage src={userData?.avatar} alt={userData?.name} />
            <AvatarFallback>
              {userData?.name
                ? getInitials(userData?.name)
                : getInitialFromEmail(userData?.email)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={onLogoutButtonClick}
          >
            <LogOut />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;
