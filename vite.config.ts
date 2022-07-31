/// <reference types="vitest" />

import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      'event-emitter-ii': `${resolve(__dirname, 'src/index.ts')}`,
    },
  },
  test: {
    globals: true,
    include: ['test/**/*.test.ts'],
    environment: 'node',
  },
});
