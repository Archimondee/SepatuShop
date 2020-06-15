import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, useUsername] = useState('');
  const [password, usePassword] = useState('');

  const _userLogin = () => {
    fetch('http://simlabtiug.xyz/api_sepatu/Login.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == 'Logged In') {
          Alert.alert('Login Successfully');
          _signInAsync();
          navigation.navigate('Menu');
        } else {
          Alert.alert('Wrong username or password');
        }
      });
  };

  const _signInAsync = async () => {
    await AsyncStorage.setItem('username', username);
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: 30,
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
      }}>
      <Content padder>
        <View
          style={{
            flex: 2,
            paddingTop: '10%',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{height: 200, width: 200}}>
            <Image
              source={require('../../../../assets/toko-logo.jpg')}
              resizeMode={'contain'}
              style={{height: 200, width: 200}}
            />
          </View>
        </View>
        <View style={{flex: 1, paddingTop: 50}}>
          <View style={{paddingTop: 15}}>
            <Item floatingLabel>
              <Label style={{color: 'black'}}> Username </Label>
              <Input onChangeText={(username) => useUsername(username)} />
            </Item>
          </View>
          <View style={{paddingTop: 15}}>
            <Item floatingLabel>
              <Label style={{color: 'black'}}> Password </Label>
              <Input
                secureTextEntry={true}
                onChangeText={(password) => usePassword(password)}
              />
            </Item>
          </View>
          <View style={{paddingTop: 25}}>
            <Button
              block
              style={{backgroundColor: '#2f5aa4'}}
              onPress={_userLogin}>
              <Text style={{color: 'white'}}>Login</Text>
            </Button>
          </View>
          <TouchableOpacity
            style={{
              paddingTop: 10,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('register')}>
            <Text>
              Dont have an account ?{' '}
              <Text style={{color: '#2f5aa4'}}>Here</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </Content>
    </SafeAreaView>
  );
};

export default LoginScreen;
