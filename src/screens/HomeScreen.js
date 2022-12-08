import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Clipboard,
  Image,
  Dimensions,
} from 'react-native'
import {useState, useRef} from 'react'
import {Modalize} from 'react-native-modalize'
const newHeight = Dimensions.get('window').height - 400

export default function HomeScreen () {
  const [height, setHeight] = useState('')
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(0)
  const [lastmessage, setLastMessage] = useState('')
  const [copiedText, setCopiedText] = useState('')
  const [withSpace, setWithSpace] = useState(0)
  const [preview, setPreview] = useState(0)
  const [show, setShow] = useState(0)
  const modalizeRef = useRef(null)
  const [id, setId] = useState(2)
  const [history, setHistory] = useState(0)
  const [defaulttext, setDefaultText] = useState('')
  const [defaultcount, setDefaultCount] = useState(0)
  const [focusText, setFocusText] = useState(false)
  const [focusCount, setFocusCount] = useState(false)
  const [array, setArray] = useState([])
  const customstyleText = focusText
    ? styles.textInputFocussed
    : styles.textInput
  const customstyleCount = focusCount
    ? styles.countInputFocussed
    : styles.countInput

  const updateArray = element => {
    setArray([...array, element])
    console.log(array)
  }
  const onOpen = () => {
    modalizeRef.current?.open()
  }
  const onClose = () => {
    modalizeRef.current?.close()
  }
  const handleLayout = ({layout}) => {
    setHeight(layout.height)
  }
  const updateText = text => {
    setMessage(text)
    setDefaultText(text)
    if (withSpace == 0) {
      repeatmessageWithSpace(text, count)
    } else {
      repeatmessageWithNewLine(text, count)
    }
  }
  const updateCount = input => {
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
  const setSpace = value => {
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

  return (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 24,
            fontWeight: '700',
            color: '#1D2238',
          }}>
          Text Repeater
        </Text>
        <TouchableOpacity
          style={{marginLeft: 15, left: 90, top: 2}}
          onPress={() => onOpen()}>
          <Image source={require('../images/history.png')} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: 'relative',
        }}>
        <TextInput
          style={customstyleText}
          placeholder='Enter your message'
          onChangeText={value => updateText(value)}
          onFocus={() => setFocusText(true)}
          onBlur={() => setFocusText(false)}
          value={defaulttext}
          multiline={true}
        />
        <TouchableOpacity
          style={{
            top: 20,
            position: 'absolute',
            right: 20,
            width: 32,
            height: 32,
            backgroundColor: '#eee',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
          }}
          onPress={() => copyToClipboard(message, 0)}>
          <Image source={require('../images/copy.png')} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignContent: 'center',
        }}>
        <TextInput
          style={customstyleCount}
          onChangeText={value => updateCount(value)}
          onFocus={() => setFocusCount(true)}
          onBlur={() => setFocusCount(false)}
          value={defaultcount}
          placeholder='Repetition Limit'
          keyboardType='number-pad'
        />
        <TouchableOpacity
          onPress={() => {
            repeatmessage(message, withSpace)
            setSpace(1)
            setPreview(0)
          }}
          style={{...styles.newLine, justifyContent: 'center'}}>
          <Text
            style={{
              position: 'absolute',
              fontSize: 14,
              fontWeight: '400',
              fontFamily: 'Roboto',
              color: 'black',
              marginLeft: 40,
            }}>
            New Line
          </Text>
          {withSpace ? (
            <Image
              source={require('../images/check-button.png')}
              style={{
                width: 25,
                height: 25,
                position: 'absolute',
                marginLeft: 10,
              }}
            />
          ) : (
            <Image
              source={require('../images/unchecked.png')}
              style={{
                width: 25,
                height: 25,
                marginLeft: 10,
                marginVertical: -25,
              }}
            />
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          padding: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            repeatmessage(message, withSpace)
            if (preview == 0) {
              setPreview(1)
            } else {
              setPreview(0)
            }
          }}>
          {preview ? (
            <Image
              source={require('../images/check-button.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          ) : (
            <Image
              source={require('../images/circle.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 15,
            marginTop: 3,
            fontFamily: 'Roboto',
            fontWeight: '400',
            fontSize: 14,
            color: 'black',
          }}>
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
          copyToClipboard(lastmessage, 1)
          updateArray({message: message, count: count})
          let temp = id + 1
          setId(temp)
        }}>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 16,
            fontWeight: '600',
            color: 'white',
          }}>
          Repeat
        </Text>
      </TouchableOpacity>

      {preview ? (
        <TouchableOpacity style={{alignSelf: 'center'}}>
          <Text
            style={{
              color: '#74CB6B',
              fontFamily: 'Roboto',
              fontWeight: '400',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      ) : null}

      {preview ? (
        <View
          style={{
            position: 'relative',
          }}>
          <Text
            selectable={true}
            style={{
              fontFamily: 'Roboto',
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
              marginLeft: 10,
            }}>
            {lastmessage}
          </Text>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              right: 35,
              width: 32,
              height: 32,
              backgroundColor: '#eee',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}
            onPress={() => copyToClipboard(lastmessage, 0)}>
            <Image source={require('../images/copy.png')} />
          </TouchableOpacity>
        </View>
      ) : null}

      <Modalize
        panGestureEnabled={false}
        ref={modalizeRef}
        onLayout={handleLayout}
        scrollViewProps={{contentContainerStyle: {height: '100%'}}}
        snapPoint={newHeight}
        closeAnimationClose={{
          spring: {tension: 3},
          timing: {duration: 900},
        }}>
        <TouchableOpacity
          onPress={() => onClose()}
          style={{position: 'absolute', right: 10, top: 10, padding: 5}}>
          <Image source={require('../images/close.png')} />
        </TouchableOpacity>

        <View style={{}}>
          <View>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 16,
                fontWeight: '600',
                color: '#121A26',
                padding: 15,
              }}>
              Recent Works
            </Text>
          </View>
          <View>
            {array.map(arr => {
              return (
                <>
                  <View style={{padding: 10}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                      onPress={() => {
                        fromhistory(arr.message, arr.count)
                        copyToClipboard(arr.message)
                        onClose()
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../images/circle.png')}
                          style={{width: 24, height: 24, marginRight: 10}}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'Roboto',
                            color: '#1D2238',
                            fontWeight: '400',
                          }}>
                          {arr.message}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: 14,
                            fontWeight: '400',
                            color: '#94A3B8',
                          }}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 4,
    justifyContent: 'flex-start',
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // Text styles
    fontFamily: 'Roboto',
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
    marginLeft: 10,
  },
  textInput: {
    borderColor: '#E2E8F0',
    borderRadius: 12,
    margin: 10,
    height: 50,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto',
    width: '95%',
  },
  textInputFocussed: {
    borderColor: 'green',
    borderRadius: 12,
    margin: 10,
    height: 50,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto',
    width: '95%',
  },
  repeatButton: {
    borderColor: '#74CB6B',
    borderRadius: 12,
    margin: 15,
    height: 50,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto',
    backgroundColor: '#74CB6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countInput: {
    borderColor: '#E2E8F0',
    borderRadius: 12,
    height: 50,
    width: '45%',
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  countInputFocussed: {
    borderColor: 'green',
    borderRadius: 12,
    height: 50,
    width: '45%',
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  newLine: {
    borderColor: '#E2E8F0',
    borderRadius: 12,
    height: 50,
    width: '45%',
    borderWidth: 1,
  },
})
