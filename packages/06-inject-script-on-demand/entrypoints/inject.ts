import { Readability } from '@mozilla/readability'
import TurndownService from 'turndown'

export default defineUnlistedScript(async () => {
  const service = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
  })
  const reader = new Readability(document.cloneNode(true) as Document)
  const article = reader.parse()
  if (article && article.title && article.content) {
    const markdown = service.turndown(article.content)
    await navigator.clipboard.writeText(`# ${article.title}\n\n${markdown}`)
    alert('Article copied as Markdown!')
  } else {
    alert('Failed to parse the article.')
  }
})
