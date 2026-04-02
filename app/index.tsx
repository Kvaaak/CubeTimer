import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import TimerArea from "@/components/timerArea/timerArea";
import { ScrambleProvider } from "@/context/ScrambleContext";
import { initDB } from "@/database/database";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';

export default function Index() {
  useEffect(() => {
    initDB()
  }, [])
  
  const [fullscreen, setFullscreen] = useState(false)

  return (
  <ScrambleProvider>
    <SafeAreaView style={styles.container}>
      {!fullscreen && <Header />}

      <TimerArea 
        fullscreen={fullscreen} 
        setFullscreen={setFullscreen} 
      />

      {!fullscreen && <Footer />}
      <Toast/>
    </SafeAreaView>
  </ScrambleProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#4ab8eb',
  },
})
