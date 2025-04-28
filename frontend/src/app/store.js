import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/authApi';
import messagesReducer from '../features/messages/messageSlice';
import { messageApi } from '../features/messages/messageApi';
import channelsReducer from '../features/channels/channelSlice';
import { channelApi } from '../features/channels/channelApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    messages: messagesReducer,
    [messageApi.reducerPath]: messageApi.reducer,
    channels: channelsReducer,
    [channelApi.reducerPath]: channelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(messageApi.middleware)
    .concat(channelApi.middleware),
});

export default store;
