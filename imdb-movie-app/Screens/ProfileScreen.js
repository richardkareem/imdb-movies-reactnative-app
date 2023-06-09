import React from 'react';
import {View, StyleSheet, Button, SafeAreaView, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const ProfileScreen = () => {
    const navigation = useNavigation();
    const logout = async ()=>{
        try {
             await AsyncStorage.removeItem("token");
             navigation.navigate("Login")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        
            <View style={{ backgroundColor:'pink', alignItems:'center', justifyContent:"center", flex:1}}>

                <TouchableOpacity   onPress={logout}>
                    <View style={{ backgroundColor:'#f4f4f4', borderRadius:10 }}>
                     <Text style={{  fontSize:30, borderRadius:10}} > Logout </Text>
                    </View>
                </TouchableOpacity>
               
            </View>
        
    );
}

const styles = StyleSheet.create({})

export default ProfileScreen;
