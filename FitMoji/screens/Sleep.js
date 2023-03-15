import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react'
import { getDatabase, onValue, ref, set } from "firebase/database";
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Image
} from 'react-native'
import { auth } from '../firebase';
import { database } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

import {
  enGB,
  registerTranslation,
} from 'react-native-paper-dates'
import { Button } from 'react-native-paper';
registerTranslation('en-GB', enGB)

const Sleep = ({ navigation }) => {
  let sleepGoalToDisplay = getCurrentSleepGoal();
  const [inputDate, setInputDate] = useState(new Date());
  const [inputBedTime, setBedTime] = useState('00:00');
  const [inputWakeupTime, setWakeupTime] = useState('08:00');
  const [sleepGoal, setGoal] = useState(sleepGoalToDisplay);
  const [bedVisible, setBedVisible] = React.useState(false);
  const [wakeVisible, setWakeVisible] = React.useState(false);
  const [hoursSlept, setHoursSlept] = useState('0');
  const [date, setDate] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  const onBedDismiss = React.useCallback(() => {
    setBedVisible(false)
  }, [setBedVisible])

  const onWakeDismiss = React.useCallback(() => {
    setWakeVisible(false)
  }, [setWakeVisible])

  var bedTimeHour;
  var bedTimeMinute;
  var wakeupHour;
  var wakeupMinute;
  let sleepRecommendation = getSleepRecommendationThatDisplaysCorrectly();
  let properDate = formatDate(date);

  const onConfirmBedTime = React.useCallback(
    ({ hours, minutes }) => {
      setBedVisible(false);
      if (hours < 10 && minutes >= 10) {
        bedTimeHour = "0" + hours;
        bedTimeMinute = minutes;
      } else if (minutes < 10 && hours >= 10) {
        bedTimeHour = hours;
        bedTimeMinute = "0" + minutes;
      } else if (hours < 10 && minutes < 10) {
        bedTimeHour = "0" + hours;
        bedTimeMinute = "0" + minutes;
      } else {
        bedTimeHour = hours;
        bedTimeMinute = minutes;
      }
      setBedTime(bedTimeHour + ":" + bedTimeMinute);
    },
    [setBedVisible]
  );

  const onConfirmWakeupTime = React.useCallback(
    ({ hours, minutes }) => {
      setWakeVisible(false);
      if (hours < 10 && minutes >= 10) {
        wakeupHour = "0" + hours;
        wakeupMinute = minutes;
      } else if (minutes < 10 && hours >= 10) {
        wakeupHour = hours;
        wakeupMinute = "0" + minutes;
      } else if (hours < 10 && minutes < 10) {
        wakeupHour = "0" + hours;
        wakeupMinute = "0" + minutes;
      } else {
        wakeupHour = hours;
        wakeupMinute = minutes;
      }
      setWakeupTime(wakeupHour + ":" + wakeupMinute);
    },
    [setWakeVisible]
  );

  const validateInputs = () => {
    writeUserData();
  }

  const format = (date) => {
    formatDate(date);
  }

  function getSleepGoal() {
    return sleepGoal;
  }

  function subtractData() {
    var bedtimes = inputBedTime.split(":");
    var bedHours = bedtimes[0];
    var bedMins = bedtimes[1];

    var waketimes = inputWakeupTime.split(":");
    var wakeHours = waketimes[0];
    var wakeMins = waketimes[1];

    var subtractDecimal;
    var subtractHour;
    var min;
    var subtractMin;

    var bedTime;

    if (parseInt(bedHours) > parseInt(wakeHours)) {
      bedTime = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate() - 1, bedHours, bedMins, 0, 0);

    } else {
      var bedTime = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate(), bedHours, bedMins, 0, 0);
    }

    var wakeTime = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate(), wakeHours, wakeMins, 0, 0);

    var subtraction = ((wakeTime - bedTime) / (1000 * 60 * 60)).toFixed(2);

    if (subtraction % 1 != 0) {
      subtractDecimal = subtraction.toString().split(".");
      subtractHour = parseInt(subtractDecimal[0]);
      min = parseInt(subtractDecimal[1]);
      subtractMin = Math.round(min / 100 * 60);
    } else if (subtraction % 1 == 0) {
      subtractDecimal = subtraction.toString().split(".");
      subtractHour = parseInt(subtractDecimal[0]);
      subtractMin = 0;
    }

    if (((parseInt(bedMins) + parseInt(wakeMins)) > 60) && (parseInt(bedHours) > parseInt(wakeHours))) {
      subtractHour++;
    }

    /**
    if (subtractHour < 10 && subtractMin >= 10) {
      setHoursSlept("0" + subtractHour + "hrs " + subtractMin + "mins");
    } else if (subtractMin < 10 && subtractHour >= 10) {
      setHoursSlept(subtractHour + "hrs " + "0" + subtractMin + "mins");
    } else if (subtractHour < 10 && subtractMin < 10) {
      setHoursSlept("0" + subtractHour + "hrs " + "0" + subtractMin + "mins");
    } else {
      setHoursSlept(subtractHour + "hrs " + subtractMin + "mins")
    }
    */

    setHoursSlept(subtractHour);

    if (subtractHour >= getSleepGoal()) {
      global.goalsCompleted[3] = 'complete';
    }
    else {
      global.goalsCompleted[3] = 'incomplete';
    }

    global.progressToGoals[3] = subtractHour/getSleepGoal();

    var tDate = getDateForDB();
    setInputDate(tDate);

  }

  function getDateForDB(){
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    let todaysDate = day + '-' + month + '-' + year;
    console.log(todaysDate);
    return todaysDate;
  }

  function writeUserData() {
    const db = getDatabase();
    var dateForDB = getDateForDB();
    set(ref(db, 'sleepTime/' + auth.currentUser?.uid + '/' + dateForDB), {
      inputDate: inputDate,
      hoursSlept: hoursSlept,
      inputBedTime: inputBedTime,
      inputWakeupTime: inputWakeupTime
    })
      .catch(error => alert(error.message));
    navigation.replace("Sleep");
    global.lastActivity = "sleep";

    set(ref(db, 'Goals/' + auth.currentUser?.uid), {
      sleepGoal: sleepGoal,
    })
      .catch(error => alert(error.message));
    navigation.replace('Sleep');
    global.lastActivity = "sleep";
  }

  function getCurrentSleepGoal() {
    var goal;

    const db = getDatabase();
    const sleepGoal = ref(db, 'Goals/' + auth.currentUser?.uid);
    onValue(sleepGoal, (snapshot) => {
      var data = snapshot.val();
      if (data == null) {

        goal = 0;
        //setGoal(goal);
      } else {
        goal = data.sleepGoal;
        return goal;
      }
    });
  }

  function getRecommendedSleepGoal() {
    var dob;
    var recommendation;
    const db = getDatabase();
    const userData = ref(db, 'users/' + auth.currentUser?.uid);
    onValue(userData, (snapshot) => {
      var data = snapshot.val();
      dob = data.dob;
      let dobYear = dob.slice(0, 4);
      let currentYear = new Date().getFullYear();
      let age = currentYear - dobYear;
      if (age <= 12) {
        recommendation = "9-12";
      }
      else if (age > 12 && age <= 18) {
        recommendation = "8-12";
      }
      else if (age > 18 && age <= 60) {
        recommendation = "7";
      }
      else if (age > 60 && age <= 64) {
        recommendation = "7-9";
      }
      else {
        recommendation = "7-8";
      }
    });
    return recommendation;
  }

  function getSleepRecommendationThatDisplaysCorrectly() {
    var sleepRec = getRecommendedSleepGoal();
    return sleepRec;
  }

  function formatDate(date) {
    var dateString = date.toString();
    var dateWithoutWeekday = dateString.substring(4, dateString.length);
    var month = dateWithoutWeekday.substring(0, dateWithoutWeekday.indexOf(" "));
    var dateWithoutMonth = dateWithoutWeekday.substring(4, dateString.length);
    var day = dateWithoutMonth.substring(0, dateWithoutMonth.indexOf(" "));
    var dateWithoutDay = dateWithoutMonth.substring(dateWithoutMonth.indexOf(" ")+1, dateWithoutMonth.length)
    var year = dateWithoutDay.substring(0, dateWithoutDay.indexOf(" "))

    var proper;
    
    if(dateString.length > 1)
      proper = month + " " + day + ", " + year;
    else
      proper = 'No Date Selected';

    return proper;
  }

  const locale = 'en-GB'

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <LinearGradient colors={['#b5e8ff', '#ffffff']} style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }}></LinearGradient>
        <View style={{
          top: '5%'
        }}>
          <Text style={[styles.shadowProp, {
            fontFamily: 'Lemon-Milk',
            textAlign: 'center',
            color: '#ffffff',
            fontSize: 60,
          }]}>Sleep</Text>
          <View style={[styles.shadowProp, {
            marginRight: '75%',
          }]}>
            <Pressable
              onPress={() => navigation.navigate('Home')}
              style={[styles.navButtons, { backgroundColor: 'transparent' }]}>
              <Image source={require('./images/globalButtons/home.png')} style={{ marginTop: '-150%', tintColor: 'white', width: '70%', height: '70%', resizeMode: 'contain', alignSelf: 'center', top: '15%' }} />
            </Pressable>
          </View>
        </View>
        <View style={[styles.shadowProp, {
          top: '3%',
          width: '90%',
          height: '8%',
          backgroundColor: '#cdefff',
          borderRadius: 25,
          alignSelf: 'center'
        }]}>
          <Text style={[styles.goalText, { color: 'white', textAlign: 'center', marginTop: 3 }]}>{`Recommended Goal ${'\n' + sleepRecommendation} hours`}</Text>
        </View>
        <Text style={[styles.goalText, styles.shadowProp, { marginTop: '8%', color: 'white', alignSelf: 'center' }]}>Goal</Text>
        <View style={{ zIndex: 4, alignSelf: 'center' }}>
          <TextInput placeholder='Enter Goal'
            style={[styles.shadowProp, styles.sleepInput, { width: '80%' }]}
            value={sleepGoal}
            onChangeText={text => setGoal(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
        <View style={[styles.shadowProp, {
          top: '2%',
          width: '90%',
          height: 350,
          backgroundColor: '#e5f7ff',
          borderRadius: 25,
          alignSelf: 'center'
        }]}>

          <View style={[styles.shadowProp, styles.bigButton, {
            alignSelf: 'center',
            marginTop: '-15%'
          }]}>
            <Image source={require('./images/sleepPage/semicircle.png')} style={[styles.buttonImage, { borderRadius: 30, tintColor: '#ffffff', width: '400%', height: 260 }]} />
          </View>

          <LottieView
            autoPlay loop
            style={[styles.shadowProp, {
              alignSelf: 'center',
              top: '3%',
              width: 120,
              height: 120,
            }]}
            source={require('./images/pagePics/sleepTracker.json')}
          />
          <View>
            <View style={[styles.shadowProp, styles.goalContainerLeft, {
              alignSelf: 'flex-start',
              transform: [{ translateX: -30 }],
              marginTop: '25%',

            }]}>
              <View style={[styles.shadowProp, styles.bigButton, {
                marginTop: '-50%',
              }]}>
                <Image source={require('./images/sleepPage/night.png')} style={[styles.buttonImage, { tintColor: '#ffffff' }]} />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text style={[styles.goalText, { marginTop: '10%', alignSelf: 'center' }]}>{inputBedTime}</Text>
                <View style={[styles.editButtonContainer, styles.shadowProp, { marginTop: '5%', marginLeft: 50 }]}>
                  <TimePickerModal
                    locale={locale}
                    value={inputBedTime}
                    onChange={onConfirmBedTime}
                    inputMode="start"
                    autoComplete={'bedtime-full'}
                    visible={bedVisible}
                    onDismiss={onBedDismiss}
                    onConfirm={onConfirmBedTime}
                    label="Select"
                    cancelLabel="Cancel"
                    confirmLabel="Ok"
                    animationType="fade"
                  />
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setBedVisible(true)}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[styles.shadowProp, styles.goalContainerRight, {
              alignSelf: 'flex-end',
              transform: [{ translateX: 30 }],
              marginTop: -100
            }]}>
              <View style={[styles.shadowProp, styles.bigButton, {
                marginTop: '-50%',
              }]}>
                <Image source={require('./images/sleepPage/morning.png')} style={[styles.buttonImage, { tintColor: '#ffffff' }]} />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text style={[styles.goalText, { marginTop: '10%', alignSelf: 'center' }]}>{inputWakeupTime}</Text>
                <View style={[styles.editButtonContainer, styles.shadowProp, { marginTop: '5%', marginLeft: '35%' }]}>
                  <TimePickerModal
                    locale={locale}
                    value={inputWakeupTime}
                    onChange={onConfirmWakeupTime}
                    inputMode="start"
                    autoComplete={'wakeuptime-full'}
                    visible={wakeVisible}
                    onDismiss={onWakeDismiss}
                    onConfirm={onConfirmWakeupTime}
                    cancelLabel="Cancel"
                    confirmLabel="Ok"
                    animationType="fade"
                  />
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setWakeVisible(true)}
                  >
                    <Text style={[styles.editButtonText]}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Text style={[styles.shadowProp, styles.sleptText, { alignSelf: 'center', fontSize: 10, marginTop: -95 }]}>You Slept</Text>
            <Text style={[styles.shadowProp, styles.sleptText, { alignSelf: 'center', fontSize: 75, marginTop: '-4%' }]}>{hoursSlept}</Text>
            <Text style={[styles.shadowProp, styles.sleptText, { alignSelf: 'center', fontSize: 10, marginTop: '-3%' }]}>Hours</Text>
          </View>
          <View style={[styles.editButtonContainer, styles.shadowProp, { alignSelf: 'center', transform: [{ translateY: -150 }] }]}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => subtractData()}
            >
              <Text style={[styles.editButtonText, { color: '#BCF4A6' }]}>Calculate</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.editButtonContainer]}>
            <Text style={[styles.goalText, {
              alignSelf: 'center',
              transform: [{ translateY: -20 }]
            }]}>{`${properDate}`}</Text>
            <View style={{ transform: [{ translateY: -10 }], height: '10%', alignSelf: 'center' }}>
              <DatePickerModal
                locale={locale}
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
                onChange={() => format(date)}
              />
              <TouchableOpacity
                style={[styles.editButton, styles.shadowProp, {height: 40}]}
                onPress={() => setOpen(true)}
              >
                <Text style={styles.editButtonText}>Change Date</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.shadowProp, styles.buttonContainer, styles.submitButton, { transform: [{ translateY: -180 }] }]}>
          <TouchableOpacity
            style={styles.button}
            onPress={validateInputs}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Sleep;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  recommendationText: {
    color: 'grey',
    fontWeight: '600',
    fontSize: 12,
    marginTop: 10,
    alignSelf: 'center'
  },
  navButtons: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center'
  },
  sleepInput: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "100%"
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#FFFFFF",
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    marginBottom: 30
  },
  buttonText: {
    fontFamily: 'Lemon-Milk',
    color: '#b5e8ff',
    fontSize: 30
  },
  header: {
    color: 'white',
    fontSize: 16,
    marginTop: 40
  },
  goalText: {
    fontFamily: 'Lemon-Milk',
    color: '#b5e8ff',
    fontSize: 25,
    marginTop: 20
  },
  editButtonContainer: {
    justifyContent: 'right',
    alignItems: 'right',
  },
  dateButtonContainer: {
    width: '10%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 50,
  },
  editButton: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  editButtonText: {
    fontFamily: 'Lemon-Milk',
    color: '#808080',
    fontWeight: '700',
    fontSize: 13
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonImage: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    alignSelf: 'center',
    top: '15%'
  },
  bigButton: {
    backgroundColor: 'transparent',
    width: 70,
    height: 70,
    borderRadius: 40,
    alignSelf: 'center'
  },
  goalContainerLeft: {
    width: 150,
    height: 100,
    backgroundColor: '#F2FBFF',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  goalContainerRight: {
    width: 150,
    height: 100,
    backgroundColor: '#F2FBFF',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  sleptText: {
    fontFamily: 'Lemon-Milk',
    color: 'black'
  },
  submitButton: {
    marginTop: '80%',
    alignSelf: 'center'
  }
});