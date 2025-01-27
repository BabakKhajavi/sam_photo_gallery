import { defineConfig, loadEnv, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      visualizer({
        open: true,
        emitFile: true,
        filename: 'stats.html',
        template: 'treemap', // Options: 'sunburst', 'treemap', 'network';
      }) as PluginOption,
      viteCompression(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 4000,
      open: true,
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            mui: ['@mui/material', '@mui/icons-material'],
            formik: ['formik', 'yup'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    define: {
      'process.env': env,
    },
  };
});
