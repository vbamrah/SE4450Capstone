import React from 'react'
import { useCallback } from 'react';
import { View, Text, Pressable, Image} from "react-native"
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
        </View>
    )
}

export default Home