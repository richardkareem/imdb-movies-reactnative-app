import React from 'react';
import {View, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../Screens/HomeScreen';
import SearchMovScreen from '../Screens/SearchMovScreen';
import WatchListScreen from '../Screens/WatchListScreen';

import { FontAwesome, MaterialIcons, Ionicons   } from '@expo/vector-icons';
import DetailStackNavigation from './DetailStackNavigation';
import ProfileScreen from '../Screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const HomeTabNavigation = () => {
    
    return (
        <Tab.Navigator>
            <Tab.Screen 
            name='In Theaters' 
            component={HomeScreen}
            options={{
                tabBarLabel:'Home',
                headerShown:true,
                tabBarIcon: ({ color, size, focused }) => <FontAwesome name="television" size={24} color="black" />
            }}
            
            ></Tab.Screen>
            <Tab.Screen 
            name='Search'
            component={SearchMovScreen}
            options={{
                unmountOnBlur:true,
                headerShown:false,
                tabBarIcon: ({ color, size, focused }) => <Ionicons name="search-outline" size={24} color="black" />
            }}
            ></Tab.Screen>
            <Tab.Screen 
            name='List' 
            component={DetailStackNavigation}
            options={{
                tabBarLabel:'Watching List',
                unmountOnBlur: true,
                headerShown:false,
                tabBarIcon: ({ color, size, focused }) => <MaterialIcons name="favorite-border" size={24} color="black" />
            }} 
            ></Tab.Screen>
            <Tab.Screen 
            name='Profile' 
            component={ProfileScreen}
            options={{
                unmountOnBlur: true,
               
                tabBarIcon: ({ color, size, focused }) => <Ionicons name="person-outline" size={24} color="black" />
            }} 
            ></Tab.Screen>
            
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({})

export default HomeTabNavigation;
