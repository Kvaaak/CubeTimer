import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Average from './average'

const Footer = () => {
  return (
    <View style={styles.card}>
      <Average/>
      <Text style={{fontSize: 20, color: '#eee'}}>Scrambled cube</Text>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
    card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#45ce8e',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    height: 100,
  },
})