import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, ROUTES } from "../../config/routes";


export const channelApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState()).auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ROUTES.channels,
    }),
    sendChannel: builder.mutation({
      query: (channel) => ({
        url: ROUTES.channels,
        method: 'POST',
        body: channel,
      }),
    }),
    deleteChannel: builder.mutation({
      query: (channelId) => ({
        url: ROUTES.channel(channelId),
        method: 'DELETE',
      }),
    }),
    updateChannel: builder.mutation({
      query: ({ channelId, channel }) => ({
        url: ROUTES.channel(channelId),
        method: 'PATCH',
        body: channel,
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useSendChannelMutation,
  useDeleteChannelMutation,
  useUpdateChannelMutation
} = channelApi;
