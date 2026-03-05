// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://codezone.es',
  output: 'server',
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover'
  },
  adapter: node({
    mode: 'middleware'
  }),

  vite: {
    plugins: [tailwindcss()]
  }
});