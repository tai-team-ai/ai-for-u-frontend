import MarkdownToJSX from 'markdown-to-jsx'
import { type PropsWithChildren } from 'react'
import styles from '@/styles/Markdown.module.css'

const Markdown = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <div className={styles.markdown}>
      <MarkdownToJSX options={{}}>{children as string}</MarkdownToJSX>
    </div>
  )
}

export default Markdown
