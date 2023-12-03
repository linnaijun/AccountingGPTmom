import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView,StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Item = {
  time: string;
  classify: string;
  content: string;
  cost: string;
};

const EditCalendarScreen = () => {
  const [items, setItems] = useState<Item[]>([]);


  const loadItems = async () => {
    const path = RNFS.DocumentDirectoryPath + '/data.txt';
    try {
      const fileContents = await RNFS.readFile(path);
      const lines = fileContents.trim().split('\n');
      const parsedItems = lines
        .map(line => {
          const data = JSON.parse(line);
          return {
            time: data.time.split('T')[0], // 只获取日期部分
            classify: data.classify,
            content: data.content,
            cost: data.cost,
          };
        })
        .filter(item => item.cost !== '0'); // 过滤掉金額为0的项目
  
      setItems(parsedItems);
    } catch (error) {
      console.error('Failed to read file:', error);
    }
  };
  

  useFocusEffect(
    React.useCallback(() => {
      loadItems();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.title}>
        <View style={styles.space}></View>
        <Text style={styles.title_text}>
          2023年10月 
        </Text>
        <Icon name="event-note" size={24} color="#000" style={styles.icon} />
      </View>
      <View style={styles.header}>
        <View style={styles.column}><Text>時間</Text></View>
        <View style={styles.column}><Text>項目</Text></View>
        <View style={styles.column}><Text>內容</Text></View>
        <View style={styles.column}><Text>金額</Text></View>
      </View>
      <ScrollView style={styles.content}>
        {items.map((item, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.column}><Text>{item.time}</Text></View>
            <View style={styles.column}><Text>{item.classify}</Text></View>
            <View style={styles.column}><Text>{item.content}</Text></View>
            <View style={styles.column}><Text>{item.cost}</Text></View>
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
  space: {
    paddingLeft: 40
  },
  icon: {
    paddingTop: 10,
    paddingRight: 16
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  content: {
    flex: 1
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  column: {
    flex: 1, // 平均分配空间
    alignItems: 'center'
  }
});
export default EditCalendarScreen;
