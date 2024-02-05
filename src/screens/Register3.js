import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    Button
} from 'react-native';

import { COLORS, themeStye } from '../components/theme';
import { APIContext, KeyContext, Key2Context, LogContext, AuthContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { img } from '../components';

import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
import PhoneInput  
    from 'react-native-phone-input'; 


const Register3 = ({ navigation }) => {
    let co = colourTheme()
    const key = useContext(KeyContext)
    const APIcode = useContext(APIContext)
    const [Auth, setAuth] = useContext(AuthContext)
    const setisLoggedin = useContext(LogContext)

    const [Address, setAddress] = useState("")
    const [Number, setNumber] = useState("")

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

    const [phoneNumber, setPhoneNumber] = useState('');

    const handlePhoneInputChange = (value, formattedValue) => {
      setPhoneNumber(value);
        
    };
  

    async function ApiReg3() {
        console.log("Working")
        await getValueFor(key)
        if (phoneNumber.trim() === '') {
            window.alert('Error', 'Please enter a valid phone number');
        }else{
                    let body = JSON.stringify({ "usid": ids, "Address": Address, "number": phoneNumber })
        fetch(APIcode + "register3/", {
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

                    window.alert(
                        "Error signing",
                        "Your address and number might not be good enough or try again later.",
                        [
                            {
                                text: "Cancel",
                                style: "cancel",
                                onPress: () => { },
                            }])
                    throw res.json()

                }
            })
            .then(json => {
                setisLoggedin(true)
            })
            .catch(error => { console.log(error); console.log(body) })
        }



    }


    function Info() {


        return (
            <View style={{ width: '90%', marginTop: 30, marginHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'Inter', fontSize: 18, color: co.white }}>Type in a default address and contact number, so that the checkout procedure be easy, also a Google map link will be more accurate than your text format.</Text>
                <View style={{ width: "100%", marginTop: 20, justifyContent: 'center' }}>
                    <View>
                        <Text style={{ fontFamily: 'Inter', fontSize: 18, color: co.white, alignContent: 'flex-start', marginBottom: 10 }}>Address:</Text>
                        <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 20 }}>

                            <TextInput
                                style={{ width: '90%', color: co.white, textAlignVertical: 'top', marginVertical: 10, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10 }}
                                placeholder='Country/City/Division/Street/Lane/House no. (or a link)'
                                editable={true}
                                autoComplete='street-address'
                                value={Address}
                                returnKeyType='done'
                                keyboardType='default'
                                onChangeText={text => setAddress(text)}
                                multiline={true}
                            />
                        </View>
                    </View>
                    <View style={{ width: "100%", marginTop: 20, justifyContent: 'center' }}>
                    <View>
                        <Text style={{ fontFamily: 'Inter', fontSize: 18, color: co.white, alignContent: 'flex-start', marginBottom: 10 }}>Phone Number:</Text>
                        <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 20 }}>
                            <PhoneInput
                            style={{ width: '90%', color: co.white, textAlignVertical: 'top', marginVertical: 10, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10 }}
                            ref={(ref) => (this.phoneInput = ref)}
                            initialCountry="lk"
                            value={phoneNumber}
                            onChangePhoneNumber={handlePhoneInputChange}
                            />
                        </View>
                    </View>
                    </View>
                    
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-end', marginTop: "10%" }}>
                        <TouchableOpacity style={{ borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: co.main_yellow, alignItems: 'center', paddingHorizontal: 20, paddingVertical: 5, alignContent: 'flex-end', }}
                            onPress={() => ApiReg3()}
                        >
                            <Text style={{ fontFamily: 'Ubuntu', fontSize: 20, color: co.black }}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ ...themeStye.container, backgroundColor:co.sub_black, padding: 0 }}>
             <StatusBar style="light" backgroundColor={co.sub_black} />
            <SafeAreaView style={{ ...themeStye.HeadView, height: 120 }}>
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
                    {Info()}
                </View>
            </ScrollView>
        </View>
    )
}

export default Register3