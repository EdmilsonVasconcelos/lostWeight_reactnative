import React from 'react';

import { View } from 'react-native';
import { Header } from 'react-native-elements'

export default function Navbar() {
    return (
        <View>
            <Header
                centerComponent={{ text: 'WEIGHT LOSS', style: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 30 } }}
            />
        </View>
    );
}


