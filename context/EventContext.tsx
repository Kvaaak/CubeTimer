import { EventType } from '@/config/events'
import { createContext, useContext, useState } from 'react'

type EventContextType = {
  eventType: EventType
  setEventType: (type: EventType) => void
}

const EventContext = createContext<EventContextType | undefined>(undefined)

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [eventType, setEventType] = useState<EventType>('333')

  return (
    <EventContext.Provider value={{ eventType, setEventType }}>
      {children}
    </EventContext.Provider>
  )
}

export const useEvent = () => {
  const ctx = useContext(EventContext)
  if (!ctx) throw new Error('useEvent must be used within EventProvider')
  return ctx
}