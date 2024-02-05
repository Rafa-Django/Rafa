import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator
} from 'react-native';


import { COLORS, themeStye, ProStyle } from "../components/theme";
import { KeyContext, APIContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '../components';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const MainCart = ({ navigation }) => {
  let co = colourTheme()
  const key = useContext(KeyContext)
  const APIcode = useContext(APIContext)
  const [data, setdata] = useState('')
  const [loading, setloading] = useState(true)

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
    await getValueFor(key)

    // 192.168.8.1:8000       
    let body = JSON.stringify({ "usid": ids })
    fetch(APIcode + "Base/Cart/cart/", {
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

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ marginTop: 20, borderRadius: 50, width: '100%',  backgroundColor: co.main_yellow }}
        onPress={() => navigation.navigate('CartItem', { pk: item.pk, CM: item.traderName, PRO: item.traderProfile, Num: item.CheckTradPhone })}>
        <View style={{ flexDirection: 'row', width: '100%', marginHorizontal: 20, marginTop: 15 }}>
          <View style={{ width: 55, alignContent:'flex-start' }}>
            <Image
              source={{ uri: APIcode + item.traderProfile }}
              resizeMode='cover'
              style={{ width: 50, height: 50, borderRadius: 40 }}
            /></View>
          <View style={{
            width: 200,
            alignItems: 'center', marginRight: 20, justifyContent: 'center'
          }}>
            <Text style={{ fontFamily: 'Lato', fontSize: 22 }}>{item.traderName}</Text>
          </View></View>
        <View style={{ width: '100%', marginTop: 20, marginBottom: 15, marginLeft: 20, flexDirection: 'row' }}>
          <Text style={{ flex: 1, fontFamily: 'Roboto', fontSize: 18, alignItems: 'flex-start', justifyContent: 'flex-start' }}>Total:  {item.cart_total} LKR</Text>
          <Text style={{ flex: 1, fontFamily: 'Roboto', fontSize: 18, alignItems: 'flex-end', justifyContent: 'flex-end' }}>Quantity:  {item.cart_items_total}</Text>
        </View></TouchableOpacity>
    )
  }


  function Catogeries() {
    return (

      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ alignContent: "center", justifyContent: 'center', alignItems: 'center',  width: width }}
      />

    )

  }
  return (
    <View style={{ ...themeStye.container, backgroundColor:co.sub_black, padding: 0 , width:'100%'}}>
             <StatusBar style="light" backgroundColor={co.sub_black} />
       <StatusBar style="light" backgroundColor={co.sub_black} />
      <SafeAreaView style={{ ...themeStye.HeadView, marginTop: 15 }}>
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
      <ScrollView style={{ width: "100%", flexDirection: 'row' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', width: '100%' }}>
          {Catogeries()}
        </View>
      </ScrollView>
    </View>
  )
}

export default MainCart