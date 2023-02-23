import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react'
import { getDatabase, onValue, ref, set } from "firebase/database";
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

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
  ScrollView,
} from 'react-native'
import { auth } from '../firebase';
import { database } from '../firebase';


function Calendar() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>
        Calendar
      </Text>
      
    </ScrollView>
  );
}

export default Calendar;
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
        marginTop: 25,
        marginRight:-35
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
