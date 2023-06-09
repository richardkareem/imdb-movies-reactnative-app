import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import HomeTabNavigation from './HomeTabNavigation';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginNav = () => {
    
    const Stack = createStackNavigator();

    const [ isLogin, setIsLogin ] = useState(false);

    const checkIsLogin = async()=>{
        const token = await AsyncStorage.getItem("token");

        if(token){
            setIsLogin(true);
            console.log(token);
        }
    }

    useEffect(()=>{
        checkIsLogin();
        console.log(isLogin);
    },[isLogin])

    return (
        <Stack.Navigator screenOptions={{ headerShown:true, mountOnBlur:true}}>
            {!isLogin 
            ? 
            (<Stack.Screen name='Login'
             component={LoginScreen}
              options={{headerShown:false}} />)
            :
           null
            }
            <Stack.Screen name='MainMenu' 
            component={HomeTabNavigation} 
            options={{headerShown:false}} />
             <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown:false}} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default LoginNav;
