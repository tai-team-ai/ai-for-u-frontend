import MarkdownToJSX from 'markdown-to-jsx'
import { type PropsWithChildren } from 'react'

const Markdown = ({ children }: PropsWithChildren): JSX.Element => {
  let content = children as string
  content = content.split('\n').map(v => v.trim()).join('\n')
  content = content.replaceAll(/\n(-|\*|[0-9]+.)(?!\s)/g, '\n$1 ')
  return <MarkdownToJSX>{content}</MarkdownToJSX>
}

export default Markdown
