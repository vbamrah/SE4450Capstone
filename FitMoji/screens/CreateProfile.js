import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react'
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
    Keyboard,
    Image
} from 'react-native'
import { auth } from '../firebase';
import { database } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';

import {
    enGB,
    registerTranslation,
} from 'react-native-paper-dates'
registerTranslation('en-GB', enGB)

const CreateProfile = ({ navigation }) => {
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
        set(ref(db, 'users/' + auth.currentUser?.uid), {
            firstName: firstName,
            lastName: lastName,
            heightFeet: heightFeet,
            heightInches: heightInches,
            weight: weight,
            dob: inputDate
        })
            .catch(error => alert(error.message));
        navigation.replace("Create Avatar");
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
                }} />
                <Text style={[{
                    top: '7%',
                    fontFamily: 'Lemon-Milk',
                    textAlign: 'center',
                    color: '#000000',
                    fontSize: 30,
                }]}>Start Your</Text>
                <View style={{ marginBottom: 5 }}>
                    <Image source={require('./images/yoga-position.png')} style={[styles.shadowProp, { tintColor: 'white', width: '28%', height: '28%', overflow: 'visible', resizeMode: 'contain', alignSelf: 'center', top: '22%' }]} />
                    <View style={[styles.shadowProp,
                    { backgroundColor: 'white', alignSelf: 'center', width: 100, height: 5, marginTop: '15.5%', marginLeft: 200 }]}></View>
                    <View style={[styles.shadowProp,
                    { backgroundColor: 'white', alignSelf: 'center', width: 100, height: 5, marginTop: '-1%', marginRight: 200 }]}></View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={[styles.shadowProp, {
                            top: '-30%',
                            fontFamily: 'Lemon-Milk',
                            textAlign: 'center',
                            color: '#FFFFFF',
                            fontSize: 60,
                        }]}>Fitmoji</Text>
                    </View>
                </View>
                <Text style={[ {
                    top: '-11%',
                    fontFamily: 'Lemon-Milk',
                    textAlign: 'center',
                    color: '#000000',
                    fontSize: 30,
                }]}>Journey</Text>
                <View style={{marginTop: -65}}>
                    <Text style={[styles.header, styles.shadowProp, {marginLeft: '10%'}]}>Full Name</Text>
                    <TextInput placeholder='First Name'
                        value={firstName}
                        onChangeText={text => setFirstName(text)}
                        style={[styles.input, styles.shadowProp]}
                    />
                    <TextInput placeholder='Last Name'
                        value={lastName}
                        onChangeText={text => setLastName(text)}
                        style={[styles.input, styles.shadowProp]}
                    />
                    <Text style={[styles.header, styles.shadowProp, {alignSelf: 'center', marginTop: 15}]}>Date of Birth</Text>
                    <View style={{
                            marginTop: 10,
                            width: '40%',
                            alignSelf: 'center'
                        }}>
                    <DatePickerInput
                        locale={locale}
                        value={inputDate}
                        onChange={setInputDate}
                        inputMode="start"
                        autoComplete={'birthdate-full'}
                    />
                    </View>
                    <Text style={[styles.header, styles.shadowProp, {marginLeft: '10%'}]}>Height</Text>
                    <View style={{ flexDirection: "row", alignSelf: 'center' }}>
                        <TextInput placeholder='Feet'
                            style={[styles.input, styles.shadowProp, {width: '35%', marginRight: '10%'}]}
                            value={heightFeet}
                            onChangeText={text => checkFeet(text)}
                            keyboardType="numeric"
                            maxLength={1}
                        />
                        <TextInput placeholder='Inches'
                            style={[styles.input, styles.shadowProp, {width: '35%'}]}
                            value={heightInches}
                            keyboardType="numeric"
                            onChangeText={text => checkInches(text.replace(/[^0-9]/g, ''))}
                            maxLength={2}
                        />
                    </View>
                    <Text style={[styles.header, styles.shadowProp, {marginLeft: '10%'}]}>Weight</Text>
                    <View>
                        <TextInput placeholder='Pounds'
                            style={[styles.input, styles.shadowProp]}
                            value={weight}
                            onChangeText={text => setWeight(text.replace(/[^0-9]/g, ''))}
                            keyboardType="numeric"
                            maxLength={3}
                        />
                    </View>
                </View>
                <View>
                    <View style={[styles.shadowProp, styles.buttonContainer, styles.submitButton, {marginTop: 75}]}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={validateInputs}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default CreateProfile;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        width: '80%',

    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        width: '80%',
        alignSelf: 'center',
        marginTop: 5
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
    },
    buttonText: {
        fontFamily: 'Lemon-Milk',
        color: '#b5e8ff',
        fontSize: 30
    },
    header: {
        fontFamily: 'Lemon-Milk',
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        marginTop: 10
    },
    shadowProp: {
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    submitButton: {
        marginTop: 90,
        alignSelf: 'center'
    },
});
