import './styles.css'
import { Button } from '@/components/ui/button'
import saveAs from 'file-saver'
import { createRoot } from 'react-dom/client'
import dayjs from 'dayjs'

function App() {
  async function onTakeScreenshot() {
    const video = document.querySelector(
      '#movie_player video',
    ) as HTMLVideoElement
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(video, 0, 0)
    const blob = (await new Promise<Blob | null>((r) =>
      canvas.toBlob(r, 'image/png', 1),
    ))!

    const data = [new ClipboardItem({ [blob.type]: blob })]
    await navigator.clipboard.write(data)

    const filename = `Youtube-Screenshot_${dayjs().format(
      'YYYY-MM-DD_hh-mm-ss',
    )}.png` // 会得到类似 Youtube-Screenshot_2026-01-14_09-49-06.png 这样的文件名
    saveAs(blob, filename)
  }
  return (
    <Button
      className={'h-[80%] px-6 bg-transparent hover:bg-white/10 rounded-full'}
      onClick={onTakeScreenshot}
    >
      <img
        src={browser.runtime.getURL('/icon/32.png')}
        alt={'icon'}
        className={'w-[20px] h-[20px]'}
      />
    </Button>
  )
}

export default defineContentScript({
  matches: ['https://www.youtube.com/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'inject-ui-app',
      position: 'inline',
      anchor: '#movie_player .ytp-right-controls-left',
      append(anchor, ui) {
        anchor.insertBefore(ui, anchor.firstChild)
      },
      onMount: (container) => {
        const root = createRoot(container)
        root.render(<App />)
        return root
      },
      onRemove: (root) => {
        root?.unmount()
      },
    })

    ui.mount()
  },
})
