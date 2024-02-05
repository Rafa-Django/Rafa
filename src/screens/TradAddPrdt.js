import React, { useContext, useState } from 'react';
import {

    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Alert,

} from 'react-native';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
import { COLORS,  fonts, themeStye, ProStyle} from  '../components/theme'
import { KeyContext, APIContext } from "../../UserContext";
import { img, Icon } from '../components';
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const TradAddPrdt = ({ navigation }) => {
    let co = colourTheme()
    const key = useContext(KeyContext)
    const APIcode = useContext(APIContext)

    const [loading, setloading] = useState(true)
    const [payId, setpayId] = useState('')

    let ids = '';
    async function getValueFor(key) {
      let result = await AsyncStorage.getItem(key);
    
      if (result) {
        ids = result;
        ids = result;
        console.log(ids);
        console.log(result);
        return result;
      } else {
        alert('No values stored under that key.');
      }
    }

    async function APIBuy() {

        await getValueFor(key)



 
        let body = JSON.stringify({ "userid": ids, "tradid": ids, "Purchaseid": "21511515fgbg1fb6gf14n" })
        fetch(APIcode + "CtrTrad/Purchase/", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(res => {
                if (res.ok) {

                    window.alert(
                        "Product Purchased",
                        "Wish you all the best", 
                        
                        [
                            {
                                text: "Ok",
                                onPress: () => {navigation.goBack()},
                            }])
    
                    return res.json()
                } else {


                }
            }).catch(error => {})
            .finally()
    }

    function Base() {
        return (
            <View style={{ justifyContent: 'center', flexDirection: "column", alignContent: 'center', alignItems: 'center', width: "90%", height: "90%" }}>
                <View>
                    <Text style={{ fontFamily: 'OpenSans', color: co.main_yellow, fontSize: 18, textAlign: 'center' }}>Buy More Products, put products your customers love. The More Products You Have More You Earn</Text>
                </View>
                <View style={{ width: 300, height: 300 }}>
                    <Image
                        source={img.PayAppIn}
                        resizeMode="contain"
                        style={{ width: 300, height: 300 }}
                    /></View>
                <View style={{ width: "100%", marginTop: 0, height: 50, alignItems: 'center' }}>

                    <Text style={{ ...fonts.Name_Product, color: co.main_yellow, textAlign: 'center' }}>It is only 250.LKR for 30 days, NO EXTRA FEE!</Text>
                </View>
                <View style={{ width: '100%', height: 100, marginTop: 0, marginHorizontal: 10, flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                    <Image
                        source={img.GPAY}
                        resizeMode="contain"
                        style={{ height: 90, width: 90 }}
                    />
                    <TouchableOpacity style={{ ...themeStye.button, backgroundColor: co.black, height: 40, width: 200, marginHorizontal: 20, marginTop: 25 }}
                        onPress={() => APIBuy()}>
                        <Text style={{ fontFamily: 'Ubuntu', fontSize: 15, alignItems: 'center', color: co.white }}>Pay With Google Pay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
                    <View style={{ ...themeStye.container, backgroundColor:co.sub_black }}>
      <StatusBar style="light" backgroundColor={co.sub_black} />
      <StatusBar style="light" backgroundColor="sub_black"/>
            <SafeAreaView style={{ ...themeStye.HeadView, marginTop: 15 , height:'15%'}}>
            <View style={{...ProStyle.Main_header}}>
        <TouchableOpacity style={{...ProStyle.TO, }}
    onPress={() => navigation.goBack()}>
        <Image
        source={Icon.Back}
        resizeMode='contain'
        style={{...ProStyle.To_image, tintColor:co.white}}
        />
        </TouchableOpacity>
        
    
    </View>
    </SafeAreaView>
        <View style={{justifyContent:'center', alignContent:'center', alignItems:'center'}}>
            {Base()}
        </View>    
    </View>

    )
}

export default TradAddPrdt