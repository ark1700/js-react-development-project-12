import React from 'react';
import { useGetMessagesQuery } from '../features/messages/messageApi';
import { useGetChannelsQuery } from '../features/channels/channelApi';
import { ChannelsSideBar } from '@/features/channels/ChannelsSideBar';
import { ChannelHeader } from '@/features/channels/ChannelHeader';
import { MessagesList } from '@/features/messages/MessagesList';
import { MessageInput } from '@/features/messages/MessageInput';
import { SocketProvider } from '@/services/SocketContext';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { UserProfile } from '@/features/auth/UserProfile';

const ChatPage = () => {
  const { isLoading: isChannelsLoading } = useGetMessagesQuery();
  const { isLoading: isMessegesLoading } = useGetChannelsQuery();

  // if (!isChannelsLoading || isMessegesLoading) {
  //   return <LoadingOverlay isLoading={isLoading} />;
  // }

  return (
    <SocketProvider>
      <div className="flex h-screen bg-background">
        <div className="w-64 border-r flex flex-col dark:border-gray-700">
          <ChannelsSideBar />
          <UserProfile />
        </div>
        <div className="flex-1 flex flex-col">
          <ChannelHeader />
          <MessagesList />
          <MessageInput />
        </div>
      </div>
      <LoadingOverlay isLoading={isChannelsLoading || isMessegesLoading} />
    </SocketProvider>
  )
};

export default ChatPage;
