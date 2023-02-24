import Layout from '@/components/layout/layout'
import Template from '@/components/layout/template'
import styles from '@/styles/Sandbox.module.css'


function Sandbox() {
    return (
        <Template isSandbox={true}>
                <div className={styles["chat-box"]}>

                </div>
                <div className={styles["chat-input"]}>
                    <input className={styles["chat-textbox"]} type="text" />
                    <span className={styles["chat-send-btn"]}></span>
                </div>
        </Template>
    )
}

export default Sandbox;