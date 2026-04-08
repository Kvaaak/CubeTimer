import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

const StatLayout = () => {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 100,
        backgroundColor: '#306291',
        paddingTop: 10,
      },
    }}>
      <Tabs.Screen name = "statsList" options={{title:"", tabBarIcon:({focused})=> (<Ionicons size={28} name={focused ? 'list' : 'list-outline'} color={focused ? '#eee' : '#95adc4'}/>)}}/>
      <Tabs.Screen name = "statsGraph" options={{title:"", tabBarIcon:({focused})=> (<Ionicons size={28} name={focused ? 'stats-chart' : 'stats-chart-outline'} color={focused ? '#eee' : '#95adc4'}/>)}}/>
      <Tabs.Screen name = "statsOverall" options={{title:"", tabBarIcon:({focused})=> (<Ionicons size={28} name={focused ? 'person' : 'person-outline'} color={focused ? '#eee' : '#95adc4'}/>)}}/>
    </Tabs>
  )
}

export default StatLayout