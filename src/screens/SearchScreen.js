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

  ActivityIndicator
} from 'react-native';

import { COLORS, fonts, themeStye, homeStyle } from '../components/theme'
import { KeyContext, APIContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { img, Icon } from '../components';

import Filter from 'bad-words';

import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
const SearchScreen = ({ route, navigation }) => {
  const filter = new Filter();
  filter.addWords('punda', 'kottah', 'Baadu', "Ennoda", "poola", "oombuda", "Chunni", "Ki", "adi", "Okkala", "ozhi", "Koothi", "mayir", 'Kaai', 'Ommala', 'Okka', 'Poolu', 'Thevdiya', 'paiya');
   
  let co = colourTheme()
  let te = route.params.te
  console.log(te)
  const key = useContext(KeyContext)
  const APIcode = useContext(APIContext)
  const [loading, setloading] = useState(true)
  const [data, setdata] = useState('')
  const [Traddata, setTraddata] = useState('')

  const [searchtext, setsearchtext] = useState(te)
  const [pr, setpr] = useState(false)

  const [fil, setfil] = useState("Prdt")
  const [blank, setblank] = useState(false)


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

  async function APIProductsSearch() {
    setblank(false)
    setloading(true)

    console.log("Working")
    await getValueFor(key)


    let body = JSON.stringify({ "userid": ids, "search": searchtext })
    fetch(APIcode + "Base/Home/search/", {
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
          console.log("Product Search")
          setloading(false)
          return res.json()
        } else {
          console.log("Bad")
          console.log(body)
          setblank(true)
        }
      })
      .then(json => {
        console.log(json)
        setdata(json)
      })
      .catch(error => { console.log(error); console.log(body) })
      .finally(setloading(false))
  }



  async function APITraderSearch() {
    setblank(false)
    setloading(true)
    
    console.log("Working")
    await getValueFor(key)


    let body = JSON.stringify({ "userid": ids, "search": searchtext })
    fetch(APIcode + "Base/Home/TradSearch/", {
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
          console.log("Trader Search")


          return res.json()
        } else {
          console.log("Bad")
          setblank(true)
        }
      })
      .then(json => {
        console.log(json)
        setTraddata(json)

      })
      .catch(error => { console.log(error); console.log(body) })
      .finally(setloading(false))

  }
  useEffect(() => {
    APIProductsSearch();
  }, [fil])

  useEffect(() => {
    navigation.addListener('focus', () => {
      APIProductsSearch()
    });
  }, [fil])

  // let ScreenHeight = Dimensions.get("window").height;
  // let Screenwidth = Dimensions.get("window").width;

  async function CallFill() {

    let er = fil
    let p = filter.clean(searchtext)
    console.log(p)
    if (p==searchtext){
      if (er == 'Prdt') {
        await APIProductsSearch()
      }
      else {
        await APITraderSearch()
      }}
      else{
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

  function Header() {
    return (
      <View style={{ width: '100%', backgroundColor: co.main_yellow, alignItems: 'flex-start', justifyContent: 'flex-start' }}>

        <View style={{ flexDirection: 'row', width: '100%', marginTop: 10, marginBottom: 0, alignItems: 'center', justifyContent: 'space-around' }}>
          <TouchableOpacity style={{
            width: "30%", padding: 4
            , justifyContent: 'center', paddingBottom: 5
            , alignContent: 'flex-start'
          }}
            onPress={() => navigation.goBack()}>
            <Image
              source={Icon.Back}
              resizeMode='contain'
              style={{ width: "50%", tintColor: co.black }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{
            marginLeft: 50, width: "50%", padding: 4
            , justifyContent: 'center', paddingBottom: 5, alignContent: 'center', alignItems: 'center', marginRight: '5%'
          }}>
            <Image
              source={img.Logo_Text}
              resizeMode='contain'
              style={{ width: '100%', flex: 1 }}
            />
          </TouchableOpacity>

        </View>
        <View style={{ width: "100%", justifyContent: 'center', marginTop: 0, marginHorizontal: 15 }}>

          <View style={{ width: "100%", alignContent: 'center', alignItems: 'flex-start', justifyContent: 'flex-start', }}>
            <Text style={{ fontFamily: 'Lato', fontSize: 30, color: co.home_sub, marginHorizontal: 10 }}>Search</Text>
            <View style={{
              width: "90%", flexDirection: 'row', backgroundColor: co.sub_red, borderRadius: 90, alignContent: 'center', alignItems: 'center',
              shadowColor: co.black,
              shadowOffset: { width: 10, height: 40 },
              shadowOpacity: 1,
              shadowRadius: 40,
              elevation: 50,
            }}>
              <View style={{ width: "10%", aspectRatio: 1, alignContent: 'center', justifyContent: 'center', marginHorizontal: 10, borderRadius: 90 }}>
                <Image
                  source={Icon.Search_icon}
                  resizeMode='center'
                  style={{ width: "80%", height: "80%", tintColor: co.home_sub }}
                />
              </View>
              <View style={{ width: "65%", aspectRatio: 16 / 3, marginHorizontal: 10 }}>
                <TextInput
                  style={{ width: '90%', height: '100%', color: co.white, textAlignVertical: 'top', marginTop: 10, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 0 }}
                  placeholder='Search...'
                  autoCorrect={true}
                  blurOnSubmit={true}
                  onPressIn={() => setpr(true)}
                  onSubmitEditing={() => {CallFill(); }}
                  // clearButtonMode ='always'
                  returnKeyType='search'
                  selectionColor
                  value={searchtext}
                  onChangeText={(text) => { setsearchtext(text); setpr(true) }}
                  editable={true}
                  keyboardType='default' />
              </View>
              {pr == true &&
                <TouchableOpacity style={{ width: '15%', aspectRatio: 1, marginRight: 20, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
                  onPress={() => { setsearchtext(''); setpr(false) }}>
                  <Image
                    source={Icon.close}
                    resizeMode='center'
                    style={{ width: "100%", height: "100%", tintColor: co.white }}
                  />
                </TouchableOpacity>
              }
            </View></View></View>
        <View style={{ width: "100%", marginTop: 15, alignContent: 'center', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
          <TouchableOpacity style={{
            width: '50%', borderBottomWidth: 5, alignItems: "center", justifyContent: 'center',
            borderBottomColor: fil == "Prdt" ? co.main_red : co.main_yellow
          }}
            onPress={() => { setfil('Prdt');  APIProductsSearch() }}>
            <Text style={{ fontFamily: 'Lato', fontSize: 25, color: fil == "Prdt" ? co.main_red : co.sub_red }}>Products</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            width: '50%', borderBottomWidth: 5, alignItems: "center", justifyContent: 'center',
            borderBottomColor: fil == "Trad" ? co.main_red : co.main_yellow
          }}
            onPress={async () => { setfil('Trad'); console.log(fil); APITraderSearch() }}>
            <Text style={{ fontFamily: 'Lato', fontSize: 25, color: fil == "Trad" ? co.main_red : co.sub_red }}>Trader</Text>
          </TouchableOpacity>
        </View>
      </View>


    )
  }

  function Products() {
    const renderItem_products = ({ item }) => {
      return (
        <TouchableOpacity style={{ width: '100%', aspectRatio: 2 / 1.3, flexDirection: 'row', marginHorizontal: 10, marginVertical: 5 }}
          onPress={() => navigation.navigate('Product', { id: item.id })}
        >
          <Image
            source={{ uri: APIcode + item.Pic1 }}
            resizeMode='cover'
            style={{
              aspectRatio: 1, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, height: '95%'
            }} />
          <View style={{  aspectRatio: 1, backgroundColor: co.main_yellow, borderTopRightRadius: 20, borderBottomRightRadius: 20, padding:10 }}>

            <TouchableOpacity style={{
              ...homeStyle.Pro_bar, marginTop: 10,
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

            <View style={{ ...homeStyle.Pro_bar, marginTop: 10 }}>
              <View style={{ justifyContent: 'flex-start', width: '50%', alignContent: 'center' }}>
                <Text style={{ ...fonts.Name_Product }}>{item.Prdt_name}</Text>
              </View>
              <View style={{ width: '50%', justifyContent: 'flex-end' }}>
                <Text style={{ ...fonts.Name_Product, }}>{item.Price} LKR</Text>
              </View>

            </View>


            <View style={{ ...homeStyle.Pro_bar }}>
              <TouchableOpacity style={{ flexDirection: 'row', width: '50%' }}
                onPress={() => { LikePrt(item.id) }}
              >
                <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: 'red' }}>{item.num_likes}</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <Image
                    source={Icon.Heart}
                    resizeMode='cover'
                    style={{ width: 25, height: 25, tintColor: 'red' }}
                  /></View>
              </TouchableOpacity>
              <TouchableOpacity style={{ borderRadius: 20, justifyContent: 'center', alignItems: 'center', width: "40%", backgroundColor: co.main_blue, margin: 10, marginTop: 20, aspectRatio: 3 / 1.4 }}
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
      <View style={{ width: '100%' }}>
        <FlatList
          data={data}

          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItem_products}
          contentContainerStyle={{ flexGrow: 1, width: "100%", marginTop: 10, paddingBottom: 5, paddingHorizontal: 5 }}
        />
      </View>
    )
  }

  function Trader() {
    const renderItem_products = ({ item }) => {
      return (
        <TouchableOpacity style={{ width: '100%', aspectRatio: 2 / 1, flexDirection: 'row', marginHorizontal: 10, marginVertical: 5 }}
          onPress={() => navigation.navigate('Product', { id: item.pk })}
        >
          <Image
            source={{ uri: APIcode + item.profile_pic }}
            resizeMode='cover'
            style={{
              aspectRatio: 1, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, height: '95%'
            }} />
          <View style={{ height: '95%', aspectRatio: 1, backgroundColor: co.main_yellow, borderTopRightRadius: 20, borderBottomRightRadius: 20, }}>

            <View style={{
              ...homeStyle.Pro_bar, marginTop: 10,
            }}>
              <View style={{ width: '100%' }}>
                <Text style={{ ...homeStyle.PN, }}>{item.Company_name}</Text>
              </View>
            </View>

            <View style={{
              ...homeStyle.Pro_bar, marginTop: 10,
            }}>
              <View style={{ width: '100%' }}>
                <Text style={{ fontFamily: 'Lato', fontSize: 20, color: co.sub_red }}>Products Sold:</Text>
                <Text style={{ fontFamily: 'Lato', fontSize: 20, color: co.sub_red, marginTop: 15 }}>{item.num_sold}</Text>
              </View>
            </View>

          </View>



        </TouchableOpacity>

      )
    }

    return (
      <View style={{ width: '100%' }}>
        <FlatList
          data={Traddata}

          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItem_products}
          contentContainerStyle={{ flexGrow: 1, width: "100%", marginTop: 10, paddingBottom: 5, paddingHorizontal: 5 }}
        />
      </View>
    )
  }

  function Load() {
    return (
      <View style={{ justifyContent: 'center', flexDirection: "column", alignContent: 'center', alignItems: 'center', width: "100%", marginTop: '10%' }}>
        <View style={{ width: "100%", justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <Image
            source={img.OOPS}
            resizeMode="contain"
            style={{ width: 250, height: 250 }}
          /></View>
        <View style={{ width: "100%", marginTop: 10, alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Inter', fontSize: 30, color: co.main_red }}>OOPS!</Text>
          <Text style={{ fontFamily: 'Raleway', color: co.sub_red, fontSize: 25 }}>No Results Found</Text>
        </View>

      </View>
    )
  }


  return (
    <View style={{ ...themeStye.container, backgroundColor:co.sub_black, padding: 0 }}>
             <StatusBar style="light" backgroundColor={co.sub_black} />
      <SafeAreaView style={{ width: '100%', height: '100%', flex: 1 }}>
        <View style={{ width: '100%' }}>
          {Header()}
        </View>

        <ScrollView >
          {(loading == true) ? <ActivityIndicator color={co.main_yellow} size="large" />
            :
            [blank ?
              [Load()]
              // check error- wrong if function
              :
              [(fil == "Prdt") ?
                [Products()] :
                [Trader()]]
            ]}
        </ScrollView>
      </SafeAreaView>

    </View>

  )
}
export default SearchScreen