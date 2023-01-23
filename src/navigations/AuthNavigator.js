import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {Login, ForgotPassword, Register} from '../screens';
import {LoginScreen, ForgotPassword, RegisterScreen} from '../screens';
import {COLORS, ROUTES} from '../constants';
// import DrawerNavigator from './noUse/DrawerNavigator';
import BottomTab from './BottomTab';
import Floating from './Floating';
import UserInfo from '../screens/home/UserInfo';

import Profile from '../screens/home/Profile';
import ApplyJob from '../screens/home/ApplyJob';
import DoneWork from '../screens/home/DoneWork';
const Stack = createNativeStackNavigator();
// Navigator, Screen, Group

function AuthNavigator() {
  /**
   *
   */

  const [initialRouteName, setInitialRouteName] = useState('');

  useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  const authUser = async () => {
    try {
      let nomuUser = await AsyncStorage.getItem('nomuUser');
      userData = JSON.parse(nomuUser);
      console.log('APP' + userData[0].user_id);

      if (userData) {
        // userData = JSON.parse(nomuUser);
        if (userData[0].user_id) {
          setInitialRouteName('Home');
        } else {
          setInitialRouteName('Login');
        }
      } else {
        setInitialRouteName('Register');
      }
    } catch (error) {
      setInitialRouteName('Register');
    }
  };

  console.log(Stack);
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={initialRouteName}>
      {/* <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
        
      /> */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="User-Info"
        // component={Floating}
        component={UserInfo} // 회원정보 DAshBoard
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="회원정보"
        component={Profile}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="예약현황"
        component={ApplyJob}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="완료내역"
        component={DoneWork}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Home"
        component={BottomTab}
        // component={DrawerNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
