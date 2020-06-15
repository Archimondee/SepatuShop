import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Input,
  Item,
  Textarea,
  Label,
  Card,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
//import {Ionicons} from 'react-native-vector-icons';

const ChangeScreen = () => {
  var {height, width} = Dimensions.get('window');

  const [email, useEmail] = useState('');
  const [username, useUsername] = useState('');
  const [nama, useNama] = useState('');
  const [telpon, useTelpon] = useState('');
  const [password, usePassword] = useState('');
  const [alamat, useAlamat] = useState('');
  const [foto, useFoto] = useState('');
  const [tipe, useTipe] = useState('');
  const [user_id, useUser_id] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('Profile').then((value: any) => {
      let data = JSON.parse(value);
      //console.log(value);
      if (data != null) {
        useEmail(data.email);
        useUsername(data.username);
        useNama(data.nama);
        useTelpon(data.telpon);
        usePassword(data.password);
        useAlamat(data.alamat);
        useFoto(data.foto);
        useTipe(data.tipe_foto);
        useUser_id(data.user_id);
      }
    });
  }, []);

  const _changeInfo = () => {
    fetch('http://simlabtiug.xyz/api_sepatu/changeInfo.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        user_id: user_id,

        nama: nama,
        alamat: alamat,
        telepon: telpon,
        foto: foto,
        tipe: tipe,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == 'Data Update') {
          Alert.alert('Data telah diubah');
          AsyncStorage.removeItem('Profile');
          let Profile = {
            email: email,
            username: username,
            nama: nama,
            telpon: telpon,
            alamat: alamat,
            foto: foto,
            tipe_foto: tipe,
            user_id: user_id,
          };
          AsyncStorage.setItem('Profile', JSON.stringify(Profile));
          navigation.goBack();
        } else {
          Alert.alert('Galat terjadi');
        }
      });
  };
  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <View
          style={{
            height: 70,
            width: width,
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            style={{flex: 0.1, paddingLeft: 10}}
            onPress={() => navigation.goBack()}
            //onPress={() => this.props.navigation.navigate('Beranda')}
          >
            <Icon name="ios-arrow-back" size={32} color="black" />
          </TouchableOpacity>
          <View style={{flex: 0.8}}>
            <Text style={{color: 'black'}}>Pengaturan Akun</Text>
          </View>
          <TouchableOpacity
            onPress={() => _changeInfo()}
            style={{flex: 0.1, alignContent: 'flex-end'}}>
            <Icon name="md-checkmark" size={32} color="black" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 0.3,
            backgroundColor: '#2f5aa4',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            paddingVertical: 30,
          }}>
          <View
            style={{
              height: 150,
              width: 150,

              backgroundColor: 'white',
              alignContent: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
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
        <Card style={{flex: 0.65, paddingLeft: 10, paddingRight: 10}}>
          <View style={{paddingTop: 15}}>
            <Item floatingLabel>
              <Label style={{color: 'black'}}> Email </Label>
              <Input onChangeText={(email) => useEmail(email)} value={email} />
            </Item>
          </View>
          <View style={{paddingTop: 15}}>
            <Item floatingLabel>
              <Label style={{color: 'black'}}> Username </Label>
              <Input disabled value={username} />
            </Item>
          </View>
          <View style={{paddingTop: 15}}>
            <Item floatingLabel>
              <Label style={{color: 'black'}}> Nama </Label>
              <Input onChangeText={(nama) => useNama(nama)} value={nama} />
            </Item>
          </View>
          <View style={{paddingTop: 15}}>
            <Item floatingLabel>
              <Label style={{color: 'black'}}> Telpon </Label>
              <Input
                onChangeText={(telpon) => useTelpon(telpon)}
                value={telpon}
              />
            </Item>
          </View>
          <View style={{paddingTop: 15, paddingBottom: 30}}>
            <Textarea
              underline
              onChangeText={(alamat) => useAlamat(alamat)}
              value={alamat}
              rowSpan={3}
              bordered
              placeholder="Alamat"
            />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default ChangeScreen;
