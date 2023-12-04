import React, { useState, useEffect } from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月'
  ],
  monthNamesShort: [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月'
],
  dayNames: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
  dayNamesShort: ['一', '二', '三', '四', '五', '六', '日'],
};

LocaleConfig.defaultLocale = 'fr';
interface CalendarComProps {
  onDateSelect: (date: string) => void;
}
interface Day {
  dateString: string;
  // 根據需要，這裡可以添加更多的屬性
}


const CalendarCom: React.FC<CalendarComProps> = ({ onDateSelect }) => {
  const [selected, setSelected] = useState('');

  // 初始化當日日期
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelected(today);
    if (onDateSelect) {
      onDateSelect(today);
    }
  }, []);

  // 当选择某一天时调用的函数
  const handleDayPress = (day: Day) => {
    console.log('Selected day', day.dateString);  // 记录选择的日期
    setSelected(day.dateString);
    if (onDateSelect) {
      onDateSelect(day.dateString);
    }
  };

  // 更新當日日期的標記
  const markedDates = {
    [selected]: {selected: true, disableTouchEvent: true, color: '#3176C1'}
  };

  return (
    <Calendar
    onDayPress={handleDayPress}  // 正确引用 handleDayPress 函数
    markingType={'period'}
    markedDates={markedDates}
      monthFormat={'yyyy MMM'}
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#000000',
        selectedDayBackgroundColor: '#3176C1',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#3176C1',
        dayTextColor: '#000000',
        textDisabledColor: '#d9e1e8',
        selectedDotColor: '#ffffff',
        arrowColor: '#3176C1',
        disabledArrowColor: '#d9e1e8',
        indicatorColor: '#3176C1',
        textDayFontFamily: 'Inter',
        textMonthFontFamily: 'Inter',
        textDayHeaderFontFamily: 'Inter',
      }}
    />
  );
};

export default CalendarCom;