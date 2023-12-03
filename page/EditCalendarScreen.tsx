import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView,StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CalendarCom from '../component/CalenderCom';

type Item = {
  time: string;
  classify: string;
  content: string;
  cost: string;
};


const EditCalendarScreen = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [showList, setShowList] = useState(true);

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
        <TouchableOpacity onPress={()=>setShowList(showList === true ? false : true)}>
          <Icon
            name={showList?"event-note":"list-alt"} 
            size={24} 
            color="#000" 
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.header_text1}>收入 500</Text>
        <Text style={styles.header_text2}>支出 500</Text>
      </View>
      <ScrollView style={styles.content}>
        {showList ?
          <View>
            {items.map((item, index) => (
              <View key={index}>
                <View style={styles.list}>
                  <View style={styles.list_left}>
                    <Icon name="fastfood" size={30} style={styles.list_icon}/>
                    <View style={styles.list_left_text}>
                      <Text style={styles.list_category}>{item.classify}</Text>
                      <Text style={styles.list_content}>{item.content}  |  今天的花費</Text>
                    </View>
                  </View>
                  <View style={styles.list_right}>
                    <Text style={styles.list_time}>10/04（三）12:00p.m.{item.time}</Text>
                    <Text style={styles.list_cost}>-${item.cost}</Text>
                  </View>
                </View>
                <View style={styles.line}></View>
              </View>
            ))}
          </View>
        : <CalendarCom />}
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
    height: 30,
    flexDirection: 'row',
    backgroundColor: '#7DB3EF',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 15,
  },
  header_text1: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: '#fff',
    marginRight: 5,
  },
  header_text2: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    height: 65,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list_left: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  list_icon: {
    color: '#000',
    marginRight: 6,
  },
  list_left_text: {
    justifyContent: 'space-between',
    marginTop: -3,
    marginBottom: -3,
  },
  list_category: {
    color: '#3176c1',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
  list_content: {
    color: '#777777'
  },
  list_right: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: -3,
    marginBottom: 12
  },
  list_time: {
    color: '#777777',
    fontSize: 10,
    fontFamily: 'Roboto',
  },
  list_cost: {
    color: '#3176c1',
    fontSize: 28,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#e0e9ee',
  },
  test: {
    height: 50,
    width: 50,
    backgroundColor: '#777777'
  }
});
export default EditCalendarScreen;
