import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home'
import ProfileScreen from './screens/EditProfile'

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#FFFFFF',
          }
        }}>
        <Stack.Screen
          name = "Home" 
          component = {HomeScreen}
          options = {{ title : "Home"}}/>
        <Stack.Screen name = "Profile" component = {ProfileScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MyStack
