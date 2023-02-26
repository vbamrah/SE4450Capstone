import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback, } from 'react'
import { get, getDatabase, ref, set, onValue } from "firebase/database";
import { DatePickerInput } from 'react-native-paper-dates';
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
registerTranslation('en-GB', enGB)


const Water = ({ navigation }) => {

    let waterGoalForDisplay = getWaterGoal();

    let waterDrankForDisplay = getWaterDrank();

    let waterToGoForDisplay = getWaterToGo();

    const defaultValue = 0;
    const [waterGoal, setWaterGoal] = useState(waterGoalForDisplay);
    const [waterDrank, setWaterDrank] = useState(waterDrankForDisplay);
    const [waterToGo, setWaterToGo] = useState(waterToGoForDisplay);
    const [date, setDate] = useState(new Date());


    const validateInputs = () => {

        writeUserData();
    }


    function addWater(wat) {
        var watDrank = getWaterDrank();
        var goal = getWaterGoal();
        var addWater = parseInt(wat) + watDrank;
        var waterToGo = goal - addWater;
        setWaterDrank(addWater);
        setWaterToGo(waterToGo);
    }

    function getWaterGoal() {
        let goal;
        const db = getDatabase();
        const waterGoal = ref(db, 'Water/' + auth.currentUser?.uid);
        onValue(waterGoal, (snapshot) => {
            var data = snapshot.val();
            if (data == null) {
                goal = 0;
                console.log("should return 0");
                return goal;

            }
            else {
                goal = data.waterGoal;
                console.log("should return goal");
                console.log(data.waterGoal);
                return goal;

            }
        });
        return goal;
    }

    function getWaterDrank() {
        let watDrank;
        const db = getDatabase();
        const waterDrank = ref(db, 'Water/' + auth.currentUser?.uid);
        onValue(waterDrank, (snapshot) => {
            var data = snapshot.val();
            if (data == null) {
                watDrank = 0;
                return watDrank;
            }
            else {
                watDrank = data.waterDrank;
                return watDrank;
            }
        });

        return watDrank;
    }


    function getWaterToGo() {
        var goal = getWaterGoal();
        if (goal == NaN || goal == undefined) {
            goal = 0;
        }
        var watDrank = getWaterDrank();
        if (watDrank == NaN || watDrank == undefined) {
            watDrank = 0;
        }
        var waterToGo = goal - watDrank;

        return waterToGo;
    }

    function writeUserData() {
        const db = getDatabase();
        set(ref(db, 'Water/' + auth.currentUser?.uid), {
            waterGoal: waterGoal,
            waterDrank: waterDrank,
            waterToGo: waterToGo,
            date: date

        })
            .catch(error => alert(error.message));
        navigation.replace("Water");
        global.lastActivity = "water";
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
                        fontFamily: 'Lemon-Milk',
                        textAlign: 'center',
                        color: '#FFFFFF',
                        fontSize: 60,
                        marginTop: 20
                    }]}>Water</Text>
                    <View style={[styles.shadowProp, {
                        marginRight: 290
                    }]}>
                        <Pressable
                            onPress={() => navigation.navigate('Home')}
                            style={[styles.navButtons, { backgroundColor: 'transparent' }]}>
                            <Image source={require('./images/home.png')} style={{ marginTop: -103, tintColor: 'white', width: '70%', height: '70%', resizeMode: 'contain', alignSelf: 'center', top: '15%' }} />
                        </Pressable>
                    </View>
                    <Text style={styles.goalText}>{`Goal: ${waterGoalForDisplay}`}</Text>
                    <View style={{marginTop: -250}}>
                        <TextInput placeholder='Litres'
                            style={styles.weightInput}
                            value={waterGoal}
                            onChangeText={text => setWaterGoal(text.replace(/[^0-400]/g, ''))}
                            keyboardType="numeric"
                            maxLength={5}
                        />
                    </View>
                    <Text style={styles.goalText}>{`Water Drank Today: ${waterDrankForDisplay}`}</Text>
                    <Text style={styles.goalText}>{`Water Left Today: ${waterToGoForDisplay}`}</Text>
                    <Text style={styles.goalText}>Add Water: </Text>
                    <View>
                        <TextInput placeholder='Litres'
                            style={styles.weightInput}
                            value={waterDrank}
                            onChangeText={text => addWater(text.replace(/[^0-9]/g, ''))}
                            keyboardType="numeric"
                            maxLength={5}
                        />
                    </View>
                </View>
                <View style={[styles.shadowProp, styles.buttonContainer, { marginTop: 105 }]}>
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
        fontWeight: '700',
        fontSize: 16,
        marginTop: 10
    },
    goalText: {
        fontFamily: 'Lemon-Milk',
        color: 'white',
        fontWeight: '700',
        fontSize: 25,
        marginTop: 10
    },
    shadowProp: {
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});

