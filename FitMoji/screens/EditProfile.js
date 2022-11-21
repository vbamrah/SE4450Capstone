import React from 'react'
import { useEffect, useCallback } from 'react';
import { View, Text, Button } from "react-native"
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const EditProfile = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'Lemon-Milk': require('./fonts/LEMONMILK-Regular.otf'),
    });
    
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    
    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style = {{flex : 1, justifyContent : 'flex-start', marginTop: 50}}>
           <Text style={{
                textShadowColor: '#000000',
                textShadowRadius: '10',
                fontFamily: 'Lemon-Milk',
                textAlign: 'center',
                color: '#FFFFFF',
                fontSize: 50,
            }}>Edit Profile</Text>
            <Button 
                onPress = {() => navigation.navigate('Home')}
                title = 'Return'
            />
        </View>
    )
}

export default EditProfile