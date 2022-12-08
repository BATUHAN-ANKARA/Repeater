import * as React from 'react'
import {Text, View, TouchableOpacity, Share, Linking} from 'react-native'
import SettingsComponent from '../components/SettingsComponent'
import {useState, useEffect} from 'react'

export default function SettingsScreen ({status}) {
  const shareData = async () => {
    try {
      await Share.share({
        message: 'This is the demo text',
      })
    } catch (error) {
      alert(error.message)
    }
  }
  const openGooglePlay = () => {
    Linking.openURL(
      'http://play.google.com/store/apps/details?id=com.google.android.apps.maps',
    )
  }
  const openTerms = () => {
    Linking.openURL('https://github.com')
  }
  const openPrivacyPolicy = () => {
    Linking.openURL('https://github.com')
  }
  return (
    <View style={{flex: 1, margin: 15}}>
      <View style={{justifyContent: 'space-evenly'}}>
        <TouchableOpacity>
          <Text style={{fontFamily: 'Roboto', fontSize: 18, marginTop: 20}}>
            Customer Support
          </Text>
          <Text>
            Tell us what changes you'd like to see, or bugs you've discovered
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openGooglePlay()}>
          <Text style={{fontFamily: 'Roboto', fontSize: 18, marginTop: 20}}>
            Rate Us
          </Text>

          <Text>Do you like this app? Please support it with 5 stars.</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => shareData()}>
          <Text style={{fontFamily: 'Roboto', fontSize: 18, marginTop: 20}}>
            Share Text Repeater App
          </Text>

          <Text>Share app with your friends and family</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openPrivacyPolicy()}>
          <Text style={{fontFamily: 'Roboto', fontSize: 18, marginTop: 20}}>
            Privacy Policy
          </Text>

          <Text>Read the Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openTerms()}>
          <Text style={{fontFamily: 'Roboto', fontSize: 18, marginTop: 20}}>
            Terms
          </Text>

          <Text>Read the Terms and Conditions</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
