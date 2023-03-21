import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, CalendarList } from 'react-native-calendars';
import { get, getDatabase, ref, set, onValue } from "firebase/database";
import { auth } from '../firebase';

const WaterGoalCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderMarkedDates = () => {
    const markedDates = {};
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const color = getBackgroundColour(date); 
      markedDates[date.toISOString().slice(0, 10)] = { selected: true, customStyles: { container: { backgroundColor: color } } };
    }
    return markedDates;
  };

  function getBackgroundColour(date) {
    var goal;

    const db = getDatabase();
    const waterGoal = ref(db, 'Goals/' + auth.currentUser?.uid);
    onValue(waterGoal, (snapshot) => {
      var data = snapshot.val();
      if (data == null) {
        goal = 0;
      } else {
        goal = data.waterGoal;
      }
    });

    var watDrank;
    var currentDate = getDateForDB(date);

    const waterDrank = ref(db, 'water/' + auth.currentUser?.uid + '/' + currentDate);
    onValue(waterDrank, (snapshot) => {
        var data = snapshot.val();
        if (data == null) {
            watDrank = 0;
        }
        else {
            watDrank = data.waterDrank;
        }
    });

    var todaysDate = getTodaysDate();

    var currentCalendarDay = date.getDate();
    if (currentCalendarDay < 10) {
        currentCalendarDay = "0" + currentCalendarDay;
    }
    var currentCalendarMonth = date.getMonth() + 1; // add 1 to get the correct month (January is 0)
    if (currentCalendarMonth < 10) {
        currentCalendarMonth = "0" + currentCalendarMonth
    }
    var currentCalendarYear = date.getFullYear();
    var currentCalendarDate = currentCalendarYear + "-" + currentCalendarMonth + "-" + currentCalendarDay;

    
    if (watDrank >= goal && currentCalendarDate <= todaysDate) {
        return '#097969';
    } else if (watDrank < goal && currentCalendarDate <= todaysDate) {
        return '#E34234';
    } else {
        return '#D3D3D3';
    }
  }

function getDateForDB(date){
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    let currentDate = day + '-' + month + '-' + year;
    return currentDate;
  }

function getTodaysDate() {
    var date = new Date();
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var month = date.getMonth() + 1; // add 1 to get the correct month (January is 0)
    if (month < 10) {
        month = "0" + month;
    }
    var year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

  return (
    <View>
        <LinearGradient colors={['#b5e8ff', '#ffffff']} style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
        }}></LinearGradient>
        <View>
            <Text style={[styles.shadowProp, {
                fontFamily: 'Lemon-Milk',
                textAlign: 'center',
                color: '#ffffff',
                fontSize: 30,
                marginTop: 70,
                }]}>Water Goal History</Text>
            <CalendarList
                markingType={'custom'}
                markedDates={renderMarkedDates()}
                onMonthChange={(month) => setCurrentMonth(new Date(month.dateString))}
                style={{
                    marginTop: 20,
                    height: 720,
                }}
                theme={{
                    calendarBackground: 'transparent'
                }}
                />
            </View>
        </View>
  );
};

export default WaterGoalCalendar;

const styles = StyleSheet.create({
    shadowProp: {
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
})
