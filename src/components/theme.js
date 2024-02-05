import { Dimensions } from 'react-native';
import * as Font from 'expo-font';
import React, { useContext, useState, useEffect } from 'react';
import { BGcolour } from '../../UserContext';
const { width, height } = Dimensions.get('window');

import { Appearance, useColorScheme } from 'react-native';
import colourTheme from './colourTheme';

let dd = false

// const CC = ()=>{
//     let colorScheme  =  useColorScheme()
    
//   if (colorScheme  === 'dark') {
//     return { main_yellow:"#faff00",
//     main_blue:'#0500ff',
//     main_red: "#ff0100",
//     home_sub:"#150B56",
//     sub_yellow:'#2e3002',
//     sub_blue: '#270cb1',
//     sub_red: '#9c6c63',

//     black: '#151700',
//     white:'#fdffe6',

//     sub_black:'#0a0529',
//     yellow_white:'#F0FAB5'}
//   } else {
//     return { 
//         main_yellow:"#0028E2",
//     main_blue: '#F8FB4F',
//     main_red:"#F46060",

//     home_sub: '#fefa00',
//     sub_yellow:'#a7ae07',
//     sub_blue:  '#7A62F4',
//     sub_red: "#C6AAA5",

//     black: "#fdffe6",
//     white:'#151700',

//     sub_black: "FFF3BB", 
//     yellow_white: "#5F46F2",
//   }}
   
// }
// const theme = ()=>{
//     let colorScheme  =  useColorScheme()
    
//   if (colorScheme  === 'dark') {
//     return { main_yellow:"#faff00",
//     main_blue:'#0500ff',
//     main_red: "#ff0100",
//     home_sub:"#150B56",
//     sub_yellow:'#2e3002',
//     sub_blue: '#270cb1',
//     sub_red: '#9c6c63',

//     black: '#151700',
//     white:'#fdffe6',

//     sub_black:'#0a0529',
//     yellow_white:'#F0FAB5'}
//   } else {
//     return { 
//         main_yellow:"#0028E2",
//     main_blue: '#F8FB4F',
//     main_red:"#F46060",

//     home_sub: '#fefa00',
//     sub_yellow:'#a7ae07',
//     sub_blue:  '#7A62F4',
//     sub_red: "#C6AAA5",

//     black: "#fdffe6",
//     white:'#151700',

//     sub_black: "FFF3BB", 
//     yellow_white: "#5F46F2",
//   }}}

// export default theme()
// function theme(colorScheme) {
//     if (colorScheme === 'dark') {
//         return {
//             main_yellow: "#faff00",
//             main_blue: '#0500ff',
//             // ... rest of the dark mode color definitions
//         };
//     } else {
//         return {
//             main_yellow: "#0028E2",
//             main_blue: '#F8FB4F',
//             // ... rest of the light mode color definitions
//         };
//     }
// };

// export default theme();
export const COLORS = {
    
    main_yellow: dd ? "#faff00" :"#0028E2",
    main_blue: dd ? '#0500ff' : '#F8FB4F',
    main_red: dd ? '#ff0100': "#F46060",

    home_sub: dd ? "#150B56" : '#fefa00',
    sub_yellow:dd ? '#2e3002' : '#a7ae07',
    sub_blue: dd ? '#270cb1' : '#7A62F4',
    sub_red: dd ? '#9c6c63' : "#C6AAA5",

    black: dd ? '#151700' : "#fdffe6",
    white: dd ? '#fdffe6' :'#151700',

    // sub_black:"FFF3BB", 
    sub_black: dd ? '#0a0529': "FFF3BB", 

    yellow_white: dd ? '#F0FAB5' : "#5F46F2",

    lb_homesub:'#fefa00',
    // #FFF3BB
}



export const fonts = {
    Name_Product: { fontFamily: 'Lato', fontSize: 20, },
    sub_pro: { fontFamily: 'OpenSans', fontSize: 15, },
    ProName: { fontFamily: 'Inter', fontSize: 25 }
}


export const themeStye = {
    container: {
        flexGrow: 1,
        height: '100%',
        paddingBottom:'10%',
        paddingtop:20,


    },
    topHeader: {
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        flexDirection: 'row',
        paddingTop: 15,
        height: 80,
        
    },
    circle: {
        borderRadius: 90,
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'

    },

    borderLine: {
        marginTop: 5,
        borderWidth: 1,
        width: '100%',
        borderColor: 'black',
        margin: 0,
        height: 1
    },
    HeadView: {
        width: '100%',
    },
    button: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    }


}

