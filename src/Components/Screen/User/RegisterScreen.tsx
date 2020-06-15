import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
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
import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
  const [username, useUsername] = useState('');
  const [password, usePassword] = useState('');
  const [confirm, useConfirm] = useState('');
  const [email, useEmail] = useState('');

  const navigation = useNavigation();

  const _CheckRegister = () => {
    var benar = 5;
    var pesan = '';

    if (username == '') {
      benar -= 1;
      pesan += 'Username belum di isi\n';
    }

    if (email == '') {
      benar -= 1;
      pesan += 'Email belum di isi\n';
    }

    if (password == '') {
      benar -= 1;
      pesan += 'Password belum di isi\n';
    }

    if (confirm == '') {
      benar -= 1;
      pesan += 'Confirm Password belum di isi\n';
    }

    if (confirm == password) {
      benar -= 1;
    } else {
      pesan += 'Password tidak sama\n';
    }

    // ==
    if (benar == 4) {
      navigation.navigate('user_screen', {
        username: username,
        password: password,
        email: email,
      });
    } else {
      Alert.alert(pesan);
    }
  };
  return (
    <View
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
              <Label style={{color: 'black'}}> Email </Label>
              <Input onChangeText={(email) => useEmail(email)} />
            </Item>
          </View>
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
          <View style={{paddingTop: 15}}>
            <Item floatingLabel>
              <Label style={{color: 'black'}}> Confirm Password </Label>
              <Input
                secureTextEntry={true}
                onChangeText={(confirm) => useConfirm(confirm)}
              />
            </Item>
          </View>
          <View style={{paddingTop: 25}}>
            <Button
              block
              style={{backgroundColor: '#2f5aa4'}}
              onPress={_CheckRegister}>
              <Text style={{color: 'white'}}>Register</Text>
            </Button>
          </View>
        </View>
      </Content>
    </View>
  );
};

export default RegisterScreen;
