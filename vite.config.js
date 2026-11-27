import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import mandiHandler from './api/mandi.js'

// Serves the /api/mandi serverless function during `npm run dev` and `npm run preview`,
// so the Agri Market works locally exactly as it does on Vercel.
function localApi(env) {
  const mount = (server) => {
    if (env.DATA_GOV_API_KEY && !process.env.DATA_GOV_API_KEY) {
      process.env.DATA_GOV_API_KEY = env.DATA_GOV_API_KEY
    }
    server.middlewares.use('/api/mandi', (req, res) => {
      mandiHandler(req, res)
    })
  }
  return { name: 'local-api', configureServer: mount, configurePreviewServer: mount }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Loads .env.local etc. Variables without the VITE_ prefix stay server-side only.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), localApi(env)],
  }
})
