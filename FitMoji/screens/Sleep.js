import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react'
import { getDatabase, ref, set } from "firebase/database";
import { DatePickerInput } from 'react-native-paper-dates';
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
  Keyboard
} from 'react-native'
import { auth } from '../firebase';
import { database } from '../firebase';

import {
    enGB,
    registerTranslation,
  } from 'react-native-paper-dates' 
registerTranslation('en-GB', enGB)

const createProfile = ({navigation}) => {
    const [sleepTime, setSleep] = useState('');
   

    const validateInputs = () => {
        if (sleepTime == '') {
            alert('Invalid input');
        }
        else {
            //writeUserData();
        }
    }

    // function writeUserData() {
    //     const db = getDatabase();
    //     set(ref(db, 'users/' + auth.currentUser?.uid), {
    //       sleepTime: sleepTime
    //     })
    //     .catch(error => alert(error.message));
    //     navigation.replace("Home");
    //   }
    
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
                    marginBottom: 30
                }}>Sleep Tracker</Text>
              <Text style={styles.goalText}>Goal: 8hrs</Text>
              <Text style={styles.goalText}>Bed Time: 12:00am</Text>
              <Text style={styles.goalText}>Wakeup: 8:00am</Text>
              <Text style={styles.header}>Hours Slept: 8</Text>
              <View>
                <TextInput placeholder='Enter amount of sleep'
                    style={styles.sleepInput}
                    value= {sleepTime}
                    onChangeText={text => setSleep(text.replace(/[^0-9]/g, ''))} 
                    keyboardType="numeric"
                    maxLength={3}
                    />
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
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    sleepInput: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        width: "100%"
    },
    heightInput: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        width: "50%",
        display: "flex",
        flexDirection: "row"
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
        alignItems: 'center'
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
        marginTop: 10
    },
    goalText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 25,
        marginTop: 10
    }
});