import React from 'react'
import { useCallback } from 'react';
import { View, Text, Pressable, Image, StyleSheet} from "react-native"
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { auth } from '../firebase';
import { getDatabase, ref, child, get } from "firebase/database";

const Home = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'Lemon-Milk': require('./fonts/LEMONMILK-Regular.otf'),
    });
    
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
        avatarUrl = snapshot.val().url;
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });


    if (!fontsLoaded) {
        return null;
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
                    fontSize: 15,
                }}>Edit Profile</Text>
            </Pressable>
            <Image source={require('./images/Avatar.png')} />
            <Pressable
            onPress = {() => navigation.navigate('Sleep')}
            style = {{
                marginTop: 0,
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
            }}>Sleep</Text>
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
                    fontSize: 15,
                }}>Food Intake</Text>
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
    }
  })

  export default Home