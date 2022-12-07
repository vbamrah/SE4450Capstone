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
  import {useNavigation } from '@react-navigation/navitive'
  import React, {useEffect, useState, useCallback,} from 'react'
  import { get, getDatabase, ref, set, onValue} from "firebase/database"
  import { useFonts} from 'expo-font';
  import { auth} from '../firebase/database';
  import { database} from '../firebase';
  import {
    enGB,
    registerTranslation,
  } from 'react-native-paper-dates' 
registerTranslation('en-GB', enGB)

  
  
  
  const WaterDrank = ({navigation}) => {
      const [waterAmount, setWaterAmount] = useState('');
      let waterGoal = getWaterGoal();
      let waterConsumed = getWaterConsumed;
      let waterLeft = getWaterLeft;
      let date = getDate;
      return waterConsumed;

      function getWaterConsumed() {
        var waterGoal = getWaterGoal();
        if (waterGoal==undefined) {
            goal=0;
        }

        var waterConsumed =getWaterConsumed();
        if (waterConsumed==undefined) {
            goal=0;
        }

        var waterLeft = goal -waterConsumed;

        return waterLeft;
      }
     
     
  
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
            waterGoal:waterGoal,
            waterConsumed: waterConsumed,
            waterLeft: waterLeft, 
            date:date
          
          })
          .catch(error => alert(error.message));
          navigation.replace("WaterDrank");
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
                  }}>Water Intake Tracker</Text>
              <Text style={styles.header}>Add Goal</Text>
              <TextInput placeholder='Litres'
              value= {waterGoal}
              onChangeText={text => setWaterGoal(text)}
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
          <Text style={styles.goalText}>{'Water Drank Today: ${waterConsumed}}'}</Text>
          <Text style={styles.goalText}>{'Water Left to Drink: ${waterLeft}}'}</Text>
          <Text style={styles.header}>Add Water:</Text>

          <View style={styles.buttonContainer}>

          <TextInput placeholder='Add a Water Goal' 
            value={waterGoal}
            onChangeText={text => setWaterGoal}
          />
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
  
  export default WaterDrank;
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
