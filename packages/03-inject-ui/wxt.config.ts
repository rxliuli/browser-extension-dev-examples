import { defineConfig } from 'wxt'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifestVersion: 3,
  manifest: {
    name: 'Youtube Video Screenshot',
    description: 'Take screenshots of YouTube videos easily.',
    web_accessible_resources: [
      {
        resources: ['icon/*'],
        matches: ['https://www.youtube.com/*'],
      },
    ],
  },
  webExt: {
    disabled: true,
  },
  vite: () => ({
    plugins: [tailwindcss() as any],
  }),
})
