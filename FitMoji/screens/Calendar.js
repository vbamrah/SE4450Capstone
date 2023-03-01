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
import LottieView from 'lottie-react-native';

import {
  enGB,
  registerTranslation,
} from 'react-native-paper-dates'
import { Button } from 'react-native-paper';
registerTranslation('en-GB', enGB)
function Calendar() {
    let calendarGoalToDisplay = getCurrentCalendarGoal();
    const [inputDate, setInputDate] = useState(new Date());
    const [inputCalendarTime, setCalendarTime] = useState('00:00');
    const [calendarGoal, setGoal] = useState(calendarGoalToDisplay);
    const [calendarVisible, setCalendarVisible] = React.useState(false);
    const [hoursCalendar, setHoursCalendar] = useState('8');
  
   
    const onClicky = useCallback(() => {
      setCalendarVisible(true);
    })
  
    const onClicky2 = useCallback(() => {
      setDateVisible(true);
    })
  
    var calendarTimeHour;
    var calendarTimeMinute;
    var calendarHour;
    var calendarMinute;

  
    const onConfirmCalendarTime = React.useCallback(
      ({ hours, minutes }) => {
        setCalendarVisible(false);
        if (hours < 10 && minutes >= 10) {
          calendarTimeHour = "0" + hours;
          calendarTimeMinute = minutes;
        } else if (minutes < 10 && hours >= 10) {
          calendarTimeHour = hours;
          calendarTimeMinute = "0" + minutes;
        } else if (hours < 10 && minutes < 10) {
          calendarTimeHour = "0" + hours;
          calendarTimeMinute = "0" + minutes;
        } else {
          calendarTimeHour = hours;
          calendarTimeMinute = minutes;
        }
        setCalendarTime(calendarTimeHour + ":" + calendarTimeMinute);
      },
      [setCalendarVisible]
    );
  
    const onConfirmTime = React.useCallback(
      ({ hours, minutes }) => {
        setCalendarVisible(false);
        if (hours < 10 && minutes >= 10) {
          eventHour = "0" + hours;
          eventMinute = minutes;
        } else if (minutes < 10 && hours >= 10) {
          eventHour = hours;
          eventMinute = "0" + minutes;
        } else if (hours < 10 && minutes < 10) {
          eventHour = "0" + hours;
          eventMinute = "0" + minutes;
        } else {
          eventHour = hours;
          eventMinute = minutes;
        }
        setEventTime(eventHour + ":" + eventMinute);
      },
      [setCalendarVisible]
    );
  
    const validateInputs = () => {
  
      writeUserData();
  
    }
  
    function subtractData() {
      var calendartimes = inputCalendarTime.split(":");
      var calendarHours = calendartimes[0];
      var calendarMins = calendartimes[1];
  
      
 
      var subtractDecimal;
      var subtractHour;
      var min;
      var subtractMin;
  
      var calendarTime;
  
      
  
    
      setHoursCalendar(subtractHour);
  
    }
  
    function writeUserData() {
      const db = getDatabase();
      set(ref(db, 'calendarTime/' + auth.currentUser?.uid), {
        inputDate: inputDate,
        calendarGoal: calendarGoal,
        hoursCalendar: hoursCalendar,
        inputCalendarTime: inputCalendarTime,
       
      })
        .catch(error => alert(error.message));
      navigation.replace("Calendar");
      global.lastActivity = "Calendar";
    }
  
    function getCurrentCalendarGoal() {
      var goal;
  
      const db = getDatabase();
      const calendarGoal = ref(db, 'calendarTime/' + auth.currentUser?.uid);
      onValue(calendarGoal, (snapshot) => {
        var data = snapshot.val();
        if (data == null) {
  
          goal = 0;
          //setGoal(goal);
        } else {
          goal = data.calendarGoal;
          return goal;
        }
      });
    }
  
 
  
    const locale = 'en-GB'
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={styles.container}>
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
              fontSize: 40,
            }]}>Calendar</Text>
            <View style={[styles.shadowProp, {
              marginRight: '70%',
            }]}>
              <Pressable
                onPress={() => navigation.navigate('Home')}
                style={[styles.navButtons, { backgroundColor: 'transparent' }]}>
               
              </Pressable>
            </View>
          </View>
         
          <View style={{ top: '5%' }}>
            <Text style={[styles.goalText, styles.shadowProp, { marginTop: '-5%', color: 'white', alignSelf: 'center' }]}>Event</Text>
            <View style={{ alignSelf: 'center' }}>
              <TextInput placeholder='Enter Event'
                style={[styles.shadowProp, styles.calendarInput, { width: '80%' }]}
                value={calendarGoal}
                onChangeText={text => setGoal(text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
  
            <View style={[styles.shadowProp, styles.bigButton, {
              alignSelf: 'center',
              marginTop: '-12%'
            }]}>
             
            </View>
  
            <LottieView
              autoPlay loop
              style={[styles.shadowProp, {
                alignSelf: 'center',
                top: '3%',
                width: 120,
                height: 120,
              }]}
          
            />
            <View>
              <View style={[ {
                marginTop: '25%',
                marginLeft: '-1%'
  
              }]}>
                <View style={[styles.shadowProp, styles.bigButton, {
                  marginTop: '-50%',
                }]}>
                  
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <View style={[styles.editButtonContainer, styles.shadowProp, { marginTop: '5%', marginLeft: 50 }]}>
                    <TimePickerModal
                      locale={locale}
                      value={inputCalendarTime}
                      onChange={onConfirmCalendarTime}
                      inputMode="start"
                      autoComplete={'calendar-full'}
                      visible={calendarVisible}
                      onConfirm={onConfirmCalendarTime}
                      label="Select"
                      cancelLabel="Cancel"
                      confirmLabel="Ok"
                      animationType="fade"
                    />
                   
                  </View>
                </View>
              </View>
              <View style={[styles.shadowProp, styles.goalContainer, {
                transform: [{ rotateY: '180deg' }],
                marginLeft: '65%',
                marginRight: '-1%',
                marginTop: -100
              }]}>
                <View style={[styles.shadowProp, styles.bigButton, {
                  transform: [{ rotateY: '180deg' }],
                  marginTop: '-50%',
                }]}>
                </View>
                <View style={{ justifyContent: 'center' }}>
            
                  <View style={[styles.editButtonContainer, styles.shadowProp, { transform: [{ rotateY: '180deg' }], marginTop: '5%', marginRight: '35%' }]}>
                    <TimePickerModal
                      locale={locale}
                    
                      inputMode="start"
                      autoComplete={'eventtime-full'}
                      visible={calendarVisible}
                      onConfirm={onConfirmTime}
                      cancelLabel="Cancel"
                      confirmLabel="Ok"
                      animationType="fade"
                    />
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => setCalendarVisible(true)}
                    >
                      <Text style={styles.editButtonText}>Event Time</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            
            </View>
            <View style={[styles.editButtonContainer, styles.shadowProp, { alignSelf: 'center', marginTop: '-40%' }]}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => subtractData()}
              >
                <Text style={[styles.editButtonText, { color: '#BCF4A8' }]}>Edit Event</Text>
              </TouchableOpacity>
            </View>
            <SafeAreaView style={{ justifyContent: 'center', alignSelf: 'center' }}>
              <View style={[styles.editButtonContainer, styles.shadowProp, { marginTop: '50%', height: 10 }]}>
                <DatePickerInput
                  locale={locale}
                  value={inputDate}
                  onChange={setInputDate}
                  inputMode="start"
                  autoComplete={'calendardate-full'}
                />
              </View>
            </SafeAreaView>
          </View>
          <View style={[styles.shadowProp, styles.buttonContainer, styles.submitButton, { marginTop: '35%' }]}>
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
  

export default Calendar;
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    recommendationText: {
      color: 'grey',
      fontWeight: '600',
      fontSize: 12,
      marginTop: 10
    },
    navButtons: {
      width: 40,
      height: 40,
      borderRadius: 30,
      backgroundColor: '#FFFFFF',
      alignSelf: 'center'
    },
    calendarInput: {
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
   
    bigButton: {
      backgroundColor: 'transparent',
      width: 70,
      height: 70,
      borderRadius: 40,
      alignSelf: 'center'
    },
    goalContainer: {
      width: 150,
      height: 100,
      backgroundColor: '#F2FBFF',
      borderTopRightRadius: 25,
      borderBottomRightRadius: 25,
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
