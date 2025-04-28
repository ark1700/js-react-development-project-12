import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");
  const handleSendMessage = () => {
    // Logic to send the message
    console.log("Message sent:", newMessage);
    setNewMessage("");
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
      <Button onClick={handleSendMessage}>
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};
