import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// "base: './'" makes every file link relative, so the site works on GitHub Pages
// whether it lives at yourname.github.io/wedding-invitation/ or anywhere else.
export default defineConfig({
  plugins: [react()],
  base: './',
});
