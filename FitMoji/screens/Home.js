import React from 'react'
import { useCallback, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image} from "react-native"
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { auth } from '../firebase';
import { getDatabase, ref, child, get } from "firebase/database";
import {WebView} from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';

const goal4 = require('./images/emojis/4.png');
const goal3 = require('./images/emojis/3.png');
const goal2 = require('./images/emojis/2.png');
const goal1 = require('./images/emojis/1.png');
const goal0 = require('./images/emojis/0.png');
const blankImg = require('./images/emojis/BlankMessageBubble.png');
const food = require('./images/emojis/food.png');
const water = require('./images/emojis/water.png');
const sleep = require('./images/emojis/sleep.png');
const exercise = require('./images/emojis/exercise.png');


const Home = ({ navigation }) => {
    const [activityChanged, setActivityChanged] = useState(false);
    useFocusEffect(
        React.useCallback(() => {
          setActivityChanged(true);
          console.log(activityChanged);
          // Do something when the screen is focused
          return () => {
            setActivityChanged(false);
            // Do something when the screen is unfocused
            // Useful for cleanup functions
          };
        }, [])
      );
    const [fontsLoaded] = useFonts({
        'Lemon-Milk': require('./fonts/LEMONMILK-Regular.otf'),
    });

    const [avatarUrl, setAvatarUrl] = useState("AvatarUrl");
    
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);


    const dbRef = ref(getDatabase());
    const userId = auth.currentUser.uid;
    get(child(dbRef, `avatars/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val().url);
        setAvatarUrl(snapshot.val().url);
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });

    if (!fontsLoaded) {
        return null;
    } 

    function getGoalImage() {
        console.log(global.goalsCompleted)
        if (global.goalsCompleted == 0) {
            return goal0;
        }
        else if (global.goalsCompleted == 1) {
            return goal1;
        }
        else if (global.goalsCompleted == 2) {
            return goal2;
        }
        else if (global.goalsCompleted == 3) {
            return goal3;
        }
        else if (global.goalsCompleted == 4) {
            return goal4;
        }
    }

    function getLastActivityImage() {
        if (global.lastActivity == "food") {
            return food;
        }
        else if (global.lastActivity == "water") {
            return water;
        }
        else if (global.lastActivity == "sleep") {
            return sleep;
        }
        else if (global.lastActivity == "exercise") {
            return exercise;
        }
        else {
            return blankImg
        }
    }
    
    return (
        <View style = {{flex : 1, justifyContent : 'flex-start'}}>
            <Text style = {{
                marginTop: 50,
                textShadowColor: '#000000',
                textShadowRadius: '10',
                fontFamily: 'Lemon-Milk',
                textAlign: 'center',
                color: '#FFFFFF',
                fontSize: 50,
            }}>FitMoji</Text>
            <Pressable
                onPress = {() => navigation.navigate('Profile')}
                style = {{
                    marginTop: 30,
                    backgroundColor: '#FFFFFF',
                    width: 130,
                    borderRadius: 10,
                    alignSelf: 'center'
                }}
            >
                <Text style = {{
                    textShadowColor: '#000000',
                    textShadowRadius: '2',
                    fontFamily: 'Lemon-Milk',
                    textAlign: 'center',
                    color: '#000000',
                    fontSize: 15,
                }}>Edit Profile</Text>
            </Pressable>
            <View style = {{paddingTop: 10, height: '70%', width: '100%'}}>
                <WebView
                    style={styles.webContainer}
                    scrollEnabled={false}
                    originWhitelist={['*']}
                    source={{ html: 
                        `<head>
                            <style>
                            body {
                                background-color: #b5e8ff;
                            }
                            model-viewer {
                                height: 100%;
                                width: 100%;
                            }
                            </style>
                            <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
                            <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js"></script>
                        </head>
                        <body>
                            <model-viewer src="${avatarUrl}" shadow-intensity="1" camera-controls touch-action="pan-y"></model-viewer>
                        </body>`}}
                />
            </View>
            <View style = {{zIndex: 2, elevation: 2, position: 'absolute'}}>
                <Image
                style = {{
                    zIndex: 4,
                    elevation: 4,
                    height: 50,
                    width: 100,
                    marginLeft: '75%',
                    marginTop: '40%'
                }}
                source = {getGoalImage()}></Image>
                <Image
                style = {{
                    zIndex: 4,
                    elevation: 4,
                    height: 50,
                    width: 100,
                    marginLeft: '75%',
                    marginTop: '5%'
                }}
                source = {getLastActivityImage()}></Image>
            </View>
            <Pressable
                onPress = {() => navigation.navigate('Exercise')}
                style = {{
                    marginTop: -20,
                    backgroundColor: '#FFFFFF',
                    width: 130,
                    borderRadius: 10,
                    alignSelf: 'center'
                }}
            >
                <Text style = {{
                    textShadowColor: '#000000',
                    textShadowRadius: '2',
                    fontFamily: 'Lemon-Milk',
                    textAlign: 'center',
                    color: '#000000',
                    fontSize: 12,
                }}>Exercise</Text>
            </Pressable>
            <Pressable
                onPress = {() => navigation.navigate('Food Intake')}
                style = {{
                    marginTop: 10,
                    backgroundColor: '#FFFFFF',
                    width: 130,
                    borderRadius: 10,
                    alignSelf: 'center'
                }}
            >
                <Text style = {{
                    textShadowColor: '#000000',
                    textShadowRadius: '2',
                    fontFamily: 'Lemon-Milk',
                    textAlign: 'center',
                    color: '#000000',
                    fontSize: 12,
                }}>Food Intake</Text>
            </Pressable>
            <Pressable
                onPress = {() => navigation.navigate('Water')}
                style = {{
                    marginTop: 10,
                    backgroundColor: '#FFFFFF',
                    width: 130,
                    borderRadius: 10,
                    alignSelf: 'center'
                }}
            >
                <Text style = {{
                    textShadowColor: '#000000',
                    textShadowRadius: '2',
                    fontFamily: 'Lemon-Milk',
                    textAlign: 'center',
                    color: '#000000',
                    fontSize: 12,
                }}>Water</Text>
            </Pressable>
            <Pressable
                onPress = {() => navigation.navigate('Sleep')}
                style = {{
                    marginTop: 10,
                    backgroundColor: '#FFFFFF',
                    width: 130,
                    borderRadius: 10,
                    alignSelf: 'center'
                }}
            >
                <Text style = {{
                    textShadowColor: '#000000',
                    textShadowRadius: '2',
                    fontFamily: 'Lemon-Milk',
                    textAlign: 'center',
                    color: '#000000',
                    fontSize: 12,
                }}>Sleep</Text>
            </Pressable>
            <Pressable
                onPress = {() => navigation.navigate('User Manual')}
                style = {{
                    marginTop: -50,
                    marginLeft: 30,
                    backgroundColor: '#FFFFFF',
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    alignSelf: 'right'
                }}
            >
                <Image source={require('./images/Manual.jpg')} style={{ width: '100%', height: '100%', borderRadius: 40, resizeMode: 'contain' }}/>
            </Pressable>
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
    sleep: {
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
    },
    goalsImg: {

    },
  })

  export default Home

  
