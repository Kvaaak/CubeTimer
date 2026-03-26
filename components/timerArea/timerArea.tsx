import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Timer from './timer'

const TimerArea = () => {
  return (
    <View style={styles.container}>
      <View style={{marginTop: 20,}}>
        <Text style={{fontSize: 20, color: '#eee'}}>SCRAMBLE</Text>
      </View>
      <View style={{ flex: 1, width: '100%' }}>
        <Timer />
      </View>
    </View>
  )
}

export default TimerArea

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: '100%'
  },
})