import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import { useSendMessageMutation } from "./messageApi";
import { useSelector } from "react-redux";
import { selectActiveChannel } from "../channels/channelSlice";

export const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const activeChannel = useSelector(selectActiveChannel);
  const username = useSelector((state) => state.auth.username);

  const handleSendMessage = async () => {
    console.log("Message sent:", newMessage);
    try {
      await sendMessage({
        channelId: activeChannel.id,
        body: newMessage,
        username,
      });

      setNewMessage("");
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
    }
  };

  return (
    <div className="border-t dark:border-gray-700 p-4 flex">
      <Input
        placeholder="Введите сообщение..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
        className="flex-1 mr-2"
      />
      <Button onClick={handleSendMessage} disabled={!newMessage || isLoading}>
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
};
