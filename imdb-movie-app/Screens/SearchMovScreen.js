import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TextInput, Button, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert, ImageBackground} from 'react-native';
import { GestureHandlerRootView,TapGestureHandler } from 'react-native-gesture-handler'
import instance from '../config/api';
import AsyncStorage from "@react-native-async-storage/async-storage"
import server from '../config/server-api';


//192.168.18.33


const SearchMovScreen = () => {
    const [search, setSearch] = useState("")
    const [findMovie, setFindMovie]=useState([]); 

    const searchMovies = async() =>{
        // console.log(search)
        try {
            const {data, status} = await instance.get(`/SearchMovie/k_0knx3zm6/${search}`)
            // const {results} = data;
            if(status === 200){
                // console.log(data);
                // console.log(results);
                setFindMovie(currState =>{
                    return [...currState, ...data.results]
                })
            }
           
        } catch (error) {
            console.log(error);
            Alert.alert(error);
        }
    }

    const addToWatchList = async(idMovies, urlImage)=>{
        try{
            const token = await AsyncStorage.getItem("token");
            const url = 'http://172.20.10.3:8080/movies';
            const dataJson = {id: idMovies, image: urlImage };

            const { data, status } = await server.post("movies", dataJson,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            if (status === 201){
                Alert.alert("Berhasil Ditambahkan Ke Watching List")
            }else{
                throw new Error("something went wrong baby")
            }
           
        }catch(err){
            console.log(err);
            console.log(err.code);
        }
}

    useEffect(()=>{
        searchMovies();
    },[]);
    return (
        <SafeAreaView>
            <View style={styles.containerSearch}>
                <View style={styles.boxSearch}>
                    <TextInput 
                    style={styles.button}
                    placeholder='Search'
                    onChangeText={(text)=> setSearch(text) }
                    value={search}
                    ></TextInput>
                </View>
                <Button title='Search' onPress={searchMovies}></Button>
            </View>
        <FlatList 
         data={findMovie}
         renderItem={({ item })=>(
            <GestureHandlerRootView>
                <TapGestureHandler
                    numberOfTaps={2}
                    onActivated={()=>{
                        addToWatchList(item.id.replace(/\D/g,''), item.image)
                    }}
                    >
                    <View style={styles.containerImage}>
                        <ImageBackground source={{uri: item.image }} 
                        style={styles.image} >
                            <Image 
                            source={{uri: 'https://cdn.pixabay.com/photo/2016/02/04/11/57/heart-1179054__480.png'}}
                            style={{width:170, height:150, top:90, left:45 }} />
                        </ImageBackground>
                        <Text style={{fontWeight:'bold', fontSize:20}}>{item.title}</Text>
                    </View>
                   
                </TapGestureHandler>
            </GestureHandlerRootView>
         )}
        />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerSearch:{
        flexDirection:'row', 
        justifyContent:'center',
        paddingTop:10,
        left:35,
        marginBottom:10
    },
    boxSearch:{ 
        backgroundColor:'pink', 
        width:'45%' , 
        borderRadius:20, 
        justifyContent:'center' },
    button:{ 
        justifyContent:'center', 
        paddingLeft:10, 
       
    },
    containerImage:{
        width:250,  
        margin:'5%', 
        alignSelf:'center'
    },
    image:{
        width:250, 
        height: 300, 
        backgroundColor:'black',
        borderRadius:15
    },

})

export default SearchMovScreen;
