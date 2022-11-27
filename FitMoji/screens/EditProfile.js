import React from 'react'
import { useCallback, useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Image, TextInput } from "react-native"
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const EditProfile = ({ navigation }) => {
    const [userName, setName] = useState('Username');
    
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
        <View style = {{flex: 1}}>
            <ScrollView>
                <View style = {{
                    borderRadius: 10,
                    padding: 10,
                    width: '100%',
                    backgroundColor: '#b5e8ff',
                    height: 225,
                    shadowColor: '#8E8E8E',
                    shadowOpacity: '100%',
                    shadowOffset: {width: 0, height: 1},
                    borderRadius: 30}}>
                    <Text style={{
                    marginTop: 50,
                    textShadowColor: '#000000',
                    textShadowRadius: '8',
                    fontFamily: 'Lemon-Milk',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontSize: 40,
                    }}>Profile</Text>
                    <Pressable
                        onPress = {() => navigation.navigate('Home')}
                        style = {{
                            marginTop: -45,
                            marginRight: 300,
                            width: 90,
                            alignSelf: 'center'
                        }}
                    >
                        <Text style = {{
                            textShadowColor: '#Bfbfbf',
                            textShadowRadius: '2',
                            fontFamily: 'Lemon-Milk',
                            textAlign: 'center',
                            color: '#000000',
                            fontSize: 15,
                        }}>Home</Text>
                    </Pressable>
                    <Pressable
                        //onPress = {() => Save}
                        style = {{
                            marginTop: -20,
                            marginRight: -300,
                            width: 90,
                            alignSelf: 'center'
                        }}
                    >
                        <Text style = {{
                            textShadowColor: '#Bfbfbf',
                            textShadowRadius: '2',
                            fontFamily: 'Lemon-Milk',
                            textAlign: 'center',
                            color: '#000000',
                            fontSize: 15,
                        }}>Save</Text>
                    </Pressable>
                </View>
                <View style = {{
                    alignItems: 'center',
                    shadowColor: '#8E8E8E',
                    shadowOpacity: '100%',
                    paddingBottom: 10,
                    shadowOffset: {width: 0, height: 1}
                    }}>
                    <Image source = {require('../assets/images/userprofile.png')}
                        style = {{
                            width: 140,
                            height: 140,
                            borderRadius: 100,
                            marginTop: -75,
                        }}>
                    </Image>
                </View>
                <Text style = {{
                    alignSelf: 'center',
                    fontSize: 20,
                    fontFamily: 'Lemon-Milk',
                }}>
                    {userName}
                </Text>
                <Text style = {{
                    marginTop: 40,
                    padding: 20,
                    paddingLeft: 40,
                    fontSize: 10,
                    fontFamily: 'Lemon-Milk',
                }}>
                    Username
                </Text>
                <View>
                    <TextInput 
                        style = {styles.input}
                        placeholder = 'Enter Username'
                        onChangeText = {(val) => setName(val)}/>
                </View>
                <Text style = {{
                    padding: 20,
                    paddingLeft: 40,
                    fontSize: 10,
                    fontFamily: 'Lemon-Milk',
                }}>
                    Email
                </Text>
                <View>
                    <TextInput 
                        style = {styles.input}
                        placeholder = 'Enter Email'/>
                </View>
                <Text style = {{
                    padding: 20,
                    paddingLeft: 40,
                    fontSize: 10,
                    fontFamily: 'Lemon-Milk',
                }}>
                    Password
                </Text>
                <View>
                    <TextInput 
                        style = {styles.input}
                        placeholder = 'Enter Password'/>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        shadowColor: '#8E8E8E',
        shadowOpacity: '100%',
        shadowOffset: {width: 0, height: 2},
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        width: '90%',
        padding: 20,
        paddingBottom: 20,
        borderRadius: 20,
        marginBottom: 20,
    }
})

export default EditProfile