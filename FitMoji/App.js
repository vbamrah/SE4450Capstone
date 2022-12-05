import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home'
import ProfileScreen from './screens/EditProfile'
import LogIn from './screens/login'
import WelcomeScreen from './screens/Welcome'
import CreateProfile from './screens/createProfile'
import Sleep from './screens/Sleep'
import CaloriePage from './screens.Calorie'

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Welcome'
        screenOptions={{
          headerShown: true,
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
          headerTitleStyle: {
            color: 0,
          },
          headerStyle: {
            backgroundColor: '#7DC0C9',
          },
          contentStyle: {
            backgroundColor: '#7DC0C9',
          }
        }}>
        <Stack.Screen 
        name = "Welcome"
        options={{headerShown: false}}
        component = {WelcomeScreen}/>
         <Stack.Screen 
        name = "Login"
        component = {LogIn}/>
        <Stack.Screen 
        name = "Sleep"
        component = {Sleep}/>
        <Stack.Screen
          options={{headerShown: false, gestureEnabled: false}}
          name = "Home"
          component = {HomeScreen}/>
        <Stack.Screen name = "Profile" component = {ProfileScreen}/>
        <Stack.Screen name = "Create Profile" component = {CreateProfile}/>
        <Stack.Screen name = "Calorie Count" component = {CaloriePage}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MyStack
