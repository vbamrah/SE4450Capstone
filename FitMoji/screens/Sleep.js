import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react'
import { getDatabase, onValue, ref, set } from "firebase/database";
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';
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
  const [hoursSlept, setHoursSlept] = useState('08hrs 00mins');
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

    if (subtractHour < 10 && subtractMin >= 10) {
      setHoursSlept("0" + subtractHour + "hrs " + subtractMin + "mins");
    } else if (subtractMin < 10 && subtractHour >= 10) {
      setHoursSlept(subtractHour + "hrs " + "0" + subtractMin + "mins");
    } else if (subtractHour < 10 && subtractMin < 10) {
      setHoursSlept("0" + subtractHour + "hrs " + "0" + subtractMin + "mins");
    } else {
      setHoursSlept(subtractHour + "hrs " + subtractMin + "mins")
    }

  }

  function writeUserData() {
    const db = getDatabase();
    set(ref(db, 'sleepTime/' + auth.currentUser?.uid), {
      inputDate: inputDate,
      sleepGoal: sleepGoal,
      hoursSlept: hoursSlept,
      inputBedTime: inputBedTime,
      inputWakeupTime: inputWakeupTime
    })
      .catch(error => alert(error.message));
    navigation.replace("Sleep");
    global.lastActivity = "sleep";
  }

  function getCurrentSleepGoal() {
    var goal;

    const db = getDatabase();
    const sleepGoal = ref(db, 'sleepTime/' + auth.currentUser?.uid);
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
    return goal;
  }

  const locale = 'en-GB'
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <LinearGradient colors={['#b5e8ff', '#ffffff']} style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }}></LinearGradient>
        <View style={styles.inputContainer}>
          <Text style={[styles.shadowProp, {
            marginTop: 15,
            fontFamily: 'Lemon-Milk',
            textAlign: 'center',
            color: '#ffffff',
            fontSize: 60,
          }]}>Sleep</Text>
          <View style={[styles.shadowProp, {
            marginTop: -60,
            marginRight: 300,
          }]}>
            <Pressable
              onPress={() => navigation.navigate('Home')}
              style={[styles.navButtons, {backgroundColor: 'transparent'}]}>
              <Image source={require('./images/home.png')} style={{ tintColor: 'white', width: '70%', height: '70%', resizeMode: 'contain', alignSelf: 'center', top: '15%' }} />
            </Pressable>
          </View>
          <Text style={[styles.goalText, styles.shadowProp, {marginTop: 70}]}>Goal: {sleepGoalToDisplay}</Text>
          <View>
            <TextInput placeholder='Enter Goal'
              style={[styles.shadowProp, styles.sleepInput]}
              value={sleepGoal}
              onChangeText={text => setGoal(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
          <SafeAreaView style={{ flexDirection: "row", marginRight: 30, justifyContent: 'flex-start' }}>
            <Text style={[styles.shadowProp, styles.goalText]}>Date:</Text>
            <SafeAreaView style={styles.editButtonContainer}></SafeAreaView>
            <SafeAreaView style={styles.dateButtonContainer}>
              <DatePickerInput
                locale={locale}
                value={inputDate}
                onChange={setInputDate}
                inputMode="start"
                autoComplete={'sleepdate-full'}
              />
            </SafeAreaView>
          </SafeAreaView>
          <View style={[styles.shadowProp, styles.bigButton, {
                        marginRight: 200,
                        marginTop: 15,
                    }]}>
          <Image source={require('./images/night.png')} style={styles.buttonImage} />
          </View>
          <View style={{justifyContent: 'center' }}>
            <Text style={[styles.shadowProp, styles.goalText, {marginLeft: 30}]}>{inputBedTime}</Text>
            <View style={[styles.editButtonContainer, {marginTop: 10, marginLeft: 20}]}>
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
          <View style={[styles.shadowProp, styles.bigButton, {
                        marginLeft: 200,
                        marginTop: -170,
                    }]}>
          <Image source={require('./images/wake-up.png')} style={styles.buttonImage} />
          </View>
          <View style={{justifyContent: 'center' }}>
            <Text style={[styles.shadowProp, styles.goalText, {marginLeft: 225}]}>{inputWakeupTime}</Text>
            <View style={[styles.editButtonContainer, {marginTop: 10, marginLeft: 215}]}>
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
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 20, justifyContent: 'center'}}>
            <Text style={[styles.shadowProp, styles.goalText, {alignSelf: 'center'}]}>Hours Slept: {hoursSlept}</Text>
            <View style={[styles.editButtonContainer, {alignSelf: 'center', marginTop: 10}]}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => subtractData()}
              >
                <Text style={[styles.editButtonText]}>Refresh</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.shadowProp, styles.buttonContainer, {marginTop: 30}]}>
          <TouchableOpacity
            style={styles.button}
            onPress={validateInputs}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default Sleep;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtons: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center'
  },
  inputContainer: {
    width: '80%',

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
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontFamily: 'Lemon-Milk',
    color: '#b5e8ff',
    fontWeight: '700',
    fontSize: 30
  },
  header: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    marginTop: 40
  },
  goalText: {
    fontFamily: 'Lemon-Milk',
    color: 'white',
    fontWeight: '700',
    fontSize: 25,
    marginTop: 20
  },
  editButtonContainer: {
    width: '30%',
    justifyContent: 'right',
    alignItems: 'right',
  },
  dateButtonContainer: {
    width: '10%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 50
  },
  editButton: {
    backgroundColor: "#808080",
    width: '100%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  editButtonText: {
    fontFamily: 'Lemon-Milk',
    color: 'white',
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
});