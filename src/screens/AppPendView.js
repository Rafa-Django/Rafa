import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform
} from 'react-native';

import { COLORS,  themeStye, homeStyle, ProStyle } from '../components/theme';
import { Icon } from '../components';
import { KeyContext, APIContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';

const AppPendView = ({ navigation, route }) => {
  let co = colourTheme()
  const key = useContext(KeyContext)
  const APIcode = useContext(APIContext)
  const [check, setCheck] = useState('')
  const [item, setitem] = useState('')
  const [loading, setloading] = useState(true)

  // let COpk =  route.params.COpk
  let pk = route.params.pk
  let tot_it = route.params.tot_it
  let tot = route.params.tot
  let CuAdd = route.params.CuAdd
  let CuName = route.params.CuName
  let CuPhone = route.params.CuPhone
  let TradPhone = route.params.TradPhone
  let date = route.params.date
  let tradName = route.params.tradName
  let TradAdd = route.params.TradAdd
  let Customeremail = route.params.Customeremail

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
    await getValueFor(key)
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
    await getValueFor(key)

    // 192.168.8.1:8000       
    let body = JSON.stringify({ "OBid": pk })
    fetch(APIcode + "Base/Cart/Pending/Item", {
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
    APIitem()
  }, [])

  useEffect(() => {
    navigation.addListener('focus', () => {
      APIitem()
    });
  }, [])

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



  function TradInfo() {
    return (
      <View style={{ width: '100%', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
        <View>
          <Text style={{ fontFamily: 'Lato', fontSize: 20, color: co.white }}>Trader INFO</Text>
        </View>
        <View style={{ width: '90%', borderRadius: 20, backgroundColor: co.main_red, opacity: 0.7, justifyContent: 'flex-start', alignItems: 'center', marginTop: 10 }}>
          <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.main_yellow, margin: 3 }}>Name: {tradName}</Text>
          <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.main_yellow, margin: 3 }}>Address: {TradAdd}</Text>
          <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.main_yellow, margin: 3 }}>Phone: {TradPhone}</Text>

        </View>
       
        <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginVertical:10 }} 
        onPress={() => dialCall()}>
          <Image
            source={Icon.call}
            resizeMode='contain'
            style={{ width: 40, height: 40, tintColor: co.white }}
          />
        </TouchableOpacity>
        <View style={{ ...themeStye.borderLine, marginTop: 10, backgroundColor: co.white, borderColor: co.white, marginBottom: 10 }}></View>

        <View style={{ width: '90%', justifyContent: 'flex-start', alignItems: 'center'}}>
          <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.main_yellow, margin: 5 }}>Total: {tot}</Text>
          <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.main_yellow, margin: 5 }}>Quantity: {tot_it}</Text>
          <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.main_yellow, margin: 5 }}> Submitted Date: {date}</Text>
        </View>

        <View style={{ ...themeStye.borderLine, marginTop: 10, backgroundColor: co.white, borderColor: co.white, marginBottom: 10 }}></View>
      </View>
    )
  }

  function CustInfo() {
    return (
      <View style={{ width: '100%', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
        <View>
          <Text style={{ fontFamily: 'Lato', fontSize: 20, color: co.white }}>Your Info Submitted</Text>
        </View>
        <View style={{ width: '90%', borderRadius: 20, backgroundColor: co.main_red, opacity: 0.7, justifyContent: 'flex-start', alignItems: 'center', marginTop: 10 }}>
          <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.main_yellow, margin: 3 }}>Name: {CuName}</Text>
          <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.main_yellow, margin: 3 }}>Address: {CuAdd}</Text>
          <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.main_yellow, margin: 3 }}>Phone: {CuPhone}</Text>
          <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.main_yellow, margin: 3 }}>email: {Customeremail}</Text>
          <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.main_yellow, margin: 3 }}>payement: cash</Text>

        </View>
        <View style={{ ...themeStye.borderLine, marginTop: 10, backgroundColor: co.white, borderColor: co.white, marginBottom: 10 }}></View>

        <View style={{ ...themeStye.borderLine, marginTop: 10, backgroundColor: co.white, borderColor: co.white, marginBottom: 10 }}></View>
      </View>
    )
  }

 


  function Catogeries() {

    const renderItem = ({ item }) => {
      return (
        <View style={{  backgroundColor:co.main_yellow, width: '100%', marginBottom: 10, borderRadius:50, padding:10 }}>
          <View style={{  width: '90%', flexDirection: 'row',  marginHorizontal: 15 }}>
            <View style={{  width: "20%", }}>
              <Image
                source={{ uri: APIcode + item.get_productImage }}
                resizeMode='cover'
                style={{ width: "100%", aspectRatio:1, borderRadius: 20 }}
              />
            </View>
            <View style={{   alignContent: 'center', alignItems:'center',justifyContent: 'center', width:'70%' }}>
              <Text style={{ ...homeStyle.PN, fontSize: 25, alignContent: 'center',  }}>{item.get_productName}</Text>
            </View>
          </View>
          <View style={{  marginVertical: 10,   flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10, }}>
            <View style={{ flexDirection: 'row',    justifyContent: 'center', alignItems: 'flex-start', alignContent: 'flex-start' }}>
              <Text style={{ marginHorizontal: 5, fontFamily: "Ubuntu", fontSize: 18 }}>Quantity:{item.quantity}</Text>
            </View>
            <View style={{ marginHorizontal: 10, justifyContent: 'center', alignItems: 'flex-start', alignContent: 'flex-start' }}>
              <Text style={{ marginHorizontal: 20, fontFamily: "Ubuntu", fontSize: 18 }}>Total:{item.get_total}.LKR</Text>
            </View>
          </View>
        </View>
      )
    }
  
    return (
      <View style={{  backgroundColor: co.sub_black, alignContent: 'center', justifyContent: 'center' , alignItems:'center',}}>
        <FlatList
          data={item}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ alignContent: "center", alignItems:'center', width: '95%', justifyContent: 'center' }}
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
      <ScrollView style={{ width: '100%' }}>
        {TradInfo()}
        {CustInfo()}
        {Catogeries()}
      </ScrollView>
    </View>

  )
}



export default AppPendView