import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // بما أن الملفات في الجذر مباشرة بدون مجلد src
      '@': path.resolve(__dirname, './'), 
    },
  },
});
