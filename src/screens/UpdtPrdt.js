import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import { COLORS,  themeStye, } from '../components/theme'
import { Dimensions } from 'react-native';

import { APIContext, KeyContext, } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { SaveFormat } from 'expo-image-manipulator';
import { img, Icon } from '../components';

import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';


import Filter from 'bad-words';
const UpdtPrdt = ({ navigation, route }) => {
  const filter = new Filter();
  filter.addWords('punda', 'kottah', 'Baadu', "Ennoda", "poola", "oombuda", "Chunni", "Ki", "adi", "Okkala", "ozhi", "Koothi", "mayir", 'Kaai', 'Ommala', 'Okka', 'Poolu', 'Thevdiya', 'paiya');

  let co = colourTheme()
  let prt_id = route.params.id

  const key = useContext(KeyContext)
  const APIcode = useContext(APIContext)


  const [data, setdata] = useState('')
  const [loading, setloading] = useState(true)
  const [selected, setselected] = useState("")
  const [sel, setsel] = useState(false)

  const [PM, setPM] = useState('')
  const [price, setprice] = useState('')
  const [des, setdes] = useState("")

  const [edit, setedit] = useState(false)
  const [editp1, seteditp1] = useState(false)
  const [editp2, seteditp2] = useState(false)
  const [editp3, seteditp3] = useState(false)

  const [Pic1, setPic1] = useState(null);
  const [Pic2, setPic2] = useState(null);
  const [Pic3, setPic3] = useState(null);

  const [npic1, setnpic1] = useState(null);
  const [npic2, setnpic2] = useState(null);
  const [npic3, setnpic3] = useState(null);

  const CatogeriesList = [
    {
      image: img.Food,
      text: 'Food',
      id: '01'
    },
    {
      image: img.grocery,
      text: 'Grocery',
      id: '02'
    },
    {
      image: img.Mechanical,
      text: 'Mechanical',
      id: '03'
    },
    {
      image: img.Fancy,
      text: 'Fancy',
      id: '04'
    },
    {
      image: img.Beauty,
      text: 'Cosmetics',
      id: '05'
    },
    {
      image: img.Books,
      text: 'Books',
      id: '06'
    },
    {
      image: img.Clothing,
      text: 'Clothing',
      id: '07'
    },
    {
      image: img.Electronics,
      text: 'Electronics',
      id: '08'
    },
    {
      image: img.Medical,
      text: 'Medical',
      id: '09'
    },
    {
      image: img.Toys,
      text: 'Toys',
      id: '10'
    },
    {
      image: img.Fruits,
      text: 'Fruits',
      id: '11'
    },
    {
      image: img.Jewels,
      text: 'Jewels',
      id: '12'
    },
    {
      image: img.Others,
      text: 'Others',
      id: '13'
    },
    {
      image: img.Pets,
      text: 'Pets & Care',
      id: '14'
    },

  ]


  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied')
      }
    })
  }, [])

  const pickPrdt = async (code) => {
    console.log("working")
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission denied')
    }
    // No permissions request is necessary for launching the image library
    let results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
      base64: true, 
    });

    console.log(results);

    if (!results.cancelled) {
      const BanRes = await ImageManipulator.manipulateAsync(results.uri, [], { compress: 0.9, format: SaveFormat.JPEG })
      console.log(code)
      if (code === '1') {
        setPic1(`data:image/png;base64,${BanRes.base64}`)
        setnpic1(BanRes.base64)
      }
      if (code === '2') {
        setPic2(`data:image/png;base64,${BanRes.base64}`)
        setnpic2(BanRes.base64)
      }
      if (code === '3') {
        setPic3(`data:image/png;base64,${BanRes.base64}`)
        setnpic3(BanRes.base64)
      }
      console.log(BanRes)
    }
  };


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
  async function APIProductsSolo() {
    console.log(key)
    console.log("Working")
    await getValueFor(key)
    prt_id = route.params.id
    console.log(prt_id)

    // 192.168.8.1:8000       
    let body = JSON.stringify({ "prtid": prt_id, "usid": ids })
    fetch(APIcode + "Base/Home/solo/", {
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
        setPic1(APIcode + json.Pic1)
        setPic2(APIcode + json.Pic2)
        setPic3(APIcode + json.Pic3)
        setPM(json.Prdt_name)
        setprice(json.Price)
        setdes(json.Prdt_description)
        setselected(json.catogery)


      })
      .catch(error => { console.log(error); console.log(body) })
      .finally(() => setloading(false))
  }
  useEffect(() => {
    APIProductsSolo()
  }, [])

  useEffect(() => {
    navigation.addListener('focus', () => {
      APIProductsSolo()
    });
  }, [])

  async function UpdtBasePrdt() {
    await getValueFor(key)
    let prt_id = route.params.id
    let pPM = filter.clean(PM)
    let pdes = filter.clean(des)
    if (pPM==PM && pdes==des){  
      let body = JSON.stringify({ "Usid": ids, "Prtid": prt_id, "Prdt_name": PM, "Prdt_description": des, "Price": price, "Cat": selected })
      fetch(APIcode + "Trader/Product/Update/", {
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
            setedit(false)

            return res.json()
          } else {
            console.log("Bad")
            console.log(body)
          }
        })
        .then(json => {
          console.log(json)

        })
        .catch(error => { console.log(error); console.log(body) })
      }else{
          window.alert(
              "Inappropiate words found!",
              "Our app does not support your request",
              [
                  {
                      text: "Ok",
                      onPress: () => {},
                  }])
      }
      
  }

  async function UPdtPIC(code, pic) {
    console.log("Working")
    await getValueFor(key)
    
    console.log(code)
    let body = JSON.stringify({ "Usid": ids, "Prtid": prt_id, "pic_code":code, "Pic":pic})
    fetch(APIcode +"Trader/Product/Pic/", {
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
          if (code=="1"){
             seteditp1(false)
          } else if(code=="2"){
            seteditp2(false)
          } else if(code =="3"){
            seteditp3(false)
          } else{
            seteditp1(false);  seteditp2(false); seteditp3(false)
          }
         

          return res.json()
        } else {
          console.log("Bad")
          console.log(body)

        }
      }).catch(error => { console.log(error); console.log(body) })

  }




  function Head() {
    return (
      <View style={{ width: "100%", flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyConten: 'center', heigth: '100%', alignItems: 'center', flex: 1 }}>
        <TouchableOpacity style={{ paddingHorizontal: 20, alignContent: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: co.main_red, borderRadius: 20, marginHorizontal: 15, paddingVertical: 5 }}
          onPress={() => {
            if (edit == true) { UpdtBasePrdt(); }
            if (editp1 == true) { UPdtPIC(1, npic1); }
            if (editp2 == true) { UPdtPIC(2, npic2); }
            if (editp3 == true) { UPdtPIC(3, npic3); }
            else {
              navigation.goBack();
            }

          }}
        >
          <Text style={{ fontFamily: 'Ubuntu', color: co.white, fontSize: 25 }}>Save</Text>
        </TouchableOpacity>
        <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', width: '60%' }}>
          <Image
            source={img.Logo_Text}
            resizeMode='contain'
            style={{ width: '80%', flex: 1 }}


          />
        </View>
      </View >
    )
  }

  function Pic() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={{ marginTop: 10, marginHorizontal: 10, width: "100%" }}>
        <View>
          <Text style={{ fontFamily: 'Roboto', fontSize: 25, color: co.main_yellow }} >Product Pics:</Text>
        </View>
        <ScrollView horizontal style={{ marginTop: 10, flexDirection: 'row', marginHorizontal: 10 }}>
          <TouchableOpacity style={{ width: width - 50, aspectRatio: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, marginTop: 15 }}
            onPress={() => { pickPrdt('1'); seteditp1(true); console.log("pressed") }}>
            <Image
              source={{ uri: Pic1 }}
              resizeMode='cover'
              style={{ borderRadius: 40, width: '100%', aspectRatio: 1, flex: 1 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: width - 50, aspectRatio: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, marginTop: 15 }}
            onPress={() => { pickPrdt('2'); seteditp2(true) }}>
            <Image
              source={{ uri: Pic2 }}
              resizeMode='cover'
              style={{ borderRadius: 40, width: '100%', aspectRatio: 1, flex: 1 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: width - 50, aspectRatio: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, marginTop: 15 }}
            onPress={() => { pickPrdt('3'); seteditp3(true) }}>
            <Image
              source={{ uri: Pic3 }}
              resizeMode='cover'
              style={{ borderRadius: 40, width: '100%', aspectRatio: 1, flex: 1 }}
            />
          </TouchableOpacity>

        </ScrollView>
      </View>
    )
  }

  function Catogeries() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: 5,

            paddingBottom: 5,
            backgroundColor: (item.text == selected) ? co.main_blue : co.home_sub,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 4,
            height: '100%',
            aspectRatio: 5 / 6,


          }}
          onPress={() => { setselected(item.text); setedit(true); }}
        >
          <View
            style={{

              backgroundColor: (item.text == selected) ? co.main_yellow : co.main_red,
              borderRadius: 90, justifyContent: 'center', alignItems: 'center', height: '50%', aspectRatio: 1
            }}
          >
            <Image
              source={item.image}
              resizeMode='contain'
              style={{ aspectRatio: 1, height: '80%' }}
            />
          </View>
          <View style={{ margin: 5, }}>
            <Text style={{
              fontSize: 13,
              color: (item.text == selected) ? co.main_yellow : co.white,
              fontFamily: "Lato"
            }}>{item.text}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <View style={{
        marginHorizontal: 10, marginTop: 25, width: '95%',aspectRatio:10/4
      }}>
        <Text style={{ fontFamily: 'Roboto', fontSize: 25, color: co.main_yellow }}>Choose Category:</Text>
        <View style={{ borderRadius: 20, flexDirection: 'row', marginTop: 10, height: '5%', flexGrow: 1 }}>

          {loading ? <ActivityIndicator /> : (

            <FlatList
              data={CatogeriesList}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={{ paddingVertical: 10, marginHorizontal: 5 }}
            />
          )}
        </View>
      </View>
    )
  }
  function Main() {
    return (
      <View style={{ marginLeft: 10, marginBottom: 10, width: '90%', marginTop: 20, alignItems: 'center', justifyContent: "center", marginHorizontal: 20 }}>
        <View style={{ width: '100%', justifyConten: 'flex-start' }}>
          <View style={{ width: '90%', }}>
            <Text style={{ fontFamily: "Inter", color: co.white, fontSize: 25 }}>Product Name:</Text>
          </View>
          <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 20, marginTop: 15 }}>

            <TextInput
              style={{ width: '90%', color: co.white, textAlignVertical: 'top', marginVertical: 5, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10 }}
              placeholder='eg:Rafa Developers'
              textContentType='username'
              editable={true}
              autoComplete='name'
              value={PM}
              returnKeyType='next'
              onChangeText={text => { setPM(text); setedit(true) }}
              keyboardType='default' />
          </View>

        </View>
        <View style={{ width: '100%', justifyConten: 'flex-start' }}>
          <View style={{ width: '90%', }}>
            <Text style={{ fontFamily: "Inter", color: co.white, fontSize: 25 }}>Price per product:</Text>
            <Text style={{ fontFamily: "Raleway", color: co.main_red, fontSize: 10 }}>Provide in your country's currency</Text>
          </View>
          <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 20, marginTop: 15 }}>

            <TextInput
              style={{ width: '90%', color: co.white, textAlignVertical: 'top', marginVertical: 5, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10 }}
              returnKeyType='next'
              value={price}
              onChangeText={text => { setprice(text); setedit(true) }}
              editable={true}
              keyboardType='default' />
          </View>

        </View>
        <View style={{ width: '100%' }}>
          <Text style={{ fontFamily: 'Inter', fontSize: 18, color: co.white, alignContent: 'flex-start', marginBottom: 10 }}>Description:</Text>
          <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 20, marginTop: 15 }}>

            <TextInput
                style={{ width: '90%', color: co.white, textAlignVertical: 'top', marginVertical: 10, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10 }}

              multiline={true}
              editable={true}
              numberOfLines={3}
              value={des}
              returnKeyType='done'
              keyboardType='default'
              onChangeText={text => { setdes(text); setedit(true) }}
              
            />
          </View>
        </View>
      </View>
    )
  }




  return (
    <View style={{ ...themeStye.container, backgroundColor:co.sub_black, padding: 0, paddingBottom:30 }}>
      <StatusBar style="light" backgroundColor={co.sub_black} />
      <SafeAreaView style={{ height: "10%", width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: co.sub_yellow, borderBottomEndRadius: 20, borderBottomLeftRadius: 20 }}>
        {Head()}
      </SafeAreaView>
      <ScrollView>
        {Pic()}
        {Catogeries()}
        {Main()}
      </ScrollView>
    </View>
  )
}

export default UpdtPrdt
