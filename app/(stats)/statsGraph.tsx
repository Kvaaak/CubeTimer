import StatsHeader from '@/components/header/statsHeader'
import { useEvent } from '@/context/EventContext'
import { useSolves } from '@/hooks/useSolves'
import { getRollingAverages, normalizeSolve } from '@/utils/averages'
import React, { useMemo } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { LineChart } from "react-native-gifted-charts"
import { SafeAreaView } from 'react-native-safe-area-context'

const screenWidth = Dimensions.get('window').width

const StatsGraph = () => {
  const { solves } = useSolves()
  const { eventType } = useEvent()

  const format = (v: number) => {
    if (v < 10) return Number(v.toFixed(2))
    return Number(v.toFixed(1))
  }

  const eventSolves = useMemo(
    () => solves.filter(s => s.eventType === eventType),
    [solves, eventType]
  )

  const baseData = useMemo(
    () =>
      eventSolves
        .map(normalizeSolve)
        .filter(t => t !== Infinity)
        .reverse()
        .map(format),
    [eventSolves]
  )

  const alignToBase = (arr: (number | null)[]) => {
    const cleaned = arr.map(v => (v === null ? undefined : format(v)))
    const diff = baseData.length - cleaned.length
    return [...Array(Math.max(diff, 0)).fill(undefined), ...cleaned]
  }

  const makeAO = (size: number) =>
    getRollingAverages(eventSolves, size).reverse()

  const ao5 = useMemo(() => alignToBase(makeAO(5)), [eventSolves, baseData.length])
  const ao12 = useMemo(() => alignToBase(makeAO(12)), [eventSolves, baseData.length])
  const ao100 = useMemo(() => alignToBase(makeAO(100)), [eventSolves, baseData.length])

  const mainLine = baseData.map(v => ({ value: v }))
  const ao5Line = ao5.map(v => ({ value: v }))
  const ao12Line = ao12.map(v => ({ value: v }))
  const ao100Line = ao100.map(v => ({ value: v }))

  const yAxisRange = useMemo(() => {
    const all = [
      ...baseData,
      ...ao5.filter((v): v is number => v !== undefined),
      ...ao12.filter((v): v is number => v !== undefined),
      ...ao100.filter((v): v is number => v !== undefined),
    ]

    if (all.length === 0) return null

    const min = Math.min(...all)
    const max = Math.max(...all)

    return {
      min,
      max: max - min,
    }
  }, [baseData, ao5, ao12, ao100])

  const spacing = useMemo(() => {
    const w = screenWidth - 60
    return Math.min(40, w / Math.max(baseData.length, 1))
  }, [baseData.length])

  return (
    <SafeAreaView style={styles.container}>
      <StatsHeader />

      <View style={styles.legend}>
        <Legend color="#fff" label="Time" />
        <Legend color="#00ff88" label="Ao5" />
        <Legend color="#ffaa00" label="Ao12" />
        <Legend color="#ff4d4d" label="Ao100" />
      </View>

      <View style={styles.graph}>
        <LineChart
          data={mainLine}
          data2={ao5Line}
          data3={ao12Line}
          data4={ao100Line}

          spacing={spacing}
          width={screenWidth - 60}
          initialSpacing={0}
          endSpacing={20}
          hideDataPoints
          disableScroll

          thickness={2}
          thickness2={2}
          thickness3={2}
          thickness4={2}

          color="#ffffff"
          color2="#00ff88"
          color3="#ffaa00"
          color4="#ff4d4d"

          yAxisColor="#ffffff50"
          xAxisColor="#ffffff50"
          yAxisTextStyle={styles.axisText}
          noOfSections={3}

          yAxisOffset={yAxisRange?.min ?? 0}
          maxValue={yAxisRange?.max ?? 0}
        />
      </View>
    </SafeAreaView>
  )
}

const Legend = ({ color, label }: { color: string; label: string }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }} />
    <Text style={{ color: '#fff', fontSize: 12 }}>{label}</Text>
  </View>
)

export default StatsGraph

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#306291',
    paddingHorizontal: 20,
  },
  graph: {
    flex: 1,
    paddingVertical: 20,
  },
  axisText: {
    color: '#fff',
    fontSize: 10,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
})