import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions
} from 'react-native';

import { COLORS, themeStye,  homeStyle, ProStyle } from '../components/theme';
import { Icon } from '../components';
import { KeyContext, APIContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';




const AppOrd = ({ navigation, route }) => {
  let co = colourTheme()
  const key = useContext(KeyContext)
  const APIcode = useContext(APIContext)
  const [data, setdata] = useState('')
  const [delnull, setdelnull] = useState(false)
  const [deldata, setdeldata] = useState('')
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

     
    let body = JSON.stringify({ "usid": ids })
    fetch(APIcode + "Base/Cart/Approved/Order/", {
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

  async function APIAccDel() {
    console.log(key)
    console.log("Working")
    await getValueFor(key)

       
    let body = JSON.stringify({ "usid": ids })
    fetch(APIcode + "Base/Cart/Approved/Del/", {
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
          if (Array.length === 3) { setdelnull(true); console.log('vfdvfdv') }
          return res.json()
        } else {
          console.log("Bad")

        }
      })
      .then(json => {
        console.log(json)
        setdeldata(json)

      })
      .catch(error => { console.log(error); console.log(body) })
      .finally(() => setloading(false))
  }

  useEffect(() => {
    APIMainCart()
  }, [])

  useEffect(() => {
    navigation.addListener('focus', () => {
      APIMainCart(); APIAccDel()
    });
  }, [])



  function Del() {
    const renderDelItem = ({ item }) => {
      const date = new Date(item.deliverDuration)
      console.log(date)
      const time = new Date(item.deliverTime)
      return (
        <TouchableOpacity style={{ marginTop: 15, paddingVertical: 15, borderRadius: 40, width: width - 20, marginRight: 15, alignItems: 'center', backgroundColor: co.main_yellow }}
          onPress={() => navigation.navigate('AppDelView',
            {
              COpk: item.Check, pk: item.pk, co: item.code, trad_del: item.delTradReach, tot_it: item.cart_items_total, tot: item.cart_total, CuAdd: item.CheckAdd, CuPhone: item.CheckPhone, CuName: item.CustomerName, Customeremail: item.Customeremail,
              cost: item.delCost, dur: date, time: time, tradName: item.traderName, TradAdd: item.CheckTradAdd, TradPhone: item.CheckTradPhone
            })}>
          <View style={{ flexDirection: 'row', width: '90%', marginHorizontal: 0, marginTop: 5 }}>
            <View style={{ width: "40%", }}>
              <Image
                source={{ uri: APIcode + item.traderProfile }}
                resizeMode='cover'
                style={{ width: 50, height: 50, borderRadius: 20 }}
              />
            </View>
            <View style={{ width: '50%', alignContent: 'flex-end', justifyContent: 'center' }}>
              <Text style={{ ...homeStyle.PN, fontSize: 25 }}>{item.traderName}</Text>
            </View>
          </View>
          <View style={{ width: '90%', marginTop: 10, marginHorizontal: 20, alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '100%' }}>
              <Text style={{ fontFamily: 'OpenSans', fontSize: 18, marginRight: 10 }}>Delivery Date: </Text>
              <Text style={{ fontFamily: 'OpenSans', fontSize: 18, marginRight: 10 }}> {date.toDateString()}   {time.toLocaleTimeString()}  </Text>
            </View>

          </View></TouchableOpacity>
      )
    }
    const { width, height } = Dimensions.get('window');
    console.log(width)
    return (
      <View style={{ flexGrow: 1, backgroundColor: co.sub_black, alignItems: 'center', justifyContent: 'center' }}>
        {delnull ?
          <View></View>
          :
          <View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 15, marginHorizontal:15, alignContent:"center" }}>
              <Text style={{ color: co.main_yellow, fontSize: 25, }}>Product Out For Delivery</Text>
            </View>
            <View style={{ width: '100%' }}>
              <FlatList
                data={deldata}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={renderDelItem}
                contentContainerStyle={{ marginHorizontal: 10, width: '100%', justifyContent: 'center', alignItems: "center" }}
              /></View>
          </View>}
        <View style={{ ...themeStye.borderLine, borderColor: co.yellow_white, marginVertical: 15 }}></View>
      </View>
    )

  }


  function Catogeries() {
    const renderItem = ({ item }) => {
      const date = new Date(item.deliverDuration)
      console.log(date)
      const time = new Date(item.deliverTime)
      return (
        <TouchableOpacity style={{ marginTop: 15, paddingVertical: 15, borderRadius: 40, width: width - 20, marginRight: 15, alignItems: 'center', backgroundColor: co.main_yellow }}
          onPress={() => navigation.navigate('AppView',
            {
              COpk: item.Check, pk: item.pk, tot_it: item.cart_items_total, tot: item.cart_total, CuAdd: item.CheckAdd, CuPhone: item.CheckPhone, CuName: item.CustomerName, Customeremail: item.Customeremail,
              cost: item.delCost, dur: date, time: time, tradName: item.traderName, TradAdd: item.CheckTradAdd, TradPhone: item.CheckTradPhone
            })}>
          <View style={{ flexDirection: 'row', width: '90%', marginHorizontal: 0, marginTop: 5 }}>
            <View style={{ width: "40%", }}>
              <Image
                source={{ uri: APIcode + item.traderProfile }}
                resizeMode='cover'
                style={{ width: 50, height: 50, borderRadius: 20 }}
              />
            </View>
            <View style={{ width: '50%', alignContent: 'flex-end', justifyContent: 'center' }}>
              <Text style={{ ...homeStyle.PN, fontSize: 25 }}>{item.traderName}</Text>
            </View>
          </View>
          <View style={{ width: '90%', marginTop: 10, marginHorizontal: 20, alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '100%' }}>
              <Text style={{ fontFamily: 'OpenSans', fontSize: 18, marginRight: 10 }}>Delivery Date: </Text>
              <Text style={{ fontFamily: 'OpenSans', fontSize: 18, marginRight: 10 }}> {date.toDateString()}   {time.toLocaleTimeString()}  </Text>
            </View>

          </View></TouchableOpacity>
      )
    }
    const { width, height } = Dimensions.get('window');
    console.log(width)
    return (
      <View style={{ flexGrow: 1, backgroundColor: co.sub_black, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
        <View style={{ width: '100%' }}>
          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ marginHorizontal: 10, width: '100%', justifyContent: 'center', alignItems: "center" }}
          /></View>
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
      <ScrollView >
        <View style={{ width: '100%' }}>
          {Del()}
          {Catogeries()}

        </View>
      </ScrollView >
    </View >

  )
}

export default AppOrd