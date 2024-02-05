import { NavigationContainer } from '@react-navigation/native';
import {
  View,
  Text,
  
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {
  BGcolour,
  LogContext,
  KeyContext,
  APIContext,
  Key2Context,
  AuthContext,
  TrdBoolContext,
  StateContext,
  CountryContext
} from "./UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  { COLORS,  ProStyle, themeStye, } from "./src/components/theme"
import Tabs from "./src/MainNavigation/Tabs"
import StoreTab from './src/MainNavigation/StoreTab';
import { Dimensions } from "react-native";

import {StartWalkThrought ,AppDelView, AppOrd, AppPendOrd, AppPendView, AppView, CartItem, CheckOut, CrtTrader, CrtTrader2, Login, Product, Purchases, Register, Register2, Register3, RegisterVerify, SearchScreen, Store, StoreInfo, StoreProduct, StorePurchases, StoreSettings, TradActivity, StartWalkThrought2, StartWalkThrought3, PermissionScreen, UpdtPrdt, TradAddPrdt, PromoteGPay, TradAccOrd, TradPendOrd, TradViewPend, TradAcceptOrd, TradAccView, TradAccDelView } from './src/screens';
import MainCart from './src/screens/MainCart';


SplashScreen.preventAutoHideAsync();
console.disableYellowBox = true;

const Stack = createNativeStackNavigator();
// cnvvdsn
const { width, height } = Dimensions.get("window");

function App() {
  if (width<=1300){
  const [key, onChangeKey] = React.useState("78955555");
  const [tkey, onChangetkey] = React.useState("7895");
  const [Auth, setAuth] = useState(false);
  const [darkbg, setdarkbg] = useState(true);

  

  const [isLogggedin, setisLoggedin] = useState(false);

  const [country, setcountry] = React.useState("Sri Lanka");

  const [state, setstate] = React.useState("uu");
    const [Trad_Acc, setTrad_Acc] = useState("");
  useEffect(() => {
    
    async function getValueFor(k) {
      let res = await AsyncStorage.getItem(k);
      if (res) {
        setisLoggedin(true)
      } else {
        setisLoggedin(false)
      }
    }
    getValueFor('78955555')
  }, []);

  const [APIcode, setAPIcode] = useState(
    "https://muslim2.pythonanywhere.com/api/"

  );
  const [appIsReady, setAppIsReady] = useState(false);
  
  useEffect(() => {
  
    async function prepare() {
      try {
        await Font.loadAsync({
              Raleway: require("./assets/fonts/Raleway-Regular.ttf"),
              Ubuntu: require("./assets/fonts/Ubuntu-Regular.ttf"),
              Roboto: require("./assets/fonts/RobotoCondensed-Regular.ttf"),
              OpenSans: require("./assets/fonts/OpenSans-Light.ttf"),
              Inter: require("./assets/fonts/Inter-Regular.ttf"),
              Lato: require("./assets/fonts/Lato-Bold.ttf"),
              Saira: require("./assets/fonts/Saira-Regular.ttf"),
            });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {

        setAppIsReady(true);
        await SplashScreen.hideAsync();
        
      }
    }

    prepare();
  }, []);

  const getFonts = async () => {
    await Font.loadAsync({
      Raleway: require("./assets/fonts/Raleway-Regular.ttf"),
      Ubuntu: require("./assets/fonts/Ubuntu-Regular.ttf"),
      Roboto: require("./assets/fonts/RobotoCondensed-Regular.ttf"),
      OpenSans: require("./assets/fonts/OpenSans-Light.ttf"),
      Inter: require("./assets/fonts/Inter-Regular.ttf"),
      Lato: require("./assets/fonts/Lato-Bold.ttf"),
      Saira: require("./assets/fonts/Saira-Regular.ttf"),
    });
    console.log("Fonts loaded");
    setAppIsReady(true);
  };

  
  
  if (!appIsReady) {
    getFonts()
     
  }  // 
  

  return (
    
    <BGcolour.Provider value={[darkbg, setdarkbg]}>
    <Key2Context.Provider value={tkey}>
      <KeyContext.Provider value={key}>
        <LogContext.Provider value={setisLoggedin}>
          <APIContext.Provider value={APIcode}>
          <AuthContext.Provider value={[Auth, setAuth]}>
            <TrdBoolContext.Provider value={[setTrad_Acc, Trad_Acc]}>
              <CountryContext.Provider value={[country, setcountry]}>
                <StateContext.Provider value={[state, setstate]}>
                  
                  <NavigationContainer>
                    
                    <Stack.Navigator
                    screenOptions={{
                      headerShown: false,
                    }}>
                      
                      {isLogggedin == true ? (
                        <Stack.Group>
                         <Stack.Screen
                            name="Tabs"
                            component={Tabs}
                          />
                          <Stack.Screen
                            name="MainCart"
                            component={MainCart}
                          />
                          <Stack.Screen
                            name="CartItem"
                            component={CartItem}
                          />
                          <Stack.Screen
                            name="CheckOut"
                            component={CheckOut}
                          />
                          <Stack.Screen
                            name="Product"
                            component={Product}
                          />
                          <Stack.Screen
                            name="SearchScreen"
                            component={SearchScreen}
                          />
                          <Stack.Screen
                            name="StoreTab"
                            component={StoreTab}
                          />
                          <Stack.Screen
                            name="Purchases"
                            component={Purchases}
                          />
                          <Stack.Screen
                            name="StoreInfo"
                            component={StoreInfo}
                          /> 
                          <Stack.Screen
                            name="StoreProduct"
                            component={StoreProduct}
                          />
                           <Stack.Screen
                            name="Store"
                            component={Store}
                          />
                          <Stack.Screen
                            name="StorePurchases"
                            component={StorePurchases}
                          />
                          <Stack.Screen
                            name="StoreSettings"
                            component={StoreSettings}
                          />
                          <Stack.Screen
                            name="TradActivity"
                            component={TradActivity}
                          />

                          <Stack.Screen
                            name="AppOrd"
                            component={AppOrd}
                          />
                          <Stack.Screen
                            name="AppDelView"
                            component={AppDelView}
                          />
                          <Stack.Screen
                            name="AppPendOrd"
                            component={AppPendOrd}
                          />
                          <Stack.Screen
                            name="AppPendView"
                            component={AppPendView}
                          />
                          <Stack.Screen
                            name="AppView"
                            component={AppView}
                          />
                           <Stack.Screen
                            name="CrtTrader"
                            component={CrtTrader}
                          /> 
                           <Stack.Screen
                            name="CrtTrader2"
                            component={CrtTrader2}
                          />
                           <Stack.Screen
                            name="UpdtPrdt"
                            component={UpdtPrdt}
                          />
                          <Stack.Screen
                            name="TradAddPrdt"
                            component={TradAddPrdt}
                          /> 
                          <Stack.Screen
                            name="PromoteGPay"
                            component={PromoteGPay}
                          />
                          <Stack.Screen
                            name="TradAccOrd"
                            component={TradAccOrd}
                          />
                          <Stack.Screen
                            name="TradPendOrd"
                            component={TradPendOrd}
                          />
                          <Stack.Screen
                            name="TradViewPend"
                            component={TradViewPend}
                          />
                          <Stack.Screen
                            name="TradAcceptOrd"
                            component={TradAcceptOrd}
                          />
                          <Stack.Screen
                            name="TradAccView"
                            component={TradAccView}
                          />
                          <Stack.Screen
                            name="TradAccDelView"
                            component={TradAccDelView}
                          />

                        </Stack.Group>
                      ) : (
                        <Stack.Group>
                         <Stack.Screen
                            name="StartWalkThrought"
                            component={StartWalkThrought}
                          />
                          <Stack.Screen
                            name="StartWalkThrought2"
                            component={StartWalkThrought2}
                          />
                          <Stack.Screen
                            name="StartWalkThrought3"
                            component={StartWalkThrought3}
                          /> 
                          <Stack.Screen
                            name="PermissionScreen"
                            component={PermissionScreen}
                          />
                          <Stack.Screen
                            name="Register"
                            component={Register}
                          /> 
                          <Stack.Screen
                            name="Login"
                            component={Login}
                          /> 
                          <Stack.Screen
                            name="RegisterVerify"
                            component={RegisterVerify}
                          /> 
                          <Stack.Screen
                            name="Register2"
                            component={Register2}
                          />
                          <Stack.Screen
                            name="Register3"
                            component={Register3}
                          />
                        </Stack.Group>
                      )
                      
                    }
                    
                    
                    </Stack.Navigator>
                  </NavigationContainer>
                
                </StateContext.Provider>
              </CountryContext.Provider>
            </TrdBoolContext.Provider>
          </AuthContext.Provider>
          </APIContext.Provider>
        </LogContext.Provider>
      </KeyContext.Provider>
    </Key2Context.Provider>
    </BGcolour.Provider>
  );
}
else{
  return(
    <View style={{backgroundColor:'#0a0529', alignContent: "center", alignItems: 'center', justifyContent: 'center', width:'100%', height:'100%'}}>
      <Text style={{fontSize:50, color:"#ffffff"}}>Website not supported for desktop, feature coming soon. Thank you.</Text>
    </View>
  )
}}

export default App;