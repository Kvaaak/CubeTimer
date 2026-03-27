import { createContext, useContext, useState } from 'react';
import { generateScramble } from 'react-rubiks-cube-utils';

interface ScrambleContextType {
  scramble: string;
  nextScramble: () => void;
}

const ScrambleContext = createContext<ScrambleContextType>({
  scramble: '',
  nextScramble: () => {},
});

export const ScrambleProvider = ({ children }: { children: React.ReactNode }) => {
  const [scramble, setScramble] = useState<string>(generateScramble({ type: '3x3' }));

  const nextScramble = () => {
    setScramble(generateScramble({ type: '3x3' }));
  };

  return (
    <ScrambleContext.Provider value={{ scramble, nextScramble }}>
      {children}
    </ScrambleContext.Provider>
  );
};

export const useScramble = () => useContext(ScrambleContext);