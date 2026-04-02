import { useScramble } from '@/context/ScrambleContext';
import React from 'react';
import { View } from 'react-native';
import { applyScramble, Cube } from 'react-rubiks-cube-utils';

type Props = {
  size?: number; // koko keskirivin laatalle
  faceGap?: number; // väli facejen välillä
};

const colors: Record<string, string> = {
  W: '#fff',
  Y: '#ff0',
  G: '#0f0',
  B: '#00f',
  O: '#ffa500',
  R: '#f00',
};

const ScrambledCube2D = ({ size = 9, faceGap = 2 }: Props) => {
  const { scramble } = useScramble();
  const cube: Cube = applyScramble({ type: '3x3', scramble });
  const { U, D, F, B, L, R } = cube;
  const renderFace = (face: string[][]) => (
    <View>
      {face.map((row, rIdx) => (
        <View key={rIdx} style={{ flexDirection: 'row', marginBottom: rIdx < 2 ? 1 : 0 }}>
          {row.map((sticker, cIdx) => (
            <View
              key={cIdx}
              style={{
                width: size,
                height: size,
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

  const emptyFace = () => (
    <View style={{ width: size * 3, height: size * 3, marginRight: faceGap }} />
  );

  return (
    <View style={{ padding: 10 }}>
      {/* Ylin rivi: U */}
      <View style={{ flexDirection: 'row', marginBottom: faceGap }}>
        {emptyFace()}
        {renderFace(U)}
      </View>

      {/* Keskirivi: L F R B */}
      <View style={{ flexDirection: 'row', marginBottom: faceGap }}>
        {renderFace(L)}
        <View style={{ width: faceGap }} />
        {renderFace(F)}
        <View style={{ width: faceGap }} />
        {renderFace(R)}
        <View style={{ width: faceGap }} />
        {renderFace(B)}
      </View>

      {/* Alarivi: D */}
      <View style={{ flexDirection: 'row' }}>
        {emptyFace()}
        {renderFace(D)}
      </View>
    </View>
  );
};

export default ScrambledCube2D;