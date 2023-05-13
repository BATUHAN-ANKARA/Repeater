import * as React from 'react'
import {Text, View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from './src/screens/HomeScreen'
import AboutUs from './src/screens/AboutUs'
import Icon from 'react-native-vector-icons/Ionicons'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'

const Tab = createBottomTabNavigator()
const AnaSayfaIcon = ({ color, size }) => (
  <Icon name="view-quilt" color={color} size={size} />
)

const AyarlarIcon = ({ color, size }) => (
  <Icon name="settings" color={color} size={size} />
)
export default function App () {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarActiveTintColor: '#333',
            tabBarColor: '#333',
            tabBarIcon: ({ color }) => (
              <Icon name="home-outline" color={'#333'} size={24} />
            )
          }}
        />
        <Tab.Screen
          name="AboutUs"
          component={AboutUs}
          options={{
            headerShown: false,
            tabBarLabelStyle: { color: '#333' },
            tabBarColor: '#333',
            tabBarIcon: ({ color }) => (
              <Icon name="information-circle-outline" color={'#333'} size={24} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
