import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { channelApi } from './channelApi';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  activeChannelId: null,
});

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    setChannels: (state, action) => {
      channelsAdapter.setAll(state, action.payload);

      if (action.payload.length > 0) {
        state.activeChannelId = action.payload[0].id; // автоматически выбрать первый канал
      }
    },
    removeChannel: (state, action) => {
      const idToRemove = action.payload;

      channelsAdapter.removeOne(state, idToRemove);

      if (state.activeChannelId === idToRemove) {
        const remainingIds = state.ids;

        state.activeChannelId = remainingIds.length > 0 ? remainingIds[0] : null;
        // если остались каналы — выбрать первый, иначе null
      }
    },
    updateChannel: channelsAdapter.updateOne,
    setActiveChannel: (state, action) => {
      state.activeChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        channelApi.endpoints.getChannels.matchFulfilled,
        (state, { payload }) => {
          channelsAdapter.setAll(state, payload);

          if (payload.length > 0) {
            state.activeChannelId = payload[0].id; // автоматически выбрать первый канал
          }
        },
      )
      .addMatcher(
        channelApi.endpoints.sendChannel.matchFulfilled,
        (state, { payload }) => {
          channelsAdapter.addOne(state, payload);
        },
      )
      .addMatcher(
        channelApi.endpoints.deleteChannel.matchFulfilled,
        (state, { payload }) => {
          const idToRemove = payload;
          channelsAdapter.removeOne(state, idToRemove);

          if (state.activeChannelId === idToRemove) {
            const remainingIds = state.ids;

            state.activeChannelId = remainingIds.length > 0 ? remainingIds[0] : null;
            // если остались каналы — выбрать первый, иначе null
          }
        },
      )
      .addMatcher(
        channelApi.endpoints.updateChannel.matchFulfilled,
        (state, { payload }) => {
          channelsAdapter.updateOne(state, payload);
        },
      )
  },
});
export const selectActiveChannel = (state) => {
  const { activeChannelId } = state.channels;
  return activeChannelId ? state.channels.entities[activeChannelId] : null;
};
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const channelsSelectorsActions = channelsSlice.actions;
export default channelsSlice.reducer;
