import { clearSolves } from '@/database/database'
import { useSolves } from '@/hooks/useSolves'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const Average = () => {
  const { solves, bestTime, refreshSolves, formatTime } = useSolves()

  const handleDelete = () => {
    clearSolves()
  }
  return (
    <View>
      <Text style={{color: '#fff', fontSize: 20}}>PB: {bestTime !== null ? formatTime(bestTime) : '--'}</Text>
      <Pressable onPress={handleDelete} style={{backgroundColor: '#fff', padding: 10,}}>
        <Text>TYHJENNÄ</Text>
      </Pressable>
    </View>
  )
}

export default Average

const styles = StyleSheet.create({})