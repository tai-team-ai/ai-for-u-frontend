import Layout from '@/components/layout/layout'
import Link from 'next/link'
import styles from '@/styles/Templates.module.css'
import React from 'react'
import {Input, Modal, Button} from '@nextui-org/react'


interface TemplateCardProps {
    name?: string
    href?: string
    onPress?: () => void
}


function TemplateCard({name = "Coming Soon...", href = "#", onPress}: TemplateCardProps) {
    const classNames: string[] = [styles["template-card"]];
    if (href === "#") {
        classNames.push(styles["coming-soon"])
    }
    return <Link className={classNames.join(" ")} href={href} onClick={onPress}>
        {name}
    </Link>
}


interface TemplatesProps {

}

function Templates({}: TemplatesProps) {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };
    return (
        <Layout>
            <div className={styles["templates"]}>
                <TemplateCard
                    href="/templates/resignation-letter"
                    name="Resignation Letter"
                />
                <TemplateCard
                    onPress={handler}
                />
            </div>
            <Modal
                closeButton
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <h1>Premium feature coming soon!</h1>
                </Modal.Header>
                <Modal.Body>
                    <div>Join our mailing list</div>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Email"
                    />
                    <Button
                        auto
                        flat
                        color="primary"
                        onPress={closeHandler}
                    >
                        Subscribe
                    </Button>
                </Modal.Body>
            </Modal>
        </Layout>
    )
}

export default Templates;