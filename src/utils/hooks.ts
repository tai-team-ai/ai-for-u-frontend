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

export { isMobile }
