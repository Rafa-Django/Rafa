import React from 'react';
import {
        View ,
        Image, 
        TouchableOpacity, 
        } from 'react-native';
import { ProStyle } from'../components/theme'
import { Icon } from '../components';


export default function BackCartHeader({navigation}){
    return(
    <View style={{...ProStyle.Main_header}}>
        <TouchableOpacity style={{...ProStyle.TO}}
    onPress={() => navigation.goBack()}>
        <Image
        source={Icon.Back}
        resizeMode='contain'
        style={{...ProStyle.To_image, tintColor:co.white}}
        />
        </TouchableOpacity>
    
    </View>
    )

}