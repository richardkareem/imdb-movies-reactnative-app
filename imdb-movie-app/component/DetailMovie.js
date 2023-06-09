import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ScrollView, Image, Button,Text} from 'react-native';

import { Foundation } from '@expo/vector-icons';
import instance from '../config/api';
//,
const DetailMovie = ({ navigation, route }) => {
    const movie = route.params;
    
    const [findMovie, setFindMovie] = useState([]);

    console.log(`tt${movie.id}`);
   

    const detailMovie = async()=>{
        // console.log(search)
        try {
            const {data, status} = await instance.get(`/Title/k_0knx3zm6/tt${movie.id}`)
            // const {results} = data;
            // console.log(status);
            if(status === 200){
                // console.log(data);
              
                setFindMovie(data);
            }else{
                throw new Error('something wrong with server');
            }
           
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        detailMovie();
        console.log("masuk Detail");
       
    }, [])

    const tes = ()=>{
        for(let i=0; i<findMovie.length; i++){
            // console.log(i);
            console.log(findMovie[i]);
            console.log(findMovie.title);
        }
    }
    
    return (
        <ScrollView>
            <View style={{ alignItems:'center' }}>
                <View style={styles.container}>
                    <View style={{ flexDirection:'row'}}>
                        <Image source={{uri: findMovie.image}}  style={styles.image} />
                        <View style={{ flex:1,  }}>
                            <View style={{ flex:5, justifyContent:'center' }}>
                                <Text style={styles.header} > {findMovie.title} 
                                {`\n`} {/* <- bikin paragraf di Text*/}
                                    <Text>
                                        {findMovie.imDbRating}     
                                        <Foundation name="star" size={20} color="#fcba03" />
                                    </Text>
                                </Text>
                            </View>
                            <View style={{ justifyContent:'center', paddingBottom:20 }} >
                               
                                <Text  style={styles.stars} >Actors:{`\n`}{findMovie.stars}</Text>
                            </View>
                            <View style={{ flex:1, justifyContent:'flex-end', paddingBottom:10 }} >
                                <Text  style={styles.stars} >Directors:{`\n`}{findMovie.directors}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                            <Text style={styles.plot} >{findMovie.plot}</Text>
                      
                        <View style={{ paddingTop:30}}>
                            <Text>Release Date:{`\n`}{findMovie.releaseDate}</Text>
                            <Text style={{ paddingTop:10}}>Genres:{`\n`}{findMovie.genres}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Button title='Review' onPress={()=>navigation.navigate('Review', {id:findMovie.id, image:findMovie.image, title:findMovie.title} )} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        // flex:1,
        paddingTop:20,
        width:'80%',
        
    }
    ,header:{ 
        fontWeight:'bold', 
        textAlign:'center',
        fontSize:20,
        
    },
    directors:{

    },
    stars:{
        // justifyContent:'flex-end',
        
        textAlign:'left',
        fontSize:10,
        fontWeight:'bold',
        paddingLeft:10,
        
    },
    image:{
        
        // width:180, 
        height:280,
        borderRadius:5,
        flex:1
      
    },
    plot:{
        alignSelf:'center',
        textAlign:'justify',
        paddingTop:20

    }
})

export default DetailMovie;
