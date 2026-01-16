export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id })

  const lastAccessed = new Map<number, number>()

  browser.tabs.onCreated.addListener((tab) => {
    if (!tab.id) {
      return
    }
    lastAccessed.set(tab.id, Date.now())
  })
  browser.tabs.onRemoved.addListener((tabId) => {
    lastAccessed.delete(tabId)
  })
  browser.tabs.onActivated.addListener((activeInfo) => {
    lastAccessed.set(activeInfo.tabId, Date.now())
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
        lastAccessed.has(tab.id) &&
        Date.now() - lastAccessed.get(tab.id)! > Timeout,
    )
    for (const tab of tabs) {
      await browser.tabs.discard(tab.id!)
      console.log('Tab auto-discarded:', tab.id, tab.title)
    }
  }
})
