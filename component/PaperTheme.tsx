// 此檔案用來管理paper類型元件的主題顏色
import {  MD3LightTheme as DefaultTheme } from "react-native-paper";

const PaperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: '#D2E0FB', // 設置你想要的顏色
  },
};

export default PaperTheme;
