import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import {View, StyleSheet, Text, SafeAreaView, Image} from 'react-native';
import { GestureHandlerRootView, ScrollView, TapGestureHandler } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import server from '../config/server-api';

const WatchListScreen = () => {
    const navigation = useNavigation();
    const [ watchList, setWatchList  ] = useState([]);
    

    const fetchMyServer = async()=>{
        try{
            const token = await AsyncStorage.getItem("token");

            const { data, status } = await server.get("movies",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            
            console.log(status);
            if(status === 200){
                // setWatchList(currwatchList =>{
                //     return [currwatchList, ...data];
                // })
                setWatchList(data);
            }
            
           
        }catch(err){
            console.log(err);
            console.log(err.code);
        }
    } 

  useEffect(()=>{
console.log("masuk Watch List");
 fetchMyServer();
  },[])

    return (
        
        <SafeAreaView>
            <View>
                <ScrollView>
                    <GestureHandlerRootView>
                        <View style={styles.container}>
                        {watchList.map((movie)=>(
                            <TapGestureHandler
                            key={movie.id}
                            numberOfTaps={1}
                            onActivated={()=>{
                                navigation.navigate('Detail Movie', movie=(movie))
                            }}
                            >
                                <View style={styles.containerImage} >
                                    <Image source={{uri: movie.image }} style={styles.image} />
                                </View>
                            </TapGestureHandler>
                        
                        ))}
                        </View>
                    </GestureHandlerRootView>
                    
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row', 
        flexWrap:'wrap', 
        justifyContent:'center'
    },
    containerImage:{
        width:150,  
        margin:'5%'
    },
    image:{
        width:150, 
        height: 200, 
        backgroundColor:'black',
        borderRadius:10}
})

export default WatchListScreen;
