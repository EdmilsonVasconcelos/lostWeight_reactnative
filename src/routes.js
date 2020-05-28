import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from './pages/Home'
import Details from './pages/Details'
import Register from './pages/Register'

const Tab = createBottomTabNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = 'ios-home';
                        } else if (route.name === 'Detalhes') {
                            iconName = 'ios-list';
                        } else if (route.name === 'Registrar') {
                            iconName = 'ios-add';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#007bff',
                    inactiveTintColor: 'gray',
                }}

            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Detalhes" component={Details} />
                <Tab.Screen name="Registrar" component={Register} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Routes;