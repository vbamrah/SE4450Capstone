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
import Calendar from './screens/Calendar'
import Friends from './screens/Friends'
import SleepGoalCalendar from './screens/SleepGoalCalendar'
import FoodGoalCalendar from './screens/FoodGoalCalendar'
import WaterGoalCalendar from './screens/WaterGoalCalendar'

const Stack = createNativeStackNavigator();

const MyStack = () => {
  global.lastActivity = "none";
  global.goalsCompleted = ["incomplete", "incomplete", "incomplete", "incomplete"];
  global.progressToGoals = [0.0, 0.0, 0.0, 0.0];
  
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Welcome'
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          }
        }}>
        <Stack.Screen name = "Create Avatar" component = {CreateAvatar}/>
        <Stack.Screen name = "Welcome" component = {WelcomeScreen}/>
        <Stack.Screen name = "Login" component = {LogIn}/>
        <Stack.Screen name = "Sleep" component = {Sleep}/>
        <Stack.Screen name = "Home" component = {HomeScreen}/>
        <Stack.Screen name = "Profile" component = {ProfileScreen}/>
        <Stack.Screen name = "Create Profile" component = {CreateProfile}/>
        <Stack.Screen name = "Food Intake" component = {FoodIntake}/>
        <Stack.Screen name = "Water" component = {Water}/>
        <Stack.Screen name = "Exercise" component = {Exercise}/>
        <Stack.Screen name = "User Manual" component = {UserManual}/>
        <Stack.Screen name = "Goals" component = {Goals}/>
        <Stack.Screen name = "Calendar" component = {Calendar}/>
        <Stack.Screen name = "Friends" component = {Friends}/>
        <Stack.Screen name = "Goal Calendar" component = {SleepGoalCalendar}/>
        <Stack.Screen name = "Food Goal Calendar" component = {FoodGoalCalendar}/>
        <Stack.Screen name = "Water Goal Calendar" component = {WaterGoalCalendar}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MyStack
