import { useScramble } from '@/context/ScrambleContext'
import { deleteSolve, getSolves, saveSolve, updateSolvePenalty } from '@/database/database'
import { useSolves } from '@/hooks/useSolves'
import React, { useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'

type Props = {
  fullscreen: boolean
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>
  setBgColor?: React.Dispatch<React.SetStateAction<string>>
}

type Penalty = 'none' | '+2' | 'DNF'

const Timer = ({ fullscreen, setFullscreen, setBgColor }: Props) => {
  const [startTime, setStartTime] = useState<number | null>(null)
  const [displayTime, setDisplayTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [ready, setReady] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const { scramble, nextScramble } = useScramble()
  const [lastSolveId, setLastSolveId] = useState<number | null>(null)
  const [penalty, setPenalty] = useState<Penalty>('none')
  const { solves, bestTime, refreshSolves } = useSolves()

  useEffect(() => {
    let frame: number

    const tick = () => {
      if (running && startTime) {
        setCurrentTime(Date.now() - startTime)
        frame = requestAnimationFrame(tick)
      }
    }

    if (running) frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [running, startTime])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)
    return minutes > 0
      ? `${minutes}:${seconds.toString().padStart(2, '0')}.${centiseconds
          .toString()
          .padStart(2, '0')}`
      : `${seconds}.${centiseconds.toString().padStart(2, '0')}`
  }

  const prepareTimer = () => {
    setReady(true)
    setBgColor?.('#309164')
  }

  const stopTimer = () => {
    if (running) {
      setRunning(false)
      setDisplayTime(currentTime)
      setBgColor?.('#306291')
      const timeStr = formatTime(currentTime)
      saveSolve(timeStr, scramble)

      const beforeBest = bestTime
      refreshSolves()
      const latest = getSolves()[0]
      setLastSolveId(latest?.id ?? null)
      setPenalty(latest?.penalty ?? 'none')

      if (latest) {
        let latestTime = latest.time
        if (latest.penalty === '+2') latestTime += 2
        if (latest.penalty === 'DNF') latestTime = Infinity

        if (latestTime !== Infinity && (beforeBest === null || latestTime < beforeBest)) {
          Toast.show({
            type: 'success',
            text1: 'New Best Time!',
            text2: timeStr,
            position: 'bottom',
            bottomOffset: 200,
          })
        }
      }

      setPenalty('none')
      setFullscreen(false)
      nextScramble()
    }
    setBgColor?.('#913030')
  }

  const beginTimer = () => {
    if (ready) {
      setStartTime(Date.now())
      setRunning(true)
      setFullscreen(true)
      setReady(false)
      setBgColor?.('#309164')
    } else {
      setBgColor?.('#306291')
    }
  }

  const deleteTime = () => {
    if (!lastSolveId) return

    Alert.alert(
      'Delete Solve',
      'Are you sure you want to delete this solve?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            deleteSolve(lastSolveId)
            setLastSolveId(null)
            refreshSolves()
            setPenalty('none')
            setCurrentTime(0)
            setDisplayTime(0)
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    )
  }

  const addTwo = () => {
    if (!lastSolveId) return
    const last = solves.find(s => s.id === lastSolveId)
    if (!last) return
    const newPenalty: Penalty = penalty === '+2' ? 'none' : '+2'
    applyPenalty(last, newPenalty)
  }

  const toggleDNF = () => {
    if (!lastSolveId) return
    const last = solves.find(s => s.id === lastSolveId)
    if (!last) return
    const newPenalty: Penalty = penalty === 'DNF' ? 'none' : 'DNF'
    applyPenalty(last, newPenalty)
  }

  const applyPenalty = (solve: any, newPenalty: Penalty) => {
    updateSolvePenalty(solve.id, newPenalty)
    refreshSolves()
    setPenalty(newPenalty)
  }

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <Pressable
        onLongPress={prepareTimer}
        onPressIn={stopTimer}
        onPressOut={beginTimer}
        style={styles.wrapper}
      >
        <Text
          style={[
            styles.timerText,
            { transform: [{ translateY: fullscreen ? 0 : -35 }] },
          ]}
        >
          {formatTime(running ? currentTime : displayTime)}
        </Text>
      </Pressable>

      {!fullscreen && (
        <View style={styles.buttonWrapper}>
          <Pressable
            onPress={addTwo}
            style={({ pressed }) => [
              styles.buttonArea,
              {
                opacity: pressed ? 0.5 : 1,
                backgroundColor: penalty === '+2' ? '#309164' : '#204f7cb2',
              },
            ]}
          >
            <Text style={styles.buttonText}>+2</Text>
          </Pressable>
          <Pressable
            onPress={toggleDNF}
            style={({ pressed }) => [
              styles.buttonArea,
              {
                opacity: pressed ? 0.5 : 1,
                backgroundColor: penalty === 'DNF' ? '#913030' : '#204f7cb2',
              },
            ]}
          >
            <Text style={styles.buttonText}>DNF</Text>
          </Pressable>
          <Pressable
            onPress={deleteTime}
            style={({ pressed }) => [
              styles.buttonArea,
              { opacity: pressed ? 0.5 : 1, backgroundColor: '#204f7cb2' },
            ]}
          >
            <Text style={styles.buttonText}>X</Text>
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
    borderColor: '#20507c',
    borderWidth: 1,
    width: 40,
    borderRadius: 6,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#eee',
  },
})