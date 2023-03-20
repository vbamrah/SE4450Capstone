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
import { MotiView, MotiText } from 'moti';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';

import {
    enGB,
    registerTranslation,
} from 'react-native-paper-dates'
registerTranslation('en-GB', enGB)

const FoodIntake = ({ navigation }) => {

    let calorieGoalForDisplay = getCalGoalThatDisplaysCorrectly();
    let caloriesEatenForDisplay = getCalsEatenThatDisplaysCorrectly();
    let caloriesToGoForDisplay = getCalsToGo();
    let calorieRecommendationMale = getCalsRecommendationThatDisplaysCorrectlyMale();
    let calorieRecommendationFemale = getCalsRecommendationThatDisplaysCorrectlyFemale();
    
    //console.log(caloriesToGoForDisplay);

    const [animated, setAnimated] = useState(false);
    const handleToggle = () => {
        setAnimated(!animated);
    }

    const defaultValue = 0;
    const [calorieGoal, setCalorieGoal] = useState(calorieGoalForDisplay);
    const [caloriesEaten, setCaloriesEaten] = useState(caloriesEatenForDisplay);
    const [caloriesToGo, setCaloriesToGo] = useState(caloriesToGoForDisplay);
    const [date, setDate] = useState(new Date());



    const validateInputs = () => {
        writeUserData();
    }

    function addCalories(cals) {
        var calsEaten = getCalsEaten();
        var goal = getCalGoal();
        if(goal == undefined || goal == NaN || goal == null){
            goal = 0;
        }
        var addCals = parseInt(cals) + calsEaten;

        var calsToGo = goal - addCals;
        var tDate = getDateForDB();
        setCaloriesEaten(addCals);
        setCaloriesToGo(calsToGo);
        setDate(tDate);
    }

    function getCalGoal() {
        var goal;
        const db = getDatabase();
        const calorieGoal = ref(db, 'Goals/' + auth.currentUser?.uid);
        onValue(calorieGoal, (snapshot) => {
            var data = snapshot.val();
            if (data == null || data == undefined || data == NaN) {
                goal = 0;
            }
            else {
                goal = data.calorieGoal;
            }
        });
        return goal;
    }

    function getCalsEaten() {
        var calsEaten;
        const db = getDatabase();
        var dateForDB = getDateForDB();
        const caloriesEaten = ref(db, 'foodIntake/' + auth.currentUser?.uid + '/' + dateForDB);
        onValue(caloriesEaten, (snapshot) => {
            var data = snapshot.val();
            if (data == null) {
                calsEaten = 0;
            }
            else {
                calsEaten = data.caloriesEaten;
            }
        });

        global.progressToGoals[1] = calsEaten/getCalGoal();

        return calsEaten;
    }

    function getCalsToGo() {
        var goal = getCalGoal();
        if (goal == NaN || goal == undefined) {
            goal = 0;
        }
        var calsEaten = getCalsEaten();
        if (calsEaten == NaN || calsEaten == undefined) {
            calsEaten = 0;
        }
        var calsToGo = goal - calsEaten;

        if (calsToGo <= 0) {
            global.goalsCompleted[1] = 'complete';
        }
        else {
            global.goalsCompleted[1] = 'incomplete';
        }
        return calsToGo;
    }

    function getCalGoalThatDisplaysCorrectly() {
        var goal = getCalGoal();
        if (goal == NaN || goal == undefined) {
            goal = 0;
        }
        return goal;
    }

    function getCalsEatenThatDisplaysCorrectly() {
        var goal = getCalsEaten();
        if (goal == NaN || goal == undefined) {
            goal = 0;
        }
        return goal;
    }

    function getRecommendedCalorieGoalMale(){
        var hInFeet;
        var hInInches;
        var weight;
        var dob;
        var totalHeight;
        var calRecommendation;
        const db = getDatabase();
        const userData = ref(db, 'users/' + auth.currentUser?.uid);
        onValue(userData, (snapshot) => {
        var data = snapshot.val();

        hInFeet = Number(data.heightFeet);
        hInInches = Number(data.heightInches);   
        weight = data.weight;
        dob = data.dob;

        totalHeight = (hInFeet * 12) + hInInches;
        let dobYear = dob.slice(0,4);
        let currentYear = new Date().getFullYear();
        let age = currentYear - dobYear;

        let bmr = (4.536 * weight) + (15.88 * totalHeight) - (5 * age) + 5; 
        calRecommendation = Math.round(1.375 * bmr);
        });

        return calRecommendation;
    }

    function getRecommendedCalorieGoalFemale(){
        var hInFeet;
        var hInInches;
        var weight;
        var dob;
        var totalHeight;
        var calRecommendation;
        const db = getDatabase();
        const userData = ref(db, 'users/' + auth.currentUser?.uid);
        onValue(userData, (snapshot) => {
        var data = snapshot.val();

        hInFeet = Number(data.heightFeet);
        hInInches = Number(data.heightInches);   
        weight = data.weight;
        dob = data.dob;

        totalHeight = (hInFeet * 12) + hInInches;
        let dobYear = dob.slice(0,4);
        let currentYear = new Date().getFullYear();
        let age = currentYear - dobYear;

        let bmr = (4.536 * weight) + (15.88 * totalHeight) - (5 * age) - 161; 
        calRecommendation = Math.round(1.375 * bmr);
        });

        return calRecommendation;
    }


    function getCalsRecommendationThatDisplaysCorrectlyMale(){
        var calRec = getRecommendedCalorieGoalMale();
        return calRec;
    }

    function getCalsRecommendationThatDisplaysCorrectlyFemale(){
        var calRec = getRecommendedCalorieGoalFemale();
        return calRec;
    }

    function getDateForDB(){
        var day = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        let todaysDate = day + '-' + month + '-' + year;
        console.log(todaysDate);
        return todaysDate;

    }

    function writeUserData() {
        const db = getDatabase();
        var dateForDB = getDateForDB();
        set(ref(db, 'foodIntake/' + auth.currentUser?.uid + '/' + dateForDB), {
            caloriesEaten: caloriesEaten,
            caloriesToGo: caloriesToGo,
            date: date
        })
            .catch(error => alert(error.message));
        navigation.replace('Food Intake');
        global.lastActivity = "food";

        set(ref(db, 'Goals/' + auth.currentUser?.uid), {
            calorieGoal: calorieGoal,
        })
            .catch(error => alert(error.message));
        navigation.replace('Food Intake');
        global.lastActivity = "food";
    }

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
                    }]}>Food</Text>
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
                <View style={{ top: '0%' }}>
                    <Text style={[styles.goalText, styles.shadowProp, { marginTop: '-5%', color: 'white', alignSelf: 'center' }]}>Goal</Text>
                    <View style={{ alignSelf: 'center' }}>
                        <TextInput placeholder='Enter Goal'
                            style={[styles.shadowProp, styles.sleepInput, { width: '80%' }]}
                            value={calorieGoal}
                            onChangeText={text => setCalorieGoal(text.replace(/[^0-9]/g, ''))}
                            keyboardType="numeric"
                            maxLength={5}
                        />
                    </View>
                    <Text style={styles.recommendationText}>{`Recommended Calorie Goal: \nMen: ${calorieRecommendationMale} calories   Women: ${calorieRecommendationFemale} calories`}</Text>
                    <LottieView
                        autoPlay loop
                        style={[styles.shadowProp, {
                            top: '5%',
                            alignSelf: 'center',
                            width: 150,
                            height: 150,
                        }]}
                        source={require('./images/pagePics/foodTracker.json')}
                    />
                    <View style={{ alignSelf: 'center', justifyContent: 'center', marginTop: 10 }}>
                        <MotiView
                            animate={{
                                scale: animated ? 1 : 0,
                                opacity: animated ? 1 : 0,
                                transform: [{ translateY: 45 }],
                            }}
                            transition={{ type: 'spring', duration: 600 }}>
                            <View style={{ alignSelf: 'center' }}>
                                <TextInput placeholder='Calories'
                                    style={[styles.sleepInput, styles.shadowProp]}
                                    value={caloriesEaten}
                                    onChangeText={text => addCalories(text.replace(/[^0-9]/g, ''))}
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
                <View style={{ transform: [{translateY: 10}] }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.goalText, styles.shadowProp]}>Today's Stats</Text>
                        <View style={[styles.shadowProp, styles.goalContainer, {
                            justifyContent: 'center',
                            marginTop: '5%',
                        }]}>
                            <View style={[{ justifyContent: 'center', marginRight: '50%', marginTop: -20 }]}>
                                <Text style={[styles.goalText, styles.bigNumber]}>{`${caloriesEatenForDisplay}`}</Text>
                                <Text style={[styles.goalText, { color: '#BCF4A6', fontSize: 20, textAlign: 'center' }]}>{`Calories${'\n'}Eaten`}</Text>
                            </View>
                            <View style={[{ justifyContent: 'center', marginLeft: '50%', marginTop: -120 }]}>
                                <Text style={[styles.goalText, styles.bigNumber]}>{`${caloriesToGoForDisplay}`}</Text>
                                <Text style={[styles.goalText, { color: '#F1A7B0', fontSize: 20, textAlign: 'center' }]}>{`Calories${'\n'}Left`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.shadowProp, styles.buttonContainer, styles.submitButton, { transform: [{translateY: -40}]}]}>
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

export default FoodIntake;
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
    },
    shadowProp: {
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    submitButton: {
        marginTop: 70,
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
        alignSelf: 'center',
        textAlign: 'center'
        
    }
});

