import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from '@expo/vector-icons/Ionicons';


import { KeyContext, AuthContext, APIContext } from "../../UserContext";
import { COLORS } from '../components/theme';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';

const DrawerDesign = props => {
  let co = colourTheme()
  const key = useContext(KeyContext)
  const APIcode = useContext(APIContext)
  const [CM, setCM] = useState('')
  const [Banner, setBanner] = useState('')
  const [Profile, setProfile] = useState('')

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

  async function APIinfo() {
    console.log(key)
    console.log("Working")
    await getValueFor(key)

    // 192.168.8.1:8000       
    let body = JSON.stringify({ "Tradid": ids })
    fetch(APIcode + "Base/Store/", {
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
        setCM(json.Company_name)
        setBanner(APIcode + json.banner)
        setProfile(APIcode + json.profile_pic)
      })
      .then(json => {
        console.log(json)

      })
      .catch(error => { console.log(error); console.log(body) })

  }

  useEffect(() => {
    APIinfo()
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: co.black, paddingBottom:50 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: co.home_sub }}>
        <ImageBackground
          source={{ uri: Banner }}
          style={{ padding: 20, flexDirection: 'row', aspectRatio: 16 / 10, justifyContent: 'flex-start', alignContent: 'flex-end', alignItems: 'flex-end' }}>
          <Image

            source={{ uri: Profile }}
            style={{ height: "30%", aspectRatio: 1,  borderRadius: "100%", marginBottom: 10 }}
          />
          <View style={{ justifyContent: 'center', marginLeft: "10%", alignItems: 'center', height: '30%', backgroundColor: 'rgba(9c,6c,63,0.1)', borderRadius: 50 }}>
            <Text
              style={{
                color: co.yellow_white,
                fontSize: 25,
                fontFamily: 'Lato',
                fontWeight: 'bold',
                marginBottom: 5,
                textShadowColor: co.sub_red,
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 5
              }}>
              {CM}
            </Text>
          </View>

        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: co.black, paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: co.main_yellow }}>
        <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="share-social-outline" size={22} color={co.white} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto',
                marginLeft: 5,
                color: co.white
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} color={co.white} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto',
                marginLeft: 5,
                color: co.white
              }}>
              Rate us!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerDesign;