import React, { useContext,  useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Trader, Mainhome, Accounts, Activities } from '../screens';
import StoreTab from './StoreTab';
import { Icon } from '../components';
import { APIContext, KeyContext, TrdBoolContext} from "../../UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import colourTheme from '../components/colourTheme';
const Tab = createBottomTabNavigator();
const TabBtn = ({ route, accessibilityState, children, onPress }) => {
  var isSelected = accessibilityState.selected
  let co = colourTheme()

  if (isSelected) {
    return (
        <View style={styles.btnWrapper}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                styles.svgGapFiller,
                {
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius:20,
                  backgroundColor: co.home_sub,
                },
              ]}
            />
         
             <View
              style={[
                styles.svgGapFiller,
                {
                  borderTopRightRadius:  20,
                  borderBottomRightRadius:20,
                  backgroundColor: co.home_sub,
                }
              ]}
            /> 
          </View>
  
          <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={{...styles.activeBtn, backgroundColor: co.main_yellow}}>
            <View style={{alignContent:'center', justifyContent:'center'}}>{children}</View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={[
            styles.inactiveBtn,
            {
              borderRadius:  20 ,
              paddingBottom:10,
              alignContent:"center",
              justifyContent:'center',
              alignItems:'center',
              backgroundColor: co.home_sub,
              
            },
          ]}>
          <View>{children}</View>
        </TouchableOpacity>
      )
  }
}


function Tabs({navigation}) {
  let co = colourTheme()
  const APIcode = useContext(APIContext)
  const [Trad_Acc,setTrad_Acc] = useContext(TrdBoolContext)
  const [lTrAcc, setlTrAcc] = useState(false)
  const key = useContext(KeyContext)
  
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
        console.log("Wnsg")
        await getValueFor(key)
        console.log("Wnsg")
        let body = JSON.stringify({"Userid":ids})
        console.log(body)
        fetch(APIcode + "Store/Bollean/", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        }).then(res => {
                if (res.ok) {
                    console.log("Good")
                    // setTrad_Acc(true)
                    setlTrAcc(true)


                    return res.json()
                } else {
                    console.log("Bad")
                    console.log("Bad")

                    // setTrad_Acc(false)
                    setlTrAcc(false)


                }
            })

    }

    useEffect(() => {
      TradBool();
    }, [])
    
    useEffect(() => {
      navigation.addListener('focus', () => {
          TradBool()
      });
  }, [])
    return (
      <Tab.Navigator


      

      screenOptions={{
          headerShown: false,
          tabBarShowLabel:false,

          tabBarStyle: {

            position: 'absolute',
            backgroundColor: co.home_sub,
            borderTopWidth: 0,
            bottom: 15,
            right: 10,
            left: 10,
            height: 60,
            borderRadius:20,
            borderBottomEndRadius:20,
            marginLeft:5, // Use margins as you required
            marginRight:5,
            marginBottom:0,
            
          }
      }}


  >
      <Tab.Screen
          name='Home'
          component={Mainhome}
          options={
              { tabBarHideOnKeyboard:false,
                  tabBarIcon:
                      ({ focused }) => (
                          <Image
                              source={Icon.Home_icon}
                              resizeMode='contain'
                              style={{
                                  width: 30,
                                  height: 30,
                                  tintColor: focused ? co.main_blue : co.main_yellow, 
                                  alignContent:'center', 
                                  alignItems:'center',
                                  justifyContent:'center'
                              }}
                          />
                      ),
                  tabBarButton: (props) => (
                      <TabBtn {...props} />
                  )
              }} />
      <Tab.Screen
          name='Activities'
          component={Activities}
          options={
              {
                  tabBarIcon:
                      ({ focused }) => (
                          <Image
                              source={Icon.Activity_icon}
                              resizeMode='contain'
                              style={{
                                  width: 30,
                                  height: 30,
                                  tintColor: focused ? co.main_blue :co.main_yellow,
                                  alignContent:'center', 
                                  alignItems:'center',
                                  justifyContent:'center'
                              }}
                          />
                      ),
                  tabBarButton: (props) => (
                      <TabBtn {...props} />
                  )
              }} />
      <Tab.Screen
          name='Trader'
          component={lTrAcc == true ? StoreTab : Trader}
          // component={ Trader }
          options={
              {
                  tabBarIcon:
                      ({ focused }) => (
                          <Image
                              source={Icon.Trader_icon}
                              resizeMode='contain'
                              style={{
                                  width: 30,
                                  height: 30,
                                  tintColor: focused ?co.main_blue : co.main_yellow
                              }}
                          />
                      ),
                  tabBarButton: (props) => (
                      <TabBtn {...props} />
                  )
              }} />
      <Tab.Screen
          name='Account'
          component={Accounts}
          options={
              {
                  tabBarIcon:
                      ({ focused }) => (
                          <Image
                              source={Icon.User_icon}
                              resizeMode='contain'
                              style={{
                                  width: 30,
                                  height: 30,
                                  tintColor: focused ? co.main_blue : co.main_yellow,
                                  alignContent:'center', 
                                  alignItems:'center',
                                  justifyContent:'center'
                              }}
                          />
                      ),
                  tabBarButton: (props) => (
                      <TabBtn {...props} />
                  )
              }} />
  </Tab.Navigator>
    );
  }

export default Tabs

const styles = StyleSheet.create({
    btnWrapper: {
      flex: 1,
      alignItems: 'center',
      
    },
    activeBtn: {
      flex: 1,
      position: 'absolute',
      top: -22,
      width: 45,
      height: 45,
      borderRadius: 50 / 2,
      
      alignItems: 'center',
      justifyContent: 'center',
      alignContent:'center', 
      paddingBottom:5
    },
    inactiveBtn: {
      flex: 1,
      
      justifyContent: 'center',
      alignItems: 'center',
    },
    svgGapFiller: {
      flex: 1,
     
      justifyContent: 'center',
      alignItems:'center'
    },
  });