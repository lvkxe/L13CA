import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Details from './Details';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: '#FFF' },
                    headerTintColor: '#007AFF',
                    headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
                    headerTitleAlign: 'center'
                }}
                initialRouteName="Carpark Rates"
            >
                <Stack.Screen name="Carpark Rates" component={Home} />
                <Stack.Screen name="Carpark Details" component={Details} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
