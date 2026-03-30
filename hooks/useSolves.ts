import { getSolves, Solve } from '@/database/database';
import { useEffect, useState } from 'react';

export const useSolves = () => {
  const [solves, setSolves] = useState<Solve[]>([]);

  useEffect(() => {
    setSolves(getSolves());
  }, []);

  return solves;
};