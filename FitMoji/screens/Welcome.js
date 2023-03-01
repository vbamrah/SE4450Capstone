import React, { useCallback, useState, createRef } from 'react'
import { useFonts } from 'expo-font';
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  Image
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

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
      <LinearGradient colors={['#b5e8ff', '#ffffff']} style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      }}>
        <Image source={require('./images/logo/yoga-position.png')} style={[styles.shadowProp, { tintColor: 'white', width: '20%', height: '20%', resizeMode: 'contain', alignSelf: 'center', top: '30%'}]} />
        <View style={[styles.shadowProp, 
          {backgroundColor: 'white', alignSelf: 'center', width: 100, height: 5, marginTop: '51%', marginLeft: 200}]}></View>
          <View style={[styles.shadowProp, 
          {backgroundColor: 'white', alignSelf: 'center', width: 100, height: 5, marginTop: '-1%', marginRight: 200}]}></View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={[styles.shadowProp, {
            marginTop: -170,
            fontFamily: 'Lemon-Milk',
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: 60,
          }]}>Fitmoji</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.login, styles.shadowProp]}
            onPress={() => {
              navigation.navigate("Login");
            }}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </Pressable>
        </View>
      </LinearGradient>
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
    backgroundColor: "#FFFFFF",
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: 160,
    marginTop: 40
  },
  buttonText: {
    fontFamily: 'Lemon-Milk',
    color: '#b5e8ff',
    fontWeight: '700',
    fontSize: 20
  },
  buttonContainer: {
    flex: 1,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
})