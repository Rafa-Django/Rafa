import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Dimensions,
} from 'react-native';

import { COLORS, themeStye, } from "../components/theme"
import { KeyContext, APIContext } from "../../UserContext";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, img } from '../components';

import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
const StorePurchases = ({ navigation, props }) => {
    let co = colourTheme()

    const key = useContext(KeyContext)
    const APIcode = useContext(APIContext)
    const [data, setdata] = useState('')
    const [Prodata, setProdata] = useState('')

    const [cost, setcost] = useState('')
    const [loading, setloading] = useState(true)

    let ids = ''

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

    async function APICost() {
        console.log(key)
        console.log("Working")
        await getValueFor(key)

        // 192.168.8.1:8000       
        let body = JSON.stringify({ "userid": ids, "tradid": ids })
        fetch(APIcode + "Trader/Product/cost/", {
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
                setcost(json)

            })
            .catch(error => { console.log(error); console.log(body) })

    }

    async function APIPrdt() {
        console.log(key)
        console.log("Working")
        await getValueFor(key)

        // 192.168.8.1:8000       
        let body = JSON.stringify({ "userid": ids, "tradid": ids })
        fetch(APIcode + "Trader/Product/Prdt/", {
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
                setdata(json)

            })
            .catch(error => { console.log(error); console.log(body) })

    }

    async function APIProPrdt() {
        console.log(key)
        console.log("Working")
        await getValueFor(key)

        // 192.168.8.1:8000       
        let body = JSON.stringify({ "userid": ids, "tradid": ids })
        fetch(APIcode + "Trader/Product/Promote/Prdt/", {
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
                setProdata(json)

            })
            .catch(error => { console.log(error); console.log(body) })

    }

    useEffect(() => {
        APICost(); APIPrdt(); APIProPrdt()
    }, [])

    async function APIAllPay() {
        console.log(key)
        console.log("Working")
        await getValueFor(key)

        // 192.168.8.1:8000       
        let body = JSON.stringify({ "userid": ids, "tradid": ids, "prtid": "null", "Purchaseid": "dpbokgmbkhgmnklghm" })
        fetch(APIcode + "Trader/Product/All/Purchase/", {
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
                APIPrdt()


            })
            .catch(error => { console.log(error); console.log(body) })

    }

    async function APISoloPay(prtid) {
        console.log(key)
        console.log("Working")
        await getValueFor(key)

        // 192.168.8.1:8000       
        let body = JSON.stringify({ "userid": 240, "tradid": 240, "prtid": prtid, "Purchaseid": "dpbokgmbkhgmnklghm" })
        fetch(APIcode + "Trader/Product/RE/Purchase/", {
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

                APIPrdt()

            })
            .catch(error => { console.log(error); console.log(body) })

    }

    function Base() {
        return (
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: co.home_sub, padding: 10, paddingVertical: 20, borderRadius: 50 }}>
                    <TouchableOpacity style={{ width: '100%', backgroundColor: co.main_yellow, borderRadius: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
                        // onPress={() => navigation.navigate('TradAddPrdt')}
                        >
                        <Text style={{ margin: 10, fontSize: 22, fontFamily: 'Lato', color: co.main_red }}>Add Products (250.LKR)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 15, width: '100%', backgroundColor: co.main_yellow, borderRadius: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
                        onPress={() => window.alert(
                            "Confirm Payement",
                            "Total cost" + { cost } + ".LKR",
                            [
                                {
                                    text: "Pay",
                                    onPress: () => { APIAllPay() },
                                }])}>
                        <Text style={{ margin: 10, fontSize: 20, fontFamily: 'Lato', color: co.main_red }}>Renew Products ({cost}.LKR)</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, borderWidth: 2, width: '100%', borderColor: co.main_blue, margin: 0, height: 1, }}></View>

            </View>
        )
    }

    function PurchPrdt() {
        const wi = Dimensions.get('screen').width
        const renderItem_products = ({ item }) => {
            return (
                <View style={{ width: '90%', marginVertical: 10, flexDirection: 'row', paddingVertical: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, backgroundColor: co.main_yellow, borderRadius: 50 }}>
                    <View style={{ width: '40%' }}>
                        <Image
                            source={{ uri: APIcode + item.Pic1 }}
                            resizeMode='cover'
                            style={{ width: "90%", aspectRatio: 1, borderRadius: 50, }} />
                    </View>
                    <View style={{ width: '55%', marginLeft: 10 }}>
                        <View style={{ width: '100%' }}>
                            <Text style={{ fontSize: 20, color: co.main_red, fontFamily: 'Lato' }}>{item.Prdt_name}</Text>
                        </View>
                        <View style={{ width: '100%' }}>
                            <Text style={{ fontSize: 18, color: co.sub_red, fontFamily: 'Ubuntu' }}>Active till: {item.getend}</Text>
                        </View>
                        <TouchableOpacity style={{ marginTop: 5, width: '80%', padding: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: co.main_red, borderRadius: 50 }}
                            onPress={() => APISoloPay(item.id)}>
                            <Text style={{ fontFamily: 'Roboto', color: co.yellow_white, fontSize: 15 }}>Renew (250LKR)</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            )
        }


        return (
            <View style={{ width: wi, marginVertical: 20, backgroundColor: co.sub_black, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={data}

                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={renderItem_products}
                    contentContainerStyle={{ marginHorizontal: 20, width: wi, justifyContent: 'center' }}
                />
                <View style={{ marginVertical: 20, borderWidth: 2, width: '100%', borderColor: co.main_blue, margin: 0, height: 1, }}></View>
            </View>
        )
    }

    function Promote() {
        return (
            <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 30, alignContent: 'center', backgroundColor: co.home_sub, borderRadius: 40 }}>
                <View style={{ width: '90%', marginHorizontal: 20, marginTop: 10 }}>
                    <Text style={{ fontFamily: 'Lato', color: co.main_red, fontSize: 25 }}>What is Promote?</Text>
                </View>
                <View style={{ width: '90%', marginHorizontal: 10, marginTop: 5, marginBottom: 10 }}>
                    <Text style={{ fontFamily: 'Raleway', fontSize: 15, color: co.sub_red }}>Our company, as we provide you with solutions for creating your online digital store, now can promote your Product too! We can help you reach more customers in our software. We work by showing your products more frequently to users who will like your products with conditions applied. The more you promote your product here, the more customers will get to know about your service. We are literally advertising your products in a way in which your customers will love.</Text>
                </View>
            </View>
        )
    }

    function ProPrdt() {
        const wi = Dimensions.get('screen').width
        const renderItem_products = ({ item }) => {
            return (
                <View style={{ width: '90%', marginVertical: 10, flexDirection: 'row', paddingVertical: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, backgroundColor: co.main_yellow, borderRadius: 50 }}>
                    <View style={{ width: '40%' }}>
                        <Image
                            source={{ uri: APIcode + item.Pic1 }}
                            resizeMode='cover'
                            style={{ width: "90%", aspectRatio: 1, borderRadius: 50, }} />
                    </View>
                    <View style={{ width: '55%', marginLeft: 10 }}>
                        <View style={{ width: '100%' }}>
                            <Text style={{ fontSize: 20, color: co.main_red, fontFamily: 'Lato' }}>{item.Prdt_name}</Text>
                        </View>
                        <View style={{ width: '100%' }}>
                            <Text style={{ fontSize: 18, color: co.sub_red, fontFamily: 'Ubuntu' }}>Promote Balance: {item.balance}</Text>
                        </View>
                        <TouchableOpacity style={{ marginTop: 5, width: '80%', padding: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: co.main_red, borderRadius: 50 }}
                            // onPress={() => { navigation.navigate('PromoteGPay', { id: item.id }) }}
                            >
                            <Text style={{ fontFamily: 'Roboto', color: co.yellow_white, fontSize: 17 }}>Promote</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            )
        }


        return (
            <View style={{ width: wi, marginVertical: 20, backgroundColor: co.sub_black, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={Prodata}

                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={renderItem_products}
                    contentContainerStyle={{ marginHorizontal: 20, width: wi, justifyContent: 'center' }}
                />

            </View>
        )
    }



    return (
                    <View style={{ ...themeStye.container, backgroundColor:co.sub_black }}>
      <StatusBar style="light" backgroundColor={co.sub_black} />
      <StatusBar style="light" backgroundColor="sub_black"/>
            <SafeAreaView style={{ ...themeStye.HeadView, height: "15%", backgroundColor: co.sub_yellow, borderBottomEndRadius: 20, borderBottomLeftRadius: 20 }}>
            <View style={{flex:1 ,width:"100%", height:90, flexDirection:'row', marginTop:10}}>
            <TouchableOpacity style={{flex:1, height:90, width:100, alignContent:'flex-start', justifyContent:'center', marginHorizontal:15}}
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
                <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', width: '100%', }}>
                    {Base()}
                    {PurchPrdt()}
                    {Promote()}
                    {ProPrdt()}
                </View>

            </ScrollView>
        </View>

    )
}



export default StorePurchases