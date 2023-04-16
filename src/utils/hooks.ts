import { useState, useEffect } from 'react'

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

  useEffect(() => {
    const handleResize = (): void => {
      // Check if the window height has decreased (keyboard is visible)
      if (window.innerHeight < windowHeight) {
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
  }, [windowHeight])

  return isKeyboardVisible
}

export { isMobile, isMobileKeyboardVisible }
