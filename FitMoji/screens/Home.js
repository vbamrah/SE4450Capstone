import React from 'react'
import { useCallback, useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, Pressable, Image, Button } from "react-native"
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { auth } from '../firebase';
import { getDatabase, ref, child, get } from "firebase/database";
import { WebView } from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText } from 'moti';
import LottieView from 'lottie-react-native';

const goal4 = require('./images/fourthGoal.json');
const goal3 = require('./images/thirdGoal.json');
const goal2 = require('./images/secondGoal.json');
const goal1 = require('./images/sad.json');
const goal0 = require('./images/zeroGoal.json');
const blankImg = require('./images/emojis/BlankMessageBubble.png');
const food = require('./images/veggie.json');
const water = require('./images/droplet.json');
const sleep = require('./images/sleeping.json');
const exercise = require('./images/muscle.json');


const Home = ({ navigation }) => {
    const [animated, setAnimated] = useState(false);
    const handleToggle = () => {
        setAnimated(!animated);
    }
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
        var counter = 0;
        for (i = 0; i < global.goalsCompleted.length; i++) {
            if (global.goalsCompleted[i] == 'complete') {
                counter++;
            }
        }
        if (counter == 0) {
            return goal0;
        }
        else if (counter == 1) {
            return goal1;
        }
        else if (counter == 2) {
            return goal2;
        }
        else if (counter == 3) {
            return goal3;
        }
        else if (counter == 4) {
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
            return water
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient colors={['#b5e8ff', '#ffffff']} style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
            }}>
                <View style={{
                    top: '5%',
                }}>
                    <Text style={[styles.shadowProp, {

                        fontFamily: 'Lemon-Milk',
                        textAlign: 'center',
                        color: '#ffffff',
                        fontSize: 60,
                    }]}>FitMoji</Text>
                </View>
                <View style={{ paddingTop: 20, height: '70%', width: '100%', marginTop: '10%' }}>
                    <WebView
                        style={[styles.webContainer, { borderRadius: 30 }]}
                        scrollEnabled={false}
                        originWhitelist={['*']}
                        source={{
                            html:
                                `<head>
                            <style>
                            body {
                                background-image: linear-gradient(#C2ECFF, #F2FBFF);
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
                <View style={{ zIndex: 4, elevation: 2, position: 'absolute', marginTop: '40%', alignItems: 'center' }}>
                    <Pressable
                        onPress={() => navigation.navigate('Goals')}
                        style={[styles.shadowProp, styles.smallButton, {
                            marginTop: 325,
                            marginLeft: '10%',
                            alignSelf: 'right'
                        }]}
                    >
                        <Image source={require('./images/star.png')} style={[styles.buttonImage, { height: '60%', width: '60%', top: '17%' }]} />
                    </Pressable>
                    <Pressable
                        onPress={handleToggle}
                        style={[styles.shadowProp, styles.smallButton, {
                            marginTop: 10,
                            marginLeft: '10%',
                            alignSelf: 'right'
                        }]}
                    >
                        <Image source={require('./images/goal.png')} style={styles.buttonImage} />
                    </Pressable>
                    <MotiView
                        animate={{
                            scale: animated ? 1 : 0,
                            opacity: animated ? 1 : 0
                        }}
                        transition={{ type: 'spring', duration: 600 }}>
                        <ImageBackground source={require('./images/emojis/BlankMessageBubble.png')} style={[styles.shadowProp, {
                            marginLeft: '60%',
                            marginTop: -425,
                            width: 150,
                            height: 75
                        }]}>
                            <LottieView
                                autoPlay loop
                                style={{
                                    alignSelf: 'center',
                                    top: '2%',
                                    width: 60,
                                    height: 60,
                                }}
                                source={getGoalImage()}
                            />
                        </ImageBackground>
                        <ImageBackground source={require('./images/emojis/BlankMessageBubble.png')} style={[styles.shadowProp, {
                            transform: [{ rotateY: '180deg' }],
                            marginLeft: '3%',
                            marginTop: -74,
                            width: 150,
                            height: 75
                        }]}>
                            <LottieView
                                autoPlay loop
                                style={{
                                    alignSelf: 'center',
                                    top: '2.5%',
                                    width: 60,
                                    height: 60
                                }}
                                source={getLastActivityImage()}
                            />
                        </ImageBackground>
                    </MotiView>
                </View>
                <Pressable
                    onPress={() => navigation.navigate('Exercise')}
                    style={[styles.shadowProp, styles.bigButton, {
                        marginRight: 265,
                        marginTop: 15,
                    }]}
                >
                    <Image source={require('./images/trackButtons/exercise.png')} style={styles.buttonImage} />
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate('Food Intake')}
                    style={[styles.shadowProp, styles.bigButton, {
                        marginRight: 90,
                        marginTop: -70,
                    }]}
                >
                    <Image source={require('./images/trackButtons/food.png')} style={styles.buttonImage} />
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate('Water')}
                    style={[styles.shadowProp, styles.bigButton, {
                        marginLeft: 90,
                        marginTop: -70,
                    }]}
                >
                    <Image source={require('./images/trackButtons/water.png')} style={styles.buttonImage} />
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate('Sleep')}
                    style={[styles.shadowProp, styles.bigButton, {
                        marginLeft: 265,
                        marginTop: -70,
                    }]}
                >
                    <Image source={require('./images/trackButtons/sleep.png')} style={styles.buttonImage} />
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('User Manual')}
                    style={[styles.shadowProp, styles.smallButton, {
                        marginTop: -140,
                        marginLeft: '10%',
                        alignSelf: 'right'
                    }]}
                >
                    <Image source={require('./images/manual-book.png')} style={styles.buttonImage} />
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('')}
                    style={[styles.shadowProp, styles.smallButton, {
                        marginTop: -90,
                        marginLeft: '10%',
                        alignSelf: 'right'
                    }]}
                >
                    <Image source={require('./images/calendar.png')} style={[styles.buttonImage, { height: '60%', width: '60%', top: '17%' }]} />
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('Profile')}
                    style={[styles.shadowProp, styles.smallButton, {
                        marginTop: -20,
                        marginLeft: '80%',
                    }]}
                >
                    <Image source={require('./images/trackButtons/user.png')} style={{ width: '60%', height: '60%', resizeMode: 'contain', alignSelf: 'center', top: '15%' }} />
                </Pressable>
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
    shadowProp: {
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    smallButton: {
        backgroundColor: '#FFFFFF',
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    bigButton: {
        backgroundColor: '#FFFFFF',
        width: 70,
        height: 70,
        borderRadius: 40,
        alignSelf: 'center'
    },
    buttonImage: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
        alignSelf: 'center',
        top: '15%'
    }
})

export default Home;


