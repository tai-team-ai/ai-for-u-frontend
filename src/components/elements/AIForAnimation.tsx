import React, { useEffect, useRef, useState } from 'react'
import { Text } from '@nextui-org/react'
import styles from '@/styles/AIForAnimation.module.css'

interface AIForAnimationProps {
  stepSpeed?: number // number of ms between word changes
}

const TITLE: string = 'AI for U'

export default function AIForAnimation ({ stepSpeed = 400 }: AIForAnimationProps): JSX.Element {
  const whoIsAIFor: string[] = [
    'Sports coaches',
    'Event planners',
    'Lawyers',
    'Gamers',
    'Students',
    'Writers',
    'Scientists',
    'Designers',
    'Developers',
    'Engineers',
    'Analysts',
    'Managers',
    'Musicians',
    'Chefs',
    'Photographers',
    'Trainers',
    'Planners',
    'Agents',
    'Workers',
    'Psychologists',
    'Teachers',
    'Journalists',
    'Real estate agents',
    'Travel agents',
    'Financial analysts',
    'HR managers',
    'Robotics engineers',
    'Architects',
    'Accountants',
    'Government agencies',
    'Healthcare providers',
    'Fashion designers',
    'Graphic designers',
    'Interior designers',
    'Web developers',
    'Data scientists',
    'Content creators',
    '__________',
    'Everyone',
    'U'
  ]
  const rotatorRef = useRef<HTMLSpanElement>(null)
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const [heightOffset, setHeightOffset] = useState<number>(0)
  const [animationSpeed, setAnimationSpeed] = useState<number>(stepSpeed)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeIdx < whoIsAIFor.length - 1) {
        if (whoIsAIFor.length - activeIdx <= 1) {
          setAnimationSpeed(animationSpeed * 3)
        } else if (whoIsAIFor.length - activeIdx <= 3) {
          setAnimationSpeed(animationSpeed * 2)
        } else if (whoIsAIFor.length - activeIdx <= 10) {
          setAnimationSpeed(animationSpeed * 1.3)
        } else if (activeIdx <= 8) {
          setAnimationSpeed(animationSpeed * 0.95)
        } else if (activeIdx <= 12) {
          setAnimationSpeed(animationSpeed * 0.85)
        }
        setActiveIdx(activeIdx + 1)
      } else {
        setActiveIdx(whoIsAIFor.length - 1)
      }
    }, animationSpeed)
    return () => { clearTimeout(timer) }
  }, [activeIdx, animationSpeed])

  useEffect(() => {
    if (rotatorRef === null || (rotatorRef.current == null)) {
      return
    }
    const activeEl = (rotatorRef.current.querySelector('.active') as HTMLElement)
    const newOffset = rotatorRef.current.offsetTop - (activeEl.offsetTop)
    setHeightOffset(newOffset)
  }, [activeIdx])

  return (
    <>
      {activeIdx === whoIsAIFor.length - 1
        ? (
        <div className={styles.container}>
          <Text className={styles['ai-for-u-title']} h1>{TITLE}</Text>
        </div>
          )
        : (
            <div className='ai-4-animation'>
              <span className={styles.container}>
                <Text className={styles['ai-for-u-title']} h1>AI for </Text>
                <span ref={rotatorRef} className={styles.rotator}>
                  {whoIsAIFor.reverse().map((t, i) => (
                    <div
                      style={{ transform: `translateY(${heightOffset}px)` }}
                      className={`${styles.element} ${
                        whoIsAIFor.length - 1 - i === activeIdx ? 'active' : 'inactive'
                      }`}
                    >
                      <Text h1>{t}</Text>
                    </div>
                  ))}
                </span>
              </span>
            </div>
          )}
    </>
  )
}
