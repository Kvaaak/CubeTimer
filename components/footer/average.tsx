import { clearSolves } from '@/database/database'
import { useSolves } from '@/hooks/useSolves'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const Average = () => {
  const { bestTime } = useSolves()
  const formatTime = (timeSec: number) => {
    const minutes = Math.floor(timeSec / 60)
    const seconds = Math.floor(timeSec % 60)
    const centiseconds = Math.floor((timeSec * 100) % 100)
    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, '0')}.${centiseconds
        .toString()
        .padStart(2, '0')}`
    } else {
      return `${seconds}.${centiseconds.toString().padStart(2, '0')}`
    }
  }

  const handleDelete = () => {
    clearSolves()
  }
  return (
    <View>
      <Text style={{color: '#fff', fontSize: 20}}>PB: {bestTime !== null ? formatTime(bestTime) : '--'}</Text>
      <Pressable onPress={handleDelete} style={styles.button}>
        <Text style={{color: '#eee'}}>TYHJENNÄ</Text>
      </Pressable>
    </View>
  )
}

export default Average

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#204f7cb2', 
    padding: 10, 
    borderRadius: 6,
    borderColor: '#20507c', 
    borderWidth: 1,
  }
})