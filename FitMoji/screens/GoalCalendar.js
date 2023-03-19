import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import { get, getDatabase, ref, set, onValue } from "firebase/database";
import { auth } from '../firebase';

const GoalCalendar = () => {
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
    const sleepGoal = ref(db, 'Goals/' + auth.currentUser?.uid);
    onValue(sleepGoal, (snapshot) => {
      var data = snapshot.val();
      if (data == null) {
        goal = 0;
      } else {
        goal = data.sleepGoal;
      }
    });

    var timeSlept;
    var currentDate = getDateForDB(date);

    const hoursSlept = ref(db, 'sleepTime/' + auth.currentUser?.uid + '/' + currentDate);
    onValue(hoursSlept, (snapshot) => {
        var data = snapshot.val();
        if(data == null) {
            timeSlept = 0;
        } else {
            timeSlept = data.hoursSlept;
        }
    })

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

    
    if (timeSlept >= goal && currentCalendarDate <= todaysDate) {
        return '#097969';
    } else if (timeSlept < goal && currentCalendarDate <= todaysDate) {
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
    <Calendar
      markingType={'custom'}
      markedDates={renderMarkedDates()}
      onMonthChange={(month) => setCurrentMonth(new Date(month.dateString))}
      style={{
        alignContent: 'center',
        marginTop: 100,
      }}
      theme={{
        
      }}
    />
  );
};

export default GoalCalendar;
