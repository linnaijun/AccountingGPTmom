import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Voice from '@react-native-voice/voice';

const App = () => {
  const [text, setText] = useState('123');
  const [isListening, setIsListening] = useState(false);


  const startListening = () => {
    Voice.start('zh-TW');
    setIsListening(true);
  };

  const stopListening = () => {
    Voice.stop();
    setIsListening(false);
  };

  const handleOnSpeechResults = (e: any) => {
    if (e.value && e.value.length > 0) {
      setText(e.value[0]);
      sendTextToChatGPT(e.value[0]);
    }
  };

  const sendTextToChatGPT = async (inputText: string) => {
    Alert.alert('ChatGPT Response', `Echo: ${inputText}`);
  };

  useEffect(() => {
    Voice.onSpeechResults = handleOnSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onLongPress={startListening}
        onPressOut={stopListening}
        style={{ backgroundColor: 'blue', padding: 20 }}
      >
        <Text style={{ color: 'black' }}>{isListening ? 'Listening...' : 'Long Press to Speak'}</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 20, color: 'red' }}>{text}</Text>
   

   
    </View>
  );
};

export default App;
