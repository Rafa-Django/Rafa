import React, { useContext, useState, useEffect } from 'react';
import {
    TextInput,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';

import { COLORS, themeStye,ProStyle} from "../components/theme"
import { Icon } from '../components';

import { KeyContext, APIContext } from "../../UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneInput  
    from 'react-native-phone-input'; 
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';

const CheckOut = ({ route, navigation }) => {
    let co = colourTheme()
    const key = useContext(KeyContext)
    const APIcode = useContext(APIContext)

    const [Address, setAddress] = useState("")
    const [Address2, setAddress2] = useState("")
    const [Number, setNumber] = useState("")
    // const [loading, setloading] = useState(true)
    const [email, setemail] = useState("")



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
    const handlePhoneInputChange = (value, formattedValue) => {
        setNumber(value);
          
      };
    async function APICheckout() {
        console.log(key)
        console.log("Working")
        let OB_id = route.params.OB
        console.log(OB_id)
        await getValueFor(key)

        // 192.168.8.1:8000       
        let body = JSON.stringify({ "OBid": OB_id, "Address": Address, "Address2": "none", "phone": Number, "gmail": email })
        fetch(APIcode + "Checkout/", {
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
                        "CheckOut Completed",
                        "Order Send to Trader",
                        [
                            {
                                text: "Cancel",
                                onPress: () => navigation.navigate('Tabs'),
                            }])
                    navigation.navigate('Tabs')
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

    }



    function CheckDetails() {
        return (
            <View style={{ marginHorizontal: 10, width: '90%', marginTop: 15, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ width: '100%', justifyConten: 'flex-start' }}>
                    <View style={{ width: '50%', }}>
                        <Text style={{ fontFamily: "Roboto", color: co.white, fontSize: 25 }}>Address:</Text>
                    </View>
                    <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 20, marginTop: 15 }}>

                        <TextInput
                            style={{ width: '90%', color: co.white, textAlignVertical: 'top', marginTop: 10, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10 }}
                            placeholder='Address'
                            value={Address}
                            multiline={true}
                            editable={true}
                            numberOfLines={3}
                            onChangeText={text => setAddress(text)}
                            keyboardType='default' />
                    </View>

                </View>

                <View style={{ width: '100%', marginTop: 15 }}>
                    <View style={{ width: '70%', }}>
                        <Text style={{ fontFamily: "Roboto", color: co.white, fontSize: 25 }}>Phone Number:</Text>
                    </View>
                    <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 20, marginTop: 10 }}>
                            <PhoneInput
                            style={{ width: '90%', color: co.white, textAlignVertical: 'top', marginVertical: 10, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 10 }}
                            ref={(ref) => (this.phoneInput = ref)}
                            initialCountry="lk"
                            value={Number}
                            onChangePhoneNumber={handlePhoneInputChange}
                            />
                    </View>

                </View>
                <View style={{ width: '100%', marginTop: 15 }}>
                    <View style={{ width: '70%', }}>
                        <Text style={{ fontFamily: "Roboto", color: co.white, fontSize: 25 }}>Email:</Text>
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
                <TouchableOpacity style={{ marginHorizontal: 20, marginTop: 15, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: co.main_yellow, paddingHorizontal: 10, paddingVertical: 5 }}
                    onPress={() =>

                        APICheckout()
                    }

                >
                    <Text style={{ fontFamily: 'Roboto', fontSize: 18, fontWeight: '100' }}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ ...themeStye.container, padding: 0, backgroundColor:co.sub_black }}>
             <StatusBar style="light" backgroundColor={co.sub_black} />
            <SafeAreaView style={{ ...themeStye.HeadView, marginTop:15 }}>
            <View style={{...ProStyle.Main_header, alignContent:'flex-start', alignItems:'flex-start'}}>
                <TouchableOpacity style={{...ProStyle.TO, marginLeft:10, }}
                    onPress={() => navigation.goBack()}>
                 <Image
                source={Icon.Back}
                resizeMode='contain'
                style={{...ProStyle.To_image, flex:1, alignContent:'flex-start', tintColor:co.white}}
                />
                </TouchableOpacity>
            
            </View>
            </SafeAreaView>
            <ScrollView>
                <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                    {CheckDetails()}
                </View>

            </ScrollView>
        </View>
    )
}

export default CheckOut