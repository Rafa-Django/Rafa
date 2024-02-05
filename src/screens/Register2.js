import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import { COLORS, themeStye } from '../components/theme';

import * as Location from 'expo-location';
import { img } from '../components';
import { APIContext, KeyContext, Key2Context } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';


import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
export default function Register2({ navigation }) {
  let co = colourTheme()
  const key = useContext(KeyContext)
  const APIcode = useContext(APIContext)
  const [country, setcountry] = useState(null);
  const [state, setstate] = useState(null);


  
useEffect(()=>{
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

  function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                getLocationInfo(latitude, longitude)
                    .then(result => {
                        const { country, city } = result;
                        if (country && city) {
                           setcountry(country)
                           setstate(city)
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

getUserLocation();
},[])



  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       console.log("Trash")
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let ocation = await Location.getCurrentPositionAsync({});
  //     let address = await Location.reverseGeocodeAsync(ocation.coords)
  //     setLocation(address);
  //     console.log(address)
  //   })();
  // }, []);

  // let text = 'Waiting..';
  // let country = ""
  // let state = ""
  // if (errorMsg) {
  //   text = errorMsg
  //   return (<View style={{ ...themeStye.container, backgroundColor:co.sub_black, padding: 0 }}>
  //            <StatusBar style="light" backgroundColor={co.sub_black} />
  //     <SafeAreaView style={{ width: '100%' }}>
  //       <LoginHeader />
  //     </SafeAreaView>
  //     <ScrollView>
  //       <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
  //         <Text>{text}</Text>
  //       </View>
  //     </ScrollView>
  //   </View>)
  // } else if (locatio) {
  //   console.log(locatio)
  //   country = locatio[0].country
  //   state = locatio[0].subregion

  // }

  const storeData = async (coun, city) => {
    try {
      await AsyncStorage.setItem("Con", coun)
      await AsyncStorage.setItem("Sta", city);
      console.log("worked")
    } catch (error) {
      console.log(error);
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

  async function APIRequest() {

    await getValueFor(key)

    let body = JSON.stringify({ "usid": ids, "country": country, "state": state })
    fetch(APIcode + "register2/", {
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
          throw res.json()

        }
      })
      .then(json => {
        storeData(country, state)
        navigation.navigate('Register3')
      })
      .catch(error => { console.log(error); console.log(body) })

  }


  function Main() {

    return (
      <View style={{ marginTop: 30, marginHorizontal: 10, width: "90%", alignItems: "center", justifyContent: 'center' }}>
        <Text style={{ fontFamily: 'Inter', color: co.white, fontSize: 20 }}>Based on your location are you from country: {country}, and state:{state}?
        </Text>
        <View style={{ flexDirection: 'row', width: '90%', marginTop: 20 }}>
          <TouchableOpacity style={{ borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: co.main_yellow, alignItems: 'center', paddingHorizontal: 20, paddingVertical: 5, }}
            onPress={() => APIRequest()}>
            <Text style={{ fontFamily: 'Ubuntu', fontSize: 20, color: co.black }}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '40%', justifyContent: 'center', alignContent: 'flex-end', alignItems: "flex-end" }}>
            <Text style={{ fontFamily: 'Raleway', fontSize: 18, color: co.main_red, textDecorationLine: 'underline' }}>No</Text>
          </TouchableOpacity>
        </View>
      </View>)
  }

  return (
    <View style={{ ...themeStye.container, backgroundColor:co.sub_black, padding: 0 }}>
             <StatusBar style="light" backgroundColor={co.sub_black} />
      <SafeAreaView style={{ ...themeStye.HeadView, height: "25%" }}>
      <View style={{ flex:1,height: "15%", marginTop: 20, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={img.Logo_Text}
                resizeMode='contain'
                style={{flex:1, width: "60%" }}
            />
        </View>
      </SafeAreaView>
      <ScrollView>
        <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
          {Main()}

        </View>
      </ScrollView>
    </View>
  );
}
