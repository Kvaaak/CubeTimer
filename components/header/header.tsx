import { EVENTS } from '@/config/events'
import { useEvent } from '@/context/EventContext'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const Header = () => {
  const router = useRouter()
  const { eventType, setEventType } = useEvent()
  const [open, setOpen] = useState(false)

  const currentLabel = EVENTS[eventType].label

  return (
    <View style={styles.card}>
      {/* STATS */}
      <Pressable
        onPress={() => router.push('/(stats)/statsList')}
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.5 : 1 },
        ]}
      >
        <Text style={{ fontSize: 16, color: '#eee' }}>STATS</Text>
      </Pressable>

      {/* EVENT SELECTOR */}
      <Pressable
        onPress={() => setOpen(true)}
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.5 : 1 },
        ]}
      >
        <Text style={{ fontSize: 16, color: '#eee' }}>
          {currentLabel}
        </Text>
      </Pressable>

      {/* SETTINGS */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.5 : 1 },
        ]}
      >
        <Text style={{ fontSize: 16, color: '#eee' }}>SETNGS</Text>
      </Pressable>

      {/* MODAL */}
      <Modal visible={open} transparent animationType="fade">
        <Pressable
          onPress={() => setOpen(false)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
              width: 250,
            }}
          >
            {Object.entries(EVENTS).map(([key, ev]) => (
              <Pressable
                key={key}
                onPress={() => {
                  setEventType(key as any)
                  setOpen(false)
                }}
                style={{
                  paddingVertical: 10,
                }}
              >
                <Text style={{ fontSize: 16 }}>
                  {ev.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    height: 100,
  },
  button: {
    flex: 1,
    maxWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#20507c',
    backgroundColor: '#204f7cb2',
  },
})