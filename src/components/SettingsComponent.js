import * as React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'

const SettingsComponent = ({settingsOptions}) => {
  return (
    <View>
      {settingsOptions.map(({title, subTitle, onPress}, index) => (
        <TouchableOpacity key={title}>
          <View>
            <Text>{title}</Text>
            {subTitle && <Text>{subTitle}</Text>}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default SettingsComponent
