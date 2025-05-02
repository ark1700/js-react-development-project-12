import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, Trash2, Edit2 } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { channelsSelectors, channelsActions, selectActiveChannel } from "./channelSlice";
import { CreateDialogForm } from "./Dialogs/CreateDialogForm";
import { EditDialogForm } from "./Dialogs/EditDialogForm";
import { DeleteDialog } from "./Dialogs/DeleteDialog";


export const ChannelsSideBar = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const { setActiveChannel } = channelsActions;
  const activeChannel = useSelector(selectActiveChannel);

  return (
    <div className="w-64 border-r flex flex-col dark:border-gray-700">
        <div className="p-4 border-b flex justify-between items-center dark:border-gray-700">
          <h2 className="font-bold text-lg">Каналы</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <CreateDialogForm />
            </DialogContent>
          </Dialog>
        </div>
        <div className="overflow-y-auto flex-1">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className={`flex items-center justify-between p-3 cursor-pointer hover:bg-muted ${activeChannel?.id === channel.id ? "bg-muted" : ""}`}
              onClick={() => dispatch(setActiveChannel(channel.id))}
            >
              <span className="truncate"># {channel.name}</span>
              {channel.removable && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Dialog>
                      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Изменить
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent onClick={(e) => e.stopPropagation()}>
                        <EditDialogForm channel={channel} />
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onSelect={(e) => e.preventDefault()}
                        >
                          <Trash2 className="mr-2 h-4 w-4 text-current" />
                          Удалить
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent onClick={(e) => e.stopPropagation()}>
                        <DeleteDialog channelId={channel.id} />
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))}
        </div>
      </div>
  );
}
