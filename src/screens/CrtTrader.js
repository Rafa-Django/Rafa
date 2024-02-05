import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert
} from 'react-native';

import { COLORS, themeStye, } from '../components/theme';
import { img , Icon} from '../components';
import { KeyContext, APIContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
import Filter from 'bad-words';
import PhoneInput  
    from 'react-native-phone-input'; 

const CrtTrader = ({ navigation }) => {
    const filter = new Filter();
    filter.addWords('punda', 'kottah', 'Baadu', "Ennoda", "poola", "oombuda", "Chunni", "Ki", "adi", "Okkala", "ozhi", "Koothi", "mayir", 'Kaai', 'Ommala', 'Okka', 'Poolu', 'Thevdiya', 'paiya');
 
    let co = colourTheme()
    const key = useContext(KeyContext)
    const APIcode = useContext(APIContext)


    const [Address, setAddress] = useState("")
    const [Number, setNumber] = useState("")
    const [uname, setuname] = useState("")
    const [email, setemail] = useState("")


    const handlePhoneInputChange = (value, formattedValue) => {
        setNumber(value);
          
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

    async function TradBool() {
        console.log("Working")
        await getValueFor(key)
        let p = filter.clean(uname)
        console.log(p)
        if (p==uname){
        let body = JSON.stringify({ "userid": ids, "Company_name": uname, "Address": Address, "phone": Number, "email": email })
        fetch(APIcode + "CtrTrad/", {
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

                    navigation.navigate('CrtTrader2')


                    return res.json()
                } else {
                    console.log("Bad")
                    window.alert(
                        "Invalid Request",
                        
                        [
                            {
                                text: "Ok",
                                onPress: () => {navigation.navigate('Mainhome')},
                            }])
                }
            })}
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

    function Main() {
        return (
            <View style={{ width: '90%', alignItems: 'center', justifyContent: 'center', marginVertical: "5%" }}>
                <Text style={{ fontFamily: 'Saira', fontSize: 22, color: co.white }}>Start your online Company!</Text>
            </View>
        )
    }

    function Base() {
        return (
            <View style={{ width: '90%', marginTop: 0, marginHorizontal: 30, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <View style={{ width: '100%', justifyConten: 'flex-start' }}>
                    <View style={{ width: '90%', }}>
                        <Text style={{ fontFamily: "Inter", color: co.white, fontSize: 25 }}>Company Name:</Text>
                    </View>
                    <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 20, marginTop: 15 }}>

                        <TextInput
                            style={{ width: '90%', color: co.white, textAlignVertical: 'top', marginVertical: 5, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10 }}
                            placeholder='eg:Rafa Developers'
                            textContentType='username'
                            editable={true}
                            autoComplete='name'
                            value={uname}
                            returnKeyType='next'
                            onChangeText={text => setuname(text)}
                            keyboardType='default' />
                    </View>

                </View>

                <View style={{ width: '100%', justifyConten: 'flex-start' }}>
                    <View style={{ width: '80%', }}>
                        <Text style={{ fontFamily: "Inter", color: co.white, fontSize: 25 }}>E-mail:</Text>
                        <Text style={{ fontFamily: "Raleway", color: co.main_red, fontSize: 10 }}>*provide your company's special email id</Text>
                    </View>
                    <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 20, marginTop: 15 }}>

                        <TextInput
                            style={{ width: '90%', color: co.white, textAlignVertical: 'top', marginVertical: 5, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10 }}
                            placeholder='eg: rafadevelopers317@gmail.com'
                            autoComplete='email'
                            textContentType='emailAddress'
                            returnKeyType='next'
                            value={email}
                            onChangeText={text => setemail(text)}
                            editable={true}
                            keyboardType='default' />
                    </View>

                </View>
                <View style={{ width: '100%', justifyConten: 'flex-start' }}>
                    <View style={{ width: '90%', }}>
                        <Text style={{ fontFamily: "Roboto", color: co.white, fontSize: 25 }}>Mobile Number:</Text>
                        <Text style={{ fontFamily: "Raleway", color: co.main_red, fontSize: 10 }}>*provide something the customers can talk to you about the products</Text>
                    </View>
                    <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 20, marginTop: 15 }}>

                    <PhoneInput
                        style={{ width: '90%', color: co.white, textAlignVertical: 'top', marginVertical: 10, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10 }}
                        ref={(ref) => (this.phoneInput = ref)}
                        initialCountry="lk"
                        value={Number}
                        onChangePhoneNumber={handlePhoneInputChange}
                    />
                    </View>

                </View>
                <View style={{ width: '100%' }}>
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
                <View style={{ width: '100%', paddingTop: 15, justifyContent: 'center', flexDirection: 'row', alignContent: 'flex-end', marginBottom: 30 }}>

                    <TouchableOpacity style={{ borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: co.main_yellow, alignItems: 'center', paddingHorizontal: 20, paddingVertical: 5, }}
                        onPress={() => TradBool()}
                    >
                        <Text style={{ fontFamily: 'Ubuntu', fontSize: 22, color: co.black }}>Create!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
                    <View style={{ ...themeStye.container, backgroundColor:co.sub_black }}>
      <StatusBar style="light" backgroundColor={co.sub_black} />
      <StatusBar style="light" backgroundColor="sub_black"/>
            <SafeAreaView style={{ ...themeStye.HeadView, height: "20%",alignItems: 'center',alignContent:'center', justifyContent: 'center' }}>
            <View style={{  marginTop: 20, width: '50%', alignItems: 'center',alignContent:'center', justifyContent: 'center' }}>
            <Image
                source={img.Logo_Text}
                resizeMode='contain'
                style={{ width: "100%",alignItems: 'center', justifyContent: 'center'  }}
            />
        </View>
            </SafeAreaView>
            <ScrollView>
                <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                    {Main()}
                    {Base()}
                </View>
            </ScrollView>
        </View>

    )
}

export default CrtTrader