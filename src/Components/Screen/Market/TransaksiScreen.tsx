import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
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
  Form,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';

const TransaksiScreen = ({route}: any) => {
  const navigation = useNavigation();
  const {
    id_pembelian,
    id_barang,
    nama_barang,
    nama_pembeli,
    harga,
    foto_barang,
    tipe_foto,
    alamat,
    pesan,
    status_pembelian,
    user_id,
  } = route.params;
  const [no_rek, useNo_rek] = useState('');
  const [nama_rek, useNama_rek] = useState('');
  const [bank_rek, useBank_rek] = useState('');
  const [data, useData] = useState([]);

  const [foto_base64, useFoto_base64] = useState('');
  const [tipe, useTipe] = useState('');
  const [isPic, useIsPic] = useState(false);
  const pindah = () => {
    console.log('Pindah pindahhh');
    navigation.goBack();
  };
  const _pickImage = () => {
    ImagePicker.showImagePicker((response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        useIsPic(true);
        useFoto_base64(response.data);
      }
    });
  };

  const _submit = () => {
    if (isPic == false) {
      Alert.alert('Silahkan upload bukti transaksi');
    } else {
      fetch('http://simlabtiug.xyz/api_sepatu/PostPembayaran.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_pembelian: id_pembelian,
          id_barang: id_barang,
          nama_barang: nama_barang,
          harga: harga,
          user_id: user_id,
          nama_pembeli: nama_pembeli,
          nama_rekening: nama_rek,
          bank_penerima: bank_rek,
          no_rekening: no_rek,
          foto_bukti: foto_base64,
          tipe_foto: tipe,
          status_foto: 1,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == 'Terkirim') {
            Alert.alert('Informasi Terkirim');
            navigation.goBack();
          }
        });
    }
  };
  return (
    <View style={{flex: 1}}>
      <Header>
        <Left>
          <TouchableOpacity onPress={pindah}>
            <Icon name="ios-arrow-back" size={32} color="white" />
          </TouchableOpacity>
        </Left>
        <Body>
          <Text style={{color: 'white'}}>Upload Bukti Transaksi</Text>
        </Body>
        <Right />
      </Header>
      <ScrollView>
        <View
          style={{
            paddingBottom: 5,
            marginBottom: 5,
            paddingTop: 10,
            padding: 10,
          }}>
          <Card style={{height: 300}}>
            <View style={{padding: 10}}>
              <Text>Informasi Barang</Text>
            </View>
            <View style={{height: 200, flexDirection: 'row', paddingTop: 10}}>
              <View
                style={{
                  flex: 1.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '70%',
                    height: '90%',
                    borderWidth: 1,
                    borderColor: 'blue',
                  }}>
                  {foto_barang && (
                    <Image
                      source={{
                        uri:
                          'data:image/' + tipe_foto + ';base64,' + foto_barang,
                      }}
                      style={{width: '100%', height: '100%'}}
                      resizeMode="contain"
                    />
                  )}
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  alignContent: 'center',
                }}>
                <Text>Transaksi : {id_pembelian}</Text>
                <Text>Nama Barang : {nama_barang}</Text>
                <Text>Harga : {harga}</Text>
                <Text>Nama : {nama_pembeli}</Text>
              </View>
            </View>
          </Card>
          <Card style={{height: 300, paddingTop: 10}}>
            <View style={{padding: 10}}>
              <Text>Informasi Rekening</Text>
            </View>
            <View style={{height: 200, flexDirection: 'row', paddingTop: 10}}>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '85%',
                    height: '85%',
                    borderWidth: 1,
                    borderColor: 'blue',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {foto_base64 ? (
                    <Image
                      source={{
                        uri: 'data:image/' + tipe + ';base64,' + foto_base64,
                      }}
                      style={{width: '100%', height: '100%'}}
                      resizeMode="contain"
                    />
                  ) : null}
                </View>
                <View
                  style={{
                    paddingTop: 10,
                    width: '85%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Button
                    onPress={() => _pickImage()}
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}>
                    <Text style={{color: 'white'}}>Upload</Text>
                  </Button>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  alignContent: 'center',
                }}>
                <Form>
                  <Item>
                    <Input
                      onChangeText={(no_rek) => useNo_rek(no_rek)}
                      placeholder="No Rekening"
                    />
                  </Item>
                  <Item>
                    <Input
                      onChangeText={(nama_rek) => useNama_rek(nama_rek)}
                      placeholder="Nama Rekening"
                    />
                  </Item>
                  <Item>
                    <Input
                      onChangeText={(bank_rek) => useBank_rek(bank_rek)}
                      placeholder="Nama Bank"
                    />
                  </Item>
                  <View
                    style={{
                      paddingTop: 15,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Button
                      onPress={() => _submit()}
                      style={{
                        width: '90%',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}>
                      <Text style={{color: 'white'}}>Submit</Text>
                    </Button>
                  </View>
                </Form>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default TransaksiScreen;
