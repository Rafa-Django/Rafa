import React, { useContext, useState, useEffect } from 'react';
import {

  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native';

import { img, Icon } from '../components';
import { COLORS, themeStye,fonts, homeStyle, ProStyle } from '../components/theme';
import { KeyContext, APIContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';

const Store = ({ navigation, route }) => {
  // let traderid = route.params.id
  let co = colourTheme()

  const key = useContext(KeyContext)
  const APIcode = useContext(APIContext)
  const [data, setdata] = useState('')
  const [prdt, setprdt] = useState('')
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

  async function APIinfo() {
    console.log(key)
    console.log("Working")
    await getValueFor(key)
    let traderid = route.params.id



    // 192.168.8.1:8000       
    let body = JSON.stringify({ "Tradid": traderid })
    fetch(APIcode + "Base/Store/Base/", {
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

  async function APIPrdt() {
    console.log(key)
    console.log("Working")
    await getValueFor(key)
    let traderid = route.params.id



    // 192.168.8.1:8000       
    let body = JSON.stringify({ "Tradid": traderid, "Userid": ids })
    fetch(APIcode + "Base/Store/Products/", {
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
        setprdt(json)

      })
      .catch(error => { console.log(error); console.log(body) })

  }
  useEffect(() => {
    APIinfo(); APIPrdt()
  }, [])

  useEffect(() => {
    navigation.addListener('focus', () => {
      APIinfo(); APIPrdt()
    });
  }, [])

  async function LikePrt(Prdtid) {
    console.log("Working")
    console.log(Prdtid)
    await getValueFor(key)

    let body = JSON.stringify({ "Usid": ids, "Prdtid": Prdtid })
    fetch(APIcode + "Base/Product/Like/", {
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

      })
      .catch(error => { console.log(error); console.log(body) })
  }

  async function AddCart(prtid) {
    console.log("Working")
    console.log(prtid)
    await getValueFor(key)

    let body = JSON.stringify({ "Usid": ids, "Prdtid": prtid })
    fetch(APIcode + "Base/Cart/", {
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
        // setdata(json)

      })
      .catch(error => { console.log(error); console.log(body) })
    // .finally(()=>setloading(false))
  }

  function Banner() {
    return (
      <View style={{ width: '90%', marginTop: 50, alignItems: 'center', justifyContent: "center", marginHorizontal: 20, }}>

        <Image
          source={{ uri: APIcode + data.banner }}
          resizeMode='cover'
          style={{ width: '100%', aspectRatio: 16 / 10, alignContent: 'center', borderTopRightRadius: 50, borderTopLeftRadius: 50 }}
        />

        <View style={{ width: '100%', paddingVertical: 5, justifyContent: 'center', alignContent: 'center', paddingHorizontal: 15, flexDirection: 'row', backgroundColor: co.main_yellow, borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
          <Image
            source={{ uri: APIcode + data.profile_pic }}
            resizeMode='cover'
            style={{ width: "20%", aspectRatio: 1, borderRadius: 20, }}

          />
          <View style={{ width: "70%", alignContent: 'center', alignItems: 'center', justifyContent: "center" }}>
            <Text style={{ fontFamily: 'Lato', color: co.sub_blue, fontSize: 25 }}>{data.Company_name}</Text>
          </View>
        </View>

      </View>
    )
  }

  function Info() {
    return (
      <View style={{ width: "100%", paddingVertical: 15, marginTop: 10, justifyContent: 'center', alignItems: 'center', marginHorizontal: 15, }}>
        <View style={{ width: '90%', backgroundColor: co.sub_yellow, borderRadius: 50, justifyContent: 'center', marginTop: 20, alignContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row' }}>
          <View style={{ width: '20%', aspectRatio: 1, backgroundColor: co.sub_black, borderRadius: 50, alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <Image
              source={Icon.Location}
              resizeMode='cover'

              style={{ width: '80%', height: "80%", tintColor: co.main_red, alignContent: 'center', }}
            />
          </View>
          <View style={{ width: '80%', justifyConten: 'center', alignItems: 'center', marginLeft: 15 }}>
            <Text style={{ fontFamily: 'Ubuntu', fontSize: 15, color: co.yellow_white }}>{data.g_link}</Text>
          </View>
        </View>
        <View style={{ width: '90%', backgroundColor: co.sub_yellow, borderRadius: 50, justifyContent: 'center', marginTop: 20, alignContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row' }}>
          <View style={{ width: '20%', aspectRatio: 1, backgroundColor: co.sub_black, borderRadius: 50, alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <Image
              source={Icon.telephone}
              resizeMode='cover'
              style={{ width: '80%', height: "80%", tintColor: co.main_red, alignContent: 'center', }}
            />
          </View>
          <View style={{ width: '80%', justifyConten: 'center', alignItems: 'center', marginLeft: 15 }}>
            <Text style={{ fontFamily: 'Ubuntu', fontSize: 15, color: co.yellow_white }}>{data.phone}</Text>
          </View>
        </View>
        <View style={{ width: '90%', backgroundColor: co.sub_yellow, borderRadius: 50, justifyContent: 'center', marginTop: 20, alignContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row' }}>
          <View style={{ width: '20%', aspectRatio: 1, backgroundColor: co.sub_black, borderRadius: 50, alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <Image
              source={Icon.mail}
              resizeMode='cover'
              style={{ width: '80%', height: "80%", tintColor: co.main_red, alignContent: 'center', }}
            />
          </View>
          <View style={{ width: '80%', justifyConten: 'center', alignItems: 'center', marginLeft: 15 }}>
            <Text style={{ fontFamily: 'Ubuntu', fontSize: 15, color: co.yellow_white }}>{data.gmail}</Text>
          </View>
        </View>


      </View>
    )
  }

  function Des() {
    return (
      <View style={{ width: '90%', marginTop: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: co.main_yellow, borderRadius: 40, marginBottom: 30 }}>
        <Text style={{ fontFamily: 'Roboto', fontSize: 20, margin: 20, color: co.sub_red }}>{data.description}</Text>
      </View>
    )
  }

  function Products() {
    const renderItem_products = ({ item }) => {

      let count_like = item.num_likes
      let bool = item.is_liked

      function LIKE() {
        const modifiedProducts = prdt.map((product) => {
          if (product.id === item.id) {
            const updatedProduct = { ...product };
            updatedProduct.is_liked = !bool;
            updatedProduct.num_likes = bool ? count_like - 1 : count_like + 1;
            bool = !bool
            return updatedProduct;
          } else {
            return product;
          }
        });

        setprdt(modifiedProducts);
        LikePrt(item.id);
      }
      return (
        <TouchableOpacity style={{ ...homeStyle.PV, width: undefined }}
          onPress={() => navigation.navigate('Product', { id: item.id })}
        >

          <Image
            source={{ uri: APIcode + item.Pic1 }}
            resizeMode='cover'
            style={{ width: "90%", aspectRatio: 1, borderTopLeftRadius: 50, borderTopRightRadius: 50 }} />


          <View style={{ backgroundColor: co.main_yellow, width: '90%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, }}>
            <TouchableOpacity style={{
              ...homeStyle.Pro_bar, marginTop: 10
            }}
              onPress={() => navigation.navigate('Store', { id: item.traderID })}>
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
              <TouchableOpacity style={{ flexDirection: 'row', width: '50%' }}
                onPress={() => LIKE()}
              >
                <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: item.is_liked ? co.main_red : co.black }}>{item.num_likes}</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <Image
                    source={Icon.Heart}
                    resizeMode='cover'
                    style={{ width: 25, height: 25, tintColor: item.is_liked ? co.main_red : co.black }}
                  /></View>
              </TouchableOpacity>
              <TouchableOpacity style={{ borderRadius: 20, justifyContent: 'center', alignItems: 'center', width: "35%", backgroundColor: co.main_blue, margin: 10, marginTop: 20, aspectRatio: 3 / 1 }}
                onPress={() => { AddCart(item.id) }}
              >
                <Text style={{ fontFamily: 'Raleway', fontSize: 20, color: co.white, fontWeight: 'bold' }}>Cart</Text>
              </TouchableOpacity>

            </View>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <FlatList
        data={prdt}

        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem_products}
        contentContainerStyle={{ paddingBottom: 5, paddingHorizontal: 5 }}
      />
    )
  }

  return (
    <View style={{ ...themeStye.container, backgroundColor:co.sub_black, padding: 0, }}>
      <StatusBar style="light" backgroundColor={co.sub_black} />
      <SafeAreaView style={{ width: '100%', justifyContent: 'flex-start', marginleft:10,alignItems: 'flex-start', backgroundColor: co.sub_yellow, borderBottomEndRadius: 20, borderBottomLeftRadius: 20, paddingTop:15 }}>
        <View style={{...ProStyle.Main_header, marginleft:10}}>
          <TouchableOpacity style={{...ProStyle.TO, marginleft:10}}
            onPress={() => navigation.goBack()}>
          <Image
          source={Icon.Back}
          resizeMode='contain'
          style={{...ProStyle.To_image, tintColor:co.white}}
          />
          </TouchableOpacity>
      
        </View>
      </SafeAreaView>
      <ScrollView>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {Banner()}
          {Info()}
          {Des()}
          {Products()}
        </View>
      </ScrollView>




    </View>
  )
}

export default Store
