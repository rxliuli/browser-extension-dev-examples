import { messager } from '@/lib/messager'
import { PublicPath } from 'wxt/browser'

export default defineBackground(() => {
  browser.action.onClicked.addListener(async (tab) => {
    if (tab.id) {
      await browser.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['/inject.js'] as PublicPath[],
      })
    }
  })
  messager.onMessage('getMarkdown', async (ev) => {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    })
    if (!tabs[0].id) {
      throw new Error('No active tab found')
    }
    const result = await browser.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['/inject.js'] as PublicPath[],
    })
    return result[0].result as string | null
  })
})
