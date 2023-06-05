import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Voice from '@react-native-community/voice';
import Feather from 'react-native-vector-icons/Feather';
import debounce from 'lodash/debounce';
const SearchBar = ({ onResult }) => {

  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [])

  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e);
    setResult(''); // Reset the text input value
  }
  const onSpeechEndHandler = (e) => {
    setLoading(false)
    console.log("stop handler", e);
  }

  const onSpeechResultsHandler = (e) => {
    let text = e.value[0];
    setResult(text);
    onResult(text);
    console.log("speech result handler", e);
  }

  const startRecording = async () => {
    setLoading(true);
    setResult(''); // Reset the text input value
    try {
      await Voice.start('en-Us')
    } catch (error) {
      console.log("error raised", error);
    }
  }

  const stopRecording = async () => {
    setLoading(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.log("error raised", error);
    }
  }
  // console.log('result:', result); 
  const handleTextSubmit = (text) => {
    setResult(text);
    onResult(text);
    setResult('');
  }
  const debouncedHandleTextSubmit = debounce(handleTextSubmit, 500); // Delay execution of handleTextSubmit by 500ms

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.textInputStyle}>
        <Feather name="search"size={20}/>
          <TextInput
            value={result}
            placeholder="Search..."
            style={{ flex: 1 }}
            onChangeText={text => setResult(text)} 
            // onSubmitEditing={(event) => handleTextSubmit(event.nativeEvent.text)}
            onSubmitEditing={(event) => debouncedHandleTextSubmit(event.nativeEvent.text)} // Use debounced handleTextSubmit function
          
          />
          {isLoading ? <ActivityIndicator size="large" color="red" />

            :
            
            <TouchableOpacity
              onPress={startRecording}
            >
              <Image
                source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png' }}
                style={{ width: 25, height: 25 }}
                
              />
            </TouchableOpacity>}
           {/* <TouchableOpacity
          style={{
            // alignSelf: 'center',
            // marginTop: 24,
            backgroundColor: 'red',
            padding: 8,
            borderRadius: 20
          }}
          onPress={stopRecording}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Stop</Text>
        </TouchableOpacity> */}
        </View>

        
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 48,
    // borderRadius: 20,
    paddingHorizontal: 10,
    shadowOffset: { width: 0, height: 1 }
  }
});

export default SearchBar;