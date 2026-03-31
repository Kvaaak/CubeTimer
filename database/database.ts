import * as SQLite from 'expo-sqlite';

// Tyyppi ratkaisu-riville
export type Solve = {
  id: number;
  time: string;
  scramble: string;
  created_at: number;
};

// SQLite database (TypeScript ei valita, koska käytetään any)
const db: any = SQLite.openDatabaseSync('times.db');

// Alusta tietokanta ja luo taulu jos sitä ei ole
export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS solves (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      time TEXT,
      scramble TEXT,
      created_at INTEGER
    );
  `);
};

// Tallenna uusi ratkaisu
export const saveSolve = (time: string, scramble: string) => {
  db.runSync(
    'INSERT INTO solves (time, scramble, created_at) VALUES (?, ?, ?);',
    [time, scramble, Date.now()]
  );
};

// Poista viimeisin ratkaisu
export const deleteSolve = (id: number) => {
  db.runSync('DELETE FROM solves WHERE id = ?;', [id]);
};

export const updateSolveTime = (id: number, newTime: string) => {
  db.runSync('UPDATE solves SET time = ? WHERE id = ?;', [newTime, id]);
};

// Poista kaikki solvet
export const clearSolves = () => {
  db.execSync('DELETE FROM solves;');
};

// Hae kaikki ratkaisut uusimmasta vanhimpaan
export const getSolves = (): Solve[] => {
  return db.getAllSync(
    'SELECT * FROM solves ORDER BY created_at DESC;'
  ) as Solve[];
};