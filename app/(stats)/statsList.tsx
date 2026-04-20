import { EVENTS } from '@/config/events'
import { useEvent } from '@/context/EventContext'
import { deleteSolve, Solve, updateSolvePenalty } from '@/database/database'
import { useSolves } from '@/hooks/useSolves'
import { useRouter } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const formatDateTime = (value: number) => {
  const date = new Date(value)
  const pad = (n: number) => n.toString().padStart(2, '0')

  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${pad(date.getHours())}.${pad(date.getMinutes())}`
}

const formatSolveTime = (time: number, penalty: Solve['penalty']) => {
  if (penalty === 'DNF') return 'DNF'

  const finalTime = penalty === '+2' ? time + 2 : time

  const minutes = Math.floor(finalTime / 60)
  const seconds = Math.floor(finalTime % 60)
  const centiseconds = Math.floor((finalTime * 100) % 100)

  const centiStr = centiseconds.toString().padStart(2, '0')

  if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${centiStr}`
  }

  return `${seconds}.${centiStr}`
}

const StatsList = () => {
  const { solves, refreshSolves } = useSolves()
  const { eventType, setEventType } = useEvent()
  const router = useRouter()

  const [visible, setVisible] = useState(false)
  const [openEventMenu, setOpenEventMenu] = useState(false)
  const [selectedSolve, setSelectedSolve] = useState<Solve | null>(null)

  const eventLabel = EVENTS[eventType].label

  const eventSolves = useMemo(
    () => solves.filter((solve) => solve.eventType === eventType),
    [solves, eventType]
  )

  const openSolve = (item: Solve) => {
    setSelectedSolve(item)
    setVisible(true)
  }

  const applyPenalty = (newPenalty: Solve['penalty']) => {
    if (!selectedSolve) return

    updateSolvePenalty(selectedSolve.id, newPenalty)
    refreshSolves()

    setSelectedSolve({
      ...selectedSolve,
      penalty: newPenalty,
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
      ]
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => setOpenEventMenu(true)}
          style={({ pressed }) => [
            styles.eventButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <Text style={{ color: '#eee', fontSize: 22 }}>{eventLabel}</Text>
        </Pressable>

        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <Text style={{ fontSize: 16, color: '#eee' }}>X</Text>
        </Pressable>
      </View>

      <Modal visible={openEventMenu} transparent animationType="fade">
        <Pressable
          onPress={() => setOpenEventMenu(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            {Object.entries(EVENTS).map(([key, ev]) => (
              <Pressable
                key={key}
                onPress={() => {
                  setEventType(key as any)
                  setOpenEventMenu(false)
                }}
                style={({ pressed }) => [
                  styles.modalOption,
                  { opacity: pressed ? 0.6 : 1 },
                ]}
              >
                <Text style={styles.modalOptionText}>{ev.label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      <View>
        <FlatList
          data={eventSolves}
          contentContainerStyle={{paddingBottom: 60}}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => openSolve(item)}
              style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
            >
              <View style={styles.card}>
                <Text style={styles.timeText}>
                  {formatSolveTime(item.time, item.penalty)}
                </Text>

                <View style={styles.timeInfo}>
                  <Text style={{ color: '#505050', fontSize: 11 }}>
                    {item.scramble}
                  </Text>
                  <Text style={{ color: '#505050', fontSize: 11 }}>
                    {formatDateTime(item.created_at)}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View> 
      <Modal visible={visible} transparent animationType="fade">
        <Pressable
          onPress={() => setVisible(false)}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        >
          <Pressable
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              width: 250,
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
              Solve options
            </Text>

            {selectedSolve && (
              <>
                <Text style={{ marginBottom: 8, fontSize: 16 }}>
                  {formatSolveTime(selectedSolve.time, selectedSolve.penalty)}
                  {selectedSolve.penalty !== 'none'
                    ? ` (${selectedSolve.penalty})`
                    : ''}
                </Text>

                <Text style={{ marginBottom: 12, color: '#555' }}>
                  {selectedSolve.scramble}
                </Text>
              </>
            )}

            <Pressable
              onPress={() =>
                applyPenalty(selectedSolve?.penalty === '+2' ? 'none' : '+2')
              }
              style={styles.buttonAdd}
            >
              <Text style={styles.buttonText}>
                {selectedSolve?.penalty === '+2' ? 'Remove +2' : 'Add +2'}
              </Text>
            </Pressable>

            <Pressable
              onPress={() =>
                applyPenalty(selectedSolve?.penalty === 'DNF' ? 'none' : 'DNF')
              }
              style={styles.buttonDnf}
            >
              <Text style={styles.buttonText}>
                {selectedSolve?.penalty === 'DNF' ? 'Remove DNF' : 'Set DNF'}
              </Text>
            </Pressable>

            <Pressable
              onPress={deleteSelectedSolve}
              style={styles.buttonDelete}
            >
              <Text style={styles.buttonText}>Delete solve</Text>
            </Pressable>

            <Pressable onPress={() => setVisible(false)}>
              <Text style={{ color: '#204f7cb2', textAlign: 'center' }}>
                Close
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  )
}

export default StatsList

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexShrink: 0,
  },
  timeInfo: {
    marginLeft: 10,
    flexShrink: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgb(206, 208, 211)',
  },
  eventButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#20507c',
    backgroundColor: '#204f7cb2',
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
    backgroundColor: '#204f7cb2',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 250,
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalOptionText: {
    fontSize: 16,
  },
  buttonAdd: {
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#204f7cb2',
    marginBottom: 10,
  },
  buttonDnf: {
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#913030',
    marginBottom: 10,
  },
  buttonDelete: {
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#777',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
})