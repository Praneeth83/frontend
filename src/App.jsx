import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Welcome Back' }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ title: 'Create Account' }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Dashboard' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
