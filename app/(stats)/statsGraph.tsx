import StatsHeader from '@/components/header/statsHeader'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const StatsGraph = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatsHeader/>
      <Text>Graph</Text>
    </SafeAreaView>
  )
}

export default StatsGraph

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#306291',
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