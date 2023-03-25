const Diff = require('diff');
import { Button, Modal, ButtonProps } from "@nextui-org/react";
import { useState, PropsWithChildren } from "react";
import styles from "@/styles/DiffView.module.css";

interface ShowDiffProps {
    oldValue: string
    newValue: string
}

export function ShowDiffBtn({oldValue, newValue}: ShowDiffProps) {
    const [open, setOpen] = useState(false);
    return (<>
        <div>
            <span
                className={styles["show-diff-btn"]}
                onClick={() => setOpen(true)}
            >
                Show diff?
            </span>
        </div>
        <DiffView oldValue={oldValue} newValue={newValue} open={open} setOpen={setOpen}/>
    </>)
}


interface DiffViewProps {
    oldValue: string
    newValue: string
    open: boolean
    setOpen: (b:boolean) => void
}

export function DiffView({oldValue, newValue, open, setOpen}: DiffViewProps) {
    const diff = Diff.diffChars(oldValue, newValue);

    return (
        <>
            <Modal
                scroll
                width="768px"
                closeButton
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className={styles["diff-pair"]}>
                    <div>{diff.filter((part: any) => part.removed || !part.added).map((part: any) => <span className={part.removed ? styles["removed"] : styles["normal"]}>{part.value}</span>)}</div>
                    <div>{diff.filter((part: any) => part.added || !part.removed).map((part: any) => <span className={part.added ? styles["added"] : styles["normal"]}>{part.value}</span>)}</div>
                </div>

            </Modal>
        </>
    )
}

export default function() {
    const [open, setOpen] = useState(false);
    return <>
        <button onClick={() => setOpen(true)}>Show</button>
        <DiffView oldValue="chubby bunny" open={open} setOpen={setOpen} newValue="chuby bunnny"></DiffView>
    </>
}