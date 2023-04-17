import React, { useEffect, useRef, useState } from 'react'
import { Text } from '@nextui-org/react'
import styles from '@/styles/AIForAnimation.module.css'

interface AIForAnimationProps {
  stepSpeed?: number // number of ms between word changes
}

const TITLE: string = 'AI for U'

export default function AIForAnimation ({ stepSpeed = 400 }: AIForAnimationProps): JSX.Element {
  const whoIsAIFor: string[] = [
    'Students',
    'Designers',
    'Moms',
    'Influencers',
    'Managers',
    'Coaches',
    'Marketers',
    'Lawyers',
    'Gamers',
    'Writers',
    'Scientists',
    'Developers',
    'Engineers',
    'Analysts',
    'Musicians',
    'Chefs',
    'Artists',
    'Trainers',
    'Planners',
    'Agents',
    'Workers',
    'Teachers',
    'Journalists',
    'Real estate',
    'Travel agents',
    'Accountants',
    'HR managers',
    'Architects',
    'Accountants',
    'Healthcare',
    'Designers',
    'Developers',
    'Scientists',
    '__________',
    'Everyone',
    ''
  ]

  const MIN_ANIMATION_SPEED: number = 200
  const rotatorRef = useRef<HTMLSpanElement>(null)
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const [heightOffset, setHeightOffset] = useState<number>(0)
  const [animationSpeed, setAnimationSpeed] = useState<number>(stepSpeed)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeIdx < whoIsAIFor.length - 1) {
        if (whoIsAIFor.length - activeIdx <= 1) {
          setAnimationSpeed(animationSpeed * 0.01)
        } else if (whoIsAIFor.length - activeIdx <= 2) {
          setAnimationSpeed(animationSpeed * 2.5)
        } else if (whoIsAIFor.length - activeIdx <= 8) {
          setAnimationSpeed(animationSpeed * 1.4)
        } else if (activeIdx <= 8) {
          setAnimationSpeed(animationSpeed * 0.95)
        } else if (activeIdx <= 12) {
          setAnimationSpeed(animationSpeed * 0.8)
        }
        if (animationSpeed < MIN_ANIMATION_SPEED) {
          setAnimationSpeed(MIN_ANIMATION_SPEED)
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
        <div className={styles['ontainer-animation-done']}>
          <Text className={styles['ai-for-u-title-animation-done']} h1>{TITLE}</Text>
        </div>
          )
        : (
            <div className='ai-4-animation'>
              <span className={styles.container}>
                <Text className={styles['ai-for-u-title-animation']} h1>AI for </Text>
                <span ref={rotatorRef} className={styles.rotator}>
                  {whoIsAIFor.reverse().map((t, i) => (
                    <div
                      style={{ transform: `translateY(${heightOffset}px)` }}
                      className={`${styles.element} ${
                        whoIsAIFor.length - 1 - i === activeIdx ? 'active' : 'inactive'
                      }`}
                    >
                      <Text className={styles['ai-for-u-title-animation']} h1>{t}</Text>
                    </div>
                  ))}
                </span>
              </span>
            </div>
          )}
    </>
  )
}
