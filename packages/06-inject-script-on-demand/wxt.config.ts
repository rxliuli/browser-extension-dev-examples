import { defineConfig } from 'wxt'

export default defineConfig({
  manifestVersion: 3,
  manifest: {
    name: 'Copy As Markdown',
    description: 'Copy page content as Markdown',
    permissions: ['activeTab', 'scripting'],
    action: {},
    web_accessible_resources: [
      {
        resources: ['inject.js'],
        matches: ['<all_urls>'],
      },
    ],
  },
  webExt: {
    disabled: true,
  },
})
