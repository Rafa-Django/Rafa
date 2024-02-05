import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
    Image,
} from 'react-native';

import { COLORS, themeStye, } from '../components/theme';
import { APIContext,  KeyContext, AuthContext } from "../../UserContext";
import { img } from '../components';
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
const RegisterVerify = ({ navigation, route }) => {
    let co = colourTheme()
    const key = useContext(KeyContext)
    const APIcode = useContext(APIContext)
    const [Auth, setAuth] = useContext(AuthContext)


    const [tokens, settokens] = useState("")
    
    let ids = '';
    async function getValueFor(key) {
        let result = await AsyncStorage.getItem(key);
        if (result) {
            ids = result;
            ids = result;
            return result;
        } else {
            window.alert(
                "Error",
                "Login in again"
                [
                    {
                        text: "Ok",
                        onPress: () => {},
                    }])
                    navigation.navigate('Register')
        }
        }


    async function MailSend() {

        console.log(key)
        console.log("Working")
        await getValueFor(key)


        let body = JSON.stringify({ "usid": ids, })
        fetch(APIcode + "VerifyMail/", {
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
                    window.alert(
                        "Mail Send",
                        "Your account mail id: " + user_email,
                        [
                            {
                                text: "Cancel",
                                style: "cancel",
                                onPress: () => { },
                            }])
                    throw res.json()
                } else {
                    console.log("Bad")
                    throw res.json()
                }
            })

            .catch(error => { console.log(error); console.log(body) })

    }

    useEffect(() => {
        MailSend()
    }, [])

    async function VerifyApi() {
        console.log(key)
        console.log("Working")
        await getValueFor(key)


        let body = JSON.stringify({ "usid": ids, "otp": tokens })
        fetch(APIcode + "AccountVerify/", {
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
                    setAuth(true)

                    return res.json()
                } else {
                    console.log("Bad")

                    throw res.json()

                }
            })
            .then(json => {
                setAuth(true)
                navigation.navigate('Register2')
            })
            .catch(error => { console.log(error); console.log(body) })

    }

    function Main() {
        return (
            <View style={{ width: '90%', marginTop: 10, marginHorizontal: 30, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <View style={{ width: '100%', justifyConten: 'flex-start' }}>
                    <View style={{ width: '90%', }}>
                        <Text style={{ fontFamily: "Inter", color: co.white, fontSize: 25 }}>Token:</Text>
                    </View>
                    <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 20, marginTop: 15 }}>

                        <TextInput
                            style={{ width: '90%', color: co.white, textAlignVertical: 'top', marginVertical: 5, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10 }}
                            placeholder='########'
                            textContentType='oneTimeCode'
                            editable={true}
                            autoCorrect={false}
                            blurOnSubmit={true}
                            value={tokens}
                            returnKeyType='done'
                            maxLength={10}
                            onChangeText={text => settokens(text)}
                            keyboardType='number-pad' />
                    </View>

                </View>
                <View style={{ width: '100%', paddingTop: 15, justifyContent: 'flex-end', flexDirection: 'row', alignContent: 'flex-end' }}>
                    <TouchableOpacity style={{ width: '70%', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'center', alignContent: 'flex-start', }}
                        onPress={() => MailSend()}>
                        <Text style={{ fontFamily: 'Ubuntu', fontSize: 18, color: co.white, textDecorationLine: 'underline' }}>Resend Mail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: co.main_yellow, alignItems: 'center', paddingHorizontal: 20, paddingVertical: 5, }}
                        onPress={() => VerifyApi()}>
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
                </View>
            </ScrollView>
        </View>
    )
}

export default RegisterVerify