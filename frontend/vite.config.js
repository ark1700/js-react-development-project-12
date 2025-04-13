import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5002,
    proxy: {
      // Проксируем запросы к API
      '/api/v1': {
        target: 'http://localhost:5003',
      },
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: 'ws://localhost:5003',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
});
