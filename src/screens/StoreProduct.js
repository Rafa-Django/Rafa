import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Switch
} from 'react-native';

import { Icon, img } from "../components"
import { COLORS,  fonts, themeStye, homeStyle, } from "../components/theme"
import { KeyContext, APIContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';


import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';

import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const StoreProduct = ({ navigation }) => {
  let co = colourTheme()

  const key = useContext(KeyContext)
  const APIcode = useContext(APIContext)
  const [count, setcount] = useState('')
  const [dePrdt, setdePrdt] = useState('')
  const [Prdt, setPrdt] = useState('')
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

  async function APIcount() {

    await getValueFor(key)

    
    let body = JSON.stringify({ "Userid": ids })
    fetch(APIcode + "Store/Count/", {
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
        setcount(json)
      }).catch(error => { console.log(error); console.log(body) })

  }


  async function APIdePrdt() {

    await getValueFor(key)
    
    let body = JSON.stringify({ "Userid": ids })
    fetch(APIcode + "Store/deactive/", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    })
      .then(res => {
        if (res.ok) {


          return res.json()
        } else {

        }
      })
      .then(json => {

        setdePrdt(json)

      })
      .catch(error => {  })
      .finally(() => setloading(false))
  }

  async function APIPrdt() {

    await getValueFor(key)

   
    let body = JSON.stringify({ "Userid": ids })
    fetch(APIcode + "Store/", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    })
      .then(res => {
        if (res.ok) {
          
          return res.json()
        } else {
          
        }
      })
      .then(json => {
       
        setPrdt(json)

      })
      .catch(error => {  })
      .finally(() => setloading(false))
  }

  useEffect(() => {
    APIcount(); APIdePrdt(); APIPrdt()
  }, [])

  useEffect(() => {
    navigation.addListener('focus', () => {
      APIcount(); APIdePrdt(); APIPrdt()
    });
  }, [])

  async function APIAct(prtid, value) {
    
    await getValueFor(key)
   
    let body = JSON.stringify({ "Usid": ids, "Prtid": prtid, "active": value })
    fetch(APIcode + "Trader/Product/Act/", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    })
      .then(res => {
        if (res.ok) {

          APIdePrdt(); APIPrdt()

          return res.json()
        } else {

        }
      })
      .catch(error => {  })
  }

  function Main() {
    return (
      <View style={{ width: '90%', alignItems: 'center', justifyContent: 'flex-start' }}>
        <View style={{ width: '95%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
          <Text style={{ fontFamily: 'Saira', fontSize: 25, color: co.white }}>Products:</Text>
          <Text style={{ fontFamily: 'Saira', fontSize: 25, color: co.white, marginHorizontal: 20 }}>{count}</Text>
        </View>
        
        <TouchableOpacity style={{ width: "60%", backgroundColor: co.main_yellow, marginVertical:10,borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => navigation.navigate('TradAddPrdt')}
          >
          <Text style={{ color: co.main_red, fontFamily: 'Lato', fontSize: 20, marginVertical: 10 }}>Add Product!</Text>
        </TouchableOpacity>
        <View style={{ ...themeStye.borderLine, marginTop: 10, backgroundColor: co.white, borderColor: co.white }}></View>
      </View>
    )
  }

  function ActPrdt() {


    return (
      <View style={{ width: '90%', marginTop: 15, alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
        <View>
          <Text style={{ fontFamily: 'Lato', fontSize: 20, color: co.white }}>Active Products</Text>
        </View>
        <View style={{ width: '90%', borderRadius: 20, backgroundColor: co.main_red, opacity: 0.7, justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }}>
          <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.main_yellow, margin: 15 }}>Only Products below will be visible to your customers. Enjoy the service.</Text>
        </View>
        <View style={{ ...themeStye.borderLine, marginTop: 10, backgroundColor: co.white, borderColor: co.white, marginBottom: 10 }}></View>
      </View>

    )
  }
  function Products() {

    const renderItem_products = ({ item }) => {
      return (
        <TouchableOpacity style={{ ...homeStyle.PV, justifyContent:'center', width:width  }}
          onPress={() => navigation.navigate('UpdtPrdt', { id: item.id })}
        >

          <Image
            source={{ uri: APIcode + item.Pic1 }}
            resizeMode='cover'
            style={{ width: "90%", aspectRatio: 1, borderTopLeftRadius: 50, borderTopRightRadius: 50 }} />


          <View style={{ backgroundColor: co.main_yellow, width: '90%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, }}>
            <TouchableOpacity style={{
              ...homeStyle.Pro_bar, marginTop: 10
            }}
              onPress={() => navigation.navigate('Store',  { id: item.Owner })}>
              <View style={{ width: '50%' }}>
                <Image
                  source={{ uri: APIcode + item.traderProfile }}
                  resizeMode='cover'
                  style={{
                    width: "40%", aspectRatio: 1, borderRadius: 20,
                  }}
                /></View>
              <View style={{ width: '50%' }}>
                <Text style={{ ...homeStyle.PN, }}>{item.traderName}</Text>
              </View>
            </TouchableOpacity>

            <View style={{ ...homeStyle.Pro_bar }}>
              <View style={{ justifyContent: 'flex-start', width: '50%', alignContent: 'center' }}>
                <Text style={{ ...fonts.Name_Product }}>{item.Prdt_name}</Text>
              </View>
              <View style={{ width: '50%', justifyContent: 'flex-end' }}>
                <Text style={{ ...fonts.Name_Product, }}>{item.Price} LKR</Text>
              </View>

            </View>

            <View style={{ ...homeStyle.Pro_bar }}>
              <View style={{ width: '50%', justifyContent: 'flex-start', alignContent: 'center' }}>
                <Text style={{ ...fonts.sub_pro }}> Orders:  {item.Num_of_products_sold}</Text></View>
              <View style={{ width: '50%', justifyContent: 'flex-end' }}>
                <Text style={{ ...fonts.sub_pro }}> Complains:  {item.num_comm}</Text>
              </View>
            </View>
            <View style={{ ...homeStyle.Pro_bar }}>
              <View style={{ flexDirection: 'row', width: '50%' }}

              >
                <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: 'red' }}>{item.num_likes}</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <Image
                    source={Icon.Heart}
                    resizeMode='cover'
                    style={{ width: 25, height: 25, tintColor: 'red' }}
                  /></View>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={item.active ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setloading}
                value={item.active}
              />

            </View>
            <View style={{ ...homeStyle.Pro_bar, alignContent: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <TouchableOpacity style={{ width: '60%', backgroundColor: co.sub_blue, alignContent: 'center', alignItems: 'center', borderRadius: 50, justifyContent: 'center' }} 
              onPress={() => { navigation.navigate("PromoteGPay", { id: item.id }) }}
              >
                <Text style={{ margin: 5, fontFamily: "Lato", fontSize: 25, color: co.main_yellow }} >Promote!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

      )
    }

    return (
      <View style={{ width: width }}>
        <FlatList
          data={Prdt}
          // onEndReachedThreshold={({ distanceFromEnd }) => {
          // if (distanceFromEnd < 1){
          // loadMorePrdt()}
          // }}
          // onEndReached={({ distanceFromEnd }) => {
          // if (distanceFromEnd < 1){
          // console.log("trash")
          // loadMorePrdt()}
          // }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItem_products}
          contentContainerStyle={{ paddingBottom: 5, paddingHorizontal: 5, justifyContent: 'center', alignItems: 'center', width:width  }}
        />
      </View>
    )
  }


  function deActPrdt() {

    return (
      <View style={{ width: '90%', marginVertical: 15, alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
        <View style={{ ...themeStye.borderLine, marginTop: 5, backgroundColor: co.white, borderColor: co.white, marginBottom: 10 }}></View>
        <View>
          <Text style={{ fontFamily: 'Lato', fontSize: 20, color: co.white }}>De-Active Products</Text>
        </View>
        <View style={{ width: '90%', borderRadius: 20, backgroundColor: co.main_red, opacity: 0.7, justifyContent: 'flex-start', alignItems: 'center', marginTop: 10 }}>
          <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.main_yellow, margin: 15 }}>These Products won't be visible to your customers. Active the products to be available to your customers.</Text>
        </View>
      </View>

    )
  }

  
  function deProducts() {
    const renderItem_products = ({ item }) => {
      return (
        <TouchableOpacity style={{ ...homeStyle.PV, justifyContent:'center', width:width  }}
          onPress={() => navigation.navigate('UpdtPrdt', { id: item.id })}
        >

          <Image
            source={{ uri: APIcode + item.Pic1 }}
            resizeMode='cover'
            style={{ width: "90%", aspectRatio: 1, borderTopLeftRadius: 50, borderTopRightRadius: 50 }} />


          <View style={{ backgroundColor: co.main_yellow, width: '90%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, }}>
            <TouchableOpacity style={{
              ...homeStyle.Pro_bar, marginTop: 10
            }}
              onPress={() => navigation.navigate('Store')}>
              <View style={{ width: '50%' }}>
                <Image
                  source={{ uri: APIcode + item.traderProfile }}
                  resizeMode='cover'
                  style={{
                    width: "40%", aspectRatio: 1, borderRadius: 20,
                  }}
                /></View>
              <View style={{ width: '50%' }}>
                <Text style={{ ...homeStyle.PN, }}>{item.traderName}</Text>
              </View>
            </TouchableOpacity>

            <View style={{ ...homeStyle.Pro_bar }}>
              <View style={{ justifyContent: 'flex-start', width: '50%', alignContent: 'center' }}>
                <Text style={{ ...fonts.Name_Product }}>{item.Prdt_name}</Text>
              </View>
              <View style={{ width: '50%', justifyContent: 'flex-end' }}>
                <Text style={{ ...fonts.Name_Product, }}>{item.Price} LKR</Text>
              </View>

            </View>

            <View style={{ ...homeStyle.Pro_bar }}>
              <View style={{ width: '50%', justifyContent: 'flex-start', alignContent: 'center' }}>
                <Text style={{ ...fonts.sub_pro }}> Orders:  {item.Num_of_products_sold}</Text></View>
              <View style={{ width: '50%', justifyContent: 'flex-end' }}>
                <Text style={{ ...fonts.sub_pro }}> Complains:  {item.num_comm}</Text>
              </View>
            </View>
            <View style={{ ...homeStyle.Pro_bar }}>
              <View style={{ flexDirection: 'row', width: '50%' }}

              >
                <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: 'red' }}>{item.num_likes}</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <Image
                    source={Icon.Heart}
                    resizeMode='cover'
                    style={{ width: 25, height: 25, tintColor: 'red' }}
                  /></View>
              </View>
              <Switch
                trackColor={{ false: co.main_red, true: co.main_blue }}
                thumbColor={item.active ? co.sub_red : co.sub_blue}
                ios_backgroundColor={co.main_yellow}
                onValueChange={() => { item.active == true ? APIAct(item.id, false) : APIAct(item.id, true) }}
                value={item.active}
              />

            </View>
          </View>
        </TouchableOpacity>

      )
    }

    return (
      <View style={{ width: width }}>
      <FlatList
        data={dePrdt}
        // onEndReachedThreshold={({ distanceFromEnd }) => {
        // if (distanceFromEnd < 1){
        // loadMorePrdt()}
        // }}
        // onEndReached={({ distanceFromEnd }) => {
        // if (distanceFromEnd < 1){
        // console.log("trash")
        // loadMorePrdt()}
        // }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem_products}
        contentContainerStyle={{ paddingBottom: 5, paddingHorizontal: 5, justifyContent: 'center', alignItems: 'center', width:width }}
      />
      </View>
    )
  }


  return (
    <View style={{ ...themeStye.container, backgroundColor:co.sub_black, padding: 0, }}>
      <StatusBar style="light" backgroundColor={co.sub_black} />
      <SafeAreaView style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: co.sub_yellow, borderBottomEndRadius: 20, borderBottomLeftRadius: 20 }}>
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
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
          {Main()}
          {ActPrdt()}
          {Products()}
          {deActPrdt()}
          {deProducts()}
        </View>
      </ScrollView>
    </View>
  )
}

export default StoreProduct
