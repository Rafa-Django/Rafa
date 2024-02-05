import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import { COLORS,   themeStye, } from "../components/theme"
import { Icon ,img} from "../components"

import { KeyContext, APIContext, TrdBoolContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import { SaveFormat } from 'expo-image-manipulator';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
import Filter from 'bad-words';
const StoreSettings = ({ navigation }) => {
  const filter = new Filter();
  filter.addWords('punda', 'kottah', 'Baadu', "Ennoda", "poola", "oombuda", "Chunni", "Ki", "adi", "Okkala", "ozhi", "Koothi", "mayir", 'Kaai', 'Ommala', 'Okka', 'Poolu', 'Thevdiya', 'paiya');

  let co = colourTheme()

  const key = useContext(KeyContext)
  const APIcode = useContext(APIContext)
  const setTrad_Acc = useContext(TrdBoolContext)

  const [data, setdata] = useState('')
  const [CM, setCM] = useState('')
  const [email, setemail] = useState('')
  const [Address, setAddress] = useState("")
  const [Number, setNumber] = useState("")
  const [des, setdes] = useState("")

  const [editBan, seteditBan] = useState(false)
  const [editPro, seteditPro] = useState(false)
  const [editp, seteditp] = useState(false)

  const [Banner, setBanner] = useState(null);
  const [Profile, setProfile] = useState(null);

  
  const [Bannerbase64, setBannerbase64] = useState(null);
  const [Profilebase64, setProfilebase64] = useState(null);


  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied')
      }
    })
  }, [])



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
        setdata(json)
        setCM(json.Company_name)
        setemail(json.gmail)
        setAddress(json.g_link)
        setNumber(json.phone)
        setdes(json.description)
        setBanner(APIcode + json.banner)
        setBannerbase64(APIcode + json.banner)
        setProfile(APIcode + json.profile_pic)
        setProfilebase64(APIcode + json.profile_pic)
      })
      .then(json => {
        console.log(json)

      })
      .catch(error => { console.log(error); console.log(body) })

  }
  useEffect(() => {
    APIinfo()
  }, [])

  useEffect(() => {
    navigation.addListener('focus', () => {
      APIinfo();
    });
  }, [])



  
  const pickBanner = async () => {
    console.log("working")
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission denied')
    }
    
    let results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6, 4],
      quality: 1,
      base64: true, 
    });

    
    if (!results.cancelled) {
      const BanRes = await ImageManipulator.manipulateAsync(results.uri, [], { compress: 0.8, format: SaveFormat.JPEG })
      setBanner(BanRes.base64);
      seteditBan(true)
      setBannerbase64(`data:image/png;base64,${BanRes.base64}`)
      
    }
  };




  const pickImage = async () => {
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

    
    setProfile(results)
    if (!results.cancelled) {
      const ProRes = await ImageManipulator.manipulateAsync(results.uri, [], { compress: 0.9, format: SaveFormat.JPEG })
      setProfile(ProRes.base64);
      seteditPro(true)
      setProfilebase64(`data:image/png;base64,${ProRes.base64}`)
      
    }
  };



  async function TradPro(Cat) {

    await getValueFor(key)
    console.log(Cat)

    let body = JSON.stringify({ "Userid": ids, "profile_pic": Profile, "banner": Banner, "Cato":Cat })
    fetch(APIcode + "Trader/UpdPro/", {
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
          if (Cat == "Ban"){
            setBannerbase64(false)
          }else{
            setProfilebase64(false)
          }
          navigation.openDrawer()
          return res.json()
        } else {
          console.log("Bad")
          console.log(body)
          navigation.openDrawer()
        }
      })
      .catch(error => { console.log(error); console.log(body) })
    } 

  
 
  async function TradUpd() {
    console.log(key)
    console.log("Working")
    await getValueFor(key)
    let pCM = filter.clean(CM)
    let pdes = filter.clean(des)
    if (pCM==CM && pdes==des){

    let body = JSON.stringify({ "Userid": ids, "Company_name": CM, "g_link": Address, "phone": Number, "gmail": email, "description": des })
    fetch(APIcode + "Trader/Update/", {
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
          seteditp(false)
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
    } else{
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

  async function DelAccount() {
    console.log(key)
    console.log("Working")
    await getValueFor(key)

    // 192.168.8.1:8000       
    let body = JSON.stringify({ "Userid": ids })
    fetch(APIcode + "Trader/Delete/", {
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
          setTrad_Acc(false)
          return res.json()
        } else {
          console.log("Bad")
          console.log(body)
        }
      }).catch(error => { console.log(error); console.log(body) })

  }


  function Head() {
    return (
      <View style={{ width: "100%", flexDirection: 'row', marginVertical: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={{ width: "30%", alignContent: 'flex-start', justifyContent: 'center', marginHorizontal: 15 }}
          onPress={() => { editBan == true ? TradPro('Ban') : navigation.openDrawer(); editPro == true ? TradPro('Pro') : navigation.openDrawer(); editp == true ? TradUpd() : navigation.openDrawer(); }}>
          <Image
            source={Icon.menu}
            resizeMode="contain"
            style={{ width: "50%", tintColor: co.main_red }}
          />
        </TouchableOpacity>
        <View style={{ width: '60%', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={img.Logo_Text}
            resizeMode='contain'
            style={{ width: "80%", flex: 1 }}

          />
        </View>
      </View>
    )
  }

  function Main() {
    return (
      <View style={{ marginHorizontal: 0, marginBottom: 50, width: '90%', marginTop: 20, alignItems: 'center', justifyContent: "center", marginHorizontal: 20 }}>
        <View style={{ marginTop: 10, width: "100%" }}>
          <View>
            <Text style={{ fontFamily: 'Roboto', fontSize: 25, color: co.main_yellow }} >Banner:</Text>
          </View>
          <TouchableOpacity style={{ width: '90%', alignContent: 'center', marginHorizontal: 10, marginTop: 15 }}
            onPress={() => pickBanner()}>
            <Image  
              source={{ uri:Bannerbase64 }}
              resizeMode='cover'
              style={{ width: '100%', aspectRatio: 16 / 9, borderRadius: 50 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10, width: "100%" }}>
          <View>
            <Text style={{ fontFamily: 'Roboto', fontSize: 25, color: co.main_yellow }} >Profile Pic:</Text>
          </View>
          <TouchableOpacity style={{ width: '90%', marginTop: 15, justifyContent: 'center' }}
            onPress={() => pickImage()}>
            <Image
              source={{ uri:Profilebase64}}
              resizeMode='cover'
              style={{ width: '90%', aspectRatio: 1, flex: 1, borderRadius: 50 }}

            />
          </TouchableOpacity>
        </View>
        <View style={{ width: '100%', justifyContent: 'center' }}>
          <View style={{ width: '90%', marginTop: 10, marginHorizontal: 15 }}>
            <Text style={{ fontFamily: "Inter", color: co.white, fontSize: 25 }}>Company Name:</Text>
          </View>
          <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 50, marginTop: 15 }}>

            <TextInput
              style={{ width: '90%', color: co.white, textAlignVertical: 'top', marginVertical: 5, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10 }}
              placeholder='eg:Rafa Developers'
              textContentType='username'
              editable={true}
              autoComplete='name'
              value={CM}
              returnKeyType='next'
              onChangeText={text => { setCM(text); seteditp(true) }}
              keyboardType='default' />
          </View>

        </View>
        <View style={{ width: '100%', justifyContent: 'center' }}>
          <View style={{ width: '80%' }}>
            <Text style={{ fontFamily: "Inter", color: co.white, fontSize: 25 }}>E-mail:</Text>
            <Text style={{ fontFamily: "Raleway", color: co.main_red, fontSize: 13 }}>*provide your company's special email id</Text>
          </View>
          <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 40, marginTop: 15 }}>

            <TextInput
              style={{ width: '90%', color: co.white, textAlignVertical: 'top', marginVertical: 5, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10 }}
              placeholder='eg: rafadevelopers317@gmail.com'
              autoComplete='email'
              textContentType='emailAddress'
              returnKeyType='next'
              value={email}
              onChangeText={text => { setemail(text); seteditp(true) }}
              editable={true}
              keyboardType='default' />
          </View>

        </View>
        <View style={{ width: '100%', justifyContent: 'center' }}>
          <View style={{ width: '50%' }}>
            <Text style={{ fontFamily: "Roboto", color: co.white, fontSize: 25 }}>Mobile Number:</Text>
            <Text style={{ fontFamily: "Raleway", color: co.main_red, fontSize: 13 }}>*provide something the customers can talk to you about the products</Text>
          </View>
          <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 50, marginTop: 15 }}>

            <TextInput
              style={{ width: '90%', color: co.white, textAlignVertical: 'top', marginVertical: 5, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10 }}
              placeholder='07******'
              editable={true}
              value={Number}
              autoComplete='tel-country-code'
              importantForAutofill='auto'
              returnKeyType='done'
              onChangeText={text => { setNumber(text); seteditp(true) }}

              keyboardType='number-pad' />
          </View>

        </View>
        <View style={{ width: '100%', marginTop: 15 }}>
          <Text style={{ fontFamily: 'Inter', fontSize: 18, color: co.white, alignContent: 'flex-start', marginBottom: 10 }}>Address:</Text>
          <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 50 , aspectRatio:3/1}}>

            <TextInput
              style={{ width: '90%', aspectRatio:3/1,color: co.white, textAlignVertical: 'top', marginVertical: 5, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 20 }}
              placeholder='Country/City/Division/Street/Lane/House no. (or a link)'
              editable={true}
              autoComplete='street-address'
              value={Address}
              returnKeyType='done'
              keyboardType='default'
              onChangeText={text => { setAddress(text); seteditp(true) }}
              multiline={true}
            />
          </View>
        </View>
        <View style={{ width: '100%', marginTop: 15 }}>
          <Text style={{ fontFamily: 'Inter', fontSize: 18, color: co.white, alignContent: 'flex-start', marginBottom: 10 }}>Description:</Text>
          <View style={{ width: '90%',  aspectRatio:3/1,textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 50 }}>

            <TextInput
              style={{ width: '90%',  aspectRatio:3/1,color: co.white, textAlignVertical: 'top', marginVertical: 10, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 20 }}

              editable={true}
              value={des}
              returnKeyType='done'
              keyboardType='default'
              onChangeText={text => { setdes(text); seteditp(true) }}
              multiline={true}
            />
          </View>
        </View>
        <View style={{ width: '100%', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '90%', borderRadius: 40, backgroundColor: co.main_red, opacity: 0.7, justifyContent: 'center', alignItems: 'center', alignContent: 'center', }}>
            <Text style={{ fontFamily: 'Lato', fontSize: 15, color: co.main_yellow, margin: 10 }}>If you wish to delete your account and all your orders and products click the button below, however we highly recommend you to give a little more effort you will ACHIEVE! IF YOU WISH YOU CAN ALSO FILE A COMPLAIN SO WE CAN IMPROVE.</Text>
          </View>
          <View style={{ width: '90%', margin: 15, flexDirection: 'row', alignItems: 'flex-start' }}>
            <TouchableOpacity style={{ borderRadius: 20, width: "50%", alignItems: 'center', justifyContent: 'center', backgroundColor: co.main_yellow, width: 150, alignContent: 'flex-start' }}>
              <Text style={{ fontFamily: 'Ubuntu', fontSize: 22, color: co.sub_yellow, marginVertical: 10 }}>FeedBack</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: "50%", alignContent: 'flex-end', justifyContent: 'flex-end', marginHorizontal: 50, marginTop: 10 }}
              onPress={() => {
                window.alert(
                  "Delete Account", "Please, we highlt request you to file a complain for us to improve, rather not delete the account!",
                  [{ text: "Delete", onPress: () => { DelAccount() } }, { text: 'Cancel', onPress: () => { } }]
                )
              }}>
              <Text style={{ fontFamily: 'Ubuntu', fontSize: 15, color: co.main_red, textDecorationLine: 'underline' }}>Delete Account!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }




  return (
    <View style={{ ...themeStye.container, backgroundColor:co.sub_black, paddingBottom: "10%", }}>
      <StatusBar style="light" backgroundColor={co.sub_black} />
      <SafeAreaView style={{  width: '100%', paddingTop: 10, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: co.sub_yellow, borderBottomEndRadius: 20, borderBottomLeftRadius: 20 }}>
        {Head()}
      </SafeAreaView>
      <ScrollView>
        {Main()}


      </ScrollView>




    </View>
  )
}

export default StoreSettings
