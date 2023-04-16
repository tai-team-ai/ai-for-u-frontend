import { useState, useEffect, useRef } from 'react'

function useViewport (): { width: number, height: number } {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    const handleResize = (): void => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return viewport
}

function isMobile (): boolean {
  const { width } = useViewport()
  return width < 768
}

function isMobileKeyboardVisible (): boolean {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const { height: windowHeight } = useViewport()
  const windowHeightRef = useRef(windowHeight)

  useEffect(() => {
    windowHeightRef.current = windowHeight
  }, [windowHeight])

  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerHeight < windowHeightRef.current) {
        setIsKeyboardVisible(true)
      } else {
        setIsKeyboardVisible(false)
      }
    }

    let resizeTimer: any
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 200)
    })

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isKeyboardVisible
}

export { isMobile, isMobileKeyboardVisible }
