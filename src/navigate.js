import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home'
import Details from './pages/Details'
import Register from './pages/Register'

const Stack = createStackNavigator();

function Navigate() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Detalhes" component={Details} />
                <Stack.Screen name="Registrar" component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigate;