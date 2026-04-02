import { clearSolves } from '@/database/database'
import { useSolves } from '@/hooks/useSolves'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const Average = () => {
  const { bestTime } = useSolves()

  const handleDelete = () => {
    clearSolves()
  }
  return (
    <View>
      <Text style={{color: '#fff', fontSize: 20}}>PB: {bestTime !== null ? bestTime : '--'}</Text>
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