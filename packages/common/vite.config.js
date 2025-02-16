import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      fileName: 'index',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: ['path', 'fs'], // Add other Node.js built-in modules if needed
      output: {
        globals: {
          path: 'path',
          fs: 'fs',
        },
      },
    },
  },
});
