import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react'
import { getDatabase, ref, set } from "firebase/database";
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
  Keyboard
} from 'react-native'
import { auth } from '../firebase';
import { database } from '../firebase';



const Water = ({navigation}) => {
    const [waterAmount, setWaterAmount] = useState('');
   
   

    const validateInputs = () => {
        if (waterAmount== '' ) {
            alert('Invalid input');
        }
        else {
            writeUserData();
        }
    }



    function writeUserData() {
        const db = getDatabase();
        set(ref(db, 'users/' + auth.currentUser?.uid), {
          waterAmount: waterAmount,
        
        })
        .catch(error => alert(error.message));
        navigation.replace("");
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
                    fontSize: 50,
                    marginBottom: 30
                }}>Water Tracker</Text>
            <Text style={styles.header}>Amount of Water Drank</Text>
            <TextInput placeholder='Litres'
            value= {waterAmount}
            onChangeText={text => setWaterAmount(text)}
            style={[styles.input]}
            />
             <Pressable
                onPress = {() => navigation.navigate('Home')}
                style = {{
                    marginTop: 10,
                    backgroundColor: '#FFFFFF',
                    width: 90,
                    borderRadius: 10,
                    alignSelf: 'center'
                }}
            ></Pressable>
        
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

export default Water;
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
    }
});
