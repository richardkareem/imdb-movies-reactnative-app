import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {View, StyleSheet, SafeAreaView, FlatList, Text, Image} from 'react-native';
import instance from '../config/api';


const ReviewScreen = ({route}) => {

    const idBms = route.params;
    const { id, title, image } = idBms;

    const [textShown, setTextShwon ] = useState(false);
    const [lengthMore, setLengthMore ] = useState(false);

    const [review, setReview] = useState([]);

    const fetchReview = async() =>{
        // console.log(search)
        try {
            const {data, status} = await instance.get(`/Reviews/k_0knx3zm6/${id}`)
            const { items } = data;
            if(status === 200){
                // console.log(data);
              
                setReview(items);
            }else{
                throw new Error('something wrong with server');
            }
           
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        console.log(" Masuk Review Screen");
        // console.log(review);
        fetchReview();
    },[])
    
    //cek panjang textnya 
    const onTextLayout = useCallback(e =>{
        setLengthMore(e.nativeEvent.lines.length >=4 ); // true/false
        // console.log(e.nativeEvent.lines.length >=4 );
        // console.log(e.nativeEvent.lines);
    }, [])

    //toggle show text atau hide text
    const toggleNumberOfLines =()=>{
        setTextShwon(!textShown);
    }

    return (
        <SafeAreaView>
            <View style={{ flexDirection:'row', paddingTop:10, width:'80%', alignSelf:'center' }}>
                <Image source={{ uri:image }} style={[ styles.image ]} />
                <Text style={{ padding:10, fontWeight:'bold' }}>{title}'s Review</Text>
            </View>
            <FlatList
            data={review}
            renderItem={({ item })=>(
               <View style={{ flex:1, width:'80%', backgroundColor:'#f4f4f4', alignSelf:'center'}} >
               
                   <Text style={{ fontWeight:'bold', paddingTop:10 }}>{item.title}</Text>
                   <Text style={{ fontSize:10 }} >Username:{item.username}</Text>               
                   <Text 
                   style={{ paddingTop:10 }}
                   //component untuk buat readmore
                   onTextLayout={onTextLayout}
                   numberOfLines={textShown? undefined : 4}
                   >{item.content}</Text>
                   {
                    // conditional rendering
                   lengthMore ? <Text
                   onPress={toggleNumberOfLines}
                   style={{ paddingTop:10, color:'blue'}}>{textShown ?'Read Less...' :'Read More...'} </Text>
                   :
                   null
                   }
               </View>
                
            )}
            />
        </SafeAreaView>
         
        
    );
}

const styles = StyleSheet.create({
    image: {
        width: 60, 
        height: 70,
    }
})

export default ReviewScreen;
