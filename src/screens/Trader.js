import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from 'react-native';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
import { img , Icon} from '../components';
import { COLORS, fonts, themeStye } from '../components/theme';
const Trader = ({ navigation }) => {
    let co = colourTheme()
    function Base() {
        return (
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: "90%", height:'100%' }}>
                <View style={{ width: "60%",aspectRatio:1, justifyContent: 'center', alignContent: 'center', alignItems: 'center',}}>
                    <Image
                        source={img.sTOREIMG}
                        resizeMode="contain"
                        style={{ width:'100%', aspectRatio:1 }}
                    /></View>
                <View style={{ width: "100%", marginTop: 20,  alignItems: 'center' }}>
                    <Text style={{ ...fonts.Name_Product, color: co.main_yellow }}>Create Your Own Digital Store!</Text>
                    <Text style={{ ...fonts.Name_Product, color: co.main_yellow, fontSize: 15 }}>Starter Package is completly FREE</Text>
                </View>
                <TouchableOpacity style={{ ...themeStye.button, backgroundColor: co.main_red, height: 40, width: 100 }}
                    onPress={() => navigation.navigate('CrtTrader')}
                    >
                    <Text style={{ fontFamily: 'Ubuntu', fontSize: 22, alignItems: 'center', color: co.white }}>Create</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
                    <View style={{ ...themeStye.container, backgroundColor:co.sub_black }}>
      <StatusBar style="light" backgroundColor={co.sub_black} />
      <StatusBar style="light" backgroundColor="sub_black"/>
            <SafeAreaView style={{ height: "100%", width: "100%", alignContent: "center", alignItems: 'center', justifyContent: 'center' }}>
                {Base()}
            </SafeAreaView>
        </View>

    )
}


export default Trader