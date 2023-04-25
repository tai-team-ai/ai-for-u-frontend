import MarkdownToJSX from 'markdown-to-jsx'
import { type PropsWithChildren } from 'react'

const Markdown = ({ children }: PropsWithChildren): JSX.Element => {
  return <MarkdownToJSX>{children as string}</MarkdownToJSX>
}

export default Markdown
