import { useEvent } from '@/context/EventContext';
import { useScramble } from '@/context/ScrambleContext';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { applyScramble, Cube } from 'react-rubiks-cube-utils';

const colors: Record<string, string> = {
  W: '#fff',
  Y: '#ff0',
  G: '#0f0',
  B: '#00f',
  O: '#ffa500',
  R: '#f00',
};

const ScrambledCube2D = () => {
  const { eventType } = useEvent();
  const { scramble } = useScramble();

  // Event-kohtainen size, gap ja face size
  const { cubeSize, cubeGap, faceSize } = React.useMemo(() => {
    switch (eventType) {
      case '222':
        return { cubeSize: 16, cubeGap: 2, faceSize: 2 }; // 2x2 face
      case '333':
      case '333oh':
        return { cubeSize: 11, cubeGap: 2, faceSize: 3 }; // 3x3 face
      case '444':
        return { cubeSize: 8, cubeGap: 3, faceSize: 4 }; // 4x4 face
      default:
        return { cubeSize: 11, cubeGap: 2, faceSize: 3 };
    }
  }, [eventType]);

  const cube = React.useMemo(() => {
    return applyScramble({ type: eventType, scramble });
  }, [eventType, scramble]) as Cube | null;

  if (!cube) return null;

  const { U, D, F, B, L, R } = cube;

  const renderFace = (face: string[][]) => (
    <View>
      {face.map((row, rIdx) => (
        <View key={rIdx} style={{ flexDirection: 'row'}}>
          {row.map((sticker, cIdx) => (
            <View
              key={cIdx}
              style={{
                width: cubeSize,
                height: cubeSize,
                backgroundColor: colors[sticker] || '#000',
                borderWidth: 1,
                borderColor: '#333',
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Ylin rivi: U */}
      <View style={{ flexDirection: 'row', marginBottom: cubeGap, justifyContent: 'center' }}>
        {renderFace(U)}
        <View style={{ width: cubeSize * faceSize, height: cubeSize * faceSize, marginRight: cubeGap }} />
      </View>

      {/* Keskirivi: L F R B */}
      <View style={{ flexDirection: 'row', marginBottom: cubeGap, justifyContent: 'center' }}>
        {renderFace(L)}
        <View style={{ width: cubeGap }} />
        {renderFace(F)}
        <View style={{ width: cubeGap }} />
        {renderFace(R)}
        <View style={{ width: cubeGap }} />
        {renderFace(B)}
      </View>

      {/* Alarivi: D */}
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {renderFace(D)}
        <View style={{ width: cubeSize * faceSize, height: cubeSize * faceSize, marginRight: cubeGap }} />
      </View>
    </View>
  );
};

export default ScrambledCube2D;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});