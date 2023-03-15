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

    var waterGoalForDisplay = 0;
    var waterDrankForDisplay = 0;
    var waterToGoForDisplay = 0;

    getWaterGoal();
    getWaterDrank();
    getWaterToGo();

    const [animated, setAnimated] = useState(false);
    const handleToggle = () => {
        setAnimated(!animated);
    }

    const [waterGoal, setWaterGoal] = useState(waterGoalForDisplay);
    const [waterDrank, setWaterDrank] = useState(waterDrankForDisplay);
    const [waterToGo, setWaterToGo] = useState(waterToGoForDisplay);
    const [date, setDate] = useState(new Date());


    const validateInputs = () => {
        writeUserData();
    }

    function addWater(wat) {
        waterDrankForDisplay += wat;
        waterToGoForDisplay -= wat;

        setWaterDrank(waterDrankForDisplay);
        setWaterToGo(waterToGoForDisplay);

    }

    function getWaterGoal() {
        const db = getDatabase();
        const waterGoal = ref(db, 'Water/' + auth.currentUser?.uid + '/Goals');
        onValue(waterGoal, (snapshot) => {
            const data = snapshot.val();
            if (data == null) {
                console.log('no data');
            }
            else {
                updateWaterGoal(data);
                console.log("Water Goal: " + data);
            }
        });
    }

    function updateWaterGoal(data) {
        waterGoalForDisplay = data;
    }

    function getWaterDrank() {
        const db = getDatabase();
        const waterDrank = ref(db, 'Water/' + auth.currentUser?.uid + '/waterDrank');
        onValue(waterDrank, (snapshot) => {
            const data = snapshot.val();
            if (data == null) {
                console.log('no data');
            }
            else {
                updateWaterDrank(data);
                console.log("Water Drank: " + data);
            }
        });
    }

    function updateWaterDrank(data) {
        waterDrankForDisplay = data;
    }

    function getWaterToGo() {
        const db = getDatabase();
        const waterToGo = ref(db, 'Water/' + auth.currentUser?.uid);
        onValue(waterToGo, (snapshot) => {
            const data = snapshot.val();
            if (data == null) {
                console.log('no data');
            }
            else {
                updateWaterToGo(data.waterGoal - data.waterDrank);
                console.log("Water To Go: " + (data.waterGoal - data.waterDrank));
            }
        });

        if (waterToGo <= 0) {
            global.goalsCompleted[2] = 'complete';
        }
        else {
            global.goalsCompleted[2] = 'incomplete';
        }
    }

    function updateWaterToGo(data) {
        waterToGoForDisplay = data;
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
    
     function getDateForDB(){
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        let todaysDate = day + '-' + month + '-' + year;
        return todaysDate;

    }
    
     set(ref(db, 'Goals/' + auth.currentUser?.uid), {
        waterGoal: waterGoal,
    })
        .catch(error => alert(error.message));
    navigation.replace('Water');
    global.lastActivity = "water";
    
    

    global.progressToGoals[2] = waterDrankForDisplay / waterGoalForDisplay;
    console.log(global.progressToGoals[2]);

    const locale = 'en-GB'
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
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
                        fontSize: 60,
                    }]}>Water</Text>
                    <View style={[styles.shadowProp, {
                        marginRight: '75%',
                    }]}>
                        <Pressable
                            onPress={() => navigation.navigate('Home')}
                            style={[styles.navButtons, { backgroundColor: 'transparent' }]}>
                            <Image source={require('./images/globalButtons/home.png')} style={{ marginTop: '-150%', tintColor: 'white', width: '70%', height: '70%', resizeMode: 'contain', alignSelf: 'center', top: '15%' }} />
                        </Pressable>
                    </View>
                </View>
                <View style={{ top: '2%' }}>
                    <Text style={[styles.goalText, styles.shadowProp, { marginTop: '-5%', color: 'white', alignSelf: 'center' }]}>Goal</Text>
                    <View style={{ alignSelf: 'center' }}>
                        <TextInput placeholder={`${waterGoalForDisplay}`}
                            style={[styles.shadowProp, styles.sleepInput, { width: '80%' }]}
                            value={waterGoal}
                            onChangeText={text => setWaterGoal(Number(text.replace(/[^0-9]/g, '')))}
                            keyboardType="numeric"
                            maxLength={2}
                        />
                    </View>
                    <Text style={styles.recommendationText}>{`Recommended Water Goal: \nMen: 3.7L \t Women: 2.7L`}</Text>
                    <LottieView
                        autoPlay loop
                        style={[styles.shadowProp, {
                            alignSelf: 'center',
                            width: 200,
                            height: 200,
                        }]}
                        source={require('./images/pagePics/waterTracker.json')}
                    />
                    <View style={{ alignSelf: 'center', justifyContent: 'center', marginTop: -45 }}>
                        <MotiView
                            animate={{
                                scale: animated ? 1 : 0,
                                opacity: animated ? 1 : 0,
                                transform: [{ translateY: 45 }],
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
                                marginTop: -57,
                            }]}
                        >
                            <Image source={require('./images/globalButtons/plus.png')} style={styles.buttonImage} />
                        </Pressable>
                    </View>
                </View>
                <View style={{ transform: [{ translateY: 10 }] }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.goalText, styles.shadowProp]}>Today's Stats</Text>
                        <View style={[styles.shadowProp, styles.goalContainer, {
                            marginTop: '5%',
                        }]}>
                            <View style={[{ marginRight: '50%', marginTop: '-7%' }]}>
                                <Text style={[styles.goalText, styles.bigNumber]}>{`${waterDrankForDisplay}`}</Text>
                                <Text style={[styles.goalText, { color: '#BCF4A6', fontSize: 20, marginTop: -10, textAlign: 'center' }]}>{`Litres${'\n'}Drank`}</Text>
                            </View>
                            <View style={[{ marginLeft: '50%', marginTop: -163 }]}>
                                <Text style={[styles.goalText, styles.bigNumber]}>{`${waterToGoForDisplay}`}</Text>
                                <Text style={[styles.goalText, { color: '#F1A7B0', fontSize: 20, textAlign: 'center', marginTop: -10 }]}>{`Litres${'\n'}Left`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.shadowProp, styles.buttonContainer, styles.submitButton, { transform: [{ translateY: -40 }] }]}>
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
    sleepInput: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 12,
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
        fontSize: 75,
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
});

