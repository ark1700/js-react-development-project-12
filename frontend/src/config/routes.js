export const BASE_URL = '/api/v1';

export const ROUTES = {
  login: '/login',
  signup: '/signup',
  messages: '/messages',
  message: (messageId) => `/messages/${messageId}`,
  channels: '/channels',
  channel: (channelId) => `/channels/${channelId}`,
};
