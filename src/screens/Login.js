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
import {  KeyContext, APIContext } from "../../UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { img } from '../components';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
const Login = ({ navigation }) => {
    const key = useContext(KeyContext)
    const APIcode = useContext(APIContext)
    let co = colourTheme()
    const [uname, setuname] = useState("")
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

        let body = JSON.stringify({ "username": uname, "password": password })
        fetch(APIcode + "login/", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            body: body
        })
            .then(response => {
                if (response.ok) {
                    console.log("Good")
                    navigation.navigate('RegisterVerify')
                    return response.json()
                }

                else {
                    console.log("Bad")
                    console.log(body)
                    window.alert(
                        "Error signing",
                        "Our username does not have a valid account",
                        [
                            {
                                text: "Cancel",

                                onPress: () => { },
                            }])
                    throw response.json()

                }
            })
            .then(json => {
                let id = json.id
                console.log(json)

                save(key, JSON.stringify(id))
                save(key, JSON.stringify(id))


            })
            .catch(error => { console.log(error) })


    }



    function Main() {

        return (
            <View style={{ width: '90%', marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'Saira', fontSize: 40, color: co.white }}>Welcome Back!</Text>
            </View>
        )
    }

    function Info() {
        return (
            <View style={{ width: '90%', marginTop: '10%', marginHorizontal: 30, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <View style={{ width: '100%', justifyConten: 'flex-start' }}>
                    <View style={{ width: '90%' }}>
                        <Text style={{ fontFamily: "Inter", color: co.white, fontSize: 25 }}>Name:</Text>
                    </View>
                    <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 40, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>

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
                        onPress={() => navigation.navigate('Register')}>
                        <Text style={{ fontFamily: 'Ubuntu', fontSize: 18, color: co.white, textDecorationLine: 'underline' }}>Sign up</Text>
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

export default Login