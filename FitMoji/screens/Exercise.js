import React, { useEffect, useState, useCallback } from 'react'
import { get, getDatabase, ref, set, onValue } from "firebase/database";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Image
} from 'react-native'
import { auth } from '../firebase';
import { enGB, registerTranslation } from 'react-native-paper-dates'
import Headers from './ExerciseComponents/Headers';
import { LinearGradient } from 'expo-linear-gradient';
// import {ProgressView} from "@react-native-community/progress-view";
// import { requireNativeComponent } from 'react-native';
import { VictoryPie } from 'victory-native';
import { Center } from '@react-three/drei';
import LottieView from 'lottie-react-native';
import { min } from 'lodash';

// Registering translation for paper-dates
registerTranslation('en-GB', enGB)

const Exercise = ({ navigation }) => {

  let exerciseGoalForDisplay = getExerciseGoal();

  let exerciseForDisplay = getMinsExercised();

  let exerciseToGoForDisplay = getExerciseToGo();

  var minsCounter = 0;

  const [exerciseGoal, setExerciseGoal] = useState(exerciseGoalForDisplay);
  const [minutesExercised, setMinutesExercised] = useState(exerciseForDisplay);
  const [exercisesToGo, setExercisesToGo] = useState(exerciseToGoForDisplay);
  const [date, setDate] = useState(new Date());
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);

  /*
  const fetchExerciseData = () => {
    const db = getDatabase();
    const exerciseInputsRef = ref(db, `ExerciseInputs/${auth.currentUser?.uid}`);
    onValue(exerciseInputsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setExerciseGoal(data.exerciseGoal || 0);
      setMinutesExercised(data.minutesExercised || 0);
      setDate(data.date ? new Date(data.date) : new Date());
    });
  };
  

  useEffect(() => {
    fetchExerciseData();
  }, []);
  

  useEffect(() => {
    const achievedPercentage = (minutesExercised / exerciseGoal) * 100;
    const remainingPercentage = 100 - achievedPercentage;
    setData([
      { x: 'Achieved', y: achievedPercentage },
      { x: 'Remaining', y: remainingPercentage },
    ]);
  }, [exerciseGoal, minutesExercised, date]);

  useEffect(() => {
    getExerciseGoal();
    getMinsExercised();
  }, []);

  useEffect(() => {
    const percentage = (parseInt(minutesExercised) / parseInt(exerciseGoal)) * 100;
    setProgress(isNaN(percentage) ? 0 : percentage);
  }, [exerciseGoal, minutesExercised]);
*/

  const validateInputs = () => {
    writeUserData();
  }

  function countMin(mins) {
    setCounter(counter + mins);
  }

  function addExercise(mins) {
    countMin(mins);
    var minsExercised = getMinsExercised();
    var goal = getExerciseGoal();
    var addExercise = parseInt(mins) + minsExercised;
    var exercisesToGo = goal - addExercise;
    setExercisesToGo(exercisesToGo);
  }

  function getExerciseGoal() {
    let goal;
    const db = getDatabase();
    const exerciseGoalRef = ref(db, 'ExerciseInputs/' + auth.currentUser?.uid);
    onValue(exerciseGoalRef, (snapshot) => {
      var data = snapshot.val();
      if (data == null) {
        goal = 0;
        return goal;

      }
      else {
        goal = data.exerciseGoal;
        return goal;

      }
    });
    return goal;
  }

  function getMinsExercised() {
    let minsExercised = 0;
    const db = getDatabase();
    const minutesExercised = ref(db, 'ExerciseInputs/' + auth.currentUser?.uid);
    onValue(minutesExercised, (snapshot) => {
      var data = snapshot.val();
      if (data == null) {
        minsExercised = 0;
        return minsExercised;
      }
      else {
        minsExercised = data.minutesExercised;
        return minsExercised;
      }
    });

    global.progressToGoals[0] = minsExercised/getExerciseGoal();

    return minsExercised;
  }

  function getExerciseToGo() {
    var goal = getExerciseGoal();
    if (goal == NaN || goal == undefined) {
      goal = 0;
    }
    var minsExercised = getMinsExercised();
    if (minsExercised == NaN || minsExercised == undefined) {
      minsExercised = 0;
    }
    var exerciseToGo = goal - minsExercised;

    if (exerciseToGo <= 0) {
      global.goalsCompleted[0] = 'complete';
    }
    else {
      global.goalsCompleted[0] = 'incomplete';
    }

    return exerciseToGo;
  }
  function getAge(){
    var dob;
    var age;
    const db = getDatabase();
    const userData = ref(db, 'users/' + auth.currentUser?.uid);
    onValue(userData, (snapshot) => {
    var data = snapshot.val();

    dob = data.dob;

    let dobYear = dob.slice(0,4);
    let currentYear = new Date().getFullYear();
    age = currentYear - dobYear;
    });
    return age;

}

function getRecommendedExerciseGoal() {
    var goal;
    var age = getAge();
    if (6 <= age <= 17) {
        goal = '60 min/day'
        return goal;
    }
    if (18 <= age <= 64) {
        goal = '150 min/week'
        return goal;
    }
    else if (age >= 65) {
        goal = '150 min/week'
        return goal;
    }
    else return null;
}

  const writeUserData = () => {
    const db = getDatabase();
    set(ref(db, 'ExerciseInputs/' + auth.currentUser?.uid), {
      exerciseGoal: exerciseGoal,
      minutesExercised: minutesExercised + counter,
      exercisesToGo: exercisesToGo,
      date: date
    })
      .catch(error => alert(error.message));
    navigation.replace('Exercise');
    global.lastActivity = "exercise";
  }

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
          top: '5%',
          flex: 0.2
        }}>
          <Text style={[styles.shadowProp, {
            fontFamily: 'Lemon-Milk',
            textAlign: 'center',
            color: '#ffffff',
            fontSize: 60,
          }]}>Fitness</Text>
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
        <View style={{flex: 0.8, top: '2%'}}>
          <View style={{ zIndex: 4, alignItems: 'center' }}>
            <Text style={styles.goalText}>Goal</Text>
            <View style={{ alignSelf: 'center' }}>
              <TextInput
                placeholder='Enter Goal'
                style={[styles.fitInput, styles.shadowProp]}
                value={exerciseGoal}
                onChangeText={text => setExerciseGoal(text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>
            <TextInput
              placeholder='Enter Exercise Goal For Today'
              style={styles.input}
              value={exerciseGoal.toString()}
              onChangeText={text => setExerciseGoal(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              maxLength={5}
            />
            <Text style={styles.recommendationText}>{`Recommended Exercise Goal for ${getAge()} year olds: ${getRecommendedExerciseGoal()}`}</Text>
            <View style={styles.goalContainer}>
              <Text style={styles.goalText}>Minutes Exercised</Text>
              <Text style={styles.goalIndicator}>{minutesExercised}</Text>
          </View>
          <LottieView
            autoPlay loop
            style={[styles.shadowProp, {
              marginTop: -15,
              alignSelf: 'center',
              width: 200,
              height: 200,
            }]}
            source={require('./images/pagePics/exerciseTracker.json')}
          />
          <View style={{
            alignItems: 'center',
            marginTop: -80
          }}>
            <Text style={[styles.goalText, styles.shadowProp]}>Add Minutes</Text>
            <Text style={[styles.goalText, styles.shadowProp, { fontSize: 60, marginTop: -10 }]}>{`${counter}`}</Text>
            <View style={{
              alignItems: 'center',
              alignSelf: 'center',
              flexDirection: 'row'
            }}>
              <TouchableOpacity
                style={[styles.button, styles.shadowProp, { marginTop: 10, marginRight: 10, width: '25%' }]}
                onPress={() => { addExercise(5); countMin(5); }}
              >
                <Text style={[styles.buttonText, { fontSize: 16 }]}>+5 Min</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.shadowProp, { marginTop: 10, marginRight: 10, width: '25%' }]}
                onPress={() => addExercise(10)}
              >
                <Text style={[styles.buttonText, { fontSize: 16 }]}>+10 Min</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.shadowProp, { marginTop: 10, width: '25%' }]}
                onPress={() => addExercise(15)}
              >
                <Text style={[styles.buttonText, { fontSize: 16 }]}>+15 Min</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ transform: [{translateY: 25}] }}>
          <View style={[styles.goalContainer, styles.shadowProp, { marginTop: 40, alignItems: 'center', alignSelf: 'center' }]}>
            <Text style={[styles.goalText, { color: '#BCF4A6', marginTop: 2 }]}>Minutes Exercised</Text>
            <Text style={[styles.goalText, { fontSize: 60, marginTop: -10, color: '#b5e8ff' }]}>{`${exerciseForDisplay}`}</Text>
          </View>
          <View style={[styles.goalContainer, styles.shadowProp, { marginTop: 10, alignItems: 'center', alignSelf: 'center' }]}>
            <Text style={[styles.goalText, { color: '#F1A7B0', marginTop: 2 }]}>Minutes To Go</Text>
            <Text style={[styles.goalText, { fontSize: 60, marginTop: -10, color: '#b5e8ff' }]}>{`${exerciseToGoForDisplay}`}</Text>
          </View>
          <View style={[styles.shadowProp, styles.buttonContainer, styles.submitButton, { transform: [{translateY: -60}]}]}>
            <TouchableOpacity
              style={styles.button}
              onPress={validateInputs}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*<View style={styles.chartContainer}>
          <VictoryPie
            data={data}
            colorScale={['#FFFFFF', '#2196F3']}
            innerRadius={95}
            labelRadius={31}
            style={{
              labels: { fill: 'black', fontSize: 12, fontWeight: 'bold' },
            }}
            width={200}
            height={200}
          />
        </View>
        {/* <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Progress: {progress.toFixed(0)}%</Text>
                <ProgressView
                isIndeterminate={false}
                progress={progress / 100}
                progressTintColor="orange"
                trackTintColor="blue"
                />
        </View> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  navButtons: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center'
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
  },
  goalText: {
    fontFamily: 'Lemon-Milk',
    color: '#ffffff',
    fontSize: 25,
    marginTop: 20
  },
  goalIndicator: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
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
    },
    // progressContainer: {
    //     width: '100%',
    //     marginBottom: 20,
    //     alignItems: 'center',
    //     },
    //     progressText: {
    //     color: '#fff',
    //     fontSize: 20,
    //     marginBottom: 10,
    //     },
    chartContainer: {
        marginTop: 10,
        alignItems: 'center',
        padding: 50,
        position: 'relative',
        top:-58,
        marginRight: 20
        },
    buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    },
    recommendationText: {
      color: 'grey',
      fontWeight: '600',
      fontSize: 12,
      marginTop: 10,
      alignSelf: 'center'
  },
  buttonText: {
    fontFamily: 'Lemon-Milk',
    color: '#b5e8ff',
    fontSize: 30
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
  // progressContainer: {
  //     width: '100%',
  //     marginBottom: 20,
  //     alignItems: 'center',
  //     },
  //     progressText: {
  //     color: '#fff',
  //     fontSize: 20,
  //     marginBottom: 10,
  //     },
  chartContainer: {
    marginTop: 10,
    alignItems: 'center',
    padding: 50,
    position: 'relative',
    top: -58,
    marginRight: 20
  },
  fitInput: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    width: "40%"
  },
  goalContainer: {
    width: '80%',
    height: 100,
    backgroundColor: '#F2FBFF',
    borderRadius: 25
  },
});

export default Exercise;
