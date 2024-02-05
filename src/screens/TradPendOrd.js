import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image
} from 'react-native';
import { COLORS, themeStye, ProStyle} from '../components/theme'
import { KeyContext, APIContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '../components';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
const TradPendOrd = ({ navigation, route }) => {
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

  
    let body = JSON.stringify({ "Tradid": ids })
    fetch(APIcode + "Trader/Cart/", {
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
      APIMainCart()
    });
  }, [])


  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ marginTop: 10, borderRadius: 50, width: '90%', alignItems: 'center', alignContent: 'center', backgroundColor: co.main_yellow }}
        onPress={() => navigation.navigate('TradViewPend',
          { pk: item.pk, Name: item.CustomerName, add: item.accurate_address, dat: item.date_added, payment: item.payment, it_total: item.get_items_total, total: item.get_total, phone: item.phone, gmail: item.gmail },)}>
        <View style={{ flexDirection: 'row', width: '90%', marginHorizontal: 10, marginTop: 10 }}>
          <View style={{ width: "50%" }}>
            <Text style={{ fontFamily: 'Roboto', fontSize: 25 }}>{item.CustomerName}</Text>
          </View>
          <View style={{ width: '50%' }}>
            <Text style={{ fontFamily: 'Roboto', fontSize: 25 }}>{item.date_added}</Text>
          </View>
        </View>
        <View style={{ width: '90%', marginTop: 15, marginHorizontal: 20, alignItems: 'center', flexDirection: 'row', marginBottom: 20 }}>
          <Text style={{ fontFamily: 'OpenSans', fontSize: 18 }}>{item.accurate_address} </Text>
        </View></TouchableOpacity>
    )
  }



  function Catogeries() {
    return (
      <View style={{ flexGrow: 1, height: '100%', backgroundColor: co.sub_black, alignContent: 'center', justifyContent: 'center' }}>
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ alignContent: "center", marginHorizontal: 10, width: '100%', justifyContent: 'center' }}
        />
      </View>
    )

  }


  return (
                <View style={{ ...themeStye.container, backgroundColor:co.sub_black }}>
      <StatusBar style="light" backgroundColor={co.sub_black} />
      <StatusBar style="light" backgroundColor="sub_black"/>
      <SafeAreaView style={{ ...themeStye.HeadView, backgroundColor: co.sub_yellow, borderBottomEndRadius: 20, borderBottomLeftRadius: 20 , paddingTop:15, marginBottom:10, marginLeft:0}}>
      <View style={{...ProStyle.Main_header, height:undefined}}>
        <TouchableOpacity style={{...ProStyle.TO,  marginLeft:10, marginBottom:15}}
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
        {Catogeries()}
      </ScrollView>
    </View>

  )
}


export default TradPendOrd