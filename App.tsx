import * as React from 'react';

//核心套件的安裝
import { SafeAreaProvider } from 'react-native-safe-area-context'; //輔助空間能安全響應的套件
import { NavigationContainer } from '@react-navigation/native'; //創造彈性空間的套件
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'; //創造核心功能的套件，但被paper套件影響樣式

//導覽樣式的設定
import { Provider as PaperProvider } from 'react-native-paper'; //設計出MD3樣式
import customTheme from './component/PaperTheme' //MD3樣式下製作主題色的自定義
import Icon from 'react-native-vector-icons/MaterialIcons'; //MD3的icon們導入
import { LogoIcon } from './component/CustomIocn'; //自定義icon導入

//頁面的連接導入（後續變成Route或SPA的策略還在想）
import VoiceScreen from './page/VoiceScreen';
import ChatScreen from './page/ChatScreen';
import EditCalendarScreen from './page/EditCalendarScreen';
import SettingsScreen from './page/SettingsScreen';


const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <PaperProvider theme={customTheme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
          barStyle={{ backgroundColor: '#FFFBE2' }} // 更改導覽列背景色
          activeColor="#1A1A1A" // 更改選中標籤的文字和圖標顏色
          inactiveColor="#1A1A1A" // 更改未選中標籤的文字和圖標顏色
          >
            <Tab.Screen
              name="Voice"
              component={VoiceScreen}
              options={{ 
                tabBarLabel: '嘴巴大師',
                tabBarIcon: () => (
                  <LogoIcon />
                )
                , }}
            />
            <Tab.Screen
              name="Chat"
              component={ChatScreen}
              options={{ 
                tabBarLabel: '對話紀錄',
                tabBarIcon: () => (
                  <Icon name="chat" color="#1A1A1A" size={24} />
              )
              ,}}
            />
            <Tab.Screen
              name="Edit"
              component={EditCalendarScreen}
              options={{
                tabBarLabel: '記帳本',
                tabBarIcon: () => (
                  <Icon name="edit-calendar" color="#1A1A1A" size={24} />
                )
                , }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                tabBarLabel: '系統設定',
                tabBarIcon: () => (
                  <Icon name="settings" color="#1A1A1A" size={24} />
              )
              , }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
