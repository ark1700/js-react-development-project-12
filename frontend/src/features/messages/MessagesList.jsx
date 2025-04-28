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

export const MessagesList = () => {
  const messages = useSelector(messagesSelectors.selectAll);
  const [selectedChannel, setSelectedChannel] = useState(1);
  const [editMessageContent, setEditMessageContent] = useState("");
  const [editMessageId, setEditMessageId] = useState(null);

  // Handle editing a message
  const handleEditMessage = () => {
    if (editMessageContent.trim() === "" || editMessageId === null) return;

    setMessages({
      ...messages,
      [selectedChannel]: messages[selectedChannel].map((message) =>
        message.id === editMessageId ? { ...message, content: editMessageContent } : message,
      ),
    });

    setEditMessageId(null);
    setEditMessageContent("");
  };

  // Handle deleting a message
  const handleDeleteMessage = (messageId) => {
    setMessages({
      ...messages,
      [selectedChannel]: messages[selectedChannel].filter((message) => message.id !== messageId),
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {selectedChannel &&
        messages[selectedChannel]?.map((message) => (
          <div key={message.id} className="flex group">
            <Avatar className="h-10 w-10 mr-3 mt-0.5">
              <AvatarFallback>{message.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-semibold">{message.user}</span>
                <span className="text-xs text-muted-foreground ml-2">{message.time}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 flex">
                  <Dialog>
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
                          value={editMessageId === message.id ? editMessageContent : message.content}
                          onChange={(e) => setEditMessageContent(e.target.value)}
                          onFocus={() => {
                            setEditMessageId(message.id);
                            setEditMessageContent(message.content);
                          }}
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
              <p className="mt-1">{message.content}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
