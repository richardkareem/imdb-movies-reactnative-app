import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, FlatList, Image} from 'react-native';

import { Foundation } from '@expo/vector-icons';
import instance from '../config/api';

const HomeScreen = () => {

    const [ movies, setMpvies ] = useState([]);
 async function fetchMovieApi (){
    try {
        const {data, status}= await instance.get('/InTheaters/k_0knx3zm6')
        const {items} = data;
        if (status === 200){
            setMpvies(items);
            // console.log(items);
        }
    } catch (error) {
        console.log(error);
    }
 }

 useEffect(() => {
   fetchMovieApi();
 }, []);

    return (
        <View style={{backgroundColor:'#f1f2f3'}}>
            <FlatList 
             horizontal={false}
             numColumns={2}
             data={movies}
             columnWrapperStyle={{
                flex:1,
                justifyContent:'space-around'
             }}  
             renderItem={({ item }) =>(
                <View style={{ padding:5, alignSelf:'center', }}>
                    {/* <View style={{flex:1, backgroundColor:'green', width:150, height:150,}} ></View> */}
                    <View style={{ width:150 }}>
                        <Image style={{width:150, height:200, borderRadius:10}} source={{uri: item.image }}></Image>
                        <Text style={{fontWeight:'bold', fontSize:12}}>{item.fullTitle}</Text>
                        <Text>
                        <Foundation name="star" size={20} color="#fcba03" />
                        {item.imDbRating}
                        </Text>
                    </View>
                </View>
             )}
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default HomeScreen;
