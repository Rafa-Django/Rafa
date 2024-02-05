import React, { useContext, useState } from 'react';
import {
    TextInput,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Alert,
    Button,
    Image
} from 'react-native';

import { COLORS, themeStye, ProStyle} from '../components/theme'
import {  Icon } from '../components';
import { DatePickerInput } from 'react-native-paper-dates';
import { DatePickerModal } from 'react-native-paper-dates';
import { KeyContext, APIContext } from "../../UserContext";
 import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { TimePickerModal } from 'react-native-paper-dates';

import colourTheme from '../components/colourTheme';
import { StatusBar } from 'expo-status-bar';


const TradAcceptOrd = ({ route, navigation }) => {
    let co = colourTheme()
    const key = useContext(KeyContext)
    const APIcode = useContext(APIContext)
    const [price, setprice] = useState('')


    const [time, setTime] = useState("");

    const [date, setDate] = React.useState(undefined);
    const [DatePicker, setDatePicker] = React.useState(undefined);
    



    const [visible, setVisible] = React.useState(false)
    const onDismiss = React.useCallback(() => {
        setVisible(false)
    }, [setVisible])

    const onConfirm = React.useCallback(
        ({ hours, minutes }) => {
        setVisible(false);
        setTime(hours +" : " + minutes)
        console.log(hours, minutes );
        console.log(date)
        },
        [setVisible]
    );
    
    const onConfirmSingle = React.useCallback(
        (params) => {
            setDatePicker(false);
            setDate(params.date);
            console.log(date)
        },
        [setDatePicker, setDate]
      );

    let COpk = route.params.pk

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

    async function APICheckout() {
        console.log(key)
        console.log("Working")

        // await getValueFor(key)
     
        let body = JSON.stringify({ "COid": COpk, 'delDur': date, 'deliverTime': time, "delcost": price })
        fetch(APIcode + "Trader/Cart/Accept/", {
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
                        "Order Submitted",
                        "Message passed to customer",
                        [
                            {
                                text: "Cancel",
                                onPress: () => navigation.navigate('TradPendOrd'),
                            }])
                            navigation.navigate('TradPendOrd')
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


    // function onDateSelected(event, value) {
    //     setDate(value);
    //     // setDatePicker(false);
    // };

    // function onTimeSelected(event, value) {
    //     setTime(value);
    //     setTimePicker(false);
    //     console.log(time)
    // };



    function CheckDetails() {
        return (
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                
                {/* <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                Pick single date
                </Button>
                <DatePickerModal
                locale="en"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
                /> */}

                  <DatePickerInput
                    locale="en"
                    label="Delivery Date"
                    value={date}
                    onChange={ (d) =>{
                        setDate(d)
                    }
                    }
                    inputMode="start"
                    />
                <TouchableOpacity style={{ marginHorizontal: 20, marginTop: 5, justifyContent: 'center', alignItems: 'center', height: 40, width: 150, borderRadius: 20, backgroundColor: co.main_yellow }}
                        onPress={() => setVisible(true)}>
                        <Text style={{ fontFamily: 'Roboto', fontSize: 18, fontWeight: '100' }}>Select Time</Text>
                    </TouchableOpacity>

                <TimePickerModal
                visible={visible}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
                hours={12}
                minutes={14}
                />

                <Text style={{ fontFamily: 'Saira', fontSize: 18, color: co.white, fontWeight: '100' , margin:10}}>Time = {time}</Text>

                <View style={{ width: '90%', justifyConten: 'flex-start' }}>
                    <View style={{ width: '90%', }}>
                        <Text style={{ fontFamily: "Inter", color: co.white, fontSize: 25 }}>Price per product:</Text>
                        <Text style={{ fontFamily: "Raleway", color: co.main_red, fontSize: 10 }}>Provide in your country's currency</Text>
                    </View>
                    <View style={{ width: '90%', textAlignVertical: 'top', backgroundColor: co.main_red, borderRadius: 20, marginTop: 15 }}>

                        <TextInput
                            style={{ width: '90%', color: co.white, textAlignVertical: 'top', marginVertical: 5, fontFamily: 'Ubuntu', fontSize: 20, marginHorizontal: 15 }}
                            returnKeyType='next'
                            value={price}
                            onChangeText={text => { setprice(text) }}
                            editable={true}
                            keyboardType='default' />
                    </View>

                </View>

                <TouchableOpacity style={{ marginHorizontal: 20, marginTop: 25, justifyContent: 'center', alignItems: 'center', height: 40, width: 100, borderRadius: 20, backgroundColor: co.main_yellow }}
                    onPress={() => APICheckout()} >
                    <Text style={{ fontFamily: 'Roboto', fontSize: 18, fontWeight: '100' }}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ ...themeStye.container, backgroundColor:co.sub_black, padding: 0 }}>
             <StatusBar style="light" backgroundColor={co.sub_black} />
            <SafeAreaView style={{ ...themeStye.HeadView, marginTop: 15 }}>
        <View style={{...ProStyle.Main_header}}>
          <TouchableOpacity style={{...ProStyle.TO,  }}
           onPress={() => navigation.goBack()}>
          <Image
          source={Icon.Back}
          resizeMode='contain'
          style={{...ProStyle.To_image, tintColor:co.white}}
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

export default TradAcceptOrd