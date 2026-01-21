async function main() {
  const input = document.querySelector<HTMLInputElement>('#autoSleepInterval')!
  input.value =
    (
      await browser.storage.local.get<{ autoSleepInterval?: number }>(
        'autoSleepInterval',
      )
    ).autoSleepInterval?.toString() ?? '30'
  input.addEventListener('input', async (ev) => {
    const value = (ev.target as HTMLInputElement).valueAsNumber
    await browser.storage.local.set({ autoSleepInterval: value })
  })
}

main()
