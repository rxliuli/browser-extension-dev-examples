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
})