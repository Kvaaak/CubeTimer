import { ScrambleProvider } from "@/context/ScrambleContext";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <ScrambleProvider>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name = "index" options={{headerShown: false}}/>
        <Stack.Screen name = "(stats)" options={{headerShown: false}}/>
      </Stack>
    </ScrambleProvider>
  )
}
export default RootLayout