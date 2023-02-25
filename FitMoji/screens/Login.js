import React, { useCallback, useEffect, useState } from 'react'
import { useFonts } from 'expo-font';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native'
import { auth } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';

const LogIn = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                if (user.metadata.creationTime === user.metadata.lastSignInTime) {
                    navigation.replace("Create Profile");
                }
                else {
                    navigation.replace("Home");
                }
            }
        })
        return unsubscribe
    }, [])

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email);
            })
            .catch(error => alert(error.message))
    }

    const handleLogIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with: ', user.email);
            })
            .catch(error => alert(error.message))
    }

    const handleLogOut = () => {
        auth.signOut().then(() => {
            //navigate to login screen
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
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <LinearGradient colors={['#b5e8ff', '#ffffff']} style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
            }}>
                <View style={[styles.inputContainer, styles.shadowProp]}>
                    <Text style={{
                        fontFamily: 'Lemon-Milk',
                        textAlign: 'center',
                        color: '#FFFFFF',
                        fontSize: 60,
                        marginTop: 100
                    }}>Login</Text>
                    <TextInput placeholder='Email'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={[styles.input , {marginTop: 20}]}
                    />
                    <TextInput placeholder='Password'
                        value={password}
                        onChangeText={password => setPassword(password)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>
                <View style={[styles.buttonContainer, styles.shadowProp]}>
                    <TouchableOpacity
                        onPress={handleLogIn}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSignUp}
                        style={[styles.button, styles.buttonOutline, {marginTop: 20}]}
                    >
                        <Text style={styles.buttonOutlineText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default LogIn;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        marginTop: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '65%',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        flex: 1,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 85,
        marginTop: 200
    },
    button: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Lemon-Milk',
        color: '#b5e8ff',
        fontWeight: '700',
        fontSize: 20
    },
    buttonOutline: {
        backgroundColor: "#cfcfcf",
        marginTop: 5,
        borderColor: "#e6e6e6",
        borderWidth: 2
    },
    buttonOutlineText: {
        fontFamily: 'Lemon-Milk',
        color: '#b5e8ff',
        fontWeight: '700',
        fontSize: 20
    },
    shadowProp: {
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});
