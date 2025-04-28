import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Plus, Trash2, Edit2, ChevronDown } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { channelsSelectors, selectActiveChannel } from "./channelSlice";


export const ChannelsSideBar = () => {
  // const dispatch = useDispatch();
  // dispatch(setActiveChannel(id));
  const channels = useSelector(channelsSelectors.selectAll);
  // const activeChannel = useSelector(selectActiveChannel);

  const [selectedChannel, setSelectedChannel] = useState(1);
  const [newChannelName, setNewChannelName] = useState("");
  const [editChannelName, setEditChannelName] = useState("");
  const [editChannelId, setEditChannelId] = useState(null);

  // Handle creating a new channel
  const handleCreateChannel = () => {
    if (newChannelName.trim() === "") return;

    const newId = Math.max(...channels.map((c) => c.id)) + 1;
    setChannels([...channels, { id: newId, name: newChannelName }]);
    setMessages({ ...messages, [newId]: [] });
    setNewChannelName("");
  };

  // Handle editing a channel
  const handleEditChannel = () => {
    if (editChannelName.trim() === "" || editChannelId === null) return;

    setChannels(
      channels.map((channel) => (channel.id === editChannelId ? { ...channel, name: editChannelName } : channel)),
    );

    setEditChannelId(null);
    setEditChannelName("");
  };

  // Handle deleting a channel
  const handleDeleteChannel = (channelId) => {
    setChannels(channels.filter((channel) => channel.id !== channelId));

    const newMessages = { ...messages };
    delete newMessages[channelId];

    setMessages(newMessages);

    if (selectedChannel === channelId) {
      setSelectedChannel(channels[0]?.id || null);
    }
  };

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
              <DialogHeader>
                <DialogTitle>Создать новый канал</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Input
                  placeholder="Название канала"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Отмена</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleCreateChannel}>Создать</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="overflow-y-auto flex-1">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className={`flex items-center justify-between p-3 cursor-pointer hover:bg-muted ${
                selectedChannel === channel.id ? "bg-muted" : ""
              }`}
              onClick={() => setSelectedChannel(channel.id)}
            >
              <span className="truncate capitalize">{channel.name}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Изменить
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Изменить канал</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <Input
                          placeholder="Название канала"
                          value={editChannelName || channel.name}
                          onChange={(e) => setEditChannelName(e.target.value)}
                          onFocus={() => {
                            setEditChannelId(channel.id);
                            setEditChannelName(channel.name);
                          }}
                        />
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Отмена</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button onClick={handleEditChannel}>Сохранить</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onSelect={() => handleDeleteChannel(channel.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>
  );
}
