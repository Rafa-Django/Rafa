import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
    ScrollView
} from 'react-native';
import { COLORS,  fonts, themeStye, ProStyle} from '../components/theme'
import { APIContext, KeyContext, AuthContext } from "../../UserContext";
import { img , Icon} from '../components';
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
import GooglePayButton from '@google-pay/button-react';

const PromoteGPay = ({ navigation, route }) => {
    let co = colourTheme()
    const key = useContext(KeyContext)
    const APIcode = useContext(APIContext)
    const [Auth, setAuth] = useContext(AuthContext)
    const [payId, setpayId] = useState('')
    const [loading, setloading] = useState(true)
    const [price, setprice] = useState('5000')

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
        console.log(key)
        console.log("Working")
        await getValueFor(key)
        let prt_id = route.params.id
        console.log(Auth)


        // 192.168.8.1:8000       
        let body = JSON.stringify({ "userid": ids, "tradid": ids, "prtid": prt_id, "amount": price, "Purchaseid": "2151515fgbg1fb6gf14n" })
        fetch(APIcode + "Trader/Product/Promote/", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(res => {
                if (res.ok) {
                    console.log("Good")
                    console.log(body)
                    window.alert(
                        "Payement made",
                        "Success!",
                        [
                            {
                                text: "Ok",
                                onPress: () => { navigation.goBack() },
                            }])
                    return res.json()
                } else {
                    console.log("Bad")

                }
            })
            .then(json => {



            })
            .catch(error => { console.log(error); console.log(body) })
            .finally(() => setloading(false))
    }

    function Base() {
        return (
            <View style={{ justifyContent: 'center', flexDirection: "column", alignContent: 'center', alignItems: 'center', width: "90%" }}>
                <View>
                    <Text style={{ fontFamily: 'OpenSans', color: co.main_yellow, fontSize: 18, textAlign: 'center' }}>More you Promote, more customers you gain  </Text>
                </View>
                <View style={{ width: 250, height:250 }}>
                    <Image
                        source={img.PayAppIn}
                        resizeMode="contain"
                        style={{width: 240, height:240 }}
                    /></View>
                <View style={{ width: "100%", marginTop: 0,  alignItems: 'center' }}>

                    <Text style={{ ...fonts.Name_Product, color: co.main_yellow, textAlign: 'center' }}>Minimum payement is just 150.LKr, more you pay more reach</Text>
                </View>
                <View style={{ width: '100%', justifyConten: 'flex-start', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: "Inter", color: co.white, fontSize: 18 }}>Amount:</Text>

                    </View>
                    <View style={{ width: '60%',  textAlignVertical: 'top',justifyContent: 'center', alignItems: 'center', backgroundColor: co.main_red, borderRadius: 20, marginTop: 15 }}>

                        <TextInput
                            style={{ width: '90%',  color: co.white, justifyContent: 'center', alignItems: 'center',textAlignVertical: 'top', marginVertical: 5, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10 }}
                            returnKeyType='next'
                            value={price}
                            onChangeText={text => { setprice(text) }}
                            editable={true}
                            keyboardType='default' />
                    </View>

                </View>
                <View style={{ width: '100%', height: 100, marginTop: 0, marginHorizontal: 10, flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <GooglePayButton
                    environment="TEST"
                    paymentRequest={{
                        apiVersion: 2,
                        apiVersionMinor: 0,
                        allowedPaymentMethods: [
                        {
                            type: 'CARD',
                            parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                            },
                            tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                                gateway: 'example',
                                gatewayMerchantId: 'exampleGatewayMerchantId',
                            },
                            },
                        },
                        ],
                        merchantInfo: {
                        merchantId: '12345678901234567890',
                        merchantName: 'Demo Merchant',
                        },
                        transactionInfo: {
                        totalPriceStatus: 'FINAL',
                        totalPriceLabel: 'Total',
                        totalPrice: '100.00',
                        currencyCode: 'USD',
                        countryCode: 'US',
                        },
                    }}
                    onLoadPaymentData={paymentRequest => {
                        console.log('load payment data', paymentRequest);
                    }}
                    />

                    <TouchableOpacity style={{ ...themeStye.button, backgroundColor: co.black, height:50, width: 200, marginHorizontal: 20, marginTop: 25 }}
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
           <SafeAreaView style={{ width: '100%', justifyContent: 'flex-start', marginleft:10,alignItems: 'flex-start',  borderBottomEndRadius: 20, borderBottomLeftRadius: 20, paddingTop:10 }}>
           
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
            <ScrollView >
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    {Base()}
                </View>
                
            </ScrollView>
        </View>

    )
}


export default PromoteGPay