import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  RefreshControl,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  Alert
} from 'react-native';

import { COLORS,   fonts, themeStye, homeStyle } from '../components/theme'
import * as Location from 'expo-location';
import { APIContext, KeyContext, AuthContext, LogContext,StateContext, CountryContext, TrdBoolContext} from "../../UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { img, Icon } from '../components';

import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';  
import Filter from 'bad-words';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const Mainhome = ({ navigation }) => {
  const filter = new Filter();
  filter.addWords('punda', 'kottah', 'Baadu', "Ennoda", "poola", "oombuda", "Chunni", "Ki", "adi", "Okkala", "ozhi", "Koothi", "mayir", 'Kaai', 'Ommala', 'Okka', 'Poolu', 'Thevdiya', 'paiya');
 
  let co = colourTheme()



  const key = useContext(KeyContext)
  const APIcode = useContext(APIContext)
  const [Auth, setAuth] = useContext(AuthContext)
  
  const [country, setcountry] = useContext(CountryContext)
  const [state, setstate] = useContext(StateContext)


  const [selected, setselected] = useState("")
  const [sel, setsel] = useState(false)
  const [catload, setcatload] = useState(false)

  const [loading, setloading] = useState(false)
  const [data, setdata] = useState('')

  const [daTop, setdaTop] = useState({
    "Num_of_products_sold": 0,
    "Pic1": "/Images/PrdtPIC13_RJipfB6.jpeg",
    "Prdt_name": "BBQ",
    "Price": "555",
    "catogery": "Food",
    "id": 28,
    "is_liked": true,
    "num_comm": 0,
    "num_likes": 1,
    "traderID": 3,
    "traderName": "Rafa",
    "traderProfile": "/Images/profile3_SqLjNg8.jpeg",
  })
  const [daBase, setdaBase] = useState('')
  const [daLike, setdaLike] = useState('')
  const [daRecent, setdaRecent] = useState('')
  const [daCat, setdaCat] = useState('')

  const [searchtext, setsearchtext] = useState('')
  const [pr, setpr] = useState(false)

  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [AP1load, setAP1load] = React.useState(true);
  const [AP2load, setAP2load] = React.useState(true);
  const [AP3load, setAP3load] = React.useState(true);
  const [AP4load, setAP4load] = React.useState(true);
  const [AP5load, setAP5load] = React.useState(true);

  const [AP1work, setAP1work] = React.useState(true);
  const [AP2work, setAP2work] = React.useState(true);
  const [AP3work, setAP3work] = React.useState(true);
  const [AP4work, setAP4work] = React.useState(true);
  const [AP5work, setAP5work] = React.useState(true);
  const [APCatwork, setAPCatwork] = React.useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

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

  let stopFetchMore = true;

  async function Loca(s, c) {
    console.log("Working")
    console.log(s)
    console.log(c)
    await getValueFor(key)

    let body = JSON.stringify({ "usid": ids, "state": s, "country": c })
    fetch(APIcode + "Base/Updt/State", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    })
      .then(async res => {
        if (res.ok) {
          console.log("Good")
          console.log(body)
          await APIProducts();
          await TopProm();
          await RecentProducts();
          await APIBaseProducts();
          await LikedProducts();


          return res.json()
        } else {
          console.log("Bad")
          console.log(body)


        }
      })
      .then(() => {
        setstate(s)
        setcountry(c)
      })
      .catch(error => { console.log(error); console.log(body) })
  }
  let get_country = ""
  let get_state = ""
  function getLocationInfo(latitude, longitude) {
    const base_url = "https://nominatim.openstreetmap.org/reverse";
    const params = {
        format: "json",
        lat: latitude,
        lon: longitude,
    };

    const url = new URL(base_url);
    url.search = new URLSearchParams(params).toString();

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.address) {
                const address = data.address;
                const country = address.country || "";
                const city = address.city || "";
                return { country, city };
            } else {
                return { country: null, city: null };
            }
        })
        .catch(error => {
            console.error("Error fetching location information:", error);
            return { country: null, city: null };
        });
}
  function getUserLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                getLocationInfo(latitude, longitude)
                    .then(result => {
                        const { country, city } = result;
                        if (country && city) {
                          get_country=country
                          get_state=city
                        } else {
                            console.log("Unable to retrieve location information.");
                        }
                    });
            },
            error => {
                console.error("Error getting user location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
  }

  let getst = ""
  let getco = ""
  async function getlocation() {
    
    getst = await AsyncStorage.getItem('Sta');
    getco = await AsyncStorage.getItem('Con');
    console.log("worked")
    console.log(getst)
    console.log(getco)
    
    if (getst != get_state) {
      Loca(get_state, get_country);
      await AsyncStorage.setItem("Con", get_country)
      await AsyncStorage.setItem("Sta", get_state);
      console.log("worked")
      window.alert(
        "Your current State looks Different",
        "Your App settings will now change to the new loacation",
        [
          {
            text: 'Ok',
            onPress: () => {  }
          }
        ]
      )
    } else {
      console.log("Same location")
      TopProm();
      APIProducts();
      RecentProducts();
      APIBaseProducts();
      LikedProducts();
    }
  };

  const ListFooterComponent = () => (
    <Text
      style={{
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
        color: co.yellow_white,
        marginBottom:30
      }}
    >
      Loading...
    </Text>
  );




  async function APIProducts() {
    setAP1work(true)
    setAP1load(true)

    await getValueFor(key)


    let body = JSON.stringify({ "usid": ids })
    fetch(APIcode + "Base/Home/", {
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
          if (body) { setAP1work(false) }

        }
      })
      .then(json => {
        console.log(json)
        setdata(json)
        setAP1load(false)

      })
      .catch(error => { console.log(error); console.log(body) })

  }

  async function APIBaseProducts() {
    setAP2work(true)
    setAP2load(true)
    console.log(key)
    console.log("Working")
    await getValueFor(key)
    console.log(Auth)

    // 192.168.8.1:8000       
    let body = JSON.stringify({ "usid": ids })
    fetch(APIcode + "Base/Home/Base/", {
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
          if (body) { setAP2work(false) }
        }
      })
      .then(json => {
        console.log(json)
        setdaBase(json)
        setAP2load(false)

      })
      .catch(error => { console.log(error); console.log(body) })

  }


  async function RecentProducts() {
    setAP3work(true)
    setAP3load(true)
    console.log(key)
    console.log("Working")
    await getValueFor(key)
    console.log(Auth)


    let body = JSON.stringify({ "usid": ids })
    fetch(APIcode + "Base/Home/Rec/", {
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
          if (body) { setAP3work(false) }

        }
      })
      .then(json => {
        console.log("re")
        setdaRecent(json)
        setAP3load(false)

      })
      .catch(error => { console.log(error); console.log(body) })

  }

  async function LikedProducts() {
    setAP4work(true)
    setAP4load(true)
    console.log(key)
    console.log("Working")
    await getValueFor(key)
    console.log(Auth)


    let body = JSON.stringify({ "usid": ids })
    fetch(APIcode + "Base/Home/Like/", {
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
          if (body) { setAP4work(false) }

        }
      })
      .then(json => {
        console.log("re")
        setdaLike(json)
        console.log(json)
        setAP4load(false)
      })
      .catch(error => { console.log(error); console.log(body) })

  }

  async function TopProm() {
    setAP5work(true)
    setAP5load(true)
    console.log("Working")
    await getValueFor(key)

    let body = JSON.stringify({ "usid": ids })
    fetch(APIcode + "Base/Home/Top/", {
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
          if (body) { console.log('trash'); setAP5work(false) }

        }
      })
      .then(json => {
        console.log(json)
        setdaTop(json)
        setAP5load(false)

      })
      .catch(error => { console.log(error); console.log(body); setAP5work(false) })

  }

  async function APICat(select) {
    console.log(key)
    console.log("Working")
    await getValueFor(key)
    console.log(Auth)
    console.log(select)

    // 192.168.8.1:8000       
    let body = JSON.stringify({ "usid": ids, "cat": select })
    fetch(APIcode + "Base/Home/Cat/", {
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
          if (body) { console.log("Nulllll") }

        }
      })
      .then(json => {


        console.log(json)
        setdaCat(json)
        setloading(false)
        setcatload(true)

      })
      .catch(error => { console.log(error); console.log(body) })
      .finally(() => setloading(false))
  }



  useEffect(() => {
    getlocation()
    getUserLocation();

  }, [])



  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getlocation()
    await APIProducts();
    await TopProm();
    await RecentProducts();
    await APIBaseProducts();
    await LikedProducts();
    setTimeout(() => {
      setRefreshing(false);
    }, 4000);
  }, []);




  async function LikePrt(Prdtid) {
    console.log("Working")
    console.log(Prdtid)
    await getValueFor(key)

    let body = JSON.stringify({ "Usid": ids, "Prdtid": Prdtid })
    fetch(APIcode + "/Base/Product/Like/", {
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

  async function handleOnEndReached() {
    setLoadingMore(true);
    if (!stopFetchMore) {

      console.log("Working call ")
      await getValueFor(key)

      let body = JSON.stringify({ "usid": ids })
      fetch(APIcode + "Base/Home/", {
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
        .then(async json => {
          console.log(json)
          setdata(data.concat(json))
          console.log("working end")


        })
        .catch(error => { console.log(error); console.log(body) })
        .finally(() => { stopFetchMore = true; setLoadingMore(false); console.log("\''''''''") })
    }
    stopFetchMore = true;
  }


  function Header() {
    function RequestSearch(){
      let p = filter.clean(searchtext)
      console.log(p)
      if (p==searchtext){
        navigation.navigate('SearchScreen', { te: searchtext });
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
    return (
      <View style={{ height: 170, width: '100%', alignItems: "flex-start", justifyContent: 'flex-start', alignContent: 'flex-start', }}  >
        <ImageBackground source={img.Hometop} resizeMode="stretch" tintColor={co.home_sub} style={{ height: '100%', width: '100%', opacity: 1, tintColor: co.black }}>
          <View style={{ width: '100%', height: 80, marginTop: 10, flexDirection: 'row', alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <View style={{
              width: "50%", padding: 4
              , justifyContent: 'flex-start', paddingBottom: 10, height: "100%", alignContent: 'flex-start', alignItems: 'flex-start'
            }}>
              <Image
                source={img.Logo_Text}
                resizeMode='center'
                style={{ width: "100%", height: "90%" }}

              /></View>
            <View style={{ width: '50%', flexDirection: 'row', justifyContent: 'center', height: "100%", alignContent: 'flex-end', alignItems: 'flex-end' }}>

              <TouchableOpacity style={{ width: '50%', marginLeft: 50, height: "100%", paddingBottom: 10, justifyContent: 'center', alignContent: 'flex-end', alignItems: 'flex-end' }} 
              onPress={() => navigation.navigate('MainCart')}
              >
                <View style={{ ...themeStye.circle, height: 45, width: 45 }}>
                  <Image
                    source={Icon.Cart_icon}
                    style={{ width: 30, height: 30, tintColor: co.main_yellow, }}

                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: "100%", height: 50, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{
              width: "90%", height: "90%", flexDirection: 'row', backgroundColor: co.main_red, borderRadius: 90, alignContent: 'center', alignItems: 'center',
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
                  // autoCorrect={true}
                  // blurOnSubmit={true}
                  // onPressIn={() => setpr(true)}
                  onSubmitEditing={() => RequestSearch() }
                  returnKeyType='search'
                  value={searchtext}
                  onChangeText={text => setsearchtext(text)}
                  // editable={true}
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
            </View></View>
        </ImageBackground>
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
            width: 90


          }}
          onPress={async () => { APICat(item.text); setsel(true); setselected(item.text); setloading(true) }}
        >
          <View
            style={{
              width: 50, height: 50,
              backgroundColor: (item.text == selected) ? co.main_yellow : co.main_red,
              borderRadius: 90, justifyContent: 'center', alignItems: 'center'
            }}
          >
            <Image
              source={item.image}
              resizeMode='contain'
              style={{ width: 30, height: 30 }}
            />
          </View>
          <View style={{ margin: 5, }}>
            <Text style={{
              fontSize: 13,
              color: (item.text == selected) ? co.main_yellow : co.white,
              fontFamily: "Raleway"
            }}>{item.text}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <View style={{
        marginHorizontal: 10, width: '95%', height: 130, borderRadius: 20, flexDirection: 'row'
      }}>


        {sel == true &&
          <TouchableOpacity style={{ width: 50, height: 50, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: "center", borderRadius: 50, backgroundColor: co.main_red }}
            onPress={() => { setselected(""); setsel(false); setcatload(false) }}>
            <Image
              source={Icon.close}
              resizeMode='center'
              style={{ width: "100%", height: "100%", tintColor: co.white }}
            />
          </TouchableOpacity>}
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
    )
  }
  function Top_Products() {
    let count_like = daTop.num_likes
    let bool = daTop.is_liked
    console.log(bool)

    function LIKE() {
      console.log('vmfdkmnmmkm')
      const data = { ...daTop }
      data.is_liked = !bool
      data.num_likes = bool ? count_like - 1 : count_like + 1
      bool = !bool
      LikePrt(daTop.id)
      setdaTop(data)


    }

    return (

      <TouchableOpacity style={{ ...homeStyle.PV }}
        onPress={() => navigation.navigate('Product', { id: daTop.id })}
      >

        <Image
          source={{ uri: APIcode + daTop.Pic1 }}
          resizeMode='cover'
          style={{ width: "95%", aspectRatio: 1, marginHorizontal: 5, marginTop: 10, borderTopLeftRadius: 50, borderTopRightRadius: 50 }} />


        <View style={{ backgroundColor: co.main_yellow, width: '95%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, marginHorizontal: 5, marginBottom: 10 }}>
          <TouchableOpacity style={{
            ...homeStyle.Pro_bar, marginTop: 10
          }}
            onPress={() => navigation.navigate('Store', { id: daTop.traderID })}
            >
            <View style={{ width: '50%' }}>
              <Image
                source={{ uri: APIcode + daTop.traderProfile }}
                resizeMode='cover'
                style={{
                  width: "40%", aspectRatio: 1, borderRadius: 20,
                }}
              /></View>
            <View style={{ width: '50%' }}>
              <Text style={{ ...homeStyle.PN, }}>{daTop.traderName}</Text>
            </View>
          </TouchableOpacity>

          <View style={{ ...homeStyle.Pro_bar }}>
            <View style={{ justifyContent: 'flex-start', width: '50%', alignContent: 'center' }}>
              <Text style={{ ...fonts.Name_Product }}>{daTop.Prdt_name}</Text>
            </View>
            <View style={{ width: '50%', justifyContent: 'flex-end' }}>
              <Text style={{ ...fonts.Name_Product, }}>{daTop.Price} LKR</Text>
            </View>

          </View>

          <View style={{ ...homeStyle.Pro_bar, justifyContent: 'space-around', marginHorizontal: 0, marginLeft: '5%', alignContent: 'center', marginBottom: 20, }}>
            <TouchableOpacity style={{ flexDirection: 'row' }}
              onPress={
                () => { LIKE() }
              }>
              <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: daTop.is_liked ? co.main_red : co.black }}>{daTop.num_likes}</Text>
              <View style={{ marginHorizontal: 10 }}>
                <Image
                  source={Icon.Heart}
                  resizeMode='cover'
                  style={{ width: 25, height: 25, tintColor: daTop.is_liked ? co.main_red : co.black }}
                /></View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{ flexDirection: 'row', }}
              onPress={
                () => LIKE()
              }>
              <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: daTop.is_liked ? co.main_red : co.black }}>{daTop.num_comm}</Text>
              <View style={{ marginHorizontal: 10 }}>
                <Image
                  source={Icon.comment}
                  resizeMode='cover'
                  style={{ width: 25, height: 25, tintColor: daTop.is_liked ? co.main_red : co.black }}
                /></View>
            </TouchableOpacity> */}

            <TouchableOpacity style={{ flexDirection: 'row', }}
              onPress={
                () => AddCart(daTop.id)
              }>
              <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: co.black }}>{daTop.Num_of_products_sold}</Text>
              <View style={{ marginHorizontal: 10 }}>
                <Image
                  source={Icon.cart2}
                  resizeMode='cover'
                  style={{ width: 25, height: 25, tintColor: co.black }}
                /></View>
            </TouchableOpacity>

          </View>
        </View>
      </TouchableOpacity>

    )
  }

  function Recently() {

    const renderItem_products = ({ item }) => {
      const productToModify = daRecent.filter(daRecent => daRecent.id === item.id)[0];
      let count_like = item.num_likes
      let bool = item.is_liked

      function LIKE() {
        const modifiedProducts = daRecent.map((product) => {
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

        setdaRecent(modifiedProducts);
        LikePrt(item.id);
      }
      return (

          <TouchableOpacity style={{ height: '100%', width:width*1.2, flexDirection: 'row', marginHorizontal: 10, marginVertical: 5,  }}
            onPress={() => navigation.navigate('Product', { id: item.id })}
          >
            <Image
              source={{ uri: APIcode + item.Pic1 }}
              resizeMode='cover'
              style={{
                aspectRatio: 1, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, height: '95%'
              }} />
            <View style={{ height: '95%',  width:'60%',backgroundColor: co.main_yellow, borderTopRightRadius: 20, borderBottomRightRadius: 20, }}>
  
              <TouchableOpacity style={{
                ...homeStyle.Pro_bar, marginTop: 10,
              }}
                onPress={() => navigation.navigate('Store', { id: item.traderID })}
                >
                <View style={{ height: '35%' , justifyContent:'center', alignContent:"center", }}>
                  <Image
                    source={{ uri: APIcode + item.traderProfile }}
                    resizeMode='cover'
                    style={{
                      width:50, aspectRatio: 1, borderRadius: 20, 
                    }}
                  /></View>
                <View style={{marginLeft:'20%'  }}>
                  <Text style={{ ...homeStyle.PN, }}>{item.traderName}</Text>
                </View>
              </TouchableOpacity>
              <View style={{ flexDirection:'row',height: "30%",marginTop: "5%",justifyContent: 'center', }}>
                <View style={{ alignItems: 'flex-start', marginRight:'10%'}}>
                  <Text style={{ ...fonts.Name_Product }}>{item.Prdt_name}</Text>
                </View>
                <View style={{  alignItems: 'flex-end' }}>
                  <Text style={{ ...fonts.Name_Product, }}>{item.Price} LKR</Text>
                </View>
  
              </View>
  
              <View style={{ height:'30%', flexDirection: 'row',justifyContent: 'space-around', marginHorizontal: 0,  alignContent: 'center', marginBottom: 20, }}>
                <TouchableOpacity style={{ flexDirection: 'row' }}
                  onPress={
                    () => LIKE()
                  }>
                  <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: item.is_liked ? co.main_red : co.black }}>{item.num_likes}</Text>
                  <View style={{ marginHorizontal: 10 }}>
                    <Image
                      source={Icon.Heart}
                      resizeMode='cover'
                      style={{ width: 25, height: 25, tintColor: item.is_liked ? co.main_red : co.black }}
                    /></View>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{ flexDirection: 'row', }}
                  onPress={
                    () => LIKE()
                  }>
                  <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: item.is_liked ? co.main_red : co.black }}>{item.num_comm}</Text>
                  <View style={{ marginHorizontal: 10 }}>
                    <Image
                      source={Icon.comment}
                      resizeMode='cover'
                      style={{ width: 25, height: 25, tintColor: item.is_liked ? co.main_red : co.black }}
                    /></View>
                </TouchableOpacity> */}
  
                <TouchableOpacity style={{ flexDirection: 'row', }}
                  onPress={
                    () => AddCart(item.id)
                  }>
                  <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: co.black }}>{item.Num_of_products_sold}</Text>
                  <View style={{ marginHorizontal: 10 }}>
                    <Image
                      source={Icon.cart2}
                      resizeMode='cover'
                      style={{ width: 25, height: 25, tintColor: co.black }}
                    /></View>
                </TouchableOpacity>
  
              </View>
            </View>
  
  
  
          </TouchableOpacity>
  
        )
      }
  
      return (
        <View style={{ aspectRatio: 3 / 2, width: width, backgroundColor: co.home_sub, marginBottom: 30, justifyContent: "flex-start",  marginTop: 20 }}>
  
          <View style={{ height: '10%', width: '80%', justifyContent: 'flex-start', alignContent: 'flex-start', marginTop: 10, marginHorizontal: 25 }}>
            <Text style={{ color: co.yellow_white, fontSize: 20, fontFamily: 'Raleway' }}>Most Liked </Text>
          </View>
          <FlatList
            data={daRecent}
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
            horizontal
            contentContainerStyle={{  height: '90%', marginTop: 10, paddingBottom: 5, paddingHorizontal: 5, }}
          />
        </View>
      )
    }



  function BasePrdt() {
    const renderItem_products = ({ item }) => {
      const productToModify = daBase.filter(daBase => daBase.id === item.id)[0];
      let count_like = item.num_likes
      let bool = item.is_liked

      function LIKE() {
        const modifiedProducts = daBase.map((product) => {
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

        setdaBase(modifiedProducts);
        LikePrt(item.id);
      }
      return (

        <TouchableOpacity style={{ ...homeStyle.PV,justifyContent:'center', width:width }}
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
              onPress={() => navigation.navigate('Store', { id: item.traderID })}
              >
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

            <View style={{ ...homeStyle.Pro_bar, justifyContent: 'space-around', marginHorizontal: 0, marginLeft: '5%', alignContent: 'center', marginBottom: 20, }}>
              <TouchableOpacity style={{ flexDirection: 'row' }}
                onPress={
                  () => LIKE()
                }>
                <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: item.is_liked ? co.main_red : co.black }}>{item.num_likes}</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <Image
                    source={Icon.Heart}
                    resizeMode='cover'
                    style={{ width: 25, height: 25, tintColor: item.is_liked ? co.main_red : co.black }}
                  /></View>
              </TouchableOpacity>
              {/* <TouchableOpacity style={{ flexDirection: 'row', }}
                onPress={
                  () => LIKE()
                }>
                <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: item.is_liked ? co.main_red : co.black }}>{daTop.num_comm}</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <Image
                    source={Icon.comment}
                    resizeMode='cover'
                    style={{ width: 25, height: 25, tintColor: item.is_liked ? co.main_red : co.black }}
                  /></View>
              </TouchableOpacity> */}

              <TouchableOpacity style={{ flexDirection: 'row', }}
                onPress={
                  () => AddCart(item.id)
                }>
                <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: co.black }}>{item.Num_of_products_sold}</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <Image
                    source={Icon.cart2}
                    resizeMode='cover'
                    style={{ width: 25, height: 25, tintColor: co.black }}
                  /></View>
              </TouchableOpacity>

            </View>
          </View>
        </TouchableOpacity>

      )
    }
    console.log(width)
    return (
      <View style={{width:width}}>
        <FlatList
          data={daBase}

          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItem_products}
          contentContainerStyle={{ paddingBottom: 5, paddingHorizontal: 5, justifyContent: 'center', alignItems: 'center', width:width }}
        />
      </View>
    )
  }

  function Most_liked() {
    const renderItem_products = ({ item }) => {
      const productToModify = daLike.filter(daLike => daLike.id === item.id)[0];
      let count_like = item.num_likes
      let bool = item.is_liked

      function LIKE() {
        const modifiedProducts = daLike.map((product) => {
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

        setdaLike(modifiedProducts);
        LikePrt(item.id);
      }
      return (
        <TouchableOpacity style={{ height: '100%', width:width*1.2, flexDirection: 'row', marginHorizontal: 10, marginVertical: 5,  }}
          onPress={() => navigation.navigate('Product', { id: item.id })}
        >
          <Image
            source={{ uri: APIcode + item.Pic1 }}
            resizeMode='cover'
            style={{
              aspectRatio: 1, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, height: '95%'
            }} />
          <View style={{ height: '95%',  width:'60%',backgroundColor: co.main_yellow, borderTopRightRadius: 20, borderBottomRightRadius: 20, }}>

            <TouchableOpacity style={{
              ...homeStyle.Pro_bar, marginTop: 10,
            }}
              onPress={() => navigation.navigate('Store', { id: item.traderID })}
              >
              <View style={{ height: '35%' , justifyContent:'center', alignContent:"center", }}>
                <Image
                  source={{ uri: APIcode + item.traderProfile }}
                  resizeMode='cover'
                  style={{
                    width:50, aspectRatio: 1, borderRadius: 20, 
                  }}
                /></View>
              <View style={{marginLeft:'20%'  }}>
                <Text style={{ ...homeStyle.PN, }}>{item.traderName}</Text>
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection:'row',height: "30%",marginTop: "5%",justifyContent: 'center', }}>
              <View style={{ alignItems: 'flex-start', marginRight:'10%'}}>
                <Text style={{ ...fonts.Name_Product }}>{item.Prdt_name}</Text>
              </View>
              <View style={{  alignItems: 'flex-end' }}>
                <Text style={{ ...fonts.Name_Product, }}>{item.Price} LKR</Text>
              </View>

            </View>

            <View style={{ height:'30%', flexDirection: 'row',justifyContent: 'space-around', marginHorizontal: 0,  alignContent: 'center', marginBottom: 20, }}>
              <TouchableOpacity style={{ flexDirection: 'row' }}
                onPress={
                  () => LIKE()
                }>
                <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: item.is_liked ? co.main_red : co.black }}>{item.num_likes}</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <Image
                    source={Icon.Heart}
                    resizeMode='cover'
                    style={{ width: 25, height: 25, tintColor: item.is_liked ? co.main_red : co.black }}
                  /></View>
              </TouchableOpacity>
              {/* <TouchableOpacity style={{ flexDirection: 'row', }}
                onPress={
                  () => LIKE()
                }>
                <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: item.is_liked ? co.main_red : co.black }}>{item.num_comm}</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <Image
                    source={Icon.comment}
                    resizeMode='cover'
                    style={{ width: 25, height: 25, tintColor: item.is_liked ? co.main_red : co.black }}
                  /></View>
              </TouchableOpacity> */}

              <TouchableOpacity style={{ flexDirection: 'row', }}
                onPress={
                  () => AddCart(item.id)
                }>
                <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: co.black }}>{item.Num_of_products_sold}</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <Image
                    source={Icon.cart2}
                    resizeMode='cover'
                    style={{ width: 25, height: 25, tintColor: co.black }}
                  /></View>
              </TouchableOpacity>

            </View>
          </View>



        </TouchableOpacity>

      )
    }

    return (
      <View style={{ aspectRatio: 3 / 2, width: width, backgroundColor: co.home_sub, marginBottom: 30, justifyContent: "flex-start",  marginTop: 20 }}>

        <View style={{ height: '10%', width: '80%', justifyContent: 'flex-start', alignContent: 'flex-start', marginTop: 10, marginHorizontal: 25 }}>
          <Text style={{ color: co.yellow_white, fontSize: 20, fontFamily: 'Raleway' }}>Most Liked </Text>
        </View>
        <FlatList
          data={daLike}
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
          horizontal
          contentContainerStyle={{  height: '90%', marginTop: 10, paddingBottom: 5, paddingHorizontal: 5, }}
        />
      </View>
    )
  }

  function MainPrdt() {
    const renderItem_products = ({ item }) => {
      const productToModify = data.filter(data => data.id === item.id)[0];
      let count_like = item.num_likes
      let bool = item.is_liked

      function LIKE() {
        const modifiedProducts = data.map((product) => {
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

        setdata(modifiedProducts);
        LikePrt(item.id);
      }
      return (

        <TouchableOpacity style={{ ...homeStyle.PV,  width:width }}
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
              onPress={() => navigation.navigate('Store', { id: item.traderID })}
              >
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

            <View style={{ ...homeStyle.Pro_bar, justifyContent: 'space-around', marginHorizontal: 0, marginLeft: '5%', alignContent: 'center', marginBottom: 20, }}>
              <TouchableOpacity style={{ flexDirection: 'row' }}
                onPress={
                  () => LIKE()
                }>
                <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: item.is_liked ? co.main_red : co.black }}>{item.num_likes}</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <Image
                    source={Icon.Heart}
                    resizeMode='cover'
                    style={{ width: 25, height: 25, tintColor: item.is_liked ? co.main_red : co.black }}
                  /></View>
              </TouchableOpacity>
              {/* <TouchableOpacity style={{ flexDirection: 'row', }}
                onPress={
                  () => LIKE()
                }>
                <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: item.is_liked ? co.main_red : co.black }}>{item.num_comm}</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <Image
                    source={Icon.comment}
                    resizeMode='cover'
                    style={{ width: 25, height: 25, tintColor: item.is_liked ? co.main_red : co.black }}
                  /></View>
              </TouchableOpacity> */}

              <TouchableOpacity style={{ flexDirection: 'row', }}
                onPress={
                  () => AddCart(item.id)
                }>
                <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: co.black }}>{item.Num_of_products_sold}</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <Image
                    source={Icon.cart2}
                    resizeMode='cover'
                    style={{ width: 25, height: 25, tintColor: co.black }}
                  /></View>
              </TouchableOpacity>

            </View>
          </View>
        </TouchableOpacity>

      )
    }
    return (
      <View style={{ width:width}}>
        <FlatList
          data={data}

          ListFooterComponent={() => loadingMore && <ListFooterComponent />}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItem_products}
          contentContainerStyle={{ paddingBottom: 5, paddingHorizontal: 5, justifyContent: 'center', alignItems: 'center', alignContent: 'center', width:width}}
        />
      </View>
    )
  }
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 0;
    return layoutMeasurement.height + contentOffset.y ==
      contentSize.height - paddingToBottom;
  };
  function ViewCarPrt() {

    const renderItem_products = ({ item }) => {
      const productToModify = daCat.filter(daCat => daCat.id === item.id)[0];
      let count_like = item.num_likes
      let bool = item.is_liked

      function LIKE() {
        const modifiedProducts = daCat.map((product) => {
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

        setdaCat(modifiedProducts);
        LikePrt(item.id);
      }
      return (

        <TouchableOpacity style={{ ...homeStyle.PV, width: width }}
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
              onPress={() => navigation.navigate('Store', { id: item.traderID })}
              >
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

            <View style={{ ...homeStyle.Pro_bar, justifyContent: 'space-around', marginHorizontal: 0, marginLeft: '5%', alignContent: 'center', marginBottom: 20, }}>
              <TouchableOpacity style={{ flexDirection: 'row' }}
                onPress={
                  () => LIKE()
                }>
                <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: item.is_liked ? co.main_red : co.black }}>{item.num_likes}</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <Image
                    source={Icon.Heart}
                    resizeMode='cover'
                    style={{ width: 25, height: 25, tintColor: item.is_liked ? co.main_red : co.black }}
                  /></View>
              </TouchableOpacity>


              <TouchableOpacity style={{ flexDirection: 'row', }}
                onPress={
                  () => AddCart(item.id)
                }>
                <Text style={{ fontFamily: "Ubuntu", fontSize: 20, color: co.black }}>{item.Num_of_products_sold}</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <Image
                    source={Icon.cart2}
                    resizeMode='cover'
                    style={{ width: 25, height: 25, tintColor: co.black }}
                  /></View>
              </TouchableOpacity>

            </View>
          </View>
        </TouchableOpacity>

      )
    }
    return (
      <View style={{ width: width }}>
        <FlatList
          data={daCat}
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
          contentContainerStyle={{ paddingBottom: 5, paddingHorizontal: 5, justifyContent: 'center', alignItems: 'center', alignContent: 'center', width: width }}
        />
      </View>
    )
  }

  function Load() {
    return (
      <View style={{ justifyContent: 'flex-start', flexDirection: "column", alignContent: 'center', alignItems: 'center', width: "100%", marginTop: '10%' }}>
        <View style={{ width: "100%", justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center' }}>
          <Image
            source={img.OOPS}
            resizeMode="contain"
            style={{ width: 150, height: 150, justifyContent: 'flex-start' }}
          /></View>
        <View style={{ width: "100%", marginTop: 10, alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Inter', fontSize: 20, color: co.main_red, textAlign: 'center' }}>No Results Found, Try again later</Text>
          <Text style={{ fontFamily: 'Raleway', color: co.sub_red, fontSize: 25 }}>Start Your Store Here!</Text>
        </View>

      </View>
    )
  }



  return (
    <View style={{ ...themeStye.container, backgroundColor:co.sub_black, marginBottom:25 }}>
       <StatusBar style="light" backgroundColor={co.sub_black} />

      <SafeAreaView style={{ width: "100%" }}>
        <View>
          {Header()}
        </View>
      </SafeAreaView>
      <ScrollView onScroll={async ({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          console.log('reached End'); stopFetchMore = false; await handleOnEndReached();
        }
      }} style={{}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {Catogeries()}
        <ScrollView>
          {catload ?
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {ViewCarPrt()}
            </View>
            : ([AP1load && AP2load && AP3load && AP4load && AP5load ? <ActivityIndicator color={co.main_yellow} size="large" /> :
              ([AP1work ?

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  {AP5work ?
                    [Top_Products()] : (<View></View>)}
                  {AP3work ?
                    [Recently()] : (<View></View>)}
                  {AP2work ?
                    [BasePrdt()] : (<View></View>)}
                  {AP4work ?
                    [Most_liked()] : (<View></View>)}
                  {MainPrdt()}
                </View>
                :
                [Load()]]
              )]
            )}
        </ScrollView>
      </ScrollView> 

    </View>
  )
}





export default Mainhome