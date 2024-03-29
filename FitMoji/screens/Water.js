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
    TouchableWithoutFeedback,
    Keyboard,
    Image
} from 'react-native'
import { auth } from '../firebase';
import { database } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { MotiView } from 'moti';

import {
    enGB,
    registerTranslation,
} from 'react-native-paper-dates'
registerTranslation('en-GB', enGB)

const Water = ({ navigation }) => {

    var waterGoalForDisplay = getWaterGoal();;
    var waterDrankForDisplay = getWaterDrank();
    var waterToGoForDisplay = getWaterToGo();;


    const [animated, setAnimated] = useState(false);
    const handleToggle = () => {
        setAnimated(!animated);
    }

    const [waterGoal, setWaterGoal] = useState(waterGoalForDisplay);
    const [waterDrank, setWaterDrank] = useState(waterDrankForDisplay);
    const [waterToGo, setWaterToGo] = useState(waterToGoForDisplay);
    const [date, setDate] = useState(new Date());
    const [counter, setCounter] = useState(0);


    const validateInputs = () => {
        writeUserData();
    }

    function countWater(water) {
        setCounter(counter + water);
    }

    function addWater(wat) {
        countWater(wat);
        var wDrank = getWaterDrank();
        var wGoal = getWaterGoal();
        if (wGoal == undefined || wGoal == NaN || wGoal == null) {
            wGoal = 0;
        }
        var addWat = parseFloat(wat) + wDrank;
        var watToGo = wGoal - addWat;

        setWaterDrank(addWat);
        setWaterToGo(watToGo);
        var tDate = getDateForDB();
        setDate(tDate);
    }

    function getDateForDB() {
        var day = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        let todaysDate = day + '-' + month + '-' + year;
        return todaysDate;
    }

    function getWaterGoal() {
        var goal;
        const db = getDatabase();
        const waterGoal = ref(db, 'Goals/' + auth.currentUser?.uid + '/waterGoal');
        onValue(waterGoal, (snapshot) => {
            const data = snapshot.val();
            if (data == null || data == undefined || data == NaN) {
                goal = 0;
            }
            else {
                goal = data.waterGoal;
            }
        });
        return goal;
    }

    function getWaterDrank() {
        var watDrank;
        const db = getDatabase();
        var dateforDB = getDateForDB();
        const waterDrank = ref(db, 'Water/' + auth.currentUser?.uid + '/' + dateforDB);
        onValue(waterDrank, (snapshot) => {
            var data = snapshot.val();
            if (data == null) {
                watDrank = 0;
            }
            else {
                watDrank = data.waterDrank;
            }
        });
        return watDrank;
    }

    function getWaterToGo() {
        var goal = getWaterGoal();
        if (goal == NaN || goal == undefined) {
            goal = 0;
        }
        var wDrank = getWaterDrank();
        if (wDrank == NaN || wDrank == undefined) {
            wDrank = 0;
        }

        var wToGo = goal - wDrank;
        if (wToGo <= 0) {
            global.goalsCompleted[0] = 'complete';
        } else {
            global.goalsCompleted[0] = 'incomplete';
        }

        return wToGo;

    }

    function updateWaterToGo(data) {
        waterToGoForDisplay = data;
    }



    function writeUserData() {
        const db = getDatabase();
        var dateForDB = getDateForDB();
        set(ref(db, 'Water/' + auth.currentUser?.uid + '/' + dateForDB), {
            waterDrank: waterDrank,
            waterToGo: waterToGo,
            date: date

        })
            .catch(error => alert(error.message));
        navigation.replace("Water");
        global.lastActivity = "water";

        set(ref(db, 'Goals/' + auth.currentUser?.uid + '/waterGoal'), {
            waterGoal: waterGoal,

        })
            .catch(error => alert(error.message));
        navigation.replace("Water");
        global.lastActivity = "water";

    }



    global.progressToGoals[2] = waterDrankForDisplay / waterGoalForDisplay;

    const locale = 'en-GB'
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                }}>
                <LinearGradient colors={['#b5e8ff', '#ffffff']} style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                }}></LinearGradient>
                <View style={{
                    flex: 1,
                    top: '5%',
                    flexBasis: 50,
                    flexGrow: 1,
                    flexShrink: 1,
                }}>
                    <Text style={[styles.shadowProp, {
                        fontFamily: 'Lemon-Milk',
                        textAlign: 'center',
                        color: '#ffffff',
                        fontSize: 60,
                    }]}>Water</Text>
                    <View style={[styles.shadowProp, {
                        marginTop: -50,
                        marginRight: 300,
                    }]}>
                        <Pressable
                            onPress={() => navigation.navigate('Home')}
                            style={[styles.navButtons, { backgroundColor: 'transparent' }]}>
                            <Image source={require('./images/globalButtons/home.png')} style={{ tintColor: 'white', width: '70%', height: '70%', resizeMode: 'contain', alignSelf: 'center' }} />
                        </Pressable>
                    </View>
                </View>
                <View style={{
                    flex: 3,
                    flexBasis: 400,
                    flexGrow: 1,
                    flexShrink: 1,
                }}>
                    <Text style={[styles.goalText, styles.shadowProp, { color: 'white', alignSelf: 'center' }]}>Goal</Text>
                    <View style={{ alignSelf: 'center' }}>
                        <TextInput placeholder='Enter Goal'
                            style={[styles.shadowProp, styles.sleepInput, { width: '80%' }]}
                            value={waterGoal}
                            onChangeText={text => setWaterGoal(Number(text.replace(/[^0-9]/g, '')))}
                            keyboardType="numeric"
                            maxLength={5}
                        />
                    </View>
                    <Text style={styles.recommendationText}>{`\t  Recommended Water Goal: \n    Men: 3700mL \t   Women: 2700mL`}</Text>
                    <View style={{ transform: [{ translateY: -25 }] }}>
                        <LottieView
                            autoPlay loop
                            style={[styles.shadowProp, {
                                alignSelf: 'center',
                                width: 320,
                                height: 320,
                            }]}
                            source={require('./images/pagePics/waterTracker.json')}
                        />
                        <View>
                            <MotiView
                                animate={{
                                    scale: animated ? 1 : 0,
                                    opacity: animated ? 1 : 0,
                                    transform: [{ translateY: -20 }],
                                }}
                                transition={{ type: 'spring', duration: 600 }}>
                                <View style={{ alignSelf: 'center' }}>
                                    <TextInput placeholder='Litres'
                                        style={[styles.sleepInput, styles.shadowProp]}
                                        value={waterDrank}
                                        onChangeText={text => addWater(Number(text.replace(/[^0-9]/g, '')))}
                                        keyboardType="numeric"
                                        maxLength={5}
                                    />
                                </View>
                            </MotiView>
                            <Pressable
                                onPress={handleToggle}
                                style={[styles.shadowProp, styles.bigButton, {
                                    marginTop: -100
                                }]}
                            >
                                <Image source={require('./images/globalButtons/plus.png')} style={styles.buttonImage} />
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={{
                    flex: 2,
                    marginBottom: '15%',
                    flexBasis: 200,
                    flexGrow: 1,
                    flexShrink: 1
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.goalText, styles.shadowProp]}>Today's Stats</Text>
                        <View style={[styles.shadowProp, styles.goalContainer, {
                            top: '5%',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }]}>
                            <View>
                                <Text style={[styles.goalText, styles.bigNumber]}>{`${waterDrankForDisplay}`}</Text>
                                <Text style={[styles.goalText, { color: '#BCF4A6', fontSize: 20, textAlign: 'center', marginTop: -10 }]}>{`Millilitres${'\n'}Drank`}</Text>
                            </View>
                            <View>
                                <Text style={[styles.goalText, styles.bigNumber]}>{`${waterToGoForDisplay}`}</Text>
                                <Text style={[styles.goalText, { color: '#F1A7B0', fontSize: 20, textAlign: 'center', marginTop: -10 }]}>{`Millilitres${'\n'}Left`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.shadowProp, styles.buttonContainer, styles.submitButton, { transform: [{ translateY: -30 }]}]}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={validateInputs}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback >
    )
}

export default Water;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
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
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    goalInput: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        width: "40%"
    },
    waterInput: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        width: "40%"
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
    goalText: {
        fontFamily: 'Lemon-Milk',
        color: '#ffffff',
        fontSize: 25,
        marginTop: 20
    },
    shadowProp: {
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    submitButton: {
        marginTop: 60,
        alignSelf: 'center'
    },
    bigButton: {
        backgroundColor: '#FFFFFF',
        width: 50,
        height: 50,
        borderRadius: 40,
        alignSelf: 'center'
    },
    bigNumber: {
        textAlign: 'center',
        fontSize: 50,
        color: '#b5e8ff'
    },
    buttonImage: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
        alignSelf: 'center',
        top: '15%'
    },
    goalContainer: {
        width: '90%',
        height: 150,
        backgroundColor: '#F2FBFF',
        borderRadius: 25
    },
    recommendationText: {
        color: 'grey',
        fontWeight: '600',
        fontSize: 12,
        marginTop: 10,
        alignSelf: 'center'
    },
    sleepInput: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 10,
        width: "40%"
    },
});

