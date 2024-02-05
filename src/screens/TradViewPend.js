import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking, Platform,
  Dimensions
} from 'react-native';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
import { COLORS,  OrdViStyle, themeStye, homeStyle, ProStyle } from '../components/theme'
import { KeyContext, APIContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { img, Icon } from '../components';



const TradViewPend = ({ navigation, route }) => {
  let co = colourTheme()
  const key = useContext(KeyContext)
  const APIcode = useContext(APIContext)
  const [data, setdata] = useState('')
  const [pp, setitem] = useState('')
  const [loading, setloading] = useState(true)

  let COpk = route.params.pk
  let Name = route.params.Name
  let add = route.params.add
  let dat = route.params.dat
  let payment = route.params.payment
  let phone = route.params.phone
  let gmail = route.params.gmail

  let it_total = route.params.it_total
  let get_total = route.params.total


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




  async function APIPrdt() {
    console.log(key)
    console.log("Working")
    // await getValueFor(key)


    let body = JSON.stringify({ "COid": COpk })
    fetch(APIcode + "Trader/Cart/Item/", {
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
        setitem(json)
      })
      .catch(error => { console.log(error); console.log(body) })
      .finally(() => setloading(false))
  }

  useEffect(() => {
    APIPrdt();
  }, [])

  useEffect(() => {
    navigation.addListener('focus', () => {
      APIPrdt()
    });
  }, [])

  const dialCall = () => {

    let phoneNumber = phone;

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + phone + '}';
    }
    else {
      phoneNumber = 'telprompt:${' + phone + '}';
    }

    Linking.openURL(phoneNumber);
  };

  function OptMAin() {
    return (
      <View style={{ width: '100%', alignItems: 'center', marginTop: 15, justifyContent: 'center', }}>
        <View style={{ width: '95%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
          <Text style={{ fontFamily: 'Saira', fontSize: 25, color: co.white }}>Order:</Text>
        </View>
        <View style={{ ...themeStye.borderLine, marginTop: 0, backgroundColor: co.white, borderColor: co.white, marginBottom: 10 }}></View>
        <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ marginHorizontal: 10, width: '40%', backgroundColor: co.main_yellow, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => navigation.navigate('TradAcceptOrd', { pk: COpk })}>
            <Text style={{ color: co.main_red, fontFamily: 'Roboto', fontSize: 20, marginVertical: 10 }}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginHorizontal: 10, width: '40%', backgroundColor: co.main_yellow, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: co.main_red, fontFamily: 'Roboto', fontSize: 20, marginVertical: 10 }}>Cancel!</Text>
          </TouchableOpacity>
        </View>
        <View style={{ ...themeStye.borderLine, marginVertical: 15, backgroundColor: co.white, borderColor: co.white }}></View>
      </View>
    )
  }


  function CustInfo() {
    return (
      <View style={{ ...OrdViStyle.Vi1 }}>
        <View>
          <Text style={{ ...OrdViStyle.MainText, color:co.white }}>Customer Info</Text>
        </View>
        <View style={{ ...OrdViStyle.Vi2, backgroundColor:co.red }}>
          <Text style={{ ...OrdViStyle.SubText, color:co.main_yellow }}>Name: {Name}</Text>
          <Text style={{ ...OrdViStyle.SubText, color:co.main_yellow }}>Address: {add}</Text>
          <Text style={{ ...OrdViStyle.SubText, color:co.main_yellow }}>Phone: {phone}</Text>
          <Text style={{ ...OrdViStyle.SubText, color:co.main_yellow }}>email: {gmail}</Text>
          <Text style={{ ...OrdViStyle.SubText, color:co.main_yellow }}>payement: {payment}</Text>
          <Text style={{ ...OrdViStyle.SubText, color:co.main_yellow }}>Date: {dat}</Text>
        </View>
        <View style={{ ...themeStye.borderLine, backgroundColor: co.white, borderColor: co.white }}></View>
        <TouchableOpacity style={{ ...OrdViStyle.CallTouch }}
          onPress={() => dialCall()}>
          <Image
            source={Icon.call}
            resizeMode='contain'
            style={{...ProStyle.To_image, tintColor:co.white, margin: 15 }}
          />
        </TouchableOpacity>
        <View style={{ ...themeStye.borderLine, marginTop: 10, backgroundColor: co.white, borderColor: co.white, marginBottom: 10 }}></View>

        <View style={{ ...OrdViStyle.Vi3 }}>
          <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.main_yellow, margin: 10 }}>Total: {get_total}</Text>
          <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.main_yellow, margin: 10 }}>Quantity: {it_total}</Text>

        </View>

        <View style={{ ...themeStye.borderLine, marginTop: 10, backgroundColor: co.white, borderColor: co.white }}></View>
      </View>
    )
  }


  const renderItem = ({ item }) => {
    var wi = Dimensions.get("window").width
    return (
      <View style={{ ...OrdViStyle.RVi1, backgroundColor:co.main_yellow }}>
        <View style={{ ...OrdViStyle.Rvi2 }}>
          <View style={{ width: "50%" }}>
            <Image
              source={{ uri: APIcode + item.get_productImage }}
              resizeMode='cover'
              style={{ ...OrdViStyle.ItImage }}
            />
          </View>
          <View style={{ ...OrdViStyle.RVi3 }}>
            <Text style={{ ...homeStyle.PN, fontSize: 25 }}>{item.get_productName}</Text>
          </View>
        </View>
        <View style={{ ...OrdViStyle.RVi4 }}>
          <View style={{ ...OrdViStyle.RVi5 }}>
            <Text style={{ fontFamily: "Ubuntu", fontSize: 18 }}>Quantity: {item.quantity}</Text>
          </View>
          <View style={{ ...OrdViStyle.RVi6 }}>
            <Text style={{ marginHorizontal: 20, fontFamily: "Ubuntu", fontSize: 18, }}>Total:</Text>
            <Text style={{ marginHorizontal: 20, fontFamily: "Ubuntu", fontSize: 18, }}>{item.get_total}.LKR</Text>
          </View>
        </View>
      </View>
    )
  }



  function Catogeries() {
    var wi = Dimensions.get("window").width
    return (
      <View style={{ ...OrdViStyle.MainView, backgroundColor:co.sub_black }}>
        <FlatList
          data={pp}

          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ alignContent: "center", marginHorizontal: 10, width: "90%", alignItems: 'center', justifyContent: 'center' }}
        />
      </View>
    )

  }


  return (
    <View style={{ backgroundColor: co.sub_black, width: '100%', height: '100%' }}>
      <StatusBar style="light" backgroundColor={co.sub_black} />
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
      <ScrollView >
        {OptMAin()}
        {CustInfo()}

        {Catogeries()}


      </ScrollView>
    </View>

  )
}


export default TradViewPend