import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
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
  Card,
  CardItem,
  Left,
  Right,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

interface ProfileScreenProps {}

const ProfileScreen = (props: ProfileScreenProps) => {
  const [nama, useNama] = useState('');
  const [foto, useFoto] = useState('');
  const [tipe, useTipe] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      _getData();
      AsyncStorage.getItem('Profile').then((value: any) => {
        let data = JSON.parse(value);
        //console.log(value);
        if (data != null) {
          useNama(data.nama);
          useFoto(data.foto);
          useTipe(data.tipe_foto);
        }
      });
    });
    return () => unsubcribe();
  }, [navigation]);
  const _getData = () => {
    AsyncStorage.getItem('username').then((value: any) => {
      if (value != '') {
        //useUsername(value);

        fetch('http://simlabtiug.xyz/api_sepatu/getInfo.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: value,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            // this.setState({
            //   nama: responseJson[0].nama || '',
            // });
            useNama(responseJson[0].nama || '');
            useNama(responseJson[0].nama || '');
            useFoto(responseJson[0].foto || '');
            useTipe(responseJson[0].tipe_foto || '');

            let Profile = {
              nama: responseJson[0].nama || '',
              username: responseJson[0].username || '',
              email: responseJson[0].email || '',
              foto: responseJson[0].foto || '',
              tipe_foto: responseJson[0].tipe_foto || '',
              user_id: responseJson[0].user_id,
              alamat: responseJson[0].alamat,
              telpon: responseJson[0].telepon,
            };
            AsyncStorage.setItem('Profile', JSON.stringify(Profile));
          });
      }
    });
  };
  const _signOutAsync = () => {
    AsyncStorage.clear();
    navigation.navigate('Auth');
  };

  return (
    <View style={{flex: 1, height: '100%', width: '100%'}}>
      <View style={{flex: 0.3, backgroundColor: '#2f5aa4'}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View
            style={{
              flex: 0.5,
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderColor: 'white',
                borderWidth: 1,
              }}>
              <Image
                source={{
                  uri: 'data:image/' + tipe + ';base64,' + foto,
                }}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={{flex: 1, alignContent: 'center', alignSelf: 'center'}}>
            <Text style={{color: 'white'}}>{nama}</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 1.5, paddingTop: 10}}>
        <Card>
          <CardItem
            bordered
            button
            onPress={() => navigation.navigate('ChangeScreen')}>
            <Text>Pengaturan Akun</Text>
          </CardItem>
          <CardItem bordered button>
            <Text>Bantuan</Text>
          </CardItem>
          <CardItem button onPress={() => _signOutAsync()}>
            <Text>Logout</Text>
          </CardItem>
        </Card>
      </View>
    </View>
  );
};

export default ProfileScreen;
