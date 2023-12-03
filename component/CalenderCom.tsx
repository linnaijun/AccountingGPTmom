import React, {useState} from 'react';
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


const CalendarCom = () => {
  const [selected, setSelected] = useState('');
  
  return (
    <Calendar
      // Callback that gets called when the user selects a day
      onDayPress={day => {
        console.log('selected day', day);
        setSelected(day.dateString);
      }}
      markingType={'period'}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, color: '#3176C1'},
      }}
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