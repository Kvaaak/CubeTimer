import { Tabs } from 'expo-router'
import React from 'react'

const StatLayout = () => {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        paddingTop: 10,
        height: 100,
      },
    }}>
      <Tabs.Screen name = "statsScreen" options={{title:"starttsa"}}/>
      <Tabs.Screen name = "create" options={{title:"Create"}}/>
      <Tabs.Screen name = "profile" options={{title:"Profile"}}/>
    </Tabs>
  )
}

export default StatLayout