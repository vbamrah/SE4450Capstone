import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native'
import { auth } from '../firebase';

const LogIn = ({navigation}) => {
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
        .signInWithEmailAndPassword(email,password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with: ', user.email);
        })
        .catch(error => alert(error.message))
    }

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        
        <View style={styles.inputContainer}>
            <Text style = {{
                    textShadowColor: '#000000',
                    textShadowRadius: '10',
                    fontFamily: 'Lemon-Milk',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontSize: 50,
                }}>Login</Text>
            <TextInput placeholder='Email'
            value= {email}
            onChangeText={text => setEmail(text)}
            style={[styles.input, styles.inputEmail]}
            />
             <TextInput placeholder='Password'
            value= {password}
            onChangeText={password => setPassword(password)} 
            style={styles.input}
            secureTextEntry
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity 
            onPress={handleLogIn}
            style={styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
        </View>
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
        width: '80%',

    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    inputEmail: {
        marginTop: 20
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
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
    buttonOutline: {
        backgroundColor: "#7DC0C9",
        marginTop: 5,
        borderColor: "#42A5F5",
        borderWidth: 2
    },
    buttonOutlineText: {
        color: '#42A5F5',
        fontWeight: '700',
        fontSize: 16
    },
});