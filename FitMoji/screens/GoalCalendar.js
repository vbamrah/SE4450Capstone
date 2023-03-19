// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View } from 'react-native';
// import { Calendar } from 'react-native-calendars';

// const GoalCalendar = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [markedDates, setMarkedDates] = useState({});

//   useEffect(() => {
//     setColorsForDates(['2023-03-01'], 'green');
//     setColorsForDates(['2023-03-10'], 'red');
//   }, []);

//   const handleDayPress = (day) => {
//     setSelectedDate(day.dateString);
//   };

//   const setColorsForDates = (dates, color) => {
//     let marked = { ...markedDates };
//     dates.forEach((date) => {
//       marked[date] = { customStyles: { container: { backgroundColor: color } } };
//     });
//     setMarkedDates(marked);
//   };

//   return (
//     <View style={styles.container}>
//       <Calendar
//         onDayPress={handleDayPress}
//         markedDates={markedDates}
//         markingType="custom"
//         theme={{
//           selectedDayBackgroundColor: 'blue',
//           todayTextColor: 'blue',
//           arrowColor: 'blue',
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
// });

// export default GoalCalendar;

import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import { get, getDatabase, ref, set, onValue } from "firebase/database";
import { auth } from '../firebase';
//import { snap } from 'react-native-paper-dates/lib/typescript/Time/timeUtils';

const GoalCalendar = () => {
  //const [markedDates, setMarkedDates] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderMarkedDates = () => {
    const markedDates = {};
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const color = getBackgroundColour(date); // pass the date to the function
      //var curGoal = getCurrentSleepGoal();
      //var sleephrs = getTimeSlept(date);
      //console.log("goal: " + curGoal + " &hrs: " + sleephrs);
      console.log(color);
      markedDates[date.toISOString().slice(0, 10)] = { selected: true, customStyles: { container: { backgroundColor: color } } };
      //markedDates[date.toISOString().slice(0, 10)] = { selected: true, color: 'red' };
    }
    return markedDates;
  };

  function getBackgroundColour(date) {
    //return hexcode 
    //let currentGoal = getCurrentSleepGoal();
    //let sleptHours = getTimeSlept(date);
    //console.log("HEY YOU" + currentGoal);
    //console.log("KAHFBOJB" + sleptHours);

    var goal;

    const db = getDatabase();
    const sleepGoal = ref(db, 'Goals/' + auth.currentUser?.uid);
    onValue(sleepGoal, (snapshot) => {
      var data = snapshot.val();
      if (data == null) {
        goal = 0;
        console.log("goal1 "+ goal);
      } else {
        goal = data.sleepGoal;
        console.log("goal2 " + goal);
        //return goal;
      }
    });

    var timeSlept;
    var currentDate = getDateForDB(date);
    console.log(currentDate);

    const hoursSlept = ref(db, 'sleepTime/' + auth.currentUser?.uid + '/' + currentDate);
    onValue(hoursSlept, (snapshot) => {
        var data = snapshot.val();
        if(data == null) {
            timeSlept = 0;
            console.log("timeslept1 " + timeSlept);
        } else {
            timeSlept = data.hoursSlept;
            console.log("timeslept2 "+timeSlept);
            //return timeSlept;
        }
    })

    if (timeSlept >= goal) {
        return '#097969';
    } else if (timeSlept < goal) {
        return '#E34234';
    } else {
        return '#D3D3D3';
    }
  }

//   useEffect(() => {
//     //const goalsRef = firebase.database().ref('Goals');
//     //const sleepTimeRef = firebase.database().ref('SleepTime');
//     const db = getDatabase();
//     const goalsRef = ref(db, 'Goals/' + auth.currentUser?.uid);
//     const sleepTimeRef = ref(db, 'sleepTime/', auth.currentUser?.uid);

//     const goal = getCurrentSleepGoal();
//     const sleepHours = getTimeSlept();
   

//     // Fetch data from Goals and SleepTime tables
//     Promise.all([goalsRef.once('value'), sleepTimeRef.once('value')])
//       .then(([goalsSnap, sleepTimeSnap]) => {
//         const goalsData = goalsSnap.val();
//         const sleepTimeData = sleepTimeSnap.val();

//         // Iterate through SleepTime data and check if the user met their goal for each date
//         const markedDates = Object.keys(sleepTimeData).reduce((acc, date) => {
//           const sleptHours = sleepTimeData[date];
//           const goalHours = goalsData[date];

//           if (sleptHours >= goalHours) {
//             acc[date] = { marked: true, dotColor: 'green' };
//           } else {
//             acc[date] = { marked: true, dotColor: 'red' };
//           }

//           return acc;
//         }, {});

//         setMarkedDates(markedDates);
//       })
//       .catch(error => console.log(error));
//   }, []);


function getDateForDB(date){
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    let currentDate = day + '-' + month + '-' + year;
    console.log(currentDate);
    return currentDate;
  }

  function getCurrentSleepGoal() {
    var goal;

    const db = getDatabase();
    const sleepGoal = ref(db, 'Goals/' + auth.currentUser?.uid);
    onValue(sleepGoal, (snapshot) => {
      var data = snapshot.val();
      if (data == null) {
        goal = 0;
        console.log("goal1 "+ goal);
      } else {
        goal = data.sleepGoal;
        console.log("goal2 " + goal);
        return goal;
      }
    });
  }

  function getTimeSlept(date) {
    var timeSlept;
    var currentDate = getDateForDB(date);
    console.log(currentDate);


    const db = getDatabase();
    const hoursSlept = ref(db, 'sleepTime/' + auth.currentUser?.uid + '/' + currentDate);
    onValue(hoursSlept, (snapshot) => {
        var data = snapshot.val();
        if(data == null) {
            timeSlept = 0;
            console.log("timeslept1" + timeSlept);
        } else {
            timeSlept = data.hoursSlept;
            console.log("timeslept2"+timeSlept);
            return timeSlept;
        }
    })
  }

  return (
    <Calendar
      markingType={'custom'}
      //markedDates={markedDates}
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
