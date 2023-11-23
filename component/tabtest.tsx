import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SvgXml } from 'react-native-svg';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const LogoSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.4338 1.69833C19.3642 1.5792 13.2332 1.61645 13.1978 1.69833C13.1623 1.78022 13.167 1.82628 13.1978 1.90811C13.7283 2.33646 14.0141 2.59102 14.4373 3.14768C14.8606 3.70434 14.4373 4.78774 14.4373 4.78774H18.2896C18.2896 4.78774 17.9599 3.71252 18.2896 3.14768C18.6192 2.58284 18.8569 2.32107 19.4338 2.00346C19.4949 1.88442 19.5034 1.81746 19.4338 1.69833Z" fill="#1A1A1A"/>
<path d="M7.29918 12.9689C6.58759 8.56555 5.66685 6.24567 4 4.97839H8.4434C9.97379 5.18898 10.128 5.89332 10.4839 7.038L12.2575 11.2907C12.2575 11.2907 13.3445 8.23943 13.8975 6.79008C14.4506 5.34073 18.2837 5.07375 18.7986 9.11667V18.4802C19.5201 18.9623 19.8127 19.2401 20.0001 19.758H19.5424H14.2408C14.1706 19.6537 14.1758 19.5952 14.2408 19.491L15.4232 18.3849V12.9689C16.1951 10.734 16.7184 9.51142 17.2921 7.20963C17.3267 6.96749 17.3149 6.83695 17.2349 6.61845L13.8785 16.6495C13.2491 18.4802 11.59 19.1477 11.1705 18.3658C10.7509 17.5839 8.5769 11.4814 8.5769 11.4814L8.80574 12.2442L8.86295 18.7854C7.13135 18.6437 5.60191 18.4612 5.52563 16.516V7.99152C5.98236 8.34823 6.51729 9.89856 7.29918 12.9689Z" fill="#1A1A1A"/>
<rect x="4.13348" y="19.7389" width="5.72112" height="2.86056" rx="1.43028" fill="#1A1A1A"/>
<circle cx="7.08947" cy="16.4397" r="0.438619" fill="#E0E9EE"/>
<ellipse cx="6.38205" cy="16.1591" rx="0.21288" ry="0.0931349" transform="rotate(18.023 6.38205 16.1591)" fill="#E0E9EE"/>
<ellipse cx="6.37468" cy="16.7764" rx="0.21288" ry="0.0931349" transform="rotate(-26.4625 6.37468 16.7764)" fill="#E0E9EE"/>
<ellipse cx="6.36463" cy="16.4589" rx="0.209774" ry="0.0762816" fill="#E0E9EE"/>
<path d="M8.29097 16.1347C8.34819 13.9797 8.80589 12.2825 8.80589 12.2825L8.86306 18.7855C8.86306 18.7855 8.23376 18.2896 8.29097 16.1347Z" fill="#E0E9EE"/>
<path d="M10.0263 16.0584C9.43929 14.6338 8.8821 12.2825 8.8821 12.2825L11.1515 18.3659C11.1515 18.3659 10.4083 16.9854 10.0263 16.0584Z" fill="#E0E9EE"/></svg>`; // 這裡應該是您的 SVG 標記
const LogoRoute = () => <SvgXml xml={LogoSvg} width="24" height="24" />;
const ChatRoute = () => <Icon name="chat" size={24} />;
const HomeRoute = () => <Icon name="home" size={24} />;
const SettingsRoute = () => <Icon name="settings" size={24} />;

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'logo', title: '嘴巴大師', icon: () => <SvgXml xml={LogoSvg} width="24" height="24" /> },
    { key: 'chat', title: '對話紀錄', icon: 'chat' },
    { key: 'home', title: '記事本', icon: 'home' },
    { key: 'settings', title: '系統設定', icon: 'settings' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    logo: LogoRoute,
    chat: ChatRoute,
    home: HomeRoute,
    settings: SettingsRoute,
  });

  return (
    <SafeAreaProvider>
        <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        />
    </SafeAreaProvider>
  );
};

export default App;
