import React from 'react'
import { StyleSheet, View } from 'react-native'
import Scramble from './scramble'
import Timer from './timer'

const TimerArea = () => {
  return (
    <View style={styles.container}>
      <View style={styles.scramble}>
        <Scramble/>
      </View>
      <View style={styles.timer}>
        <Timer />
      </View>
    </View>
  )
}

export default TimerArea

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  scramble: {
    alignItems: 'center',
    marginTop: 20,
  },
  timer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
})