import { getScrambleType } from '@/config/events'
import { createContext, useContext, useEffect, useState } from 'react'
import { generateScramble } from 'react-rubiks-cube-utils'
import { useEvent } from './EventContext'

interface ScrambleContextType {
  scramble: string
  nextScramble: () => void
}

const ScrambleContext = createContext<ScrambleContextType | undefined>(undefined)

export const ScrambleProvider = ({ children }: { children: React.ReactNode }) => {
  const { eventType } = useEvent()

  const generate = () => {
    if (!eventType) return ''

    const type = getScrambleType(eventType)

    if (!type) return ''

    return generateScramble({ type })
  }

  const [scramble, setScramble] = useState<string>(() => generate())

  const nextScramble = () => {
    setScramble(generate())
  }

  useEffect(() => {
    setScramble('')

    const timeout = setTimeout(() => {
      setScramble(generate())
    }, 0)

    return () => clearTimeout(timeout)
  }, [eventType])

  return (
    <ScrambleContext.Provider value={{ scramble, nextScramble }}>
      {children}
    </ScrambleContext.Provider>
  )
}

export const useScramble = () => {
  const context = useContext(ScrambleContext)

  if (!context) {
    throw new Error('useScramble must be used within a ScrambleProvider')
  }

  return context
}