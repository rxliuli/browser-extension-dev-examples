import { defineConfig } from 'wxt'

export default defineConfig({
  manifestVersion: 3,
  manifest: {
    name: 'Hide AI Mode on Google Search',
    description: 'Hide the AI Mode button on Google Search pages.',
  },
  webExt: {
    disabled: true,
  },
})
