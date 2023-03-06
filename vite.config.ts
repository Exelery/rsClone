import { fileURLToPath, URL } from "url";

import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import reactRefresh from '@vitejs/plugin-react-refresh'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'


import { dirname } from 'path';
import { resolve } from 'path';

// const __dirname = dirname(fileURLToPath(import.meta.url));

const localesPath = resolve(__dirname, './src/i18n/locales/**');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), reactRefresh(), VueI18nPlugin({
    include: localesPath, // provide a path to the folder where you'll store translation data (see below)
  })],
  resolve: {
    alias: [
      {
        find: "@vue/runtime-core",
        replacement: "@vue/runtime-core/dist/runtime-core.esm-bundler.js",
      },
    
      { find: '@', replacement: path.resolve(__dirname, './src') }
      
    ],
  },
  server:{
    watch: {
      usePolling: true
    }
  },

});
