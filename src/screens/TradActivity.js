import React, { useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import { COLORS, themeStye, ActStyle } from "../components/theme"
import { KeyContext, APIContext, } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { img, Icon } from '../components';

import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
const TradActivity = ({ navigation, props }) => {
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

  async function APICount() {
    console.log(key)
    console.log("Working")
    await getValueFor(key)

    let body = JSON.stringify({ "Userd": ids })
    fetch(APIcode + "Trader/Cart/Count/", {
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
  useEffect(() => {
    APICount()
  }, [])

  useEffect(() => {
    navigation.addListener('focus', () => {
      APICount()
    });
  }, [])

  function Base() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, }}>
        <TouchableOpacity style={{ ...ActStyle.orderCont, backgroundColor:co.main_yellow }}
          onPress={() => navigation.navigate('TradAccOrd')}
          >
          <View style={{ ...ActStyle.OC2 }}>
            <Text style={{ ...ActStyle.mainFont, color:co.main_blue }}>Accepted</Text>
            <Text style={{ ...ActStyle.mainFont, color:co.main_blue }}>Orders</Text>
          </View>
          <View style={{ ...themeStye.borderLine }}></View>
          <View style={{ ...ActStyle.OC2 }}>
            <Text style={{ ...ActStyle.mainNum, color:co.main_red }}>{data.Accepted}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...ActStyle.orderCont, backgroundColor:co.main_yellow }}
          onPress={() => navigation.navigate('TradPendOrd')}
          >
          <View style={{ ...ActStyle.OC2 }}>
            <Text style={{ ...ActStyle.mainFont, color:co.main_blue }}>Pending</Text>
            <Text style={{ ...ActStyle.mainFont, color:co.main_blue }}>Orders</Text>
          </View>
          <View style={{ ...themeStye.borderLine }}></View>
          <View style={{ ...ActStyle.OC2 }}>
            <Text style={{ ...ActStyle.mainNum,  color:co.main_red }}>{data.Pending}</Text>
          </View>
        </TouchableOpacity>

      </View>
    )
  }


  return (
                <View style={{ ...themeStye.container, backgroundColor:co.sub_black }}>
      <StatusBar style="light" backgroundColor={co.sub_black} />
      <StatusBar style="light" backgroundColor="sub_black"/>
      <SafeAreaView style={{ ...themeStye.HeadView,  backgroundColor: co.sub_yellow, borderBottomEndRadius: 20, borderBottomLeftRadius: 20 }}>
      <View style={{width:"100%", height:90, flexDirection:'row', marginTop:10}}>
            <TouchableOpacity style={{ height:90, width:100, alignContent:'flex-start', justifyContent:'center', marginHorizontal:15}}
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
        {Base()}

      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "purple"
  },
});

export default TradActivity