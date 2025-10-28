import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: 'index.html',
        projects: 'projects/index.html',
        projectExample: 'projects/example/index.html',
        about: 'about/index.html',
        contact: 'contact/index.html',
      },
    },
  },
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
})
