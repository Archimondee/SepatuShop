import React, {useState} from 'react';
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

interface CheckoutScreenProps {}

const CheckoutScreen = ({route}: any) => {
  var {height, width} = Dimensions.get('window');
  const {nama_barang, harga, foto1, tipe1, id_barang} = route.params;
  const [alamat, useAlamat] = useState('');
  const [pesan, usePesan] = useState('');
  const navigation = useNavigation();
  const _checkInput = () => {
    if (alamat == null || alamat == '') {
      Alert.alert('Kolom alamat tidak boleh kosong');
    } else {
      navigation.navigate('information', {
        id_barang: id_barang,
        nama_barang: nama_barang,
        harga: harga,
        foto1: foto1,
        tipe1: tipe1,
        alamat: alamat,
        pesan: pesan,
      });
    }
  };
  return (
    <View>
      <Header>
        <Left>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="ios-arrow-back" size={32} color="white" />
          </TouchableOpacity>
        </Left>
        <Body>
          <Text style={{color: 'white'}}>Confirmation</Text>
        </Body>
        <Right />
      </Header>
      <Card
        style={{
          //flex: 0.25,
          marginLeft: 10,
          marginRight: 10,
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <View style={{paddingTop: 5, paddingBottom: 5}}>
          <Text style={{fontSize: 16}}> Alamat</Text>
          <Textarea
            underline
            onChangeText={(alamat) => useAlamat(alamat)}
            rowSpan={3}
            bordered
            placeholder="Informasi Alamat"
          />
        </View>
      </Card>
      <Card
        style={{
          //flex: 0.25,
          marginLeft: 10,
          marginRight: 10,
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <View style={{paddingTop: 5, paddingBottom: 5}}>
          <Text style={{fontSize: 16}}> Pesan</Text>
          <Textarea
            underline
            onChangeText={(pesan) => usePesan(pesan)}
            rowSpan={3}
            bordered
            placeholder="Informasi Pesan"
          />
        </View>
      </Card>
      <Card
        style={{
          //flex: 0.25,
          paddingTop: 20,
          marginLeft: 10,
          marginRight: 10,
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2, paddingLeft: 5, paddingBottom: 20}}>
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
              justifyContent: 'space-between',
              alignContent: 'space-between',
              height: 80,
            }}>
            <Text style={{fontSize: 16}}>{nama_barang}</Text>
            <Text style={{fontSize: 12}}>Rp. {harga}</Text>
          </View>
        </View>
      </Card>
      <View style={{padding: 10, marginLeft: 15, marginRight: 15}}>
        <Button block onPress={() => _checkInput()}>
          <Text style={{color: 'white'}}>Buy</Text>
        </Button>
      </View>
    </View>
  );
};

export default CheckoutScreen;
