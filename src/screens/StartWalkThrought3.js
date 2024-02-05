import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList
} from 'react-native';

import { COLORS, ProStyle, themeStye, } from '../components/theme';
import { img, Icon } from '../components';
import { Dimensions } from "react-native";

import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
const { width, height } = Dimensions.get("window");


const StartWalkThrought3 = ({ navigation }) => {
    let co = colourTheme()
    function Render() {
        return(
            <View style={{ justifyContent: 'center', flexDirection: "column", alignContent: 'center', alignItems: 'center', width: "90%", height: 600 }}>
            <View style={{ width: "80%", aspectRatio:1, alignContent:'center', justifyContent:'center', alignItems:'center' }}>
            <Image
            source={img.Shop}
            resizeMode="contain"
            style={{width:"90%", aspectRatio:1, flex:1}}/></View>
            <View style={{flexDirection:"row", justifyContent:'center', alignContent:'center', alignItems:'center', marginVertical:20}}>
                <View style={{width:10, height:10, borderRadius:100, backgroundColor:co.main_yellow, marginRight:20 }}></View>
                <View style={{width:10, height:10, borderRadius:100, backgroundColor:co.main_yellow}}></View>
                <View style={{width:15, height:15, borderRadius:100, backgroundColor:co.main_yellow, marginLeft:20  }}></View>
            </View>
            <View style={{ width: "100%", marginTop: 10,  alignItems: 'center' }}>
            <Text style={{fontFamily:"OpenSans", color:co.main_yellow, fontSize:25}}>Brand your Store</Text>
                    <Text style={{fontFamily:"Raleway", color:co.main_yellow, fontSize:20, textAlign:'center'}}>Start your digital store here, to start your industry </Text>

            </View>
            <TouchableOpacity style={{ ...themeStye.button, backgroundColor: co.main_red,  paddingHorizontal:20, paddingVertical:5 }}
                onPress={()=>navigation.navigate("PermissionScreen")}>
                <Text style={{ fontFamily: 'Ubuntu', fontSize: 20, color: co.black }}>Next</Text>
                </TouchableOpacity>
        </View>

        )
    }

    return (
                    <View style={{ ...themeStye.container, backgroundColor:co.sub_black }}>
      <StatusBar style="light" backgroundColor={co.sub_black} />
      <StatusBar style="light" backgroundColor="sub_black"/>
            <SafeAreaView style={{ height: "100%", width: "100%", alignContent: "center", alignItems: 'center', justifyContent: 'center' }}>
                {Render()}
            </SafeAreaView>
        </View>
    );
};

export default StartWalkThrought3