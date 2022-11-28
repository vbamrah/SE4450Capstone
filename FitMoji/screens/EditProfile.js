import React from 'react'
import { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Image, TextInput, KeyboardAvoidingView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHeaderHeight } from '@react-navigation/elements'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

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
            <ScrollView>
                <View style={styles.topBar}>
                    <Text style={{
                        marginTop: 50,
                        textShadowColor: '#000000',
                        textShadowRadius: '8',
                        fontFamily: 'Lemon-Milk',
                        textAlign: 'center',
                        color: '#FFFFFF',
                        fontSize: 40,
                    }}>Profile</Text>
                    <View style={{
                        marginTop: -40,
                        marginRight: 300,
                    }}>
                        <Pressable
                            onPress={() => navigation.navigate('Home')}
                            style={styles.navButtons}>
                            <Text style={styles.navText}>Home</Text>
                        </Pressable>
                    </View>
                    <View style={{
                        marginTop: -23, //super hard coded idk what to do
                        marginLeft: 300,
                    }}>
                        <Pressable
                            onPress={() => saveData()}
                            style={styles.navButtons}>
                            <Text style={styles.navText}>Save</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={{
                    alignItems: 'center',
                    shadowColor: '#8E8E8E',
                    shadowOpacity: '100%',
                    paddingBottom: 10,
                    shadowOffset: { width: 0, height: 1 }
                }}>
                    <Image source={require('../assets/images/userprofile.png')}
                        style={{
                            width: 140,
                            height: 140,
                            borderRadius: 100,
                            marginTop: -75,
                        }}>
                    </Image>
                </View>
                <Text style={{
                    alignSelf: 'center',
                    fontSize: 20,
                    paddingTop: 20,
                    fontFamily: 'Lemon-Milk',
                }}>
                    {userName}
                </Text>
                <Text style={{
                    alignSelf: 'center',
                    fontSize: 10,
                    paddingBottom: 10,
                    fontFamily: 'Lemon-Milk',
                }}>
                    {email}
                </Text>
                <Text style={styles.inputLabel}>
                    Username
                </Text>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder={userName}
                        onFocus={() => clearUser()}
                        onChangeText={(val) => setName(val)} />
                </View>
                <Text style={styles.inputLabel}>
                    Email
                </Text>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder={email}
                        onFocus={() => clearEmail()}
                        onChangeText={(val) => setEmail(val)} />
                </View>
                <Text style={styles.inputLabel}>
                    Password
                </Text>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Password' />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    input: {
        shadowColor: '#8E8E8E',
        shadowOpacity: '100%',
        shadowOffset: { width: 0, height: 2 },
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
        padding: 20,
        paddingLeft: 40,
        fontSize: 10,
        fontFamily: 'Lemon-Milk',
    },
    navButtons: {
        shadowColor: '#000000',
        shadowOpacity: '100%',
        shadowOffset: { width: 0, height: 1 },
        width: 70,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FFFFFF',
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
    }
})

export default EditProfile