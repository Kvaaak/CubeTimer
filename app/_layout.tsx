import { EventProvider } from "@/context/EventContext";
import { ScrambleProvider } from "@/context/ScrambleContext";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <EventProvider>
      <ScrambleProvider>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name = "index" options={{headerShown: false}}/>
          <Stack.Screen name = "(stats)" options={{headerShown: false}}/>
        </Stack>
      </ScrambleProvider>
    </EventProvider>
  )
}
export default RootLayout