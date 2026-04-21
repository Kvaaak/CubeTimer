export const EVENTS = {
  '333': {
    label: '3x3',
    scramble: '3x3',
  },
  '333oh': {
    label: '3x3 OH',
    scramble: '3x3',
  },
  '222': {
    label: '2x2',
    scramble: '2x2',
  },
  '444': {
    label: '4x4',
    scramble: '4x4',
  },
} as const

export type EventType = keyof typeof EVENTS

export type ScrambleType = string

export const getScrambleType = (event: EventType): ScrambleType => {
  return EVENTS[event].scramble
}

export const getEventLabel = (event: EventType): string => {
  return EVENTS[event].label
}