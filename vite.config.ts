import { fileURLToPath, URL } from "url";

import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), reactRefresh()],
  resolve: {
    alias: [
      {
        find: "@vue/runtime-core",
        replacement: "@vue/runtime-core/dist/runtime-core.esm-bundler.js",
      },
    
      { find: '@', replacement: path.resolve(__dirname, '/src') }
      
    ],
  },
  base: '',
  server:{
    watch: {
      usePolling: true
    }
  }
});
