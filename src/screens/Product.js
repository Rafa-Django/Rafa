
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

import { COLORS, fonts, themeStye, ProStyle } from "../components/theme"
import {  KeyContext, APIContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { img, Icon } from '../components';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
const Product = ({ route, navigation }) => {
    let co = colourTheme()

    const key = useContext(KeyContext)
    const APIcode = useContext(APIContext)
    const [loading, setloading] = useState(true)
    const [data, setdata] = useState('')
    const [pic, setpic] = useState('')
    let prt_id = route.params.id

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

    async function APIProductsSolo() {
        console.log(key)
        console.log("Working")
        await getValueFor(key)

        console.log(prt_id)

        let body = JSON.stringify({ "prtid": prt_id, "usid": ids })
        fetch(APIcode + "Base/Home/solo/", {
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
                setpic([{ id: 1, Image: json.Pic1 }, { id: 2, Image: json.Pic2 }, { id: 3, Image: json.Pic3 }])
            })
            .catch(error => { console.log(error); console.log(body) })
            .finally(() => setloading(false))
    }
    useEffect(() => {
        APIProductsSolo()
    }, [])

    useEffect(() => {
        navigation.addListener('focus', () => {
            APIProductsSolo()
        });
    }, [])

    async function AddCart(prtid) {
        console.log("Working")
        console.log(prtid)
        await getValueFor(key)

        let body = JSON.stringify({ "Usid": ids, "Prdtid": prtid })
        fetch(APIcode + "Base/Cart/", {
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
                // setdata(json)

            })
            .catch(error => { console.log(error); console.log(body) })
        // .finally(()=>setloading(false))
    }

    async function LikePrt(Prdtid) {
        console.log("Working")
        console.log(Prdtid)
        await getValueFor(key)

        let body = JSON.stringify({ "Usid": ids, "Prdtid": Prdtid })
        fetch(APIcode + "/Base/Product/Like/", {
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


            })
            .catch(error => { console.log(error); console.log(body) })

    }

    let ScreenHeight = Dimensions.get("window").height;
    let Screenwidth = Dimensions.get("window").width;



    function Topg() {
        return (
            <View style={{ flexDirection: 'row',  marginTop: 10, marginBottom: 0, }}>
                <TouchableOpacity style={{
                    width: "30%", padding: 4
                    , justifyContent: 'center', paddingBottom: 5, margin: 10, alignContent: 'flex-start'
                }}
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={Icon.Back}
                        resizeMode='contain'
                        style={{ width: '50%', tintColor: co.white }}
                    />
                </TouchableOpacity>
                <View style={{ width:'60%', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{
                        width: "70%", padding: 4, aspectRatio: 3 / 1, marginRight: "25%", borderRadius: 40
                        , justifyContent: 'center', alignItems: 'center', paddingBottom: 5, margin: 10, alignContent: 'center', backgroundColor: co.main_yellow
                    }} onPress={() => AddCart(data.id)}>

                        <Text style={{ fontFamily: 'Raleway', fontSize: 20, color: co.main_red, fontWeight: 'bold' }}>Add to Cart</Text>

                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function Pro_Images() {
        const renderImages = ({ item }) => {
            return (
                <View style={{ aspectRatio: 1, height: "100%", marginHorizontal: 20, }}>
                    <Image
                        source={{ uri: APIcode + item.Image }}
                        resizeMode='cover'
                        style={{ height: '95%', aspectRatio: 1, borderRadius: 40 }}
                    />
                </View>
            )
        }

        return (
            <View style={{  flexDirection: 'row', marginTop: 10, height: '100%', flexGrow: 1 }}>
            <FlatList
                data={pic}

                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={renderImages}
                horizontal
                contentContainerStyle={{height: '100%', paddingBottom: 0, paddingHorizontal: 10, marginTop: 20, width:Screenwidth }}
            />
            </View>
        )
    }

    function Info() {
        let count_like = data.num_likes
        let bool = data.is_liked

        function LIKE() {
            const da = { ...data }
            da.is_liked = !bool
            da.num_likes = bool ? count_like - 1 : count_like + 1
            bool = !bool
            LikePrt(data.id)
            setdata(da)


        }
        return (
            <View style={{
                backgroundColor: co.main_yellow,
                marginTop: 40,
                width: '90%',
                height: undefined,

                borderRadius: 50,
                justifyContent: 'flex-start', alignContent: 'flex-start',
                paddingBottom: 30
            }}>
                <View style={{
                    width: '90%', flexDirection: 'row', margin: "5%",
                    justifyContent: 'center', alignContent: 'center'
                }}>
                    <View style={{ width: '20%' }}>
                        <Image
                            source={{ uri: APIcode + data.traderProfile }}
                            resizeMode='cover'
                            style={{ width: "90%", aspectRatio: 1, borderRadius: 20 }}
                        /></View>
                    <View style={{
                        width: "50%",
                        alignItems: 'center', marginRight: 30, justifyContent: 'center'
                    }}>
                        <Text style={{ ...fonts.ProName, fontSize: 30 }}>{data.traderName}</Text>
                    </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', marginHorizontal: 20 }}>
                    <View style={{ width: "50%" }}>
                        <Text style={{ ...fonts.ProName }}>{data.Prdt_name} : {data.Price}</Text>
                    </View>

                    <TouchableOpacity style={{ flexDirection: 'row', width: '15%', marginRight: 20 }}
                        onPress={() => AddCart(data.id)}>
                        <View style={{ width: '40%' }}>
                            <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: co.black }}>{data.Num_of_products_sold}</Text></View>
                        <View style={{ marginHorizontal: 5, aspectRatio: 1, width: '60%', }}>
                            <Image
                                source={Icon.Cart_icon}
                                resizeMode='cover'
                                style={{ width: "100%", aspectRatio: 1, flex: 1, tintColor: co.black }}
                            /></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', width: '15%', marginRight: 20 }}
                        onPress={() => LIKE()}>
                        <View style={{ width: '40%' }}>
                            <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: data.is_liked ? co.main_red : co.black }}>{data.num_likes}</Text></View>
                        <View style={{ marginHorizontal: 5, aspectRatio: 1, width: '60%', }}>
                            <Image
                                source={Icon.Heart}
                                resizeMode='cover'
                                style={{ width: "100%", aspectRatio: 1, flex: 1, tintColor: data.is_liked ? co.main_red : co.black }}
                            /></View>
                    </TouchableOpacity>


                </View>




            </View>)
    }

    function Des() {
        return (
            <View style={{ width: '90%', marginTop: 40, borderRadius: 50, backgroundColor: co.home_sub, marginBottom: 50 }}>
                <View style={{ margin: 20 }}>
                    <Text style={{ fontSize: 24, color: co.main_yellow, fontFamily: 'Lato' }}>Catogeries :  {data.catogery}</Text>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: co.sub_red, fontSize: 20, fontFamily: 'Saira' }}>
                            {data.Prdt_description}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ ...themeStye.container, backgroundColor:co.sub_black, padding: 0,   }}>
             <StatusBar style="light" backgroundColor={co.sub_black} />
             <StatusBar style="light" backgroundColor={co.sub_black} />
            
            <SafeAreaView style={{ height: '12%', width:'100%', alignContent: 'center', justifyContent: 'center' }}>
                {Topg()}
            </SafeAreaView>
                
                <ScrollView >
                    <View style={{ justifyContent: 'space-between', alignContent: 'flex-end', alignItems: 'center', marginBottom: 100 }}>
                        <View style={{ height: ScreenHeight / 2.2, justifyContent: 'center', alignItems: 'center' }}>

                            {Pro_Images()}
                        </View>
                        <View style={{ width: Screenwidth, alignItems: 'center', justifyContent: 'center' }}>
                            {Info()}
                            {Des()}
                        </View>
                    </View>
                </ScrollView>
            
        </View>

    )
}
export default Product