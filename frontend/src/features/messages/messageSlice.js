import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { messageApi } from './messageApi';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    removeMessage: (state, { payload }) => {
      messagesAdapter.removeOne(state, payload);
    },
    updateMessage: messagesAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        messageApi.endpoints.getMessages.matchFulfilled,
        (state, { payload }) => {
          messagesAdapter.setAll(state, payload);
        },
      )
      .addMatcher(
        messageApi.endpoints.sendMessage.matchFulfilled,
        (state, { payload }) => {
          messagesAdapter.addOne(state, payload);
        },
      )
      .addMatcher(
        messageApi.endpoints.deleteMessage.matchFulfilled,
        (state, { payload }) => {
          messagesAdapter.removeOne(state, payload);
        },
      )
      .addMatcher(
        messageApi.endpoints.updateMessage.matchFulfilled,
        (state, { payload }) => {
          messagesAdapter.updateOne(state, payload);
        },
      )
  },
});

export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export const messagesActions = messagesSlice.actions;
export default messagesSlice.reducer;
