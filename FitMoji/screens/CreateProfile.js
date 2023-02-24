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

const CreateProfile = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [heightFeet, setHeightFeet] = useState('');
    const [heightInches, setHeightInches] = useState('');
    const [weight, setWeight] = useState('');
    const [inputDate, setInputDate] = useState(new Date());

    const validateInputs = () => {
        if (firstName == '' || lastName == '' || heightFeet == '' || heightInches == '' || weight == '') {
            alert('Invalid input');
        }
        else {
            writeUserData();
        }
    }

    function checkFeet(feet) {
        if (feet >= 4 && feet <= 7) {
            setHeightFeet(feet)
        }
        else {
            setHeightFeet("")
        }
    }

    function checkInches(inches) {
        if (inches >= 0 && inches <= 12) {
            setHeightInches(inches)
        }
    }

    function writeUserData() {
        const db = getDatabase();
        console.log(auth.currentUser?.uid);
        console.log(inputDate);
        set(ref(db, 'users/' + auth.currentUser?.uid), {
          firstName: firstName,
          lastName: lastName,
          heightFeet: heightFeet,
          heightInches: heightInches,
          weight: weight,
          dob: inputDate.toISOString().split('T')[0],
        })
        .catch(error => alert(error.message));
        navigation.replace("Create Avatar");
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
                }}>Create Profile</Text>
            <Text style={styles.header}>Full Name</Text>
            <TextInput placeholder='First Name'
            value= {firstName}
            onChangeText={text => setFirstName(text)}
            style={[styles.input]}
            />
             <TextInput placeholder='Last Name'
            value= {lastName}
            onChangeText={text => setLastName(text)} 
            style={styles.input}
            />
              <Text style={styles.header}>Date of Birth</Text>
              <DatePickerInput
                locale={locale}
                value={inputDate}
                onChange={setInputDate}
                inputMode="start"
                autoComplete={'birthdate-full'}
              />
              <Text style={styles.header}>Height</Text>
              <View style={{flexDirection:"row"}}>
                <TextInput placeholder='Feet'
                    style={styles.heightInput}
                    value= {heightFeet}
                    onChangeText={text => checkFeet(text)} 
                    keyboardType="numeric"
                    maxLength={1}
                    />
                    <TextInput placeholder='Inches'
                    style={styles.heightInput}
                    value= {heightInches}
                    keyboardType="numeric"
                    onChangeText={text => checkInches(text.replace(/[^0-9]/g, ''))} 
                    maxLength={2}
                    /> 
              </View>
              <Text style={styles.header}>Weight</Text>
              <View>
                <TextInput placeholder='Pounds'
                    style={styles.weightInput}
                    value= {weight}
                    onChangeText={text => setWeight(text.replace(/[^0-9]/g, ''))} 
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

export default CreateProfile;
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
    weightInput: {
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
    }
});
