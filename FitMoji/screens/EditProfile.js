import React from 'react'
import { useCallback } from 'react';
import { View, Text, Pressable, ScrollView, Image } from "react-native"
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
        <View>
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
                    fontSize: 50,
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
                <View style = {{
                    shadowColor: '#8E8E8E',
                    shadowOpacity: '100%',
                    shadowOffset: {width: 0, height: 1},
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: '#b5e8ff',
                    width: '90%',
                    padding: 20,
                    paddingBottom: 20,
                    borderRadius: 20,
                    marginTop: 50,
                }}>
                    <Text style = {{
                            textShadowColor: '#Bfbfbf',
                            textShadowRadius: '2',
                            fontFamily: 'Lemon-Milk',
                            textAlign: 'center',
                            color: '#000000',
                            fontSize: 20,
                        }}>Username</Text>
                </View>
                <View style = {{
                    shadowColor: '#8E8E8E',
                    shadowOpacity: '100%',
                    shadowOffset: {width: 0, height: 2},
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: '#b5e8ff',
                    width: '90%',
                    padding: 20,
                    paddingBottom: 20,
                    borderRadius: 20,
                    marginTop: 50,
                }}>
                    <Text style = {{
                            textShadowColor: '#Bfbfbf',
                            textShadowRadius: '2',
                            fontFamily: 'Lemon-Milk',
                            textAlign: 'center',
                            color: '#000000',
                            fontSize: 20,
                        }}>Email</Text>
                </View>
                <View style = {{
                    shadowColor: '#8E8E8E',
                    shadowOpacity: '100%',
                    shadowOffset: {width: 0, height: 2},
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: '#b5e8ff',
                    width: '90%',
                    padding: 20,
                    paddingBottom: 20,
                    borderRadius: 20,
                    marginTop: 50,
                    marginBottom: 20,
                }}>
                    <Text style = {{
                            textShadowColor: '#Bfbfbf',
                            textShadowRadius: '2',
                            fontFamily: 'Lemon-Milk',
                            textAlign: 'center',
                            color: '#000000',
                            fontSize: 20,
                        }}>Password</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default EditProfile