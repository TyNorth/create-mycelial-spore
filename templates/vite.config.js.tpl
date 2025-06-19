import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const registerSporePlugin = ({ port, name, globalVar }) => ({
  name: 'register-spore-plugin',
  configurePreviewServer: (server) => {
    server.httpServer.on('listening', async () => {
      const sporeData = { name, globalVar, url: `http://localhost:${port}/spore.js` };
      console.log(`\n[SPORE-PLUGIN] Announcing presence for ${name}...`);
      try {
        await fetch('http://localhost:4000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sporeData),
        });
        console.log(`[SPORE-PLUGIN] ✅ Successfully announced.`);
      } catch (error) {
        console.error(`[SPORE-PLUGIN] ❌ Failed to announce. Is Rendezvous Server running?`);
      }
    });
  }
});

export default defineConfig({
  plugins: [
    vue(), 
    registerSporePlugin({
      port: {{PORT}},
      name: '{{SPORE_NAME}}',
      globalVar: '{{GLOBAL_VAR}}'
    })
  ],
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: '{{GLOBAL_VAR}}',
      formats: ['umd'],
    },
    rollupOptions: { output: { entryFileNames: 'spore.js' } }
  },
  preview: { port: {{PORT}}, strictPort: true }
})