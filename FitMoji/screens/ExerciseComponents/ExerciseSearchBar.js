import { StyleSheet, TextInput, View, SafeAreaView } from 'react-native'
import React from 'react'

export default function ExerciseSearchBar() {
    return(
        <View height = {100}> 
          <View style={styles.searchBar}>
            <TextInput placeholder='Search for an exercise here...'/>
          </View>
        </View>
      
      )
}

const styles = StyleSheet.create({
    searchBar:{
        width:350,
        height:30,
        backgroundColor: 'white',
        borderRadius: 8,
        justifyContent: 'center',
        
      }
})