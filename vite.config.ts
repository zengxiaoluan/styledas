import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: './dist',
    lib: {
      entry: './src/index.ts',
      formats: ['umd', 'cjs', 'es', 'iife'],
      name: 'styledas',
    },
  },
});
