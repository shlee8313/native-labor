import * as React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/context/AuthContext';
import AuthNavigator from './src/navigations/AuthNavigator';

export default function App() {
  // isAuthenticated = is...
  return (
    <AuthProvider>
      <NavigationContainer>
        {/* {isAuthenticated ? AuthNavigator : DrawerNavigator } */}
        <AuthNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
