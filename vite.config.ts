import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import { readFile, writeFile } from 'node:fs/promises'
import type { Connect } from 'vite'

const contentFile = new URL('./content.json', import.meta.url)

function contentApi() {
  const middleware: Connect.NextHandleFunction = async (request, response, next) => {
    if (request.url !== '/api/content') return next()
    response.setHeader('Content-Type', 'application/json')
    if (request.method === 'GET') {
      try {
        response.end(await readFile(contentFile, 'utf8'))
      } catch {
        response.statusCode = 500
        response.end(JSON.stringify({ error: 'Unable to read content file' }))
      }
      return
    }
    if (request.method === 'PUT') {
      let body = ''
      request.on('data', chunk => { body += chunk })
      request.on('end', async () => {
        try {
          const parsed = JSON.parse(body)
          if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object' || Object.values(parsed).some(value => typeof value !== 'string')) throw new Error('Invalid content')
          await writeFile(contentFile, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8')
          response.end(JSON.stringify({ ok: true }))
        } catch {
          response.statusCode = 400
          response.end(JSON.stringify({ error: 'Content must be a text-only object' }))
        }
      })
      return
    }
    response.statusCode = 405
    response.end(JSON.stringify({ error: 'Method not allowed' }))
  }
  return {
    name: 'local-content-api',
    configureServer(server: { middlewares: Connect.Server }) { server.middlewares.use(middleware) },
    configurePreviewServer(server: { middlewares: Connect.Server }) { server.middlewares.use(middleware) },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    contentApi(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
