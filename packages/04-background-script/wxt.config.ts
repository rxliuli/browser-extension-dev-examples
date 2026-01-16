import { defineConfig } from 'wxt'

export default defineConfig({
  manifestVersion: 3,
  manifest: {
    name: 'Auto Sleep Tabs',
    description:
      'Automatically puts inactive tabs to sleep to save memory and CPU.',
    permissions: ['tabs'],
  },
  webExt: {
    disabled: true,
  },
})
