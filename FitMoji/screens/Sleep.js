import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react'
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
  SafeAreaView
} from 'react-native'
import { auth } from '../firebase';
import { database } from '../firebase';

import {
    enGB,
    registerTranslation,
  } from 'react-native-paper-dates' 
import { Button } from 'react-native-paper';
registerTranslation('en-GB', enGB)

const createProfile = ({navigation}) => {
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
          if (hours < 10 && minutes >=10) {
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
          } else{
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

        if(parseInt(bedHours) > parseInt(wakeHours))
        {
            bedTime = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate() - 1, bedHours, bedMins, 0, 0);
            
        } else {
            var bedTime = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate(), bedHours, bedMins, 0, 0);
        }
        
        var wakeTime = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate(), wakeHours, wakeMins, 0, 0);
              
        var subtraction = ((wakeTime - bedTime) / (1000*60*60)).toFixed(2);
    
        if(subtraction % 1 != 0) {
            subtractDecimal = subtraction.toString().split(".");
            subtractHour = parseInt(subtractDecimal[0]);
            min = parseInt(subtractDecimal[1]);
            subtractMin = Math.round(min/100 * 60);
        } else if(subtraction % 1 == 0) {
            subtractDecimal = subtraction.toString().split(".");
            subtractHour = parseInt(subtractDecimal[0]);
            subtractMin = 0;
        }

        if(((parseInt(bedMins) + parseInt(wakeMins)) > 60) && (parseInt(bedHours) > parseInt(wakeHours))) {
            subtractHour++;
        } 

        if(subtractHour < 10 && subtractMin >= 10) {
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
      }

      function getCurrentSleepGoal() {
        var goal;

        const db = getDatabase();
        const sleepGoal = ref(db, 'sleepTime/' + auth.currentUser?.uid);
        onValue(sleepGoal, (snapshot) => {
            var data = snapshot.val();
            if(data == null) {
              
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
        
        <View style={styles.inputContainer}>
            <Text style = {{
                    textShadowColor: '#000000',
                    textShadowRadius: '10',
                    fontFamily: 'Lemon-Milk',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontSize: 40,
                    marginBottom: 50
                }}>Sleep Tracker</Text>

                <Text style={styles.goalText}>Goal: {sleepGoalToDisplay}</Text>
                <View>
                <TextInput placeholder='Enter Goal'
                    style={styles.sleepInput}
                    value= {sleepGoal}
                    onChangeText={text => setGoal(text.replace(/[^0-9]/g, ''))} 
                    keyboardType="numeric"
                    maxLength={2}
                    />
              </View>
              <SafeAreaView style={{flexDirection: "row" , marginRight: 30, justifyContent: 'flex-start'}}>
                    <Text style={styles.goalText}>Date:</Text>
                    <SafeAreaView style = {styles.editButtonContainer}></SafeAreaView>
                    <SafeAreaView style = {styles.dateButtonContainer}>                  
                    <DatePickerInput
                    locale={locale}
                    value={inputDate}
                    onChange={setInputDate}
                    inputMode="start"
                    autoComplete={'sleepdate-full'}
                    />
                    </SafeAreaView>
              </SafeAreaView>
              <View style={{flexDirection: "row" , marginRight: 30, justifyContent: 'space-between'}}>
                    <Text style={styles.goalText}>Bedtime: {inputBedTime}</Text>
                    <View style = {styles.editButtonContainer}></View>
                    <View style={styles.editButtonContainer}>
                    <TimePickerModal
                    locale = {locale}
                    value = {inputBedTime}
                    onChange = {onConfirmBedTime} 
                    inputMode = "start"
                    autoComplete = {'bedtime-full'}
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
                    onPress={()=> setBedVisible(true)}
                    >
                    <Text style={styles.editButtonText}>Edit Bedtime</Text>
                    </TouchableOpacity>
                    </View>
              </View>
              <View style={{flexDirection: "row" , marginRight: 30, justifyContent: 'space-between'}}>
                    <Text style={styles.goalText}>Wakeup: {inputWakeupTime}</Text>
                    <View style = {styles.editButtonContainer}></View>
                    <View style={styles.editButtonContainer}>
                    <TimePickerModal
                    locale = {locale}
                    value = {inputWakeupTime}
                    onChange = {onConfirmWakeupTime} 
                    inputMode = "start"
                    autoComplete = {'wakeuptime-full'}
                    visible={wakeVisible}
                    onDismiss={onWakeDismiss}
                    onConfirm={onConfirmWakeupTime}
                    cancelLabel="Cancel" 
                    confirmLabel="Ok" 
                    animationType="fade" 
                    />
                    <TouchableOpacity 
                    style={styles.editButton}
                    onPress={()=> setWakeVisible(true)}
                    >
                    <Text style={styles.editButtonText}>Edit Wakeup</Text>
                    </TouchableOpacity>
                    </View>
              </View>
              <View style={{flexDirection: "row" , marginRight: 30, justifyContent: 'space-between'}}>
              <Text style={styles.goalText}>Hours Slept: {hoursSlept}</Text>
              <View style = {styles.editButtonContainer}>
              <TouchableOpacity 
                    style={styles.editButton}
                    onPress={()=> subtractData()}
                    >
                    <Text style={styles.editButtonText}>Refresh Hours</Text>
                    </TouchableOpacity>
              </View>
              </View>
        </View>
        <View style={styles.buttonContainer}>
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

export default createProfile;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginTop: 40
    },
    button: {
        backgroundColor: "#42A5F5",
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    header: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        marginTop: 40
    },
    goalText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 25,
        marginTop: 20
    },
    editButtonContainer: {
        width: '30%',
        justifyContent: 'right',
        alignItems: 'right',
        marginTop: 25
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
        color: 'white',
        fontWeight: '700',
        fontSize: 13
    }
});