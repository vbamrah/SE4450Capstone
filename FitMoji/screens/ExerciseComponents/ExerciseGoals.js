import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ExerciseGoals() {
    return(
        <View style= {styles.goalSection}>
          <Text>Fitness Goals</Text>
          <Text>Workouts Per Week</Text>
          <Text>Workout Minutes</Text>
          <Text>Exercise Calories</Text>
        </View>
      )
}

const styles = StyleSheet.create({
    goalSection:{
        backgroundColor: "white",
        width: 411,
        height: 100,
      }
})