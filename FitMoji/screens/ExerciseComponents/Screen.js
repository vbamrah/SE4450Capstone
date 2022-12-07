import { StyleSheet, View, StatusBar } from 'react-native'
import React from 'react'

export default function Screen({children}) {
  return (
    <View style={styles.container}>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop: StatusBar.currentHeight,
        paddingHorizontal: 15
    }
})
