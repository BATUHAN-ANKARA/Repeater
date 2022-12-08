import * as React from 'react'
import {Text, View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from './src/screens/HomeScreen'
import AboutUs from './src/screens/AboutUs'

const Tab = createBottomTabNavigator()

export default function App () {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen name='About Us' component={AboutUs} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
