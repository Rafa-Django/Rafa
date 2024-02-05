import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { KeyContext, APIContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS,  themeStye, ActStyle } from'../components/theme';
import { img, Icon } from '../components';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
const Activities = ({ navigation }) => {
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
    console.log(ids)

    // 192.168.8.1:8000       
    let body = JSON.stringify({ "USid": ids })
    fetch(APIcode + "Checkout/count/", {
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

  function Header() {
    return (
      <View style={{ borderBottomEndRadius: 20, justifyContent: 'center',alignItems:'center', height:"10%", borderBottomStartRadius: 20, paddingVertical: 15, backgroundColor: co.sub_yellow, }}>
        <View style={{ width: "40%", justifyContent: 'center', alignItems: 'center', }}>
          <Image
            source={img.Logo_Text}
            resizeMode='contain'
            style={{ width: "100%", }} />
        </View>
      </View>
    )
  }

  function Order_View() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
        <TouchableOpacity style={{ ...ActStyle.orderCont, backgroundColor:co.main_yellow }}
          onPress={() => { navigation.navigate('AppOrd') }}
          >
          <View style={{ ...ActStyle.OC2 }}>
            <Text style={{ ...ActStyle.mainFont, color:co.main_blue, color:co.main_blue }}>Approved</Text>
            <Text style={{ ...ActStyle.mainFont, color:co.main_blue }}>Orders</Text>
          </View>
          <View style={{ ...themeStye.borderLine }}></View>
          <View style={{ ...ActStyle.OCNum }}>
            <Text style={{ ...ActStyle.mainNum, color:co.main_red }}>{data.Approved}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...ActStyle.orderCont, backgroundColor:co.main_yellow }}
          onPress={() => { navigation.navigate('AppPendOrd') }}
          >
          <View style={{ ...ActStyle.OC2 }}>
            <Text style={{ ...ActStyle.mainFont, color:co.main_blue }}>Pending</Text>
            <Text style={{ ...ActStyle.mainFont, color:co.main_blue }}>Orders</Text>
          </View>
          <View style={{ ...themeStye.borderLine }}></View>
          <View style={{ width: '95%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ ...ActStyle.mainNum, color:co.main_red }}>{data.Checkout}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...ActStyle.orderCont, backgroundColor:co.main_yellow  }}
          onPress={() => { navigation.navigate('MainCart') }}>
          <View style={{ ...ActStyle.OC2 }}>
          <Text style={{ ...ActStyle.mainFont, color:co.main_blue }}></Text>
          <Text style={{ ...ActStyle.mainFont, color:co.main_blue }}>Cart</Text>
          </View>
          <View style={{ ...themeStye.borderLine }}></View>
          <View style={{ width: '95%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ ...ActStyle.mainNum, color:co.main_red }}>{data.Orderbase}</Text>
          </View>
        </TouchableOpacity>

      </View>
    )
  }


  return (
        <View style={{ ...themeStye.container, backgroundColor:co.sub_black }}>
      <StatusBar style="light" backgroundColor={co.sub_black} />

      <SafeAreaView style={styles.header}>
        {Header()}
        <ScrollView>
          {Order_View()}

        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: '100%',
    width: '100%',

  },
});

export default Activities