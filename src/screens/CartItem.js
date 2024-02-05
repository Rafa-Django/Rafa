import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    ActivityIndicator,
    Platform, Linking
} from 'react-native';
import { COLORS, themeStye, homeStyle, ProStyle } from '../components/theme';
import { Icon } from "../components"
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
import { KeyContext, APIContext } from "../../UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const CartItem = ({ route, navigation }) => {
    let co = colourTheme()
    const key = useContext(KeyContext)
    const APIcode = useContext(APIContext)
    const [data, setdata] = useState('')
    const [loading, setloading] = useState(true)

    let OB_id = route.params.pk
    let Name = route.params.CM
    let Pic = route.params.PRO
    let TradPhone = route.params.Num

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

    async function APIMainCart() {
        console.log(key)
        console.log("Working")
        OB_id = route.params.pk
        console.log(OB_id)
        await getValueFor(key)

        // 192.168.8.1:8000       
        let body = JSON.stringify({ "OBid": OB_id })
        fetch(APIcode + "Base/Cart/OrderItem/", {
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
                setdata(json)

            })
            .catch(error => { console.log(error); console.log(body) })
            .finally(() => setloading(false))
    }
    useEffect(() => {
        APIMainCart()
    }, [])

    useEffect(() => {
        navigation.addListener('focus', () => {
            APIMainCart
        });
    }, [])


    async function AddQuantity(pk) {
        console.log(key)
        console.log("Working")
        console.log(pk)
        await getValueFor(key)

        // 192.168.8.1:8000       
        let body = JSON.stringify({ "OIid": pk })
        fetch(APIcode + "Base/Cart/AddProduct/", {
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
                setdata(json)

            })
            .catch(error => { console.log(error); console.log(body) })
            .finally(() => setloading(false))

    }

    async function ReduceQuantity(pk) {
        console.log(key)
        console.log("Working")
        console.log(pk)
        await getValueFor(key)

        // 192.168.8.1:8000       
        let body = JSON.stringify({ "OIid": pk })
        fetch(APIcode + "Base/Cart/RedProduct/", {
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
                setdata(json)

            })
            .catch(error => { console.log(error); console.log(body) })
            .finally(() => setloading(false))

    }

    function ComHeader() {
        return (
            <View style={{ marginRight: 20, backgroundColor: co.main_yellow, flexDirection: 'row', borderRadius: 50, marginHorizontal: 10, width: '80%', marginTop: 15, alignItems: 'center', justifyContent: 'flex-start' }}>
                <View style={{ flex: 1, marginHorizontal: 15, width: '40%', marginVertical: 15, alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Image
                        source={{ uri: APIcode + Pic }}
                        resizeMode='cover'
                        style={{ width: "70%", aspectRatio: 1, borderRadius: 20 }}
                    /></View>
                <View style={{
                    flex: 2, width: '40%',
                    alignItems: 'center', justifyContent: 'center', marginRight: 10
                }}>
                    <Text style={{ fontFamily: 'Saira', fontSize: 25 }}>{Name}</Text>
                </View>

            </View>

        )
    }

    function ButCart() {
        const dialCall = () => {

            let phoneNumber = TradPhone;

            if (Platform.OS === 'android') {
                phoneNumber = 'tel:${' + TradPhone + '}';
            }
            else {
                phoneNumber = 'telprompt:${' + TradPhone + '}';
            }

            Linking.openURL(phoneNumber);
        };

        console.log(OB_id)
        return (
            <View style={{ marginTop: 10, marginHorizontal: 20, flexDirection: 'row', aspectRatio: 10 / 2, width: '100%', justifyContent: 'center', alignItems: 'flex-start', justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity style={{ marginHorizontal: 0, height: '60%', width: "25%", backgroundColor: co.main_red, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}
                    onPress={() => navigation.navigate('CheckOut', { OB: OB_id })}>
                    <Text style={{ fontFamily: 'OpenSans', fontWeight: 'bold', fontSize: 18, color: co.white }}>CheckOut</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: "60%", width: '30%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
                    onPress={() => dialCall()}>
                    <Image
                        source={Icon.call}
                        resizeMode='contain'
                        style={{ width: '100%', aspectRatio: 1, tintColor: co.white }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 0, height: '60%', width: "35%", backgroundColor: co.main_red, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans', fontWeight: 'bold', fontSize: 18, color: co.white }}>Cancal  Order</Text>
                </TouchableOpacity>
            </View>
        )
    }


    function GetItems() {
        const renderItem = ({ item }) => {
            return (
                <View style={{ marginTop: 10, borderRadius: 50, width: width-100,backgroundColor: co.main_yellow, }}>
                    <View style={{ width: '90%', flexDirection: 'row', marginTop: 10, marginHorizontal: 20 }}>
                        <View style={{ width: "50%", }}>
                            <Image
                                source={{ uri: APIcode + item.get_productImage }}
                                resizeMode='cover'
                                style={{ width: "60%", aspectRatio: 1, borderRadius: 20 }}
                            />
                        </View>
                        <View style={{ width: "40%", alignContent: 'flex-end', justifyContent: 'center' }}>
                            <Text style={{ ...homeStyle.PN, fontSize: 25 }}>{item.get_productName}</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 20, width: '90%', flexDirection: 'row', justifyContent: 'center', marginHorizontal: 0, }}>
                        <View style={{ flexDirection: 'row', width: "40%", justifyContent: 'center', alignItems: 'flex-start', alignContent: 'flex-start' }}>
                            <TouchableOpacity style={{ aspectRatio: 1, width: "30%", backgroundColor: co.main_red, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, justifyContent: 'center', alignContent: 'center' }}
                                onPress={() => AddQuantity(item.pk)}>

                                <Image
                                    source={Icon.plus}
                                    resizeMode='center'
                                    style={{ marginLeft: 5, width: "80%", height: "80%", tintColor: co.white }}
                                />

                            </TouchableOpacity>
                            <View style={{ aspectRatio: 1, width: "30%", backgroundColor: co.main_red, justifyContent: 'center', alignContent: 'center' }}>
                                <Text style={{ marginLeft: 8, fontFamily: 'OpenSans', color: co.white, fontSize: 15 }}>{item.quantity}</Text>
                            </View>
                            <TouchableOpacity style={{ aspectRatio: 1, width: "30%", backgroundColor: co.main_red, borderTopRightRadius: 20, borderBottomRightRadius: 20, justifyContent: 'center', alignContent: 'center' }}
                                onPress={() => ReduceQuantity(item.pk)}>
                                <Image
                                    source={Icon.minus}
                                    resizeMode='contain'
                                    style={{ marginRight: 5, width: "80%", height: "80%", tintColor: co.white }}
                                />
                            </TouchableOpacity>

                        </View>
                        <View style={{ marginHorizontal: 10, width: "40%", justifyContent: 'center', alignItems: 'flex-start', alignContent: 'flex-start' }}>
                            <Text style={{ marginHorizontal: 0, fontFamily: "Ubuntu", fontSize: 18 }}>Total: {item.get_total}.LKR</Text>
                        </View>
                    </View>
                </View>
            )
        }

        return (

            <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ alignContent: "center", alignItems: 'center', justifyContent: 'center', width: width }}
            />

        )

    }

    return (
        <View style={{ ...themeStye.container, backgroundColor:co.sub_black, padding: 0 }}>
             <StatusBar style="light" backgroundColor={co.sub_black} />
             <StatusBar style="light" backgroundColor={co.sub_black} />
            <SafeAreaView style={{ ...themeStye.HeadView }}>
            <View style={{...ProStyle.Main_header}}>
        <TouchableOpacity style={{...ProStyle.TO, backgroundColor:co.main_blue_main, marginTop:8,}}
    onPress={() => navigation.goBack()}>
        <Image
        source={Icon.Back}
        resizeMode='contain'
        style={{...ProStyle.To_image, tintColor:co.white}}
        />
        </TouchableOpacity>
    
    </View>
            </SafeAreaView>
            <ScrollView style={{ width: "100%" }}>
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', width: "100%" }}>
                    {ComHeader()}
                    {ButCart()}
                    {GetItems()}
                </View>
            </ScrollView>
        </View>
    )
}

export default CartItem