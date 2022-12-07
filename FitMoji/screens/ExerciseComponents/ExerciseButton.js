import { StyleSheet, Text, View, Button, SafeAreaView, Alert } from 'react-native'
import React from 'react'

export default function ExerciseButton() {
    return(
        <SafeAreaView> 
        <Button color = 'red' style = {styles.exerciseButton} title = "Create Exercise" 
        onPress={()=> Alert.alert("Add new exercise", "Add Exercises:", [
            {text: "Add"},
            {text: "Cancel"}
        ])} />
        </SafeAreaView>  
      )
}

const styles = StyleSheet.create({
    exerciseButton:{
        height: 100
      }
})