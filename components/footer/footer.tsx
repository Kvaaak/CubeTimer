import React from 'react'
import { StyleSheet, View } from 'react-native'
import AverageLeft from './averageLeft'
import AverageRight from './averageRight'
import ScrambledCube from './scrambledCube'

const Footer = () => {
  return (
    <View style={styles.card}>
      <AverageLeft/>
      <ScrambledCube/>
      <AverageRight/>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
    card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    height: 100,
  },
})