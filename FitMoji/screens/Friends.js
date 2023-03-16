import React from 'react'
import { useCallback, useState, useEffect } from 'react';
import { get, getDatabase, ref, child, onValue } from "firebase/database";
import { StyleSheet, View, Text, Pressable, ScrollView, Image, TextInput, KeyboardAvoidingView } from "react-native"
import { useHeaderHeight } from '@react-navigation/elements'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { auth } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';

const Friends = ({ navigation }) => {

    const [name, setName] = useState();
    const dbRef = ref(getDatabase());
    const userId = auth.currentUser.uid;
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            setName(snapshot.val().firstName);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
    const height = useHeaderHeight()

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
        <KeyboardAvoidingView
            keyboardVerticalOffset={height - 120}
            behavior="position"
            style={{
                flex: 1,
                paddingBottom: 20
            }}>
            <LinearGradient colors={['#b5e8ff', '#ffffff']} style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
            }}></LinearGradient>
            <ScrollView>
                <View style={[styles.topBar, styles.shadowProp]}>
                    <LinearGradient colors={['#b5e8ff', '#C2ECFF']} style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0,
                        borderRadius: 30
                    }}>
                        <Text style={[styles.shadowProp, {
                            marginTop: 70,
                            fontFamily: 'Lemon-Milk',
                            textAlign: 'center',
                            color: '#FFFFFF',
                            fontSize: 40,
                        }]}>Friends</Text>
                        <View style={[styles.shadowProp, {
                            marginTop: -40,
                            marginRight: 300,
                        }]}>
                            <Pressable
                                onPress={() => navigation.navigate('Home')}
                                style={[styles.navButtons, {backgroundColor: 'transparent'}]}>
                                <Image source={require('./images/globalButtons/home.png')} style={{ tintColor: 'white', width: '70%', height: '70%', resizeMode: 'contain', alignSelf: 'center' }} />
                            </Pressable>
                        </View>
                    </LinearGradient>
                </View>
                <View style={[styles.shadowProp, {
                    alignItems: 'center',
                    paddingBottom: 10,
                }]}>
                    <Image source={require('../assets/images/userprofile.png')}
                        style={{
                            width: 140,
                            height: 140,
                            borderRadius: 100,
                            marginTop: -75,
                        }}>
                    </Image>
                </View>
                <Text style={[styles.shadowProp, {
                    alignSelf: 'center',
                    fontSize: 20,
                    paddingTop: 5,
                    fontFamily: 'Lemon-Milk',
                    color: '#000000'
                }]}>
                    {name}
                </Text>
                <Text style={[styles.shadowProp, {
                    alignSelf: 'center',
                    fontSize: 10,
                    paddingBottom: 10,
                    fontFamily: 'Lemon-Milk',
                    color: '#000000',
                }]}>
                    {auth.currentUser.email}
                </Text>
            </ScrollView>
            <View style={[styles.friends]}>
                <View style={[styles.row]}>
                <Image source={require('../assets/images/userprofile.png')}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            marginLeft: '10%',
                            display: 'inline-block'
                        }}>
                    </Image>
                    <Text style={[styles.inputLabel, styles.shadowProp]}>
                        John
                </Text>
                </View>
                <View style={[styles.row]}>
                <Image source={require('./images/trackButtons/exercise.png')}
                        style={{
                            width: 50,
                            height: 50,
                            display: 'inline-block',
                            marginLeft: '10%',
                        }}>
                    </Image>
                    <Image source={require('./images/trackButtons/food.png')}
                        style={{
                            width: 50,
                            height: 50,
                            display: 'inline-block',
                            marginLeft: '10%',
                        }}>
                    </Image>
                    <Image source={require('./images/trackButtons/water.png')}
                        style={{
                            width: 50,
                            height: 50,
                            display: 'inline-block',
                            marginLeft: '10%',
                        }}>
                    </Image>
                    <Image source={require('./images/trackButtons/sleep.png')}
                        style={{
                            width: 50,
                            height: 50,
                            display: 'inline-block',
                            marginLeft: '10%',
                        }}>
                    </Image>
                    </View>
                    <View style={[styles.row]}>
                    <Text style={[styles.inputLabel, styles.shadowProp]}>
                    87%
                </Text>
                <Text style={[styles.inputLabel, styles.shadowProp]}>
                    39%
                </Text>
                <Text style={[styles.inputLabel, styles.shadowProp]}>
                    58%
                </Text>
                <Text style={[styles.inputLabel, styles.shadowProp]}>
                    100%
                </Text>
                    </View>
            </View>
            <View style={styles.friends}>
            <View style={[styles.row]}>
                <Image source={require('../assets/images/userprofile.png')}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            marginLeft: '10%',
                            display: 'inline-block'
                        }}>
                    </Image>
                    <Text style={[styles.inputLabel, styles.shadowProp]}>
                        Jane
                </Text>
                </View>

                <View style={[styles.row]}>
                <Image source={require('./images/trackButtons/exercise.png')}
                        style={{
                            width: 50,
                            height: 50,
                            display: 'inline-block',
                            marginLeft: '10%',
                        }}>
                    </Image>
                    <Image source={require('./images/trackButtons/food.png')}
                        style={{
                            width: 50,
                            height: 50,
                            display: 'inline-block',
                            marginLeft: '10%',
                        }}>
                    </Image>
                    <Image source={require('./images/trackButtons/water.png')}
                        style={{
                            width: 50,
                            height: 50,
                            display: 'inline-block',
                            marginLeft: '10%',
                        }}>
                    </Image>
                    <Image source={require('./images/trackButtons/sleep.png')}
                        style={{
                            width: 50,
                            height: 50,
                            display: 'inline-block',
                            marginLeft: '10%',
                        }}>
                    </Image>
                    </View>
                    <View style={[styles.row]}>
                    <Text style={[styles.inputLabel, styles.shadowProp]}>
                    48%
                </Text>
                <Text style={[styles.inputLabel, styles.shadowProp]}>
                    100%
                </Text>
                <Text style={[styles.inputLabel, styles.shadowProp]}>
                    60%
                </Text>
                <Text style={[styles.inputLabel, styles.shadowProp]}>
                    92%
                </Text>
                    </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    input: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        width: '90%',
        padding: 20,
        paddingBottom: 20,
        borderRadius: 20,
        marginBottom: 20,
    },
    inputLabel: {
        color: '#FFFFFF',
        padding: 10,
        paddingLeft: 40,
        fontSize: 20,
        fontFamily: 'Lemon-Milk',
    },
    navButtons: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center'
    },
    navText: {
        fontFamily: 'Lemon-Milk',
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 15,
    },
    topBar: {
        borderRadius: 10,
        padding: 10,
        width: '100%',
        backgroundColor: '#b5e8ff',
        height: 225,
        borderRadius: 30
    },
    logoutButton: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        width: '50%',
        height: 70,
        alignItems: 'center',
    },
    logoutButtonText: {
        fontFamily: 'Lemon-Milk',
        color: '#ff0000',
        fontSize: 30,
        fontWeight: 'bold',
        top: '10%'
    },
    shadowProp: {
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    friends: {
        backgroundColor: '#ADD8E6',
        padding: 10,
        height: '25%'
    },
    row: {
        flex: 1, 
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
    }
})

export default Friends