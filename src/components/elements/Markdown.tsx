import MarkdownToJSX from 'markdown-to-jsx'
import { type PropsWithChildren } from 'react'
import styles from '@/styles/Markdown.module.css'

declare interface MarkdownProps {
  additionalClassNames?: string
}

const Markdown = ({ children, additionalClassNames = '' }: PropsWithChildren<MarkdownProps>): JSX.Element => {
  return (
    <div className={`${styles.markdown} ${additionalClassNames}`}>
      <MarkdownToJSX options={{}}>{children as string}</MarkdownToJSX>
    </div>
  )
}

export default Markdown
