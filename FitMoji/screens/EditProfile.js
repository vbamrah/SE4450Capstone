import React from 'react'
import { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Image, TextInput, KeyboardAvoidingView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHeaderHeight } from '@react-navigation/elements'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { auth } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';

const EditProfile = ({ navigation }) => {
    useEffect(() => {
        getData();
    })

    const [userName, setName] = useState("Username");
    const [email, setEmail] = useState("Email");
    const height = useHeaderHeight()

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('username', userName);
            await AsyncStorage.setItem('email', email);
            alert("Profile Saved!")
        } catch (err) {
            console.log(err)
        }
    }

    const clearUser = async () => {
        try {
            await AsyncStorage.removeItem('username');
        } catch (err) {
            console.log(err)
        }
    }

    const clearEmail = async () => {
        try {
            await AsyncStorage.removeItem('email');
        } catch (err) {
            console.log(err)
        }
    }

    const getData = async () => {
        try {
            const user = await AsyncStorage.getItem('username')
            const email = await AsyncStorage.getItem('email')
            if (user !== null) {
                setName(user)
            }
            if (email !== null) {
                setEmail(email)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleLogOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        }).catch(error => alert(error.message))
    }


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
                <View style={styles.topBar}>
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
                        }]}>Profile</Text>
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
                        <View style={[styles.shadowProp, {
                            marginTop: -40,
                            marginLeft: 300,
                        }]}>
                            <Pressable
                                onPress={() => saveData()}
                                style={[styles.navButtons, {backgroundColor: 'transparent'}]}>
                                <Image source={require('./images/globalButtons/checked.png')} style={{ tintColor: 'white', width: '60%', height: '60%', resizeMode: 'contain', alignSelf: 'center', top: '5%' }} />
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
                    {userName}
                </Text>
                <Text style={[styles.shadowProp, {
                    alignSelf: 'center',
                    fontSize: 10,
                    paddingBottom: 10,
                    fontFamily: 'Lemon-Milk',
                    color: '#000000',
                }]}>
                    {email}
                </Text>
                <Text style={[styles.inputLabel, styles.shadowProp]}>
                    Username
                </Text>
                <View>
                    <TextInput
                        style={[styles.input, styles.shadowProp]}
                        placeholder={userName}
                        onFocus={() => clearUser()}
                        onChangeText={(val) => setName(val)} />
                </View>
                <Text style={[styles.inputLabel, styles.shadowProp]}>
                    Email
                </Text>
                <View>
                    <TextInput
                        style={[styles.input, styles.shadowProp]}
                        placeholder={email}
                        onFocus={() => clearEmail()}
                        onChangeText={(val) => setEmail(val)} />
                </View>
                <Text style={[styles.inputLabel, styles.shadowProp]}>
                    Password
                </Text>
                <View>
                    <TextInput
                        style={[styles.input, styles.shadowProp]}
                        placeholder='Enter Password' />
                </View>
                <View style={[styles.shadowProp, { marginTop: 20, paddingBottom: 20, alignItems: 'center' }]}>
                    <Pressable onPress={handleLogOut} style={styles.logoutButton}>
                        <Text style={styles.logoutButtonText}>Log Out</Text>
                    </Pressable>
                </View>
            </ScrollView>
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
        color: '#000000',
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
        shadowColor: '#8E8E8E',
        shadowOpacity: '100%',
        shadowOffset: { width: 0, height: 1 },
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
})

export default EditProfile