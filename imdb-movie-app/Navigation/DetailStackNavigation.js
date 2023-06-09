import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import WatchListScreen from '../Screens/WatchListScreen';
import DetailMovie from '../component/DetailMovie';
import ReviewScreen from '../Screens/ReviewScreen';
import ProfileScreen from '../Screens/ProfileScreen';



const DetailStackNavigation = () => {
    const Stack = createStackNavigator();
    
    return (
        <Stack.Navigator screenOptions={{unmountOnBlur: true }}  >
            <Stack.Screen name='Watching List' component={WatchListScreen}/>
            <Stack.Screen name='Detail Movie' component={DetailMovie} />
            <Stack.Screen name='Review' component={ReviewScreen}  /> 
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default DetailStackNavigation;
