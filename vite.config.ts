import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on the IPv4 loopback address. On some Windows setups "localhost" resolves to ::1 first,
    // so a default dev server listened only on IPv6 and a browser using IPv4 got "connection refused".
    host: '127.0.0.1',
    port: 5173,
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
});
