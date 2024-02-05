import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Linking, Platform,
    Alert
} from 'react-native';

import { COLORS, ProStyle, OrdViStyle, themeStye, homeStyle } from '../components/theme'
import { Icon } from '../components';
import { KeyContext, APIContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
import icons from '../components/icons';

const TradAccDelView = ({ navigation, route }) => {
    let co = colourTheme()
    const key = useContext(KeyContext)
    const APIcode = useContext(APIContext)
    const [check, setCheck] = useState('')
    const [item, setitem] = useState('')
    const [loading, setloading] = useState(true)

    let COpk = route.params.COpk
    let pk = route.params.pk
    let tot_it = route.params.tot_it
    let tot = route.params.tot
    let cos = route.params.co

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


    async function APICheckDetails() {
        console.log(key)
        console.log("Working")
        // await getValueFor(key)
        console.log(COpk)

        // 192.168.8.1:8000       
        let body = JSON.stringify({ "COid": COpk })
        fetch(APIcode + "Trader/Cart/Checkdata/", {
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
                    return res.json()
                } else {
                    console.log("Bad")

                }
            })
            .then(json => {
                console.log(json)
                setCheck(json)
            })
            .catch(error => { console.log(error); console.log(body) })
            .finally(() => setloading(false))
    }

    async function APIitem() {
        console.log(pk)
        console.log("Working")
        // await getValueFor(key)

        // 192.168.8.1:8000       
        let body = JSON.stringify({ "AIid": pk })
        fetch(APIcode + "Trader/Cart/Approved/Item/", {
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
                    return res.json()
                } else {
                    console.log("Bad")
                    console.log(body)

                }
            })
            .then(json => {
                console.log(json)
                setitem(json)
            })
            .catch(error => { console.log(error); console.log(body) })
            .finally(() => setloading(false))
    }

    useEffect(() => {
        APICheckDetails(); APIitem()
    }, [])

    useEffect(() => {
        navigation.addListener('focus', () => {
            APICheckDetails(); APIitem()
        });
    }, [])

    const dialCall = () => {

        let phoneNumber = phone;

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${' + phone + '}';
        }
        else {
            phoneNumber = 'telprompt:${' + phone + '}';
        }

        Linking.openURL(phoneNumber);
    };

    async function APIAccept() {
        console.log(pk)
        console.log("Working")

        let body = JSON.stringify({ "AIid": pk })
        fetch(APIcode + "Trader/Cart/Trad/DelAcc/", {
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
                        "Message Passed to Customer",
                        "Wait till your customer confirms, and the order gets deleted in your list.",
                        [
                            {
                                text: 'Ok',
                                onPress: () => { }
                            }
                        ]
                    )
                    navigation.goBack() 
                    return res.json()
                } else {
                    console.log("Bad")
                    console.log(body)

                }
            })

            .catch(error => { console.log(error); console.log(body) })
            .finally(() => setloading(false))
    }


    function CustInfo() {
        return (
            <View style={{ ...OrdViStyle.Vi1 }}>
                <View>
                    <Text style={{ ...OrdViStyle.MainText, color:co.sub_red }}>Customer Info</Text>
                </View>
                <View style={{ ...OrdViStyle.Vi2 }}>
                    <Text style={{ ...OrdViStyle.SubText, color:co.main_yellow }}>Name: {check.CustomerName}</Text>
                    <Text style={{ ...OrdViStyle.SubText, color:co.main_yellow }}>Address: {check.accurate_address}</Text>
                    <Text style={{ ...OrdViStyle.SubText, color:co.main_yellow }}>Phone: {check.phone}</Text>
                    <Text style={{ ...OrdViStyle.SubText, color:co.main_yellow }}>email: {check.gmail}</Text>
                    <Text style={{ ...OrdViStyle.SubText, color:co.main_yellow }}>payement: {check.payment}</Text>
                    <Text style={{ ...OrdViStyle.SubText, color:co.main_yellow }}>Date: {check.date_added}</Text>
                </View>

                <TouchableOpacity style={{ ...OrdViStyle.CallTouch }}
                    onPress={() => dialCall()}>
                    <Image
                        source={Icon.call}
                        resizeMode='contain'
                        style={{  tintColor: co.white, margin: 15, width:50, height:50 }}
                    />
                </TouchableOpacity>


                <View style={{ ...OrdViStyle.Vi3 }}>
                    <View style={{ width: "40%", marginTop: 5, marginHorizontal: 10, backgroundColor: co.sub_red, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.yellow_white, margin: 10 }}>Total: {tot}</Text>
                    </View>
                    <View style={{ width: "40%", marginTop: 5, marginHorizontal: 10, backgroundColor: co.sub_red, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.yellow_white, margin: 10 }}>Quantity: {tot_it}</Text>
                    </View>

                </View>

                <View style={{ width: '90%', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: co.main_red, fontFamily: 'Lato' }}>*Ask your customer the code to verify them, and wait till they approve that they have recived the product</Text>
                    <View style={{ flexdirection: 'row', marginTop: 10, backgroundColor: co.sub_red, justifyContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 40 }}>
                        <Text style={{ color: co.yellow_white, fontFamily: 'Ubuntu', fontSize: 15 }}>Code: {cos}</Text>

                    </View>
                    <TouchableOpacity style={{ marginTop: 20, backgroundColor: co.main_red, borderRadius: 40, justifyContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 25 }} onPress={() => APIAccept()}>
                        <Text style={{ fontFamily: 'Saira', color: co.yellow_white, fontSize: 20 }}>Delivered</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ ...themeStye.borderLine, marginTop: 10, backgroundColor: co.white, borderColor: co.white, marginBottom: 10 }}></View>
            </View>
        )
    }


    const renderItem = ({ item }) => {
        return (
            <View style={{ ...OrdViStyle.RVi1, backgroundColor:co.main_yellow }}>
        <View style={{ ...OrdViStyle.Rvi2 }}>
          <View style={{ width: "50%" }}>
            <Image
              source={{ uri: APIcode + item.get_productImage }}
              resizeMode='cover'
              style={{ ...OrdViStyle.ItImage }}
            />
          </View>
          <View style={{ ...OrdViStyle.RVi3 }}>
            <Text style={{ ...homeStyle.PN, fontSize: 25 }}>{item.get_productName}</Text>
          </View>
        </View>
        <View style={{ ...OrdViStyle.RVi4 }}>
          <View style={{ ...OrdViStyle.RVi5 }}>
            <Text style={{ fontFamily: "Ubuntu", fontSize: 18 }}>Quantity:{item.quantity}</Text>
          </View>
          <View style={{ ...OrdViStyle.RVi6 }}>
            <Text style={{ marginHorizontal: 20, fontFamily: "Ubuntu", fontSize: 18, }}>Total:{item.get_total}.LKR</Text>
          </View>
        </View>
      </View>
        )
    }



    function Catogeries() {
        return (
            <View style={{ ...OrdViStyle.MainView }}>
                <FlatList
                    data={item}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ alignContent: "center", marginHorizontal: 10, width: "100%", alignItems: 'center', justifyContent: 'center' }}
                />
            </View>
        )

    }


    return (
                    <View style={{ ...themeStye.container, backgroundColor:co.sub_black }}>
      <StatusBar style="light" backgroundColor={co.sub_black} />
      <StatusBar style="light" backgroundColor="sub_black"/>
      <SafeAreaView style={{ ...themeStye.HeadView, paddingVertical:10, backgroundColor: co.sub_yellow, borderBottomEndRadius: 20, borderBottomLeftRadius: 20, }}>
        <View style={{...ProStyle.Main_header}}>
          <TouchableOpacity style={{...ProStyle.TO, backgroundColor:co.main_blue_main}}
           onPress={() => navigation.goBack()}>
          <Image
          source={Icon.Back}
          resizeMode='contain'
          style={{...ProStyle.To_image,  tintColor:co.white}}
          />
          </TouchableOpacity>
      
      </View>
      </SafeAreaView>
            <ScrollView style={{ width: '100%' }}>
                {CustInfo()}
                {Catogeries()}
            </ScrollView>
        </View>

    )
}



export default TradAccDelView