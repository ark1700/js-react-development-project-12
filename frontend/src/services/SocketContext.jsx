import { channelsActions } from '@/features/channels/channelSlice';
import { messagesActions } from '@/features/messages/messageSlice';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const { addMessage, updateMessage, removeMessage } = messagesActions;
  const { addChannel, updateChannel, removeChannel } = channelsActions;

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ WebSocket connected");
    });
    newSocket.on("disconnect", () => {
      console.log("❌ WebSocket disconnected");
    });
    newSocket.on("error", (err) => {
      console.error('WebSocket error', err);
    });

    // messages events
    newSocket.on("newMessage", (message) => {
      console.log("New message received:", message);
      dispatch(addMessage(message));
    });
    newSocket.on("renameMessage", (message) => {
      console.log("Message renamed:", message);
      dispatch(updateMessage({
        id: message.id,
        changes: { body: message.body },
      }));
    });
    newSocket.on("removeMessage", (message) => {
      console.log("Message removed:", message);
      dispatch(removeMessage(message.id));
    });

    // channels events
    newSocket.on("newChannel", (channel) => {
      console.log("New channel received:", channel);
      dispatch(addChannel(channel));
    });
    newSocket.on("renameChannel", (channel) => {
      console.log("Channel renamed:", channel);
      dispatch(updateChannel({
        id: channel.id,
        changes: { name: channel.name },
      }));
    });
    newSocket.on("removeChannel", (channel) => {
      console.log("Channel removed:", channel);
      dispatch(removeChannel(channel.id));
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
