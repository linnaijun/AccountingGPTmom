import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Voice from '@react-native-voice/voice';
import axios from 'axios';

const App = () => {
  const [text, setText] = useState('123');
  const [isListening, setIsListening] = useState(false);
  function getGMT8Time() {
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const gmt8Time = new Date(utcTime + (3600000 * 8));
    return gmt8Time.toISOString().replace('Z', '+08:00');
  }

  const startListening = () => {
    Voice.start('zh-TW');
    setIsListening(true);
  };

  const stopListening = () => {
    Voice.stop();
    setIsListening(false);
  };
  const createGptJson = (
    classify: string,
    content: string,
    time: string,
    cost: string | number,talk:string) => {
    return {
      classify_list: "早餐,午餐,晚餐,其他",
      classify: classify,
      content: content,
      time: time,
      cost: cost,
      talk:talk
    };
  };

  const createuserJson =(time:string,request:string,username:string)=>{
    return{
      time: time,
      request: request,
      username:username
    };
  };
  const handleOnSpeechResults = (e: any) => {
    if (e.value && e.value.length > 0) {
      setText(e.value[0]);
      sendTextToChatGPT(e.value[0]);
    }
  };

  const sendTextToChatGPT = async (inputText: string) => {
    const gptJson = createGptJson( "項目(僅在classify_list中選擇)", "內容(依request的內容推測)", "時間(依提request及time的內容推測)", "金額(依request的內容推測)","回復(對(依request的內容做出母親角色的回覆)");
    const gptJsonString = JSON.stringify(gptJson);
   
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "你現在將扮演一個關心子女的溫柔母親，以關懷的方式關心他，並以返回一個json的方式幫助他記帳，json格式為${gptJsonString}"},
            {"role": "assistant", "content": "好的，我將扮演一個稱職的母親，會已返回一個  ${gptJsonString}  的方式幫助我的子女記帳"},
            {"role": "user", "content": JSON.stringify(createuserJson("2023-11-18T12:00:00.000+D08:00","我剛剛吃了麥當勞一百五","jack"))},
            {"role": "assistant", "content": JSON.stringify(createGptJson("午餐", "麥當勞", "2023-11-18T12:00:00.000+D08:00", "150","哎呀，大中午就吃速食，要多注意身體喔"))},
            {"role": "user", "content":JSON.stringify(createuserJson(getGMT8Time(),inputText,"jack"))}
          ]
        },
        {
          headers: {
            'Authorization': `Bearer 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`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      Alert.alert('ChatGPT Response', response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error making API request:', error);
      Alert.alert('Error', 'Failed to get response from ChatGPT');
    }
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
