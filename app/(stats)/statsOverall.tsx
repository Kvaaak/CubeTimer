import StatsHeader from '@/components/header/statsHeader'
import { useEvent } from '@/context/EventContext'
import { useSolves } from '@/hooks/useSolves'
import { useStats } from '@/hooks/useStats'
import { formatTime } from '@/utils/timeFormat'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const StatsOverall = () => {
  const { solves } = useSolves()
  const { eventType } = useEvent()
  const { best, getAo, getBestAo, getMean, solveCount } =
    useStats(solves, eventType)

  const sizes = [5, 12, 50, 100, 200, 500, 1000, 2000, 5000] as const

  const aos = Object.fromEntries(
    sizes.map(n => [n, getAo(n)])
  ) as Record<number, number | null>

  const bestAos = Object.fromEntries(
    sizes.map(n => [n, getBestAo(n)])
  ) as Record<number, number | null>

  const mean = getMean(solveCount)

  return (
    <SafeAreaView style={styles.container}>
      <StatsHeader />

      <Text style={styles.title}>Overall Statistics</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Summary</Text>

        <View style={styles.row}>
          <Text style={styles.labelCell}>Total Solves</Text>
          <Text style={styles.cell}/>
          <Text style={styles.cell}>{solveCount}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.labelCell}>PB</Text>
          <Text style={styles.cell}/>
          <Text style={styles.cell}>
            {best !== null ? formatTime(best) : '--'}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.labelCell}>Mean</Text>
          <Text style={styles.cell}/>
          <Text style={styles.cell}>
            {mean !== null ? formatTime(mean) : '--'}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Averages</Text>

        <View style={styles.row}>
          <Text style={[styles.cell, styles.headerLabel]} />
          <Text style={[styles.cell, styles.headerText]}>Current</Text>
          <Text style={[styles.cell, styles.headerText]}>Best</Text>
        </View>

        {sizes.map(n => {
          const current = aos[n]
          const bestValue = bestAos[n]

          return (
            <View key={n} style={styles.row}>
              <Text style={[styles.cell, styles.labelCell]}>Ao{n}</Text>

              <Text style={styles.cell}>
                {current !== null ? formatTime(current) : '--'}
              </Text>

              <Text style={styles.cell}>
                {bestValue !== null ? formatTime(bestValue) : '--'}
              </Text>
            </View>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

export default StatsOverall

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#306291',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#3a6f9e',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    opacity: 0.8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  labelCell: {
    width: 100,
    color: '#fff',
    fontSize: 15,
  },
  cell: {
    flex: 1,
    color: '#fff',
    minWidth: 80,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600'
  },
  headerLabel: {
    flex: 1,
  },
  headerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.7,
    textAlign: 'center',
  },
})