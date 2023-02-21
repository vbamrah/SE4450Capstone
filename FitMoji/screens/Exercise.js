import React, {useEffect, useState, useCallback, } from 'react'
import { get, getDatabase, ref, set, onValue } from "firebase/database";
import { View, TextInput, Text,  StyleSheet, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { auth } from '../firebase';
import { enGB, registerTranslation,} from 'react-native-paper-dates' 
registerTranslation('en-GB', enGB)
import Headers from './ExerciseComponents/Headers';

const Exercise = ({navigation}) => {

    let exerciseGoalForDisplay = getExerciseGoal();
    console.log(exerciseGoalForDisplay);
    let minutesExercisedDisplay = getMinsExercised();
    let exercisesToGoForDisplay = getExercisesToGo();
    
    const defaultValue = 0;
    const [exerciseGoal, setExerciseGoal] = useState(exerciseGoalForDisplay);
    const [minutesExercised, setMinutesExercised] = useState(minutesExercisedDisplay);
    const [exercisesToGo, setExercisesToGo] = useState(exercisesToGoForDisplay);
    const [date, setDate] = useState(new Date());
    
    

    const validateInputs = () => {
        writeUserData();
    }

    function addExercise(mins){
        var minsExercised = getMinsExercised();
        var goal = getExerciseGoal();
        var addMinutes = parseInt(mins) + minsExercised;
        var calsToGo = goal - addMinutes;
        setMinutesExercised(addMinutes);
        setExercisesToGo(calsToGo);
    }

    function getExerciseGoal(){
        let goal;
        const db = getDatabase();
        const exerciseGoal = ref(db, 'ExerciseInputs/' + auth.currentUser?.uid);
        onValue(exerciseGoal, (snapshot) => {
        var data = snapshot.val();
        if(data==null){
            goal = 0;
            console.log("Please input a value greater than 0");
            return goal;
        }
        else{
            goal = data.exerciseGoal;
            console.log("Exercise goal to be returned");
            console.log(data.exerciseGoal);
            return goal;
        }
        });
        return goal;
    }

        function getMinsExercised(){
            let minsExercised;
            const db = getDatabase();
            const minutesExercised = ref(db, 'ExerciseInputs/' + auth.currentUser?.uid);
            onValue(minutesExercised, (snapshot) => {
            var data = snapshot.val();
            if(data==null){
                minsExercised = 0;
                return minsExercised;
            }
            else{
                minsExercised = data.minutesExercised;
                return minsExercised;
            }
            });
            return minsExercised;
    }

    function getExercisesToGo(){
        var goal = getExerciseGoal();
        if(goal==NaN || goal==undefined){
            goal = 0;
        }
        var minsExercised = getMinsExercised();
        if(minsExercised==NaN || minsExercised==undefined){
            minsExercised = 0;
        }
        var calsToGo = goal - minsExercised;
        return calsToGo;
    }

    function writeUserData() {
        const db = getDatabase();
        set(ref(db, 'ExerciseInputs/' + auth.currentUser?.uid), {
            exerciseGoal: exerciseGoal,
            minutesExercised: minutesExercised,
            exercisesToGo: exercisesToGo,
            date: date
        })
        .catch(error => alert(error.message));
        navigation.replace('Exercise');
        global.lastActivity = "exercise";
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
                    marginBottom: 50,
                }}>Exercise Tracker</Text>
            <Headers/>
            <Text style={styles.goalText}>{`Exercise Goal`}</Text> 
            <Text style={styles.goalIndicator}>{exerciseGoalForDisplay}</Text> 
            <View>
                <TextInput placeholder='Enter Exercise Goal For Today'
                    style={styles.weightInput}
                    value= {exerciseGoal}
                    onChangeText={text => setExerciseGoal(text.replace(/[^0-9]/g, ''))} 
                    keyboardType="numeric"
                    maxLength={5}
                    />
              </View>
            <Text style={styles.goalText}>{`Total Minutes Exercised`}</Text>
            <Text style = {styles.goalIndicator}> {minutesExercisedDisplay} </Text>
            <Text style={styles.goalText}>{`Remaining Exercise Minutes`}</Text>
            <Text style = {styles.goalIndicator}> {exercisesToGoForDisplay} </Text>
              <Text style={styles.header}>Enter Minutes Exercised: </Text>
              <View>
                <TextInput placeholder='Enter Minutes Exercised'
                    style={styles.weightInput}
                    value= {minutesExercised}
                    onChangeText={text => addExercise(text.replace(/[^0-9]/g, ''))} 
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

export default Exercise;
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
        fontWeight: '600',
        fontSize: 25,
        marginTop: 10
    },
    goalIndicator: {
        color: 'red',
        fontWeight: '600',
        fontSize: 25,
        marginTop: 10
    }
});