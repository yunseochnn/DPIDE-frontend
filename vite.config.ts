import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    define: {
      global: 'globalThis',
    },
    server: {
      proxy: {
        '/ws': {
          target: env.VITE_API_BASE_URL,
          ws: true,
          changeOrigin: true,
        },
      },
    },
  };
});
