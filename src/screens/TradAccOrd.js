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
import {  Icon } from '../components';
import { KeyContext, APIContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';


import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const TradAccOrd = ({ navigation, route }) => {
  let co = colourTheme()
  const key = useContext(KeyContext)
  const APIcode = useContext(APIContext)
  const [data, setdata] = useState('')
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


    let body = JSON.stringify({ "Tradid": ids })
    fetch(APIcode + "Trader/Cart/Approved/Order/", {
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

  async function APIDel() {
    console.log(key)
    console.log("Working")
    await getValueFor(key)

     
    let body = JSON.stringify({ "Tradid": ids })
    fetch(APIcode + "Trader/Cart/Del/Order/", {
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
        setdeldata(json)

      })
      .catch(error => { console.log(error); console.log(body) })
      .finally(() => setloading(false))
  }
  useEffect(() => {
    APIMainCart(); APIDel()
  }, [])

  useEffect(() => {
    navigation.addListener('focus', () => {
      APIMainCart(); APIDel()
    });
  }, [])


  


  function Catogeries() {

    const renderItem = ({ item }) => {
      const date = new Date(item.deliverDuration)
  
      
      return (
        <TouchableOpacity style={{ marginTop: 10, borderRadius: 50, width: width-50, alignItems: 'center', justifyContent: 'center', backgroundColor: co.main_yellow }}
          onPress={() => navigation.navigate('TradAccView',
            { COpk: item.Check, pk: item.pk, tot_it: item.cart_items_total, tot: item.cart_total })}>
          <View style={{ flexDirection: 'row', width: '90%', marginHorizontal: 10, marginTop: 10 }}>
            <View style={{ width: "40%" }}>
              <Text style={{ fontFamily: 'Roboto', fontSize: 25 }}>{item.CustomerName}</Text>
            </View>
            <View style={{ width: '60%' }}>
              <Text style={{ fontFamily: 'Roboto', fontSize: 20 }}>Cost: {item.cart_total}</Text>
            </View>
          </View>
          <View style={{ width: '90%', marginVertical: 15, marginHorizontal: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%', }}>
              <Text style={{ fontFamily: 'OpenSans', fontSize: 18, }}>Delivery Date: </Text>
              <Text style={{ fontFamily: 'OpenSans', fontSize: 18, }}>{date.toDateString()} </Text>
            </View>
            <View style={{ width: '45%', marginLeft: 15 }}>
              <Text style={{ fontFamily: 'OpenSans', fontSize: 18, }}>Delivery Date:  </Text>
              <Text style={{ fontFamily: 'OpenSans', fontSize: 18, }}>{item.deliverTime} </Text>
            </View>
          </View></TouchableOpacity>
      )
    }

    
    return (
      <View style={{ flexGrow: 1, width: width, marginTop: 15, backgroundColor: co.sub_black, alignItems: 'center', justifyContent: 'center' }}>

        <View style={{ width: width, marginTop: 15 }}>
          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ alignItems: "center", width: width, justifyContent: 'center' }}
          /></View>
        <View style={{ ...themeStye.borderLine, borderColor: co.yellow_white }}></View>
      </View>
    )

  }

  function Del() {
    const delitem = ({ item }) => {
      const date = new Date(item.deliverDuration)

      const time = new Date(item.deliverTime)
      return (
        <TouchableOpacity style={{ marginTop: 10, borderRadius: 50, width: width-50, alignItems: 'center', alignContent: 'center', backgroundColor: co.main_yellow }}
          onPress={() => navigation.navigate('TradAccDelView',
            { COpk: item.Check, pk: item.pk, tot_it: item.cart_items_total, tot: item.cart_total, co: item.code })}>
          <View style={{ flexDirection: 'row', width: '90%', marginHorizontal: 10, marginTop: 10 }}>
            <View style={{ width: "40%" }}>
              <Text style={{ fontFamily: 'Roboto', fontSize: 25 }}>{item.CustomerName}</Text>
            </View>
            <View style={{ width: '60%' }}>
              <Text style={{ fontFamily: 'Roboto', fontSize: 20 }}>Cost: {item.cart_total}</Text>
            </View>
          </View>
          <View style={{ width: '90%', marginVertical: 15, marginHorizontal: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%', }}>
              <Text style={{ fontFamily: 'OpenSans', fontSize: 18, }}>Delivery Date: </Text>
              <Text style={{ fontFamily: 'OpenSans', fontSize: 18, }}>{date.toDateString()} </Text>
            </View>
            <View style={{ width: '45%', marginLeft: 15 }}>
              <Text style={{ fontFamily: 'OpenSans', fontSize: 18, }}>Delivery Date:  </Text>
              <Text style={{ fontFamily: 'OpenSans', fontSize: 18, }}>{time.toLocaleTimeString()} </Text>
            </View>
          </View></TouchableOpacity>
      )
    }

    return (
      <View style={{ flexGrow: 1, backgroundColor: co.sub_black, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
        <View style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: co.main_yellow, fontSize: 25, }}>Product Out For Delivery</Text>
        </View>
        <View style={{ width: width, marginVertical: 15 }}>
          <FlatList
            data={deldata}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={delitem}
            contentContainerStyle={{ alignItems: "center", width: width, justifyContent: 'center' }}
          />
        </View>
        <View style={{ ...themeStye.borderLine, borderColor: co.yellow_white, marginTop: 10 }}></View>
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
      <View style={{ width: width}}>
        {Del()}
        {Catogeries()}
      </View>
      </ScrollView>
    </View>

  )
}


export default TradAccOrd