import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

/* Emotion + Vite config instructions : 
  https://dev.to/glocore/configure-emotion-with-your-vite-react-project-7jl
*/

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    legacy({ targets: ['defaults', 'not IE 11'] }),
  ],
});
