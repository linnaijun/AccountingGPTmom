//等候迺鈞，把先前版本做copy
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native';
import Voice from '@react-native-voice/voice';
import axios from 'axios';
import RNFS, { stat } from 'react-native-fs';
import Papa from 'papaparse';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/MaterialIcons';

const API_KEY = Config.OPENAI_API_KEY;
console.log(API_KEY);
const VoiceScreen = () => {
  const [text, setText] = useState('123');
  const [isListening, setIsListening] = useState(false);
  function getGMT8Time() {
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const gmt8Time = new Date(utcTime + (3600000 * 8));
    return gmt8Time.toISOString().replace('Z', '+08:00');
  }
  const [showText, setShowText] = useState(false);
  const [apiResponse, setApiResponse] = useState('');
  const [showApiResponse, setShowApiResponse] = useState(false);
  const path = RNFS.DocumentDirectoryPath + '/data.txt';
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
    cost: string | number,
    usertalk:string,
    talk: string
  ): GptJsonData => {
    return {
      classify_list: "飲食/服飾/交通/票券/日用/醫療/電話/收入/其他",
      classify,
      content,
      time,
      cost,
      usertalk,
      talk
    };
  };
  interface GptJsonData {
    classify_list: string;
    classify: string;
    content: string;
    time: string;
    cost: string | number;
    usertalk:string;
    talk: string;
  }
  const appendJsonToTextFile = async (jsonData:GptJsonData) => {
    // 将 JSON 数据转换为字符串
    const jsonString = JSON.stringify(jsonData) + '\n'; // 在每个 JSON 后加上换行符
  
    // 检查文件是否存在
    const fileExists = await RNFS.exists(path);
  
    if (fileExists) {
      // 文件存在，追加内容
      await RNFS.appendFile(path, jsonString, 'utf8');
    } else {
      // 文件不存在，创建文件并写入内容
      await RNFS.writeFile(path, jsonString, 'utf8');
    }
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
      setShowText(true); // 显示文本
      setShowApiResponse(false); // 隐藏API响应
      sendTextToChatGPT(e.value[0]);
    }
  };

  const sendTextToChatGPT = async (inputText: string) => {
    const gptJson = createGptJson( "項目(僅在classify_list中選擇)", "內容(依request的內容推測，若無法推測就以項目內容填寫)", "時間(依提request及time的內容推測)", "金額(依request的內容推測)","使用者指令(不做修改)","回復(對(依request的內容做出母親角色的回覆)");
    const gptJsonString = JSON.stringify(gptJson);
   
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [
            {"role": "system", "content": "You have to respond in json format"},
            {"role": "user", "content": "你現在將扮演一隻會說話的貓，雖然關心主人，但需要以一種愛理不理的語氣回復，為了貓的面子，你雖然無時無刻關心主人的身體及經濟狀況，但必須表現得以自己中心並假裝沒有那麼在乎。在語尾或開頭，加入'喵' 來表現出你是一隻貓，並以返回一個繁體中文內容的json的方式幫助他記帳，json格式為${gptJsonString}"},
            {"role": "assistant", "content": "好的，我將扮演一個負責記帳的貓，會返回一個  ${gptJsonString}  的方式幫助我的主人記帳，並使用繁體中文對話"},
            {"role": "user", "content": JSON.stringify(createuserJson("2023-11-18T12:00:00.000+D08:00","我剛剛吃了麥當勞一百五","主人"))},
            {"role": "assistant", "content": JSON.stringify(createGptJson("飲食", "麥當勞", "2023-11-18T12:00:00.000+D08:00", "150","我剛剛吃了麥當勞一百五","怎麼吃了速食，這樣搞壞身體要怎麼照顧我喵..."))},
            {"role": "user", "content": JSON.stringify(createuserJson("2023-11-20T18:20:00.000+D08:00","我在新光三越買了一個八千五百的包包","主人"))},
            {"role": "assistant", "content": JSON.stringify(createGptJson("服飾", "包包", "2023-11-20T18:20:00.000+D08:00", "8500","我在新光三越買了一個八千五百的包包","喵!花這麼多錢，有沒有給我帶點吃的喵"))},
            {"role": "user", "content": JSON.stringify(createuserJson("2023-06-30T08:32:00.000+D08:00","我剛剛去找了朋友","主人"))},
            {"role": "assistant", "content": JSON.stringify(createGptJson("其他", "找朋友", "2023-06-30T08:32:00.000+D08:00", "0","我剛剛去找了朋友","我現在很困，沒有要記帳不用找我喵"))},
            {"role": "user", "content": JSON.stringify(createuserJson("2023-11-25T08:15:28.896+08:00","我剛吃了500塊","主人"))},
            {"role": "assistant", "content": JSON.stringify(createGptJson("飲食", "早餐", "2023-11-25T08:15:28.896+08:00", "500","我剛吃了500塊","喵！吃了500塊？現在早上八點，你是說你剛剛吃早餐喵？"))},
            {"role": "user", "content":JSON.stringify(createuserJson(getGMT8Time(),inputText,"主人"))}
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
         const content = response.data.choices[0].message.content;
         const jsonData = JSON.parse(content);
         await appendJsonToTextFile(jsonData);
         try {
          const jsonResponse = JSON.parse(content);
          setApiResponse(jsonResponse.talk); // 设置响应内容
          setShowApiResponse(true); // 显示响应
        } catch (error) {
          console.error('Error parsing JSON:', error);
          Alert.alert('Error', 'Failed to parse response from ChatGPT');
        }
      } catch (error) {
        console.error('Error making API request:', error);
        Alert.alert('Error', 'Failed to get response from ChatGPT');
      }
    
      setShowText(false); // 收到回复后隐藏文本
    };

  useEffect(() => {
    Voice.onSpeechResults = handleOnSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  useEffect(() => {
    if (showApiResponse) {
      const timer = setTimeout(() => {
        setShowApiResponse(false);
      }, 30000);
  
      return () => clearTimeout(timer);
    }
  }, [showApiResponse]);
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../img/background.png')} style={styles.bgimage} resizeMode='cover' >
        <Image style={styles.role} source = {require('../img/role_cat.png')} />
        <TouchableOpacity
          onLongPress={startListening}
          onPressOut={stopListening}
          activeOpacity={0.8}
          style={styles.listenbtn}
        >
          <View style={styles.mic}>
            <Icon name="mic" size={50} style={styles.mic_icon} />
          </View>
          <Text style={styles.mic_text}>{isListening ? '' : ''}</Text>
        </TouchableOpacity>
        {showText && (
          <View style={styles.user_input}>
            <Image style={styles.chat_img} source={require('../img/messageUser.png')} />
            <Icon name="settings-voice" size={25} style={styles.input_mic} />
            <Text style={styles.input_text}>{text}</Text>
          </View>
        )}
        {showApiResponse && (
          <View style={styles.gpt_response}>
            <Image style={styles.chat_img} source={require('../img/messageGPT.png')}/>
            <Text style={{ color: 'black' }}>{apiResponse}</Text>
          </View>
        )}
      </ImageBackground>
      
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgimage: {
    flex: 1,
    height: 800,
    alignItems: 'center',
  },
  role: {
    position: 'absolute',
    top: 150,
    left: 10
  },
  listenbtn: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  mic: {
    height: 100,
    width: 100,
    backgroundColor: '#7db3ef',
    borderRadius: 50,
    borderColor: '#D2E0FB',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mic_icon: {
    color: "#fff"
  },
  mic_text: {
    color: '#000'
  },
  user_input: {
    position: 'absolute',
    bottom: 150,
    maxWidth: '90%',
    backgroundColor: '#d2e0fb',
    padding: 18,
    paddingRight: 23,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
  },
  chat_img: {
    position: 'absolute',
    bottom: -15,
    right: 20,
  },
  input_mic: {
    color: '#000',
    marginRight: 5,
    marginLeft: -5,
  },
  input_text: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    maxWidth: '89%',
  },
  gpt_response: {
    position: 'absolute',
    top: 30,
    maxWidth: '90%',
    backgroundColor: '#fffbe2',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    elevation: 2,
    zIndex: 1,
  },
});

export default VoiceScreen;