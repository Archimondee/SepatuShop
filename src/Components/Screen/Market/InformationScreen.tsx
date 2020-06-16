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
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

interface InformationScreenProps {}

const InformationScreen = ({route}: any) => {
  var {height, width} = Dimensions.get('window');
  const navigation = useNavigation();
  const {
    id_barang,
    nama_barang,
    harga,
    foto1,
    tipe1,
    alamat,
    pesan,
  } = route.params;
  const [nama, useNama] = useState('');
  const [user_id, useUser_id] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('Profile').then((value: any) => {
      let data = JSON.parse(value);
      //console.log(value);
      if (data != null) {
        useNama(data.nama);
        useUser_id(data.user_id);
      }
    });
  }, []);
  const _inputPembelian = () => {
    //console.log(this.state);
    fetch('http://simlabtiug.xyz/api_sepatu/PostPembelian.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_barang: id_barang,
        nama_barang: nama_barang,
        harga: harga,
        user_id: user_id,
        nama_pembeli: nama,
        foto_barang: foto1,
        tipe_foto: tipe1,
        alamat: alamat,
        pesan: pesan,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == 'Terbeli') {
          Alert.alert(
            'Barang sudah di beli\n Silahkan masuk ke menu pembelian',
          );
          navigation.navigate('Pembelian');
        } else {
          Alert.alert('Terjadi kesalahan');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={{flex: 1}}>
      <Header>
        <Left>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="ios-arrow-back" size={32} color="white" />
          </TouchableOpacity>
        </Left>
        <Body>
          <Text style={{color: 'white'}}>Information</Text>
        </Body>
        <Right />
      </Header>
      <View
        style={{
          marginTop: 5,
          paddingBottom: 5,
          marginBottom: 5,
          paddingTop: 5,
        }}
      />
      <Card
        style={{
          flex: 0.25,
          paddingTop: 20,
          marginLeft: 10,
          marginRight: 10,
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 2, paddingLeft: 5}}>
            <View
              style={{
                height: 100,
                width: 100,
                borderColor: 'black',
                borderWidth: 1,
              }}>
              {foto1 && (
                <Image
                  source={{
                    uri: 'data:image/' + tipe1 + ';base64,' + foto1,
                  }}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
          <View
            style={{
              flex: 3,
              justifyContent: 'space-around',
              alignContent: 'space-around',
              height: 80,
            }}>
            <Text style={{fontSize: 16}}>{nama_barang}</Text>
            <Text style={{fontSize: 16}}> Rp. {harga}</Text>
          </View>
        </View>
      </Card>
      <Card
        style={{
          flex: 0.3,
          marginLeft: 10,
          marginRight: 10,
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <View style={{paddingTop: 10, paddingBottom: 10}}>
          <Text style={{fontSize: 16}}>Dikirim Ke</Text>
          <View style={{paddingTop: 5}}>
            <Text>
              Nama : {nama}{' '}
              {
                //belum
              }
            </Text>
            <View style={{flexWrap: 'wrap'}}>
              <Text>Alamat : {alamat}</Text>
            </View>
            <View style={{flexWrap: 'wrap'}}>
              <Text>Pesan : {pesan}</Text>
            </View>
          </View>
        </View>
      </Card>
      <Card
        style={{
          flex: 0.3,
          marginLeft: 10,
          marginRight: 10,
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <View style={{paddingTop: 10, paddingBottom: 10}}>
          <Text style={{fontSize: 16}}>Transfer Ke</Text>
          <View style={{paddingTop: 5}}>
            <Text>Bank : 08121021021 An Gilang</Text>
            <Text>Sejumlah : Rp. {harga}</Text>
            <Text>Upload bukti pembayaran pada tab pembelian</Text>
          </View>
        </View>
      </Card>

      <View style={{padding: 10, marginLeft: 15, marginRight: 15}}>
        <Button block onPress={() => _inputPembelian()}>
          <Text style={{color: 'white'}}>Selesai</Text>
        </Button>
      </View>
    </View>
  );
};

export default InformationScreen;
