//等候妤臻，先建測試環境
import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.title_text}>
          系統設定
        </Text>
      </View>
      <View style={styles.setting}>
        <Text style={styles.setting_text}>每日提醒</Text>
        <Switch style={styles.switch} />
      </View>
      <View style={styles.line}></View>
      <View style={styles.setting}>
        <Text style={styles.setting_text}>提醒時間</Text>
        <View style={styles.setting_right} >
          <Text style={styles.setting_right_text}>21:00</Text>
          <Icon name="keyboard-arrow-right" size={30} color="#d5d5d5" />
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.setting}>
        <Text style={styles.setting_text}>顯示方式</Text>
        <View style={styles.setting_right}>
          <Text style={styles.setting_right_text}>淺色模式</Text>
          <Icon name="keyboard-arrow-right" size={30} color="#d5d5d5" />
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.setting}>
        <Text style={styles.setting_text}>字體大小</Text>
        <View style={styles.setting_right}>
          <Text style={styles.setting_right_text}>正常</Text>
          <Icon name="keyboard-arrow-right" size={30} color="#d5d5d5" />
        </View>
      </View>
      <View style={styles.line}></View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fffbe2'
  },
  title_text: {
    fontSize: 22,
    fontFamily: 'Roboto',
    color :'#1c1b1f'
  },
  setting: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20
  },
  setting_text: {
    fontSize: 18,
    fontFamily: 'Inter',
    color :'#000',
  },
  line: {
    height: 1,
    backgroundColor: '#dadada'
  },
  setting_right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  setting_right_text: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: '#777777',
    
  }

});

export default SettingsScreen;
