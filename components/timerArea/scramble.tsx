import { useEvent } from '@/context/EventContext';
import { useScramble } from '@/context/ScrambleContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Scramble = () => {
  const { scramble } = useScramble();
  const { eventType } = useEvent();

  const fontSize = React.useMemo(() => {
    switch (eventType) {
      case '444':
        return 16; // Pienempi 4x4:lle
      default:
        return 20;
    }
  }, [eventType]);

  return (
    <View>
      <Text style={[styles.scrambleText, { fontSize }]} numberOfLines={4}>
        {scramble}
      </Text>
    </View>
  );
};

export default Scramble

const styles = StyleSheet.create({
  scrambleText: {
    color: '#eee',
    paddingHorizontal: 20,
    textAlign: 'center'
  }
})