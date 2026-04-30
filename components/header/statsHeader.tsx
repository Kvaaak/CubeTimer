import { EVENTS } from '@/config/events'
import { useEvent } from '@/context/EventContext'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'

const StatsHeader = () => {
  const { eventType, setEventType } = useEvent()
  const router = useRouter()

  const [openEventMenu, setOpenEventMenu] = useState(false)


  const eventLabel = EVENTS[eventType].label

  return (
    <View>
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
          onPress={() => router.replace('/')}
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
    </View>
  )
}

export default StatsHeader

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
    height: 80,
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
    maxWidth: 50,
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
    borderRadius: 12,
    width: 250,
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalOptionText: {
    fontSize: 16,
  },
})