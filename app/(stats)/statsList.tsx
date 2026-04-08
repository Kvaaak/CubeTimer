import { useSolves } from '@/hooks/useSolves'
import { useRouter } from 'expo-router'
import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const StatsList = () => {
  const router = useRouter()
  const {solves} = useSolves()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>
          HEADER
        </Text>
        <Pressable onPress={() => {router.back()}} style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.5 : 1 }
          ]}>
            <Text style={{fontSize: 16, color: '#eee'}}>X</Text>
        </Pressable>
      </View>
      <FlatList
        data={solves}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.timeText}>{item.timeSec}</Text>
            <View>
              <Text>{item.scramble}</Text>
              <Text>{item.created_at}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default StatsList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#306291',
    borderWidth: 1,
    borderColor: '#eee',
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
    fontSize: 16,
  },
  card: {
    marginHorizontal: "5%",
    padding: 50,
    paddingLeft: 14,
    borderWidth: 1,
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