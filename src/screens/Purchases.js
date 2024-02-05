import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import {  img, Icon  } from "../components"
import { COLORS,  themeStye, } from "../components/theme"

import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';

const Purchases = ({ navigation, props }) => {
    let co = colourTheme()


    function Base() {
        return (
            <View style={{ justifyContent: 'center',  padding: 15, alignContent: 'center', alignItems: 'center', width: "90%", height: undefined }}>
                <Text style={{ color: co.main_yellow, fontFamily: 'OpenSans', fontSize: 25, textAlign: 'center' }}>It's Time for you to fully build your digital Store!</Text>

                <View style={{ width: '80%', alignContent: "center", justifyContent: 'center', alignItems: 'center', aspectRatio: 1 }}>
                    <Image
                        source={img.Purchases}
                        resizeMode="center"
                        style={{ width: '100%', height: '100%' }}
                    /></View>
                <View style={{ width: "100%", marginTop: 10, alignItems: 'center' }}>
                    <Text style={{ color: co.main_yellow, fontSize: 18, fontFamily: 'Lato', textAlign: 'center' }}>Increase the number of product available.</Text>
                    <Text style={{ color: co.main_yellow, fontSize: 18, fontFamily: 'Lato', textAlign: 'center' }}> Promote Your Products, which will definitely increase your SALES!</Text>
                </View>
                <View style={{ width: '100%', marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: '45%', backgroundColor: co.main_yellow, borderRadius: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
                        onPress={() => navigation.navigate('TradAddPrdt')}
                        >
                        <Text style={{ margin: 5, fontSize: 18, fontFamily: 'Ubuntu', color: co.main_red }}>Add Products!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '45%', backgroundColor: co.main_yellow, borderRadius: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
                        onPress={() => navigation.navigate('StoreProduct')}>
                        <Text style={{ margin: 5, fontSize: 18, fontFamily: 'Ubuntu', color: co.main_red }}>Promote</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    return (
                    <View style={{ ...themeStye.container, backgroundColor:co.sub_black }}>
      <StatusBar style="light" backgroundColor={co.sub_black} />
      <StatusBar style="light" backgroundColor="sub_black"/>
            <SafeAreaView style={{ ...themeStye.HeadView,  backgroundColor: co.sub_yellow, borderBottomEndRadius: 20, borderBottomLeftRadius: 20 }}>
            <View style={{width:"100%",  flexDirection:'row', marginTop:10}}>
            <TouchableOpacity style={{ height:90, width:100, alignContent:'flex-start', justifyContent:'center', marginHorizontal:15}}
            onPress={()=>navigation.openDrawer()}>
                <Image
                source={Icon.menu}
                resizeMode="contain"
                style={{width:50, tintColor:co.main_red}}
                />
            </TouchableOpacity>
            <View style={{height:90, width:200, alignContent:'center', justifyContent:'center', alignItems:'center'}}>
            <Image
            source={img.Logo_Text}
            resizeMode='contain'
            style={{width:150, }}
            
          />
            </View>
        </View>
            </SafeAreaView>
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', width: '100%', height: '100%' }}>
                    {Base()}
                </View>

            </ScrollView>
        </View>

    )
}



export default Purchases