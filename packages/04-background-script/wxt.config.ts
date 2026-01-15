import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifestVersion: 3,
  manifest: {
    name: 'Auto Sleep Tabs',
    description:
      'Automatically puts inactive tabs to sleep to save memory and CPU.',
  },
  webExt: {
    disabled: true,
  },
})
