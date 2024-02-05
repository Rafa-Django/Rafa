import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

import {  themeStye,  homeStyle, ProStyle} from '../components/theme';

import { KeyContext, APIContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '../components';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';

const AppPendOrd = ({ navigation, route }) => {
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

      
    let body = JSON.stringify({ "usid": ids})
    fetch(APIcode + "Base/Cart/Pending/", {
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
      <TouchableOpacity style={{ marginTop: 10, borderRadius: 30, width: '90%', alignItems: 'center', alignContent: 'center', backgroundColor: co.main_yellow, paddingVertical:10 }}
        onPress={() => navigation.navigate('AppPendView',
          { pk: item.order, TradAdd: item.TradAdd, TradPhone: item.TradPhone, CuAdd: item.accurate_address, date: item.date_added, CuName:item.CustomerName, Customeremail: item.gmail, CuPhone: item.phone, tradName: item.traderName, tot_it: item.get_items_total, tot: item.get_total })}>
        <View style={{ flexDirection: 'row',  width: '90%', marginHorizontal: 0, marginTop: 5 }}>
          <View style={{  width: "20%",  }}>
            <Image
              source={{ uri: APIcode + item.traderProfile }}
              resizeMode='cover'
              style={{ width: "90%", aspectRatio:1, flex:1,  borderRadius: 20 }}
            />
          </View>
          <View style={{  alignContent: 'flex-end', justifyContent: 'center', marginLeft:25 }}>
            <Text style={{ ...homeStyle.PN, fontSize: 25 }}>{item.traderName}</Text>
          </View>
        </View>
        <View style={{ width: '90%', marginTop: 5, marginBottom: 5,  marginHorizontal: 20, alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{  fontFamily: 'OpenSans', fontSize: 18, marginRight: 15 }}>Total: {item.get_total} </Text>
          <Text style={{  fontFamily: 'OpenSans', fontSize: 18, marginLeft: 15 }}>Quantity:{item.get_items_total} </Text>
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
      <SafeAreaView style={{ ...themeStye.HeadView, borderBottomEndRadius: 20, justifyContent:'flex-end', paddingTop:15, alignContent:'flex-start',alignItems:'flex-start', borderBottomLeftRadius: 20 }}>
      <SafeAreaView style={{ ...themeStye.HeadView, marginTop: 15 }}>
        <View style={{...ProStyle.Main_header}}>
          <TouchableOpacity style={{...ProStyle.TO,  }}
           onPress={() => navigation.goBack()}>
          <Image
          source={Icon.Back}
          resizeMode='contain'
          style={{...ProStyle.To_image, tintColor:co.white}}
          />
          </TouchableOpacity>
      
        </View>
      </SafeAreaView>
      </SafeAreaView>
      <ScrollView >
        {Catogeries()}
      </ScrollView>
    </View>

  )
}



export default AppPendOrd