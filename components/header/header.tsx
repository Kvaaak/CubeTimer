import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const Header = () => {
  const router = useRouter()
  return (
        <View style={styles.card}>
          <Pressable 
            onPress={()=> router.replace("/(stats)/statsScreen")} 
            style= {({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.5 : 1 }
            ]}
          >
              <Text style={{fontSize: 16, color: '#eee'}}>STATS</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.5 : 1 }
          ]}>
            <Text style={{fontSize: 16, color: '#eee'}}>CUBE</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.5 : 1 }
          ]}>
            <Text style={{fontSize: 16, color: '#eee'}}>SETNGS</Text>
          </Pressable>
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
    backgroundColor: '#204f7cb2'
  },
  
})