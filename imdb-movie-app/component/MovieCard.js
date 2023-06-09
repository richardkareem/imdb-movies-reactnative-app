import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native';

const MovieCard = ({data}) => {
    const tes = ()=>{
        console.log(data);
    }
    return (
        <SafeAreaView>
                <Text>Click Here</Text>
            <Text>{data.title}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default MovieCard;
