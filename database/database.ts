import * as SQLite from 'expo-sqlite'

export type Penalty = 'none' | '+2' | 'DNF'

export type Solve = {
  id: number
  time: number
  scramble: string
  penalty: Penalty
  created_at: number
}

const db: any = SQLite.openDatabaseSync('times.db')

type Subscriber = () => void
const solveChangeSubscribers: Subscriber[] = []

export const subscribeSolveChanges = (callback: Subscriber) => {
  solveChangeSubscribers.push(callback)
  return () => {
    const index = solveChangeSubscribers.indexOf(callback)
    if (index !== -1) solveChangeSubscribers.splice(index, 1)
  }
}

const notifySolveChanges = () => {
  solveChangeSubscribers.forEach(callback => callback())
}

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS solves (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      time REAL,
      scramble TEXT,
      penalty TEXT DEFAULT 'none',
      created_at INTEGER
    );
  `)
}

const parseTime = (timeStr: string): number => {
  const parts = timeStr.split(':')
  if (parts.length === 2) {
    const minutes = parseInt(parts[0], 10)
    const seconds = parseFloat(parts[1])
    return minutes * 60 + seconds
  }
  return parseFloat(timeStr)
}

export const saveSolve = (timeStr: string, scramble: string) => {
  const time = parseTime(timeStr)

  db.runSync(
    'INSERT INTO solves (time, scramble, penalty, created_at) VALUES (?, ?, ?, ?);',
    [time, scramble, 'none', Date.now()]
  )
  notifySolveChanges()
}

export const deleteSolve = (id: number) => {
  db.runSync('DELETE FROM solves WHERE id = ?;', [id])
  notifySolveChanges()
}

export const updateSolvePenalty = (id: number, penalty: Penalty) => {
  db.runSync(
    'UPDATE solves SET penalty = ? WHERE id = ?;',
    [penalty, id]
  )
  notifySolveChanges()
}

export const clearSolves = () => {
  db.execSync('DELETE FROM solves;')
  notifySolveChanges()
}

export const getSolves = (): Solve[] => {
  return db.getAllSync(
    'SELECT * FROM solves ORDER BY created_at DESC;'
  ) as Solve[]
}