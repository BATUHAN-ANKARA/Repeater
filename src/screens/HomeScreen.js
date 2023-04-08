import React, { useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Clipboard,
  Image,
  Dimensions
} from 'react-native'
import { useState, useRef } from 'react'
import { Modalize } from 'react-native-modalize'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'

const newHeight = Dimensions.get('window').height - 400

export default function HomeScreen() {
  const [height, setHeight] = useState('');
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(1);
  const [lastmessage, setLastMessage] = useState('');
  const [copiedText, setCopiedText] = useState('');
  const [withSpace, setWithSpace] = useState(0);
  const [preview, setPreview] = useState(1);
  const [show, setShow] = useState(0);
  const modalizeRef = useRef(null);
  const [id, setId] = useState(2);
  const [history, setHistory] = useState(0);
  const [defaulttext, setDefaultText] = useState('');
  const [defaultcount, setDefaultCount] = useState(1);
  const [focusText, setFocusText] = useState(false);
  const [focusCount, setFocusCount] = useState(false);
  const [array, setArray] = useState([]);
;
  const customstyleText = focusText
    ? styles.textInputFocussed
    : styles.textInput;
  const customstyleCount = focusCount
    ? styles.countInputFocussed
    : styles.countInput

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const storeDefaultData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')

      const result = jsonValue != null ? JSON.parse(jsonValue) : null
      if (result != null) {
        setArray(result)
      } else {
        //alert('Local Storage Is Empty')
      }

      console.log(result)
    } catch (e) {
      // error reading value
    }
  }

  const updateArray = (element) => {
    if (element.message == '') {
      alert('Message Required')
    } else {
      setArray([...array, element])
      copyToClipboard(lastmessage, 1)
    }
  }
  const onOpen = () => {
    modalizeRef.current?.open()
  }
  const onClose = () => {
    modalizeRef.current?.close()
  }
  const handleLayout = ({ layout }) => {
    setHeight(layout.height)
  }
  const updateText = (text) => {
    setMessage(text)
    setDefaultText(text)
    if (withSpace == 0) {
      repeatmessageWithSpace(text, count)
    } else {
      repeatmessageWithNewLine(text, count)
    }
  }
  const updateCount = (input) => {
    setCount(input)
    setDefaultCount(input)
    if (withSpace == 0) {
      repeatmessageWithSpace(message, input)
    } else {
      repeatmessageWithNewLine(message, input)
    }
  }
  const fromhistory = (message, count) => {
    setMessage(message)
    setDefaultText(message)
    setCount(count)
    setDefaultCount(count)
    if (withSpace == 0) {
      repeatmessageWithSpace(message, count)
    } else {
      repeatmessageWithNewLine(message, count)
    }
  }
  const setSpace = (value) => {
    let status = value
    if (withSpace == 0) {
      setWithSpace(status)
    } else {
      setWithSpace(0)
    }
  }
  const copyToClipboard = (str, where) => {
    Clipboard.setString(str)
    if (where == 1) {
      alert('Successfuly Repeated Then Copied')
    } else {
      alert('Succesfuly Copied')
    }
  }
  const fetchCopiedText = async () => {
    const text2 = await Clipboard.getString()
    setCopiedText(text2)
    alert(text2)
  }
  const repeatmessage = (value, st) => {
    if (st == 0) {
      repeatmessageWithSpace(value, count)
    } else {
      repeatmessageWithNewLine(value, count)
    }
  }
  const repeatmessageWithSpace = (value, line) => {
    let count = line
    let str = value
    for (let i = 1; i < count; i = i + 1) {
      str = str + ' ' + value
    }
    setLastMessage(str)
  }
  const repeatmessageWithNewLine = (value, line) => {
    let count = line
    let str = value
    for (let i = 1; i < count; i = i + 1) {
      str = str + '\n' + value
    }
    setLastMessage(str)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.allContainerArea}>
        <View style={styles.appTitleArea}>
          <Text style={styles.appTitle}>Text Repeater</Text>
          <TouchableOpacity
            style={styles.historyButton}
            onPress={() => {
              onOpen()
              storeData(array)
              getData()
            }}
          >
            <Image source={require('../images/history.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={customstyleText}
            placeholder="Enter your message"
            onChangeText={(value) => updateText(value)}
            onFocus={() => setFocusText(true)}
            onBlur={() => setFocusText(false)}
            value={defaulttext}
            maxLength={100}
            multiline={true}
          />
        </View>
      </View>

      <View
        style={{
          position: 'relative'
        }}
      >
        <TouchableOpacity
          style={{
            top: 10,
            position: 'absolute',
            right: 20,
            width: 32,
            height: 32,
            backgroundColor: '#eee',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8
          }}
          onPress={() => copyToClipboard(message, 0)}
        >
          <Icon name="copy-outline" color={'#333'} size={18} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignContent: 'center'
        }}
      >
        <TextInput
          style={customstyleCount}
          onChangeText={(value) => updateCount(value)}
          maxLength={3}
          onFocus={() => setFocusCount(true)}
          onBlur={() => setFocusCount(false)}
          value={defaultcount}
          placeholder="Repetition Limit"
          keyboardType="number-pad"
        />
        <TouchableOpacity
          onPress={() => {
            repeatmessage(message, withSpace)
            setSpace(1)
            setPreview(0)
          }}
          style={{ ...styles.newLine, justifyContent: 'center' }}
        >
          <Text
            style={{
              position: 'absolute',
              fontSize: 14,
              fontWeight: '400',

              color: 'black',
              marginLeft: 40
            }}
          >
            New Line
          </Text>
          {withSpace ? (
            <View
              style={{
                width: 25,
                height: 25,
                position: 'absolute',
                marginLeft: 10
              }}
            >
              <Icon name="checkmark-circle-outline" color={'#333'} size={24} />
            </View>
          ) : (
            <View
              style={{
                width: 25,
                height: 25,
                position: 'absolute',
                marginLeft: 10
              }}
            >
              <Icon name="ellipse-outline" color={'#333'} size={24} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          padding: 20
        }}
      >
        <TouchableOpacity
          onPress={() => {
            repeatmessage(message, withSpace)
            if (preview == 0) {
              setPreview(1)
            } else {
              setPreview(0)
            }
          }}
        >
          {preview ? (
            <Icon name="checkmark-circle-outline" color={'#075E54'} size={24} />
          ) : (
            <Icon name="ellipse-outline" color={'#075E54'} size={24} />
          )}
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 15,
            marginTop: 3,

            fontWeight: '400',
            fontSize: 14,
            color: 'black'
          }}
        >
          Preview
        </Text>
      </View>

      <TouchableOpacity
        style={styles.repeatButton}
        onPress={() => {
          if (preview == 0) {
            setShow(1)
          }
          if (preview == 1) {
            setShow(0)
          }
          updateArray({ message: message, count: count })

          let temp = id + 1
          setId(temp)
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: 'white'
          }}
        >
          Repeat
        </Text>
      </TouchableOpacity>

      {preview ? (
        <TouchableOpacity style={{ alignSelf: 'center' }}>
          <Text
            style={{
              color: '#74CB6B',

              fontWeight: '400'
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      ) : null}

      {preview ? (
        <View
          style={{
            position: 'relative'
          }}
        >
          <Text
            selectable={true}
            style={{
              fontSize: 16,
              lineHeight: 32,
              fontWeight: '400',
              textAlign: 'left',
              color: 'black',
              borderColor: '#E2E8F0',
              borderRadius: 16,
              borderWidth: 1,
              backgroundColor: 'white',
              paddingLeft: 15,
              paddingTop: 15,
              paddingBottom: 15,
              paddingRight: 40,
              width: '90%',
              margin: 5,
              marginLeft: 10
            }}
          >
            {lastmessage}
          </Text>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 15,
              right: 35,
              width: 32,
              height: 32,
              backgroundColor: '#eee',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8
            }}
            onPress={() => copyToClipboard(lastmessage, 0)}
          >
            <Icon name="copy-outline" color={'#333'} size={18} />
          </TouchableOpacity>
        </View>
      ) : null}

      <Modalize
        panGestureEnabled={false}
        ref={modalizeRef}
        onLayout={handleLayout}
        scrollViewProps={{ contentContainerStyle: { height: '100%' } }}
        snapPoint={newHeight}
        closeAnimationClose={{
          spring: { tension: 3 },
          timing: { duration: 900 }
        }}
      >
        <View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#121A26',
                padding: 15
              }}
            >
              Recent Works
            </Text>
            <TouchableOpacity
              onPress={() => onClose()}
              style={{ position: 'absolute', right: 10, top: 10, padding: 5 }}
            >
              <Image source={require('../images/close.png')} />
            </TouchableOpacity>
          </View>
          <View>
            {array?.map((arr) => {
              return (
                <>
                  <View style={{ padding: 10 }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      onPress={() => {
                        fromhistory(arr.message, arr.count)
                        copyToClipboard(arr.message)
                        onClose()
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center'
                        }}
                      >
                        <Image
                          source={require('../images/circle.png')}
                          style={{ width: 24, height: 24, marginRight: 10 }}
                        />
                        <Text
                          style={{
                            fontSize: 14,

                            color: '#1D2238',
                            fontWeight: '400'
                          }}
                        >
                          {arr.message}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '400',
                            color: '#94A3B8'
                          }}
                        >
                          {arr.count}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )
            })}
          </View>
        </View>
      </Modalize>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding:15,
  },
  allContainerArea:{},
  appTitleArea:{
    alignItems:'center',
    marginBottom: 15,
    position:'relative'
  },
  appTitle:{
    fontWeight:'bold',
    color:'#000',
    lineHeight:36,
    fontSize:24,
  },

  historyButton:{
    width:36,
    height:36,
    backgroundColor: '#eee',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems:'center',
    position:'absolute',
    right: 0,
  },

  textInputContainer:{
    position: 'relative'
  },

  textInput: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    alignItems: 'center',
    textAlignVertical:'center',
    justifyContent:'center',
    borderColor: '#eee',
    borderRadius: 5,
    padding: 10,
  },

  textInputFocussed: {
    height: 50,
    margin: 12,
    textAlignVertical:'center',
    alignItems: 'center',
    justifyContent:'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'red',
    padding: 10,
  },


  textInrwqputContainer:{},


  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    // Text styles

    fontSize: 16,
    lineHeight: 32,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
    // View styles
    borderColor: '#E2E8F0',
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    width: '90%',
    height: 380,
    margin: 5,
    marginLeft: 10
  },
  repeatButton: {
    borderColor: '#74CB6B',
    borderRadius: 12,
    margin: 15,
    height: 50,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '400',

    backgroundColor: '#74CB6B',
    justifyContent: 'center',
    alignItems: 'center'
  },
  countInput: {
    borderColor: '#E2E8F0',
    borderRadius: 12,
    height: 50,
    width: '45%',
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '400'
  },
  countInputFocussed: {
    borderColor: 'green',
    borderRadius: 12,
    height: 50,
    width: '45%',
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '400'
  },
  newLine: {
    borderColor: '#E2E8F0',
    borderRadius: 12,
    height: 50,
    width: '45%',
    borderWidth: 1
  }
})
