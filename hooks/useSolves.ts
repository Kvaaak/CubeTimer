import { getSolves, Solve } from '@/database/database';
import { useEffect, useState } from 'react';

// Muuntaa "mm:ss.SS" string → numero sekunneissa
const parseTime = (timeStr: string) => {
  if (timeStr === 'DNF') return Infinity; // ei vaikuta bestTimeen
  const parts = timeStr.split(':');
  if (parts.length === 2) {
    const minutes = parseInt(parts[0], 10);
    const seconds = parseFloat(parts[1]);
    return minutes * 60 + seconds;
  }
  return parseFloat(timeStr); // jos pelkkä sekunti
};

// Muuntaa numero sekunneissa → "mm:ss.SS"
const formatTime = (timeSec: number) => {
  const minutes = Math.floor(timeSec / 60);
  const seconds = (timeSec % 60).toFixed(2);
  return `${minutes}:${seconds.padStart(5, '0')}`;
}

export const useSolves = () => {
  const [solves, setSolves] = useState<(Solve & { timeSec: number })[]>([]);
  const [bestTime, setBestTime] = useState<number | null>(null);

  // Funktio hakee ja parsaa ratkaisut
  const refreshSolves = () => {
    const rawSolves = getSolves();
    const parsedSolves = rawSolves.map(s => ({
      ...s,
      timeSec: parseTime(s.time),
    }));
    setSolves(parsedSolves);

    const newBest = parsedSolves.length > 0 
      ? Math.min(...parsedSolves.map(s => s.timeSec))
      : null;
    setBestTime(newBest);

    return newBest; // <-- palautetaan heti
  };

  useEffect(() => {
    refreshSolves(); // initial load
  }, []);

  return { solves, bestTime, formatTime, refreshSolves };
};