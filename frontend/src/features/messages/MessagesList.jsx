import { useState } from "react"
import { Trash2, Edit2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { messagesSelectors } from "./messageSlice"
import { useSelector } from "react-redux"
import { selectActiveChannel } from "../channels/channelSlice"
import { useDeleteMessageMutation, useUpdateMessageMutation } from "./messageApi"

export const MessagesList = () => {
  const messages = useSelector(messagesSelectors.selectAll);
  const [editMessageContent, setEditMessageContent] = useState("");
  const [editMessageId, setEditMessageId] = useState(null);
  const currentChannel = useSelector(selectActiveChannel);
  const [deleteMessage] = useDeleteMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();

  // Handle editing a message
  const handleEditMessage = () => {
    if (editMessageContent.trim() === "" || editMessageId === null) return;
    updateMessage({
      messageId:editMessageId,
      message: {
        body: editMessageContent,
      },
    });
    setEditMessageId(null);
    setEditMessageContent("");
  };

  // Handle deleting a message
  const handleDeleteMessage = (messageId) => {
    deleteMessage(messageId);
  };
  // todo: refactor form
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {currentChannel &&
        messages?.filter((message) => message.channelId === currentChannel.id)?.map((message) => (
          <div key={message.id} className="flex group">
            <Avatar className="h-10 w-10 mr-3 mt-0.5">
              <AvatarFallback>{message.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-semibold">{message.username}</span>
                {!!message.time && (
                  <span className="text-xs text-muted-foreground ml-2">{message.time}</span>
                )}
                <div className="ml-auto opacity-0 group-hover:opacity-100 flex">
                  <Dialog onOpenChange={() => {
                    setEditMessageId(message.id);
                    setEditMessageContent(message.body);
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Изменить сообщение</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <Input
                          placeholder="Текст сообщения"
                          value={editMessageContent}
                          onChange={(e) => setEditMessageContent(e.target.value)}
                        />
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Отмена</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button onClick={handleEditMessage}>Сохранить</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleDeleteMessage(message.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="mt-1">{message.body}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
