import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const here = dirname(fileURLToPath(import.meta.url))

/**
 * Deux pages :
 *   /           → le site vitrine (reproduction du bundle de design)
 *   /visite-3d/ → la visite virtuelle 3D de la villa
 */
export default defineConfig({
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      input: {
        main: resolve(here, 'index.html'),
        visite: resolve(here, 'visite-3d/index.html'),
      },
    },
  },
})
