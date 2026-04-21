import { useEvent } from '@/context/EventContext'
import { useSolves } from '@/hooks/useSolves'
import { useStats } from '@/hooks/useStats'
import { formatTime } from '@/utils/timeFormat'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const StatsOverall = () => {
  const { solves } = useSolves()
  const { eventType } = useEvent()
  const { best, getAo, getMean, solveCount } = useStats(solves, eventType)

  const sizes = [5, 12, 50, 100, 200, 500, 1000] as const

  const aos = Object.fromEntries(
    sizes.map(n => [n, getAo(n)])
  ) as Record<number, number | null>

  const mean = getMean(solveCount)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overall Statistics</Text>
      <Text style={styles.stat}>Total Solves: {solveCount}</Text>
      <Text style={styles.stat}>PB: {best !== null ? formatTime(best) : '--'}</Text>
      {sizes.map(n => {
        const value = aos[n]
        return (
          <Text key={n} style={styles.stat}>
            Ao{n}: {value !== null ? formatTime(value) : '--'}
          </Text>
        )
      })}
      <Text style={styles.stat}>Mean: {mean !== null ? formatTime(mean) : '--'}</Text>
    </View>
  )
}

export default StatsOverall

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  stat: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
})