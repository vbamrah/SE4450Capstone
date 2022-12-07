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


const Water = ({navigation}) => {
    const [waterAmount, setWaterAmount] = useState('');
    let waterGoalForDisplay = getWaterGoal();
   
    let waterDrankForDisplay = getWaterDrank();
 
    let waterToGoForDisplay = getWaterToGo();
   
    const defaultValue = 0;
    const [waterGoal, setWaterGoal] = useState(waterGoalForDisplay);
    const [waterDrank, setWaterDrank] = useState(waterDrankForDisplay);
    const [waterToGo, setWaterToGo] = useState(waterToGoForDisplay);
    const [date, setDate] = useState(new Date());
   

    const validateInputs = () => {
        if (waterAmount== '' ) {
            alert('Invalid input');
        }
        else {
            writeUserData();
        }
    }

    function addWater(wat){
        var watDrank = getWaterDrank();
        var goal = getWaterGoal();
        var addWater = parseInt(wat) + watDrank;
        var waterToGo = goal - addWater;
        setWaterDrank(addWater);
        setWaterToGo(waterToGo);
    }

    function getWaterGoal(){
        let goal;
        const db = getDatabase();
        const waterGoal = ref(db, 'Water/' + auth.currentUser?.uid);
        onValue(waterGoal, (snapshot) => {
        var data = snapshot.val();
        if(data==null){
            goal = 0;
            console.log("should return 0");
            return goal;
            
        }
        else{
            goal = data.waterGoal;
            console.log("should return goal");
            console.log(data.waterGoal);
            return goal;
           
        }
        });
        return goal;
    }

    function getWaterDrank(){
        let watDrank;
        const db = getDatabase();
        const waterDrank = ref(db, 'Water/' + auth.currentUser?.uid);
        onValue(waterDrank, (snapshot) => {
        var data = snapshot.val();
        if(data==null){
            watDrank = 0;
            return watDrank;
        }
        else{
            watDrank = data.waterDrank;
            return watDrank;
        }
        });
       
        return watDrank;
}


function getWaterToGo(){
    var goal = getWaterGoal();
    if(goal==NaN || goal==undefined){
        goal = 0;
    }
    var watDrank = getWaterDrank();
    if(watDrank==NaN || watDrank==undefined){
        watDrank = 0;
    }
    var waterToGo = goal - watDrank;
    
    return waterToGo;
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
            <Text style={styles.goalText}>{`Goal: ${waterGoalForDisplay}`}</Text>
            <View>
                <TextInput placeholder='Enter Goal'
                    style={styles.weightInput}
                    value= {waterGoal}
                    onChangeText={text => setWaterGoal(text.replace(/[^0-400]/g, ''))} 
                    keyboardType="numeric"
                    maxLength={5}
                    />
              </View>
            <Text style={styles.goalText}>{`Water Drank Today: ${waterDrankForDisplay}`}</Text>
            <Text style={styles.goalText}>{`Water Left Today: ${waterToGoForDisplay}`}</Text>
              <Text style={styles.header}>Add Water: </Text>
              <View>
                <TextInput placeholder='Litres'
                    style={styles.weightInput}
                    value= {waterDrank}
                    onChangeText={text => addWater(text.replace(/[^0-9]/g, ''))} 
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

