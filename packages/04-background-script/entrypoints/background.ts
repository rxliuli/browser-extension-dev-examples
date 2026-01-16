export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id })

  const lastAcessed = new Map<number, number>()

  browser.tabs.onCreated.addListener((tab) => {
    if (!tab.id) {
      return
    }
    lastAcessed.set(tab.id, Date.now())
  })
  browser.tabs.onRemoved.addListener((tabId) => {
    lastAcessed.delete(tabId)
  })
  browser.tabs.onActivated.addListener((activeInfo) => {
    lastAcessed.set(activeInfo.tabId, Date.now())
    console.log('Tab activated:', activeInfo.tabId)
    autoDiscardTabs()
  })
  async function autoDiscardTabs() {
    const Timeout = 30 * 60 * 1000
    const tabs = (await browser.tabs.query({})).filter(
      (tab) =>
        tab.id &&
        !tab.pinned &&
        !tab.active &&
        !tab.audible &&
        !tab.frozen &&
        !tab.discarded &&
        lastAcessed.has(tab.id) &&
        Date.now() - lastAcessed.get(tab.id)! > Timeout,
    )
    for (const tab of tabs) {
      await browser.tabs.discard(tab.id!)
      console.log('Tab auto-discarded:', tab.id, tab.title)
    }
  }
})
