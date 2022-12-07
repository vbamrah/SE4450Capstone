import React, {useCallback, useState, createRef} from 'react'
import { useFonts } from 'expo-font';
import {
  View,
  Pressable,
  StyleSheet,
  Text
} from 'react-native'

export default function Welcome({ navigation }) {
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
      <View style={styles.container}>
        <View  style={{flex: 1, justifyContent: 'center'}}>
            <Text style = {{
                    textShadowColor: '#000000',
                    textShadowRadius: '10',
                    fontFamily: 'Lemon-Milk',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontSize: 50,
                }}>Welcome to Fitmoji!</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Pressable
            style={styles.login}
            onPress={() => {
                navigation.navigate("Login");
            }}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  login: {
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
  buttonContainer: {
    flex: 1,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
}
})