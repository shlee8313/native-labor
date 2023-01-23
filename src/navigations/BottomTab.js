import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import SettingsNavigator from './noUse/SettingsNavigator';
import Icon, {Icons} from '../components/Icons';
import Colors from '../constants/colors';
// import ColorScreen from '../screens/ColorScreen';
import {Home, Wallet, Notifications, Settings} from '../screens';
import Floating from './Floating';
import UserInfo from '../screens/home/UserInfo';
import * as Animatable from 'react-native-animatable';

// const TabArr = [
//   {
//     route: 'Home',
//     label: 'Home',
//     type: Icons.Feather,
//     icon: 'home',
//     component: Home,
//   },
//   {
//     route: 'Wallet',
//     label: 'Wallet',
//     type: Icons.Ionicons,
//     icon: 'qr-code-outline',
//     component: Wallet,
//   },
//   {
//     route: 'Notifications',
//     label: 'Notifications',
//     type: Icons.Feather,
//     icon: 'plus-square',
//     component: Notifications,
//   },
//   {
//     route: 'Settings',
//     label: 'Settings',
//     type: Icons.Feather,
//     icon: 'heart',
//     component: SettingsNavigator,
//   },
//   // {
//   //   route: 'SettingsDetail',
//   //   label: 'SettingsDetail',
//   //   type: Icons.FontAwesome,
//   //   icon: 'user-circle-o',
//   //   component: SettingsNavigator,
//   // },
// ];

const Tab = createBottomTabNavigator();

const animate1 = {
  0: {scale: 0.5, translateY: -7},
  0.92: {translateY: 30},
  1: {scale: 1.2, translateY: 10},
};
const animate2 = {
  0: {scale: 1.2, translateY: 10},
  1: {scale: 1, translateY: -7},
};

const circle1 = {
  0: {scale: 0},
  0.3: {scale: 0.9},
  0.5: {scale: 0.2},
  0.8: {scale: 0.7},
  1: {scale: 1},
};
const circle2 = {0: {scale: 1}, 1: {scale: 0}};

const TabButton = props => {
  const {type, icon, label, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({scale: 1});
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({scale: 0});
    }
  }, [focused]);

  // return (
  //   <TouchableOpacity
  //     onPress={onPress}
  //     activeOpacity={1}
  //     style={styles.container}>
  //     <Animatable.View ref={viewRef} duration={300} style={styles.container}>
  //       <Animatable.Text ref={textRef} style={styles.text}>
  //         {item.label}
  //       </Animatable.Text>
  //       <View style={styles.btn}>
  //         <Animatable.View ref={circleRef} style={styles.circle} />
  //         <Icon
  //           type={item.type}
  //           name={item.icon}
  //           color={focused ? Colors.white : Colors.primary}
  //         />
  //       </View>
  //     </Animatable.View>
  //   </TouchableOpacity>
  // );
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={300} style={styles.container}>
        <Animatable.Text ref={textRef} style={styles.text}>
          {label}
        </Animatable.Text>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <Icon
            type={type}
            name={icon}
            color={focused ? Colors.white : Colors.primary}
          />
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function BottomTab() {
  return (
    // <Tab.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //     tabBarStyle: styles.tabBar,
    //   }}>
    //   {TabArr.map((item, index) => {
    //     return (
    //       <Tab.Screen
    //         key={index}
    //         name={item.route}
    //         component={item.component}
    //         options={{
    //           tabBarShowLabel: false,
    //           tabBarButton: props => <TabButton {...props} item={item} />,
    //         }}
    //       />
    //     );
    //   })}
    // </Tab.Navigator>

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen
        name="Home_Tab"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarButton: props => (
            <TabButton
              {...props}
              type={Icons.Feather}
              icon={'home'}
              label={'Home'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="check"
        component={Wallet}
        options={{
          tabBarShowLabel: false,
          tabBarButton: props => (
            <TabButton
              {...props}
              type={Icons.Ionicons}
              icon={'qr-code-outline'}
              label={'출석체크'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="User-Info"
        component={UserInfo}
        options={{
          tabBarShowLabel: false,
          tabBarButton: props => (
            <TabButton
              {...props}
              type={Icons.Feather}
              icon={'settings'}
              label={'User'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 40,
    position: 'absolute',
    top: 0,
    right: 5,
    left: 5,
    borderRadius: 5,
  },
  btn: {
    width: 30,
    height: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  text: {
    fontSize: 11,
    textAlign: 'auto',
    color: Colors.primary,
  },
});
