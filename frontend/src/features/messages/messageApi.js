import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, ROUTES } from "../../config/routes";


export const messageApi = createApi({
  reducerPath: 'messagesApi',
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
    getMessages: builder.query({
      query: () => ROUTES.messages,
    }),
    sendMessage: builder.mutation({
      query: (message) => ({
        url: ROUTES.messages,
        method: 'POST',
        body: message,
      }),
    }),
    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: ROUTES.message(messageId),
        method: 'DELETE',
      }),
    }),
    updateMessage: builder.mutation({
      query: ({ messageId, message }) => ({
        url: ROUTES.message(messageId),
        method: 'PATCH',
        body: message,
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useDeleteMessageMutation,
  useUpdateMessageMutation
} = messageApi;
