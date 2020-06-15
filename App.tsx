/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  YellowBox,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './src/Components/Screen/User/LoginScreen';
import RegisterScreen from './src/Components/Screen/User/RegisterScreen';
import SplashScreen from './src/Components/Splash/SplashScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import UserScreen from './src/Components/Screen/User/UserScreen';
import HomeScreen from './src/Components/Screen/Home/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './src/Components/Screen/User/ProfileScreen';
import ChangeScreen from './src/Components/Screen/User/ChangeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerTintColor: '#65b6e5',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 14,
          color: '#4a4a4a',
          alignSelf: 'center',
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        options={{header: () => null}}
        name="login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerTitle: 'Register'}}
        name="register"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{headerTitle: 'Register'}}
        name="user_screen"
        component={UserScreen}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'ios-home';
          } else if (route.name === 'Wishlist') {
            iconName = 'md-paper';
          } else if (route.name === 'Pembelian') {
            iconName = 'ios-cart';
          } else if (route.name === 'Account') {
            //iconComponent = SimpleLineIcons
            iconName = 'ios-person';
          }
          return (
            <Icon
              name={iconName}
              size={25}
              color={focused ? 'white' : 'gray'}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#2f5aa4',
        },
      }}>
      <Tab.Screen name={'Home'} component={HomeScreen} />
      <Tab.Screen name={'Pembelian'} component={HomeScreen} />
      <Tab.Screen name={'Wishlist'} component={HomeScreen} />
      <Tab.Screen name={'Account'} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const MenuStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#65b6e5',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 14,
          color: '#4a4a4a',
          alignSelf: 'center',
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="Tab"
        component={TabNavigator}
      />
      <Stack.Screen name="ChangeScreen" component={ChangeScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  YellowBox.ignoreWarnings(['']);
  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              header: () => null,
            }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Auth" component={AuthStack} />
            <Stack.Screen name="Menu" component={MenuStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
      {/* <HomeScreen /> */}
    </>
  );
};

export default App;
