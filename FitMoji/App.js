import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home'
import ProfileScreen from './screens/EditProfile'
import LogIn from './screens/Login'
import WelcomeScreen from './screens/Welcome'
import CreateProfile from './screens/CreateProfile'
import FoodIntake from './screens/FoodIntake'
import CreateAvatar from './screens/CreateAvatar'
import Sleep from './screens/Sleep'
import Water from './screens/Water'
import Exercise from './screens/Exercise'
import UserManual from './screens/UserManual'
import Goals from './screens/Goals'

const Stack = createNativeStackNavigator();

const MyStack = () => {
  global.lastActivity = "none";
  global.goalsCompleted = ["undefined", "undefined", "undefined", "undefined"];
  global.progressToGoals = [0.0, 0.0, 0.0, 0.0];
  
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Welcome'
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
          headerTitleStyle: {
            color: 0,
          },
          headerStyle: {
            backgroundColor: '#b5e8ff',
          },
          contentStyle: {
            backgroundColor: '#b5e8ff',
          }
        }}>
        <Stack.Screen
        name="Create Avatar"
        options={{headerShown: false}}
        component = {CreateAvatar}/>
        <Stack.Screen 
        name = "Welcome"
        options={{headerShown: false}}
        component = {WelcomeScreen}/>
         <Stack.Screen 
        name = "Login"
        options={{headerShown: false}}
        component = {LogIn}/>
        <Stack.Screen 
        name = "Sleep"
        component = {Sleep}/>
        <Stack.Screen
          options={{headerShown: false, gestureEnabled: false}}
          name = "Home"
          component = {HomeScreen}/>
        <Stack.Screen 
          options=
          {{headerShown: false,
            contentStyle: {
            backgroundColor: '#FFFFFF',
          }}}
          name = "Profile"
          component = {ProfileScreen}/>
        <Stack.Screen name = "Create Profile" component = {CreateProfile}/>
        <Stack.Screen name = "Food Intake" component = {FoodIntake}/>
        <Stack.Screen name = "Water" component = {Water}/>
        <Stack.Screen name = "Exercise" component = {Exercise}/>
        <Stack.Screen name = "User Manual" component = {UserManual}/>
        <Stack.Screen name = "Goals" component = {Goals}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MyStack
