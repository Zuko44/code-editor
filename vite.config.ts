import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import monacoEditorPlugin, { type IMonacoEditorOpts } from 'vite-plugin-monaco-editor'
const monacoEditorPluginDefault = (monacoEditorPlugin as any).default as (
  options: IMonacoEditorOpts,
) => any

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    monacoEditorPluginDefault({
      languageWorkers: ['editorWorkerService', 'json', 'css', 'html', 'typescript'],
      customWorkers: [
        { label: 'go', entry: 'monaco-editor/esm/vs/language/go/goWorker' },
        { label: 'python', entry: 'monaco-editor/esm/vs/language/python/pythonWorker' },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
