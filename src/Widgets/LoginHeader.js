import React from 'react';
import {
    View,
    Image,
} from 'react-native';

import { img } from '../components';

export default function LoginHeader() {
    return (
        <View style={{ flex: 1, height: 120, marginTop: 20, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={img.Logo_Text}
                resizeMode='contain'
                style={{ width: 200 }}
            />
        </View>
    )
}