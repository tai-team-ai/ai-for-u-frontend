import React, { useEffect, useRef, useState } from "react"
import styles from '@/styles/AIForAnimation.module.css';

interface AIForAnimationProps {
    stepSpeed?: number // number of ms between word changes
} 

export default function AIForAnimation({stepSpeed = 2000}: AIForAnimationProps ) {
    const whoIsAIFor = [
        "Engineers",
        "People",
        "Dogs",
        "Cats",
        "Elephants",
        "_____"
    ]
    const rotatorRef = useRef<HTMLSpanElement>(null)
    const [activeIdx, setActiveIdx] = useState<number>(0)
    const [heightOffset, setHeightOffset] = useState<number>(0)

    setTimeout(() => {
        if (activeIdx < whoIsAIFor.length - 1) {
            setActiveIdx(activeIdx + 1)
        }
    }, stepSpeed);

    // I'm doing this just becaues I don't really want to keep track of refs for all the elements
    useEffect(() => {
        if (!rotatorRef || !rotatorRef.current) {
            return
        }
        const activeEl = (rotatorRef.current.querySelector('.active') as HTMLElement)
        const newOffset = rotatorRef.current.offsetTop - (activeEl.offsetTop)
        setHeightOffset(newOffset)
    }, [activeIdx])

    return (
        <>
            <div className='ai-4-animation'>
                <span className={styles['container']}>AI for <span ref={rotatorRef} className={styles['rotator']}>
                    {whoIsAIFor.reverse().map((t, i) => <div style={{transform: `translateY(${heightOffset}px)`}} className={`${styles['element']} ${(whoIsAIFor.length - 1 - i) == activeIdx ? 'active' : 'inactive'}`}>{t}</div>)}
                </span></span>
            </div>
        </>
    )
}
