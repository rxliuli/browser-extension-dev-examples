import { defineExtensionMessaging } from '@webext-core/messaging'

export const messager = defineExtensionMessaging<{
  getMarkdown: () => string | null
}>()
