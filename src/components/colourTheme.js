import { useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';

const colourTheme =()=>{
  let dd = useColorScheme()

  if (dd  === 'dark') {
    return { main_yellow:"#faff00",
    main_blue:'#0500ff',
    main_red: "#ff0100",
    home_sub:"#150B56",
    sub_yellow:'#2e3002',
    sub_blue: '#270cb1',
    sub_red: '#9c6c63',

    black: '#151700',
    white:'#fdffe6',

    sub_black:'#0a0529',
    yellow_white:'#F0FAB5'}
  } else {
    return { 
    main_yellow:"#0028E2",
    main_blue: '#F8FB4F',
    main_red:"#F46060",

    home_sub: '#fefa00',
    sub_yellow:'#a7ae07',
    sub_blue:  '#7A62F4',
    sub_red: "#C6AAA5",

    black: "#fdffe6",
    white:'#151700',

    sub_black: "FFF3BB", 
    yellow_white: "#5F46F2",
  }}}

export default colourTheme