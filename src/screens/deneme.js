import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home () {
  const [inputBoxValue, setInputBoxValue] = useState('')

  const [storageDataList, setStorageDataList] = useState([])

  useEffect(() => {
    async function tempFunction () {
      await getItemList()
    }

    tempFunction()

    return () => {}
  }, [])

  const addItemToList = async () => {
    try {
      storageDataList.push(inputBoxValue)

      const output = JSON.stringify(storageDataList)

      await AsyncStorage.setItem('itemList', output)
      setInputBoxValue('')

      alert('Data Is Added')
    } catch (err) {
      console.log(err)
    }
  }

  const getItemList = async () => {
    try {
      const data = await AsyncStorage.getItem('itemList')

      const output = JSON.parse(data)

      setStorageDataList(output)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        value={inputBoxValue}
        placeholder='Enter Data'
        onChangeText={value => setInputBoxValue(value)}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addItemToList()}>
        <Text style={{color: '#fff'}}>Add</Text>
      </TouchableOpacity>

      <View style={styles.list}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 30}}>
          Array List
        </Text>

        {storageDataList.map((item, index) => {
          return (
            <Text style={{marginVertical: 10}} key={index}>
              {item}
            </Text>
          )
        })}
      </View>
    </View>
  )
}

const {width} = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputBox: {
    borderWidth: 2,
    borderColor: 'black',
    marginVertical: 10,
    marginHorizontal: 8,
  },
  addButton: {
    width: width - 20,
    backgroundColor: 'blue',
    marginHorizontal: 10,
    alignItems: 'center',
    padding: 10,
  },
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
