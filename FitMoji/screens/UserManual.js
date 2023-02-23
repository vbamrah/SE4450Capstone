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
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { auth } from '../firebase';
import { database } from '../firebase';


function UserManual() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Text style={styles.heading}>User Manual</Text>
      <Text style={styles.subheading}>Introduction</Text>

      <Text style={{ marginHorizontal: 20, marginTop: 10 }}>
        FitMoji is designed to help you lead a healthy and balanced lifestyle by providing engaging tools
        to track wellness, fitness, and nutrition. This user manual will guide you through the app's features 
        to help you get the most out of your FitMoji experience. 
      </Text>
      <Text style={styles.subheading}>Getting Started</Text>
      <Text style={{ marginHorizontal: 20, marginTop: 10 }}>
      To use FitMoji, you will need to download it from the App Store or Google Play Store and create 
      an account. Once you have installed the app, follow these steps to get started: {'\n'}
      {'\t'} 1. Launch the app on your mobile device. {'\n'}
      {'\t'} 2. Sign up for an account using your email. {'\n'}
      {'\t'} 3. Set up your avatar by taking a photo or {'\n'}{'\t'}selecting your desired customizations. {'\n'}
      {'\t'} 4. Complete your profile by providing basic {'\n'}{'\t'}information about yourself, such as your age, {'\n'}{'\t'}gender, height, and weight.
      </Text>
      <Text style={styles.subheading}>Features</Text>
      <Text style={styles.subheading2}>Avatar</Text>
      <Text style={{ marginHorizontal: 20, marginTop: 10 }}>
      Your personalized avatar can be used to track your progress and customize your FitMoji appearance. You can edit
      your avatar through the Edit Profile button located at the top of the Home Page. Any changes or edits made to 
      your avatar will be reflected on the Home Page screen.
      </Text>
      <Text style={styles.subheading2}>Tracking</Text>
      <Text style={{ marginHorizontal: 20, marginTop: 10 }}>
      FitMoji allows you to track your wellness goals by logging your workouts, meals, 
      sleep schedule, and other activities. Tracking for each category is entered on that category page, which
      can be accessed using the buttons located at the bottom of the home page.
      </Text>
      <Text style={styles.subheading2}>Goal Setting</Text>
      <Text style={{ marginHorizontal: 20, marginTop: 10 }}>
      FitMoji allows you to set managable wellness goals for fitness, nutrition, water, and sleep based on your biometric 
      information. Goals for each category can be set on the category's page, which can be accessed using the 
      buttons located at the bottom of the home page.
      {'\n'}{'\n'}
      </Text>
    </ScrollView>
  );
}

export default UserManual;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',

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
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subheading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 20,
    },
    subheading2: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 20,
    },
});