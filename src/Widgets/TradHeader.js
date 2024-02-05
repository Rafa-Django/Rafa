import React from 'react';
import {View ,
        Image, 
        TouchableOpacity, 
        } from 'react-native';

import { Icon, img} from "../components"
import { COLORS,  } from '../components/theme';

export default function TradHeader({navigation}){
    return(
        <View style={{flex:1 ,width:"100%", height:90, flexDirection:'row', marginTop:10}}>
            <TouchableOpacity style={{flex:1, height:90, width:100, alignContent:'flex-start', justifyContent:'center', marginHorizontal:15}}
            onPress={()=>navigation.openDrawer()}>
                <Image
                source={Icon.menu}
                resizeMode="contain"
                style={{width:50, tintColor:co.main_red}}
                />
            </TouchableOpacity>
            <View style={{height:90, width:200, alignContent:'center', justifyContent:'center', alignItems:'center'}}>
            <Image
            source={img.Logo_Text}
            resizeMode='contain'
            style={{width:150, }}
            
          />
            </View>
        </View>
    )
}