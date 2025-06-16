/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
*/

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/HTKA0150-3004-lopputyo-frontend/',
  plugins: [react()],
});

/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['jsonlint-lines']  // or the problematic module(s)
  },
  build: {
    rollupOptions: {
      external: ['fs', 'path'],  // mark as external if you don’t use them in browser
    }
  }
})*/

/*import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Mock fs for the browser
      fs: false,
    },
  },
  define: {
    // Optionally define an empty object for fs
    'process.env': {},
  },
});*/

/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      fs: false,
      path: false,
      module: false
    }
  }
})
*/

/*
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/my-app/', // Replace with your actual repo name
  plugins: [react()],
});*/
