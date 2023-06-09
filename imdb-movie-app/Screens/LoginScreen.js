import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Button, TouchableOpacity, ImageBackground, Text, SafeAreaView, } from 'react-native';
import { TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const onLogin = async()=>{
      // http://172.20.10.3:8080/movies
        try {
          const url = `http://172.20.10.3:8080/login`;
          const body = { username:email, password: password }
          const config = { "Content-type" : "application/json" }
          
          const { data, status } =  await axios.post(url, body, config);
          if(status ===200){
            // console.log(data.token);
            await AsyncStorage.setItem("token", data.token )
            navigation.navigate("MainMenu");
          }
        
        } catch (error) {
            console.log(error);
            
        }

    }
    const changeScreen = ()=>{
      navigation.navigate("Register")

    }

    useEffect(()=>{
        onLogin();
    }, [])

    return (
      
        
        <ImageBackground style={styles.background} source={{ uri: "https://images.unsplash.com/photo-1541980003984-e8a9dd38025c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHw%3D&w=1000&q=80" }}>
        <View style={styles.inputArea}>
          
        </View>
        <View style={styles.inputArea}>
          <TextInput value={email} onChangeText={setEmail} style={styles.textInput} placeholder="Email" placeholderTextColor="white" />
          <TextInput value={password} onChangeText={setPassword} style={styles.textInput} placeholder="Password" placeholderTextColor="white" />
        </View>
        <View style={styles.buttonArea}>
          <Button onPress={onLogin} title='Login' />
          <Text style={[ styles.textStyle, styles.textStyle2 ]}>Dont Have Account?</Text>
          <TouchableOpacity onPress={changeScreen}>
            <Text style={[ styles.textStyle, styles.textStyle2 ]}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
     
       
    );
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        justifyContent: 'center',
      },
      inputArea: {
        alignItems: 'center'
      },
      textInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        margin: 10,
        padding: 10,
        borderRadius: 15,
        width: '60%',
        color:'white'
      },
      button: {
        backgroundColor: 'white',
        padding: 10, 
        borderRadius: 10,
        width: '40%',
        alignSelf: 'center',
        margin: 5
      },
      textStyle: { 
        alignSelf: 'center', 
        fontSize: 15 ,
      },
      textStyle2: {
        color: 'white',
      },
      imageStyle: {
        // alignSelf: 'flex-end',
        resizeMode: 'stretch',
        width: 150, 
        height: 150
      }
})

export default LoginScreen;
