import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import RNFS from 'react-native-fs';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
      <View style={styles.title}>
        <Icon name="event-note" size={24} color="#000" style={styles.icon1} />
        <Text style={styles.title_text}>
          對話紀錄
        </Text>
        <Icon name="search" size={24} color="#000" style={styles.icon2} />
      </View>
      <ScrollView ref={scrollViewRef} style={{ flex: 1, width: '100%' }}>
        {messages.map((message) => (
          <View key={message.key} style={{
            alignSelf: message.speaker === 'GPT' ? 'flex-start' : 'flex-end',
            backgroundColor: message.speaker === 'GPT' ? '#fffbe2' : '#d2e0fb',
            margin: 10,
            padding: 10,
            borderRadius: 5,
            maxWidth: '66%'
          }}>
            {message.speaker === 'GPT' ? `<Image style={styles.role} source = {require('../img/cat_head.png')} />` : ''}
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    height: 64,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'#fffbe2',
  },
  title_text: {
    fontSize: 22,
    fontFamily: 'Roboto',
    color :'#1c1b1f'
  },
  icon1: {
    paddingTop: 10,
    paddingLeft: 16
  },
  icon2: {
    paddingTop: 10,
    paddingRight: 16
  }
});

export default ChatScreen;
