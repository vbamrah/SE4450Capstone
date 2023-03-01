import React from 'react'
import { useCallback, useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Pressable,
    KeyboardAvoidingView,
    TouchableOpacity,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Image
} from 'react-native'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import CircularProgress, { CircularProgressBase } from 'react-native-circular-progress-indicator'

const Goals = ({ navigation }) => {
    const [value, setValue] = useState(0);

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

    const props = {
        activeStrokeWidth: 25,
        inActiveStrokeWidth: 25,
        inActiveStrokeOpacity: 0.2
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView style={styles.container}>
                <LinearGradient colors={['#b5e8ff', '#ffffff']} style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                }}></LinearGradient>
                <View style={{
                    top: '5%'
                }}>
                    <Text style={[styles.shadowProp, {
                        fontFamily: 'Lemon-Milk',
                        textAlign: 'center',
                        color: '#ffffff',
                        fontSize: 60,
                    }]}>Goals</Text>
                    <View style={[styles.shadowProp, {
                        marginRight: '70%',
                    }]}>
                        <Pressable
                            onPress={() => navigation.navigate('Home')}
                            style={[styles.navButtons, { backgroundColor: 'transparent' }]}>
                            <Image source={require('./images/globalButtons/home.png')} style={{ marginTop: '-150%', tintColor: 'white', width: '70%', height: '70%', resizeMode: 'contain', alignSelf: 'center', top: '15%' }} />
                        </Pressable>
                    </View>
                </View>
                <View style={[styles.shadowProp, {
                    alignSelf: 'center',
                    marginTop: 200
                }]}>
                    <CircularProgressBase
                        {...props}
                        value={80}
                        radius={150}
                        activeStrokeColor={'#e84118'}
                        inActiveStrokeColor={'#e84118'}

                    >
                        <CircularProgressBase
                            {...props}
                            value={87}
                            radius={120}
                            activeStrokeColor={'#badc58'}
                            inActiveStrokeColor={'#badc58'}
                        >
                            <CircularProgressBase
                                {...props}
                                value={72}
                                radius={90}
                                activeStrokeColor={'#18dcff'}
                                inActiveStrokeColor={'#18dcff'}
                            >
                                <CircularProgressBase
                                    {...props}
                                    value={62}
                                    radius={60}
                                    activeStrokeColor={'#a358dc'}
                                    inActiveStrokeColor={'#a358dc'}
                                />
                            </CircularProgressBase>
                        </CircularProgressBase>
                    </CircularProgressBase>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

export default Goals

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
    },
    shadowProp: {
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    navButtons: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center'
    },
})