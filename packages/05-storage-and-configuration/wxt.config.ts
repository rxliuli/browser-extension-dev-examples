import { defineConfig } from 'wxt'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  manifestVersion: 3,
  manifest: {
    name: 'Auto Sleep Tabs',
    description:
      'Automatically puts inactive tabs to sleep to save memory and CPU.',
    permissions: ['tabs', 'storage'],
    action: {},
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  webExt: {
    disabled: true,
  },
})
