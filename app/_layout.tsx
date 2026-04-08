import { ScrambleProvider } from "@/context/ScrambleContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ScrambleProvider>
      <Stack screenOptions={{headerShown: false}}/>
    </ScrambleProvider>
  )
}
