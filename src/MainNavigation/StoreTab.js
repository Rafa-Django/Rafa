import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TradActivity, StoreInfo, StoreSettings, StoreProduct, Purchases, StorePurchases } from '../screens'
import DrawerDesign from "../MainNavigation/DrawerDesign"

import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../components/theme';
import { useEffect, useState, useContext } from 'react';
import { TrdBoolContext, KeyContext, APIContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';


const Drawer = createDrawerNavigator();

function StoreTab() {
  let co = colourTheme()
  const APIcode = useContext(APIContext)
  const Trad_Acc = useContext(TrdBoolContext)
  const key = useContext(KeyContext)

  const [purch, setpurch] = useState('')
  let ids = ""
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      let ids = result
      ids = result
      console.log(ids)
      console.log(result)
      return result
    } else {
      alert('No values stored under that key.');
    }
  }

  async function TradBool() {
    console.log("Workidng")
    await getValueFor(key)

    let body = JSON.stringify({ "Userid": ids })
    fetch(APIcode + "Store/Purchase/Bollean/", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    }).then(json => {
        console.log(json)
        if (json == "True") {
          setpurch(true)
          console.log("fdbf")
        }
        else {
          setpurch(false)
        }
      })

  }

  useEffect(() => {
    TradBool();
  }, [])

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerDesign {...props} />}
      screenOptions={{
        headerShown: false,
        headerBackground: co.black,
        drawerActiveBackgroundColor: co.home_sub,
        drawerActiveTintColor: co.white,
        drawerInactiveTintColor: co.main_yellow,
        drawerLabelStyle: {
          marginLeft: -5,
          fontFamily: 'Roboto',
          fontSize: 18,
        },
      }}>
      <Drawer.Screen
        name="Avtivity"
        component={TradActivity}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="tasks" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Store Profile"
        component={StoreInfo}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Store Settings"
        component={StoreSettings}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="cog" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="StoreProduct"
        component={StoreProduct}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="hammer" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Purchases"
        component={purch == false ? Purchases : StorePurchases}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="star" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>

  );
}

export default StoreTab