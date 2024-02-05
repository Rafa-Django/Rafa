import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { img } from '../components';
import { COLORS, themeStye, } from '../components/theme';

import { KeyContext, TrdBoolContext, APIContext } from "../../UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { SaveFormat } from 'expo-image-manipulator';

import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';
const CrtTrader2 = ({ navigation }) => {
    let co = colourTheme()
    const key = useContext(KeyContext)
    const APIcode = useContext(APIContext)
    const setTrad_Acc = useContext(TrdBoolContext)



    const [image, setImage] = useState(null);
    const [resultss, setresult] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission denied')
            }
        })
    }, [])
    let img_uri= ""
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
        img_uri = results.uri

        setImage(results)


        if (!results.cancelled) {
            const ProRes = await ImageManipulator.manipulateAsync(results.uri, [], { compress: 0.5, format: SaveFormat.JPEG })
            setImage(ProRes.base64);
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

    async function TradBool() {
        console.log("Working")
        await getValueFor(key)
       

        let body = JSON.stringify({"userid": ids, "profile_pic":image})
        const url =  + "CtrTrad/profile/"
        fetch("https://muslim2.pythonanywhere.com/api/CtrTrad/profile/", {
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
                    navigation.navigate('Tabs')
                    return res.json()
                } else {
                    console.log("Bad")
                    console.log(body)
                    
                }
            }).then(json => {
                setTrad_Acc(true)
            })
            .catch(error => { console.log(error); })

    }


    function Base() {
        
        return (
            <View style={{ width: "95%", alignItems: 'center', justifyContent: "center" }}>
                <View style={{ width: '90%', margin: 10, alignItems: 'center', justifyContent: "center" }}>
                    <Text style={{ fontFamily: "Inter", color: co.white, fontSize: 25 }}>Upload a Profile Pic!</Text>
                    <View style={{ width: '90%', marginTop: 10, alignContent: 'flex-end', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <TouchableOpacity style={{ borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: co.main_yellow, alignItems: 'center', paddingHorizontal: 20, paddingVertical: 5, alignContent: 'flex-end', }} onPress={() => pickImage()}>
                            <Text style={{ fontFamily: 'Ubuntu', fontSize: 22, color: co.black }}>Select</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={{uri:`data:image/png;base64,${image}`}}
                        style={{ width: "75%", aspectRatio: 1, borderRadius: 40, marginTop: 20, borderWidth: 5, borderColor: co.main_yellow }} />
                </View>
                <View style={{
                    width: '90%', marginTop: 15, alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start'
                }}>
                    <TouchableOpacity style={{ borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: co.main_yellow, alignItems: 'center', paddingHorizontal: 20, paddingVertical: 5, alignContent: 'flex-end' }} onPress={() => TradBool()}>
                        <Text style={{ fontFamily: 'Ubuntu', fontSize: 22, color: co.black }}>Next</Text>
                    </TouchableOpacity>
                </View>

            </View>

        )
    }

    return (
                    <View style={{ ...themeStye.container, backgroundColor:co.sub_black }}>
      <StatusBar style="light" backgroundColor={co.sub_black} />
      <StatusBar style="light" backgroundColor="sub_black"/>
            <SafeAreaView style={{ ...themeStye.HeadView, height: "20%" }}>
            <View style={{ flex: 1, height: 120, marginTop: 20, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={img.Logo_Text}
                resizeMode='contain'
                style={{ width: 200 }}
            />
        </View>
            </SafeAreaView>
            <ScrollView>
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexGrow: 1 }}>
                    
                    {Base()}
                </View>
            </ScrollView>
        </View>

    )
}

export default CrtTrader2