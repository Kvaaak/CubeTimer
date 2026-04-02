import React from 'react'
import { StyleSheet, View } from 'react-native'
import Average from './average'
import ScrambledCube from './scrambledCube'

const Footer = () => {
  return (
    <View style={styles.card}>
      <Average/>
      <ScrambledCube/>
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