import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import TimerArea from "@/components/timerArea/timerArea";
import { ScrambleProvider } from "@/context/ScrambleContext";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <ScrambleProvider>
      <SafeAreaView style={styles.container}>
        <Header/>
        <TimerArea/>
        <Footer/>
      </SafeAreaView>
    </ScrambleProvider>
  );
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
