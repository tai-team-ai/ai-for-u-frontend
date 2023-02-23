import Layout from '@/components/layout/layout'
import styles from '@/styles/Template.module.css'
import {routes} from '@/utils/constants'
import Link from 'next/link'


interface TemplateProps {
    isSandbox?: boolean
    children?: React.ReactNode
}


export default function Template({isSandbox = false, children = null}: TemplateProps) {
    return (
        <Layout>
            <section className={styles["example-section"]}>
                <h1 className={styles["example-header"]}>
                    Examples
                </h1>
                <div className={styles["examples"]}>

                </div>
            </section>
            <section className={styles["content"]}>
                {children}
                {isSandbox ? null : <Link href={routes.TEMPLATES}>Back to Templates</Link>}
            </section>
        </Layout>
    )
}