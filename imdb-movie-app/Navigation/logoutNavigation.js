import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import LoginScreen from '../Screens/LoginScreen';
import ProfileScreen from '../Screens/ProfileScreen';

const LogoutNavigation = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown:false ,unmountOnBlur: true }}  >
            <Stack.Screen name='Logout' component={ProfileScreen}  />
            <Stack.Screen name='Login' component={LoginScreen}  />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default LogoutNavigation;
