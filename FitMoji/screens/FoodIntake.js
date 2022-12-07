import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState, useCallback, } from 'react'
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
  Keyboard
} from 'react-native'
import { auth } from '../firebase';
import { database } from '../firebase';

import {
    enGB,
    registerTranslation,
  } from 'react-native-paper-dates' 
registerTranslation('en-GB', enGB)

const FoodIntake = ({navigation}) => {

    let calorieGoalForDisplay = getCalGoal();
    console.log(calorieGoalForDisplay);
    let caloriesEatenForDisplay = getCalsEaten();
    //console.log(caloriesEatenForDisplay);
    let caloriesToGoForDisplay = getCalsToGo();
    //console.log(caloriesToGoForDisplay);
    
    const defaultValue = 0;
    const [calorieGoal, setCalorieGoal] = useState(calorieGoalForDisplay);
    const [caloriesEaten, setCaloriesEaten] = useState(caloriesEatenForDisplay);
    const [caloriesToGo, setCaloriesToGo] = useState(caloriesToGoForDisplay);
    const [date, setDate] = useState(new Date());
    
    

    const validateInputs = () => {
        writeUserData();
    }

    function addCalories(cals){
        var calsEaten = getCalsEaten();
        var goal = getCalGoal();
        var addCals = parseInt(cals) + calsEaten;
        var calsToGo = goal - addCals;
        setCaloriesEaten(addCals);
        setCaloriesToGo(calsToGo);
    }

    function getCalGoal(){
        let goal;
        const db = getDatabase();
        const calorieGoal = ref(db, 'foodIntake/' + auth.currentUser?.uid);
        onValue(calorieGoal, (snapshot) => {
        var data = snapshot.val();
        if(data==null){
            goal = 0;
            console.log("should return 0");
            return goal;
            //setCalorieGoal(0);
        }
        else{
            goal = data.calorieGoal;
            console.log("should return goal");
            console.log(data.calorieGoal);
            return goal;
           // console.log(goal);
        }
        });
        //setCalorieGoal(goal);
        return goal;
    }

        function getCalsEaten(){
            let calsEaten;
            const db = getDatabase();
            const caloriesEaten = ref(db, 'foodIntake/' + auth.currentUser?.uid);
            onValue(caloriesEaten, (snapshot) => {
            var data = snapshot.val();
            if(data==null){
                calsEaten = 0;
                return calsEaten;
            }
            else{
                calsEaten = data.caloriesEaten;
                return calsEaten;
            }
            });
            //setCaloriesEaten(calsEaten);
            return calsEaten;
    }

    function getCalsToGo(){
        var goal = getCalGoal();
        if(goal==NaN || goal==undefined){
            goal = 0;
        }
        var calsEaten = getCalsEaten();
        if(calsEaten==NaN || calsEaten==undefined){
            calsEaten = 0;
        }
        var calsToGo = goal - calsEaten;
        //console.log(calsToGo);
        return calsToGo;
    }

    function writeUserData() {
        const db = getDatabase();
        set(ref(db, 'foodIntake/' + auth.currentUser?.uid), {
            calorieGoal: calorieGoal,
            caloriesEaten: caloriesEaten,
            caloriesToGo: caloriesToGo,
            date: date
        })
        .catch(error => alert(error.message));
        navigation.replace('Food Intake');
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
                    fontSize: 40,
                    marginBottom: 100,
                }}>Food Intake Tracker</Text>
            <Text style={styles.goalText}>{`Goal: ${calorieGoalForDisplay}`}</Text>
            <View>
                <TextInput placeholder='Enter or Update Goal'
                    style={styles.weightInput}
                    value= {calorieGoal}
                    onChangeText={text => setCalorieGoal(text.replace(/[^0-9]/g, ''))} 
                    keyboardType="numeric"
                    maxLength={5}
                    />
              </View>
            <Text style={styles.goalText}>{`Calories Consumed Today: ${caloriesEatenForDisplay}`}</Text>
            <Text style={styles.goalText}>{`Calories To Go: ${caloriesToGoForDisplay}`}</Text>
              <Text style={styles.header}>Add Calories: </Text>
              <View>
                <TextInput placeholder='Enter Calories'
                    style={styles.weightInput}
                    value= {caloriesEaten}
                    onChangeText={text => addCalories(text.replace(/[^0-9]/g, ''))} 
                    keyboardType="numeric"
                    maxLength={5}
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

export default FoodIntake;
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
    },
    goalText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 25,
        marginTop: 10
    }
});