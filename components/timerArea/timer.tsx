import { useScramble } from '@/context/ScrambleContext'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const Timer = () => {
  const [time, setTime] = useState('0.00')
  const [running, setRunning] = useState(false)
  const [ready, setReady] = useState(false)
  const [holding, setHolding] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const {nextScramble} = useScramble()

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
      nextScramble()
    }
    setHolding(true)
  }
  const beginTimer = () => {
    setHolding(false)
    if (ready) {
    setStartTime(Date.now())
    setRunning(true)
    setReady(false)
    }
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
        <Text style={styles.timerText}>{time}</Text>
      </Pressable>
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
    transform: [{ translateY: -30}],
  }
})