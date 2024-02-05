import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
    Image
} from 'react-native';
import { COLORS, themeStye } from '../components/theme';

import { APIContext, KeyContext, Key2Context } from "../../UserContext";
import { img } from '../components';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Filter from 'bad-words';

 
const Register = ({ navigation }) => {
    const filter = new Filter();
    filter.addWords('punda', 'kottah', 'Baadu', "Ennoda", "poola", "oombuda", "Chunni", "Ki", "adi", "Okkala", "ozhi", "Koothi", "mayir", 'Kaai', 'Ommala', 'Okka', 'Poolu', 'Thevdiya', 'paiya');
    
    const key = useContext(KeyContext)
    const tkey = useContext(Key2Context)
    const APIcode = useContext(APIContext)
    let co = colourTheme()

    const [uname, setuname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")


    async function save(key, value) {
          key = await key;
      
          let result = await AsyncStorage.getItem(key);
          if (result) {
            await AsyncStorage.removeItem(key);
            console.log(key);
            await AsyncStorage.setItem(key, value)
            if (result === value) {         
            } else {
              await AsyncStorage.setItem(key, value);
            }
          } else {
            await AsyncStorage.setItem(key, value);
          }
      
          await AsyncStorage.setItem(key, value);

          console.error('Error saving data:', error);
        
      }

    

    function RegisterApi() {

        console.log("Working")

        console.log(key)
        let p = filter.clean(uname)
        console.log(p)
        if (p==uname){
            let body = JSON.stringify({ "username": uname, "email": email.toLowerCase(), "password": password })
        fetch(APIcode + "register/", {
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
                    
                    window.alert(
                        "Account Created",
                        "An email has send to your email id this is just to verify your account",
                        [
                            {
                                text: "Ok",
                                onPress: () => {},
                            }])

                    navigation.navigate('RegisterVerify')
                    return res.json()
                } else {
                    console.log("Bad")
                    console.log(body)
                    window.alert(
                        "Error signing",
                        "Your email id or username might already have a account. \n Also make sure your password is more than 8 characters, and mixture of text and numbers.",
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
                let id = json.id
                let tk = json.tk
                save(key, JSON.stringify(id))
                save(tkey, tk)


            })

            .catch(error => { console.log(error) })
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



    function Main() {

        return (
            <View style={{ width: '90%', marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'Saira', fontSize: 40, color: co.white }}>Sign Up</Text>
            </View>
        )
    }

    function Info() {
        return (
            <View style={{ width: '90%', marginTop: 10, marginHorizontal: 30, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <View style={{ width: '100%', justifyConten: 'flex-start' }}>
                    <View style={{ width: '90%' }}>
                        <Text style={{ fontFamily: "Inter", color: co.white, fontSize: 25 }}>Name:</Text>
                        <Text style={{ fontFamily: "Raleway", color: co.main_red, fontSize: 10 }}>*make sure no spaces in between, and has to be unique</Text>
                    </View>
                    <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 20, marginTop: 10  }}>

                        <TextInput
                            style={{ width: '90%', color: co.white, textAlignVertical: 'top', fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10, marginVertical: 5 }}
                            placeholder='eg: Muhammmed'
                            textContentType='username'
                            editable={true}
                            autoComplete='name'
                            value={uname}
                            returnKeyType='next'
                            onChangeText={text => setuname(text)}
                            keyboardType='default' />
                    </View>

                </View>

                <View style={{ width: '100%', justifyConten: 'flex-start', marginTop: 10 }}>
                    <View style={{ width: '80%' }}>
                        <Text style={{ fontFamily: "Inter", color: co.white, fontSize: 25 }}>E-mail:</Text>
                        <Text style={{ fontFamily: "Raleway", color: co.main_red, fontSize: 10 }}>*email should not have another account</Text>
                    </View>
                    <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 20, marginTop: 10 }}>

                        <TextInput
                            style={{ width: '90%', color: co.white, textAlignVertical: 'top', marginVertical: 5, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10 }}
                            placeholder='eg: user@email.com'
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
                    <View style={{ width: '100%', }}>
                        <Text style={{ fontFamily: "Roboto", color: co.white, fontSize: 25 }}>Password:</Text>
                    </View>
                    <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 20, marginTop: 10 }}>

                        <TextInput
                            style={{ width: '90%', color: co.white, textAlignVertical: 'top', marginVertical: 5, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10 }}
                            placeholder='Password'
                            returnKeyType='done'
                            editable={true}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={text => setpassword(text)}
                            textContentType='newPassword'
                            keyboardType='default' />
                    </View>

                </View>
                <View style={{ width: '100%', paddingTop: 15, justifyContent: 'center', flexDirection: 'row', alignContent: 'flex-end' }}>
                    <TouchableOpacity style={{ width: '70%', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'center', alignContent: 'flex-start', }}
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={{ fontFamily: 'Ubuntu', fontSize: 15, color: co.white, textDecorationLine: 'underline' }}>Already registered?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: co.main_yellow, alignItems: 'center', paddingHorizontal: 20, paddingVertical: 5 }}
                        onPress={() => RegisterApi()}>
                        <Text style={{ fontFamily: 'Ubuntu', fontSize: 20, color: co.black }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={{ ...themeStye.container, backgroundColor:co.sub_black, padding: 0 }}>

             <StatusBar style="light" backgroundColor={co.sub_black} />
            <SafeAreaView style={{ ...themeStye.HeadView, height: 140 }}>
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
                    {Info()}
                </View>
            </ScrollView>
        </View>
        
    )
}

export default Register