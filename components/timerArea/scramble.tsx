import { useScramble } from '@/context/ScrambleContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Scramble = () => {
  const {scramble} = useScramble()
  return (
    <View>
      <Text style={styles.scrambleText}>{scramble}</Text>
    </View>
  )
}

export default Scramble

const styles = StyleSheet.create({
  scrambleText: {
    fontSize: 20,
    color: '#eee',
    paddingHorizontal: 20,
    textAlign: 'center'
  }
})