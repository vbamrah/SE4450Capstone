import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

export default function Header() {
    return(
        <View>
            <Text> Exercises</Text>
            <Text> History </Text>
        </View>
      )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
      }
})