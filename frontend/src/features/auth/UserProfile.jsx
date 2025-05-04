import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useSelector } from "react-redux";

export const UserProfile = () => {
  const username = useSelector((state) => state.auth.username);
  const logoutButtonHandler = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="mt-auto border-t dark:border-gray-700 p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-green-500">
          <AvatarFallback className="bg-purple-100 dark:bg-purple-900/20 text-purple-600">
            {username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="font-medium truncate">{username}</p>
          </div>
          {/* <p className="text-xs text-muted-foreground truncate">Онлайн</p> */}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={logoutButtonHandler}
          aria-label="Выйти из аккаунта"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
