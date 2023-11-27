import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import RNFS from 'react-native-fs';
import { useFocusEffect } from '@react-navigation/native';

interface Message {
  key: number;
  text: string;
  speaker: string;
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const path = RNFS.DocumentDirectoryPath + '/data.txt';

  const readMessagesFromFile = async () => {
    try {
      const fileContents = await RNFS.readFile(path, 'utf8');
      const lines = fileContents.split('\n');
      const loadedMessages: Message[] = [];
  
      lines.forEach((line, index) => {
        if (line.trim() !== '') {
          const data = JSON.parse(line);
          if (data.usertalk) {
            loadedMessages.push({
              key: index * 2, 
              text: data.usertalk,
              speaker: 'User'
            });
          }
          if (data.talk) {
            loadedMessages.push({
              key: index * 2 + 1, 
              text: data.talk, 
              speaker: 'GPT'
            });
          }
        }
      });
  
      setMessages(loadedMessages);
    } catch (error) {
      console.error('Failed to read file:', error);
    }
  };
  

  useFocusEffect(
    React.useCallback(() => {
      readMessagesFromFile();
    }, [])
  );

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView ref={scrollViewRef} style={{ flex: 1, width: '100%' }}>
        {messages.map((message) => (
          <View key={message.key} style={{
            alignSelf: message.speaker === 'GPT' ? 'flex-start' : 'flex-end',
            backgroundColor: message.speaker === 'GPT' ? 'lightblue' : 'lightgreen',
            margin: 10,
            padding: 10,
            borderRadius: 5,
            maxWidth: '66%'
          }}>
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ChatScreen;
