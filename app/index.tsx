import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import TimerArea from "@/components/timerArea/timerArea";
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
  const [bgColor, setBgColor] = useState('#306291')

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      {!fullscreen && <Header />}

      <TimerArea 
        fullscreen={fullscreen} 
        setFullscreen={setFullscreen}
        setBgColor={setBgColor} 
      />

      {!fullscreen && <Footer />}
      <Toast/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
})
