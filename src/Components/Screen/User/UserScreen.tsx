import React, {useState} from 'react';
import {
  Image,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
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
  Textarea,
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {useNavigation, NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const UserScreen = ({route}: any) => {
  const {username, password, email} = route.params;
  //   const [username, useUsername] = useState('');
  //   const [email, useEmail] = useState('');
  //   const [password, usePassword] = useState('');

  const navigation = useNavigation();

  const [nama, useNama] = useState('');
  const [telpon, useTelpon] = useState('');
  const [alamat, useAlamat] = useState('');
  const [foto, useFoto] = useState('');
  const [tipe] = 'jpg';

  const _pickImage = () => {
    ImagePicker.showImagePicker((response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        useFoto(response.data);
      }
    });
  };

  const _userRegister = () => {
    var benar = 3;
    var pesan = '';
    if (nama == '') {
      benar -= 1;
      pesan += 'Nama belum di isi\n';
    }

    if (alamat == '') {
      benar -= 1;
      pesan += 'Alamat belum di isi\n';
    }

    if (telpon == '') {
      benar -= 1;
      pesan += 'Telpon belum di isi\n';
    }

    console.log('Password : ' + password);
    if (benar == 3) {
      fetch('http://simlabtiug.xyz/api_sepatu/Register.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          nama: nama,
          alamat: alamat,
          telepon: telpon,
          foto: foto,
          tipe: tipe,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == 'Success') {
            Alert.alert('Register Successfull');
            _signInAsync();
            //console.log('Berhasil ');
            //navigation.navigate('Home')
          }
        });
    } else {
      Alert.alert(pesan);
    }
  };

  const _signInAsync = async () => {
    await AsyncStorage.setItem('username', username);
  };
  return (
    <Content padder>
      <View
        style={{
          flex: 2,
          paddingTop: '10%',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 130,
            width: 130,
            borderColor: 'black',
            borderWidth: 1,
          }}>
          {foto === '' ? (
            <Image
              source={{
                uri: 'data:image/' + tipe + ';base64,' + foto,
              }}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={{
                uri: 'data:image/' + tipe + ';base64,' + foto,
              }}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          )}
        </View>
        {/* <View
            style={{
              height: 130,
              width: 130,
              borderColor: 'black',
              borderWidth: 1,
            }}>
            {foto && (
              <Image
                source={{
                  uri: 'data:image/' + tipe + ';base64,' + foto,
                }}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            )}
          </View> */}
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            paddingTop: 20,
          }}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 200,
              backgroundColor: '#2f5aa4',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => _pickImage()}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Upload Photo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1.5, paddingTop: 10}}>
        <View style={{paddingTop: 15}}>
          <Item stackedLabel>
            <Label style={{color: 'black'}}> Email </Label>
            <Input disabled placeholder={email} />
          </Item>
        </View>
        <View style={{paddingTop: 15}}>
          <Item stackedLabel>
            <Label style={{color: 'black'}}> Username </Label>
            <Input disabled placeholder={username} />
          </Item>
        </View>
        <View style={{paddingTop: 15}}>
          <Item floatingLabel>
            <Label style={{color: 'black'}}> Nama </Label>
            <Input onChangeText={(nama) => useNama(nama)} />
          </Item>
        </View>
        <View style={{paddingTop: 15}}>
          <Item floatingLabel>
            <Label style={{color: 'black'}}> Telpon </Label>
            <Input onChangeText={(telpon) => useTelpon(telpon)} />
          </Item>
        </View>
        <View style={{paddingTop: 15}}>
          <Textarea
            underline
            onChangeText={(alamat) => useAlamat(alamat)}
            rowSpan={3}
            bordered
            placeholder="Alamat"
          />
        </View>
        <View style={{paddingTop: 25}}>
          <Button
            block
            style={{backgroundColor: '#2f5aa4'}}
            onPress={_userRegister}>
            <Text style={{color: 'white'}}>Save</Text>
          </Button>
        </View>
      </View>
    </Content>
  );
};

const imageNotFound =
  '/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMxaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjcwOUU4QjMxNzgzNDExRTY5NEQ4Q0RGREYwRTE5QkM4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjcwOUU4QjMyNzgzNDExRTY5NEQ4Q0RGREYwRTE5QkM4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTIxMzU2QzQ3ODI5MTFFNjk0RDhDREZERjBFMTlCQzgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzA5RThCMzA3ODM0MTFFNjk0RDhDREZERjBFMTlCQzgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYF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';
export default UserScreen;
