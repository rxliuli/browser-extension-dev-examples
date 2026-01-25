import 'easymde/dist/easymde.min.css'
import { messager } from '@/lib/messager'
import EasyMDE from 'easymde'

const root = document.getElementById('root')!
const textarea = document.createElement('textarea')
root.appendChild(textarea)
const md = await messager.sendMessage('getMarkdown')
new EasyMDE({
  element: textarea,
  initialValue: md as string,
})
