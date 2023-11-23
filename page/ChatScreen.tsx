//等候妤臻，先建測試環境
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ChatScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity style={{ backgroundColor: 'lightblue', padding: 10, borderRadius: 5 }}>
        <Text>ChatScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatScreen;
