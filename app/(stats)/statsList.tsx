import { deleteSolve, updateSolvePenalty } from '@/database/database'
import { SolveWithTime, useSolves } from '@/hooks/useSolves'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type DateValue = number | string

const formatDateTime = (value: DateValue) => {
  const date = new Date(value)
  const pad = (n: number) => n.toString().padStart(2, '0')

  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${pad(date.getHours())}.${pad(date.getMinutes())}`
}

const formatSolveTime = (timeSec: number) => {
  if (!Number.isFinite(timeSec)) return 'DNF'

  const minutes = Math.floor(timeSec / 60)
  const seconds = Math.floor(timeSec % 60)
  const centiseconds = Math.floor((timeSec * 100) % 100)
  const centiStr = centiseconds.toString().padStart(2, '0')

  if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${centiStr}`
  }

  return `${seconds}.${centiStr}`
}

const StatsList = () => {
  const [visible, setVisible] = useState(false)
  const [selectedSolve, setSelectedSolve] = useState<SolveWithTime | null>(null)
  const router = useRouter()
  const {solves, refreshSolves} = useSolves()

  const openSolve = (item: SolveWithTime) => {
    setSelectedSolve(item)
    setVisible(true)
  }

  const applyPenaltyToSelectedSolve = (newPenalty: 'none' | '+2' | 'DNF') => {
    if (!selectedSolve) return
    updateSolvePenalty(selectedSolve.id, newPenalty)
    refreshSolves()
    setSelectedSolve({
      ...selectedSolve,
      penalty: newPenalty,
      timeSec: newPenalty === '+2' ? selectedSolve.time + 2 : newPenalty === 'DNF' ? Infinity : selectedSolve.time,
    })
  }

  const deleteSelectedSolve = () => {
    if (!selectedSolve) return
    Alert.alert(
          'Delete Solve',
          'Are you sure you want to delete this solve?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Yes',
              onPress: () => {
                deleteSolve(selectedSolve.id)
                refreshSolves()
                setSelectedSolve(null)
                setVisible(false)
              },
              style: 'destructive',
            },
          ],
          { cancelable: true }
        )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{color: '#eee', fontSize: 22}}>
          3x3x3
        </Text>
        <Pressable onPress={() => {router.back()}} style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.5 : 1 }
          ]}>
            <Text style={{fontSize: 16, color: '#eee'}}>X</Text>
        </Pressable>
      </View>

      <View style={{paddingBottom: 50}}>
        <FlatList
          data={solves}
          keyExtractor={(item)=>item.id.toString()}
          renderItem={({item}) => (
            <Pressable
              onPress={() => openSolve(item)}
              style= {({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
            >
              <View style={styles.card}>
                <Text style={styles.timeText}>{formatSolveTime(item.timeSec)}</Text>
                <View style={styles.timeInfo}>
                  <Text style={{color: '#505050', fontSize: 11}}>{item.scramble}</Text>
                  <Text style={{color: '#505050', fontSize: 11}}>{formatDateTime(item.created_at)}</Text>
                </View>
              </View>
            </Pressable>
          )}
        />
        <Modal
        visible={visible}
        transparent
        animationType="fade"
        >
          <Pressable
            onPress={() => setVisible(false)}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.4)'
            }}
          >
            <Pressable
              onPress={() => {}}
              style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                width: 250
              }}
            >
              
              <Text style={{ fontSize: 18, marginBottom: 10 }}>
                Solve options
              </Text>

              {selectedSolve && (
                <>
                  <Text style={{ marginBottom: 8, fontSize: 16 }}>
                    {formatSolveTime(selectedSolve.timeSec)}
                    {selectedSolve.penalty !== 'none' ? ` (${selectedSolve.penalty})` : ''}
                  </Text>
                  <Text style={{ marginBottom: 12, color: '#555' }}>
                    {selectedSolve.scramble}
                  </Text>
                </>
              )}

              <Pressable
                onPress={() => applyPenaltyToSelectedSolve(selectedSolve?.penalty === '+2' ? 'none' : '+2')}
                style={({ pressed }) => [{
                  paddingVertical: 10,
                  borderRadius: 8,
                  backgroundColor: '#204f7cb2',
                  marginBottom: 10,
                  opacity: pressed ? 0.7 : 1,
                }]}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>
                  {selectedSolve?.penalty === '+2' ? 'Remove +2' : 'Add +2'}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => applyPenaltyToSelectedSolve(selectedSolve?.penalty === 'DNF' ? 'none' : 'DNF')}
                style={({ pressed }) => [{
                  paddingVertical: 10,
                  borderRadius: 8,
                  backgroundColor: '#913030',
                  marginBottom: 10,
                  opacity: pressed ? 0.7 : 1,
                }]}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>
                  {selectedSolve?.penalty === 'DNF' ? 'Remove DNF' : 'Set DNF'}
                </Text>
              </Pressable>

              <Pressable
                onPress={deleteSelectedSolve}
                style={({ pressed }) => [{
                  paddingVertical: 10,
                  borderRadius: 8,
                  backgroundColor: '#777',
                  marginBottom: 10,
                  opacity: pressed ? 0.7 : 1,
                }]}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>
                  Delete solve
                </Text>
              </Pressable>

              <Pressable onPress={() => setVisible(false)}>
                <Text style={{ color: '#204f7cb2', textAlign: 'center' }}>
                  Close
                </Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaView>
  )
}

export default StatsList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#306291',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    height: 100,
  },
  timeText: {
    fontSize: 22,
    color: '#3a3a3a',
    width: 80,
    textAlign: 'center',
  },
  timeInfo: {
    marginLeft: 10,
    marginRight: 80,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: "5%",
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingLeft: 14,
    borderRadius: 6,
    backgroundColor: 'rgb(206, 208, 211)'
  },
  button: {
    flex: 1,
    maxWidth: 40,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#20507c',
    backgroundColor: '#204f7cb2'
  },
})