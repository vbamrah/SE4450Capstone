import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Excersie(){
    return(
            <View> style={StyleSheet.container} 
                <Text>Exercise Log</Text>
            </View>


    )
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:'#fff',
        alignItem: 'center',
        justifyContent: "center",
    },

})