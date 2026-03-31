import { useScramble } from '@/context/ScrambleContext'
import { deleteSolve, getSolves, saveSolve } from '@/database/database'
import { useSolves } from '@/hooks/useSolves'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

type Props = {
  fullscreen: boolean
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>
}

const Timer = ({fullscreen, setFullscreen}: Props) => {
  const [time, setTime] = useState('0.00')
  const [running, setRunning] = useState(false)
  const [ready, setReady] = useState(false)
  const [holding, setHolding] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const {scramble, nextScramble} = useScramble()
  const [lastSolveId, setLastSolveId] = useState<number | null>(null);
  const { solves, bestTime, refreshSolves, formatTime } = useSolves()

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (running) {
      interval = setInterval(() => {
        const diff = Date.now() - startTime
        const minutes = Math.floor(diff / 60000)
        const seconds = Math.floor((diff % 60000) / 1000)
        const centiseconds = Math.floor((diff % 1000) / 10)
        if (minutes > 0) {
          setTime(`${minutes}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`)
        } else {
          setTime(`${seconds}.${centiseconds.toString().padStart(2, '0')}`)
        }
      }, 10)
    }
    return () => clearInterval(interval)
  }, [running, startTime])

  const prepareTimer = () => {
    setReady(true)
  }

  const stopTimer = () => {
    if (running) {
      setRunning(false)
      saveSolve(time,scramble)
      setTime(time)
      const newBest = refreshSolves()
      const latest = getSolves()[0]
      setLastSolveId(latest?.id ?? null)
      setFullscreen(false)
      nextScramble()
      console.log(newBest)
      console.log(
        getSolves().map(s => ({ id: s.id, time: s.time }))
      )
    }
    setHolding(true)
  }

  const beginTimer = () => {
    setHolding(false)
    if (ready) {
      setStartTime(Date.now())
      setRunning(true)
      setFullscreen(true)
      setReady(false)
    }
  }

  const deleteTime = () => {
      if (!lastSolveId) return
      deleteSolve(lastSolveId)
      setLastSolveId(null)
      refreshSolves()
  }

  const addTwo = () => {

  }

  const didNotFinish = () => {

  }

  return (
    <View style={{flex: 1, width: '100%'}}>
      <Pressable 
        onLongPress={prepareTimer} 
        onPressIn={stopTimer}
        onPressOut={beginTimer}
        style={() => {
          if (ready || running) return [styles.wrapper, {backgroundColor: '#309164'}]
          if (holding) return [styles.wrapper, { backgroundColor: '#913030'}]
          return [styles.wrapper, { backgroundColor: '#111'}]
        }}
        >
        <Text style={[styles.timerText, {transform: [{ translateY: fullscreen ? 0 : -35 }]}]}>{time}</Text>
      </Pressable>
      {!fullscreen && (
        <View style={styles.buttonWrapper}>
          <Pressable style={styles.buttonArea}>
            <Text>
              +2
            </Text>
          </Pressable>
          <Pressable style={styles.buttonArea}>
            <Text>
              DNF
            </Text>
          </Pressable>
          <Pressable style={styles.buttonArea} onPress={deleteTime}>
            <Text>
              X
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default Timer

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  timerText: {
    fontSize: 60,
    color: '#eee',
    fontVariant: ['tabular-nums'],
  },
  buttonArea: {
    backgroundColor: '#888',
    width: 40,
    borderRadius: 6,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 170,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {

  }
})