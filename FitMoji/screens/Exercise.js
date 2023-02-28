import React, { useEffect, useState, useCallback } from 'react'
import { get, getDatabase, ref, set, onValue } from "firebase/database";
import { View, TextInput, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { auth } from '../firebase';
import { enGB, registerTranslation } from 'react-native-paper-dates' 
import Headers from './ExerciseComponents/Headers';
import { LinearGradient } from 'expo-linear-gradient';
// import {ProgressView} from "@react-native-community/progress-view";
// import { requireNativeComponent } from 'react-native';
import { VictoryPie } from 'victory-native';

// Registering translation for paper-dates
registerTranslation('en-GB', enGB)

const Exercise = ({navigation}) => {

  const [exerciseGoal, setExerciseGoal] = useState("");
  const [minutesExercised, setMinutesExercised] = useState("");
  const [exercisesToGo, setExercisesToGo] = useState(0);
  const [date, setDate] = useState(new Date());
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState([]);

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

  const validateInputs = () => {
    writeUserData();
  }

  const addExercise = (mins) => {
    const minsExercised = parseInt(minutesExercised) + parseInt(mins);
    const calsToGo = parseInt(exerciseGoal) - minsExercised;
    setMinutesExercised(minsExercised);
    setExercisesToGo(calsToGo < 0 ? 0 : calsToGo);
  }

  const getExerciseGoal = () => {
    const db = getDatabase();
    const exerciseGoalRef = ref(db, 'ExerciseInputs/' + auth.currentUser?.uid + '/exerciseGoal');
    onValue(exerciseGoalRef, (snapshot) => {
      const goal = snapshot.val();
      setExerciseGoal(goal || "");
    });
  }

  const getMinsExercised = () => {
    const db = getDatabase();
    const minutesExercisedRef = ref(db, 'ExerciseInputs/' + auth.currentUser?.uid + '/minutesExercised');
    onValue(minutesExercisedRef, (snapshot) => {
      const minsExercised = snapshot.val();
      setMinutesExercised(minsExercised || "");
      setExercisesToGo(parseInt(exerciseGoal) - parseInt(minsExercised));
    });
  }

  const writeUserData = () => {
    const db = getDatabase();
    set(ref(db, 'ExerciseInputs/' + auth.currentUser?.uid), {
        exerciseGoal: isNaN(parseInt(exerciseGoal)) ? 0 : parseInt(exerciseGoal),
        minutesExercised: isNaN(parseInt(minutesExercised)) ? 0 : parseInt(minutesExercised),
        exercisesToGo: isNaN(parseInt(exercisesToGo)) ? 0 : parseInt(exercisesToGo),
        date: date
    })
    .catch(error => alert(error.message));
    navigation.replace('Exercise');
    global.lastActivity = "exercise";
  }
  

  return (
    <LinearGradient
      colors={['#ffffff', '#b5e8ff']}
      style={styles.gradient}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Exercise Tracker</Text>
            <Headers />
            <View style={styles.goalContainer}>
              <Text style={styles.goalText}>Exercise Goal</Text>
              <Text style={styles.goalIndicator}>{exerciseGoal}</Text>
            </View>
            <TextInput
              placeholder='Enter Exercise Goal For Today'
              style={styles.input}
              value={exerciseGoal.toString()}
              onChangeText={text => setExerciseGoal(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              maxLength={5}
            />
            <View style={styles.goalContainer}>
              <Text style={styles.goalText}>Minutes Exercised</Text>
              <Text style={styles.goalIndicator}>{minutesExercised}</Text>
            </View>
            <TextInput
              placeholder='Enter Minutes Exercised Today'
              style={styles.input}
              value={minutesExercised.toString()}
              onChangeText={text => setMinutesExercised(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              maxLength={5}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => addExercise(5)}
            >
              <Text style={styles.buttonText}>+5 Minutes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => addExercise(10)}
            >
              <Text style={styles.buttonText}>+10 Minutes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => addExercise(15)}
            >
              <Text style={styles.buttonText}>+15 Minutes</Text>
            </TouchableOpacity>
            <View style={styles.goalContainer}>
              <Text style={styles.goalText}>Exercises To Go</Text>
              <Text style={styles.goalIndicator}>{exercisesToGo}</Text>
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={validateInputs}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chartContainer}>
                <VictoryPie
                data={data}
                colorScale={['#FFFFFF', '#2196F3']}
                innerRadius={95}
                labelRadius={31}
                style={{
                labels: { fill: 'black', fontSize: 12, fontWeight: 'bold' },
                }}
                width ={200}
                height = {200}
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
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      container: {
        flex: 1,
        width: '90%',
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
    goalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    },
    goalText: {
    fontSize: 16,
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
    button: {
    backgroundColor: '#4da6ff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    },
    submitButton: {
    backgroundColor: '#b5e8ff',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
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
});

export default Exercise;