export const homeStyle = {
    Pro_bar: {
        marginHorizontal: "10%",
        flexDirection: 'row',
        width: "90%",
        marginTop: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },

    'PV': {
        alignItems: 'center',
        justifyContent: "flex-start", margin: 15,

        marginHorizontal: 10, width: '80%',

    },

    'pS': {
        width: "90%", aspectRatio: 1, marginTop: 10,
        marginHorizontal: 5, justifyContent: 'center',
        alignItems: 'center'
    },
    "PN": { fontFamily: 'Ubuntu', fontSize: 25, },
    'PS2': { justifyContent: 'flex-start', flex: 1, alignContent: 'center' },

}

export const ActStyle = {
    mainFont: { fontFamily: 'Roboto', fontSize: 25 },
    mainNum: { fontFamily: 'OpenSans', fontSize: 30, },
    OCNum: { width: '95%', alignItems: 'center', justifyContent: 'center' },
    orderCont: { alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 10, width: '90%', margin: 10, borderRadius: 50 },
    OC2: { width: '95%', alignItems: 'center', justifyContent: 'center' },
}

export const ProStyle = {
    'Main_header': { flexDirection: 'row', paddingVertical: 10, marginBottom: 5, marginTop:10  },
    'TO_main': {
        flex: 1, height: 50, width: 50, padding: 4
        , justifyContent: 'center', paddingBottom: 5, margin: 10
    },
    'TO_main2': {
        flex: 2, height: 50, width: 50, margin: 8,
        justifyContent: 'flex-end', alignItems: 'flex-end'
    },
    'To_image': { width: 40, height: 40},
    'Image_Flat': { width: 200, height: 200, borderRadius: 20 },
    "Flat": { }, //
    'Text_like': { fontFamily: "Ubuntu", fontSize: 20, color: 'red' },
    'TO': { borderRadius: 20, justifyContent: 'center', alignItems: 'center',   margin: 0, marginTop: 5, height: 30, marginHorizontal: 20 },
    "SubIn": { flex: 1, marginTop: 5, marginHorizontal: 20, flexDirection: 'row',  marginBottom: 20, },
    "SI": { height: 35, width: 35, borderRadius: 90, justifyContent: 'center', alignItems: 'center' },
    "SI2": { marginHorizontal: 40, justifyContent: 'center', height: 35, width: 300 },
    "SI3": { flex: 2, marginTop: 5, marginHorizontal: 20, marginBottom: 5, flexDirection: 'row', height: 50, justifyContent: 'center', alignItems: 'center' },
    "InfoVi4": { flex: 4, width: "95%", margin: 10, justifyContent: 'center', },
}


export const CartStyle = {

    "SM": { marginTop: 10, borderRadius: 20, width: '100%'},

}


export const OrdViStyle = {
    "Vi1": { width: '100%', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start', marginTop: 15 },
    "MainText": { fontFamily: 'Lato', fontSize: 20 },
    "Vi2": { width: '90%', borderRadius: 20, opacity: 0.7, justifyContent: 'flex-start', alignItems: 'center', marginTop: 10 },
    "SubText": { fontFamily: 'Lato', fontSize: 15, margin: 3 },
    "CallTouch": { width: '50%', justifyContent: 'center', alignItems: 'center' },
    "Vi3": { width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', },
    // render
    "RVi1": { marginTop: 10, borderRadius: 50, width: Dimensions.get("window").width - 40,  alignContent: 'center', marginBottom: 10 },
    "Rvi2": { width: '90%', flexDirection: 'row', marginTop: 10, marginHorizontal: 20 },
    "ItImage": { width: "60%", aspectRatio: 1, borderRadius: 40 },
    "RVi3": { width: "45%", alignContent: 'center', justifyContent: 'center' },
    "RVi4": { marginVertical: 20, width: '100%', flexDirection: 'row', justifyContent: 'center', marginHorizontal: 15, },
    "RVi5": { flexDirection: 'row', width: "50%", justifyContent: 'center', alignItems: 'flex-start', alignContent: 'flex-start' },
    "RVi6": { width: "50%", justifyContent: 'center', alignItems: 'flex-start', alignContent: 'flex-start' },
    "MainView": { height: '100%', width: Dimensions.get('window').width, alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
}  