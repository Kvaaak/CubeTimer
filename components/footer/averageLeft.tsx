import { useEvent } from '@/context/EventContext'
import { useSolves } from '@/hooks/useSolves'
import { useStats } from '@/hooks/useStats'
import { formatTime } from '@/utils/timeFormat'
import React from 'react'
import { Text, View } from 'react-native'

const AverageLeft = () => {
  const { solves } = useSolves()
  const { eventType } = useEvent()
  const { best, getAo } = useStats(solves, eventType)

  const sizes = [5, 12, 50, 100] as const

  const aos = Object.fromEntries(
    sizes.map(n => [n, getAo(n)])
  ) as Record<number, number | null>
  
  return (
    <View>
      <Text style={{color: '#fff'}}>PB: {best !== null ? formatTime(best) : '--'}</Text>
      {sizes.map(n => {
        const value = aos[n]

        return (
          <Text key={n} style={{ color: '#fff' }}>
            Ao{n}: {value !== null ? formatTime(value) : '--'}
          </Text>
        )
      })}
    </View>
  )
}

export default AverageLeft