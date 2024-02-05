import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList
} from 'react-native';

import { COLORS, ProStyle, themeStye, } from '../components/theme';
import { KeyContext, APIContext } from "../../UserContext";
import { img, Icon } from '../components';
import { Dimensions } from "react-native";
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as Notification from 'expo-notifications';
import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get("window");


const PermissionScreen = ({ navigation }) => {
    const [btnText, setbtnText] = useState('')
    let co = colourTheme()
    async function getPermission() {
        console.log("called")
        setbtnText('')
        let { status  } = await Location.requestForegroundPermissionsAsync();
        let { Imagestatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        let { Notificationsstatus } = await Notification.requestPermissionsAsync();
        if (status  == 'granted') {
            let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status  == 'granted') {
                let { status } = await Notification.requestPermissionsAsync();
                if (status  == 'granted') {
                    navigation.navigate("Register")
                }else{
                    setbtnText("Notification access has been denied")
                }
            }else{
                setbtnText("Folder access has been denied");
            }
        }else {
            setbtnText("Location access has been denied");
            return
        }
    }

    function Render(){
        return(
            <View style={{width:'95%', alignItems: 'center', marginTop:"5%"}}>
                <Text style={{fontFamily:'Saira', color:co.main_yellow, fontSize:20, textAlign:'center'}}>Our package requires certain authorizations to continue</Text>
                <View style={{marginTop:20, backgroundColor:co.home_sub, borderRadius:30, padding:20}}>
                    <View>
                        <Text style={{fontFamily:"Inter", color:co.white, fontSize:15, marginBottom:5}}>Notification</Text>
                        <Text style={{fontFamily:"Roboto", color:co.yellow_white, fontSize:12, marginBottom:10}}>To have you updated</Text>

                    </View>
                    <View>
                        <Text style={{fontFamily:"Inter", color:co.white, fontSize:15, marginBottom:5}}>E-money interactions</Text>
                        <Text style={{fontFamily:"Roboto", color:co.yellow_white, fontSize:12, marginBottom:10}}>Under your control to make online transections</Text>
                    </View>
                    <View>
                        <Text style={{fontFamily:"Inter", color:co.white, fontSize:15, marginBottom:5}}>Files and Folder</Text>
                        <Text style={{fontFamily:"Roboto", color:co.yellow_white, fontSize:12, marginBottom:10}}>To allow you to share files </Text>
                    </View>
                    <View>
                        <Text style={{fontFamily:"Inter", color:co.white, fontSize:15, marginBottom:5}}>Location</Text>
                        <Text style={{fontFamily:"Roboto", color:co.yellow_white, fontSize:12, marginBottom:10}}>To verify your current city</Text>
                    </View>
                </View>
                <View style={{ width:'100%',justifyContent:'flex-end',  alignItems:'flex-end', marginTop:"15%", marginRight:'5%'}}>
            <Text style={{color:co.white, margin:10}}>{btnText}</Text>
            <TouchableOpacity style={{ ...themeStye.button, backgroundColor: co.main_red,  paddingHorizontal:20, paddingVertical:5 }}
                    onPress={()=>getPermission()}>
                    <Text style={{ fontFamily: 'Ubuntu', fontSize: 20, color: co.black }}>Allow</Text>
            </TouchableOpacity>
            
            </View>
            </View>
        )
    }

    return (
        <View style={{ ...themeStye.container, backgroundColor:co.sub_black, padding: 0 }}>
             <StatusBar style="light" backgroundColor={co.sub_black} />
             <StatusBar style="light" backgroundColor={co.sub_black} />
            <SafeAreaView style={{  height:'100%', width:'100%',justifyContent:'center', alignContent:'center', alignItems: 'center',}}>  
            <View style={{ height: "15%", marginTop: 20, width: '100%', alignItems: 'center',   }}>
            <Image
                source={img.Logo_Text}
                resizeMode='contain'
                style={{flex:1, width: "60%" }}
            />
             </View>
            {Render()}
            
            
            </SafeAreaView>
        </View>
    )
}

export default PermissionScreen