import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

interface SplashScreenProps {}

const SplashScreen = (props: SplashScreenProps) => {
  const navigation = useNavigation();
  useEffect(() => {
    _bootstrapAsync();
  }, []);

  const _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('username');
    console.log('user', userToken);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.navigate(userToken ? 'Menu' : 'Auth');
  };
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../../../assets/toko-logo.jpg')}
        style={{height: 250, width: 250}}
      />
    </View>
  );
};

export default SplashScreen;
