import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
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
import {ScrollView} from 'react-native-gesture-handler';

interface Transaksi1ScreenProps {}

const Transaksi1Screen = ({route}: any) => {
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
  } = route.params;
  const [no_rek, useNo_rek] = useState('');
  const [nama_rek, useNama_rek] = useState('');
  const [bank_rek, useBank_rek] = useState('');
  const [data, useData] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    _getRekening();
  }, []);
  const _getRekening = () => {
    fetch('http://simlabtiug.xyz/api_sepatu/getRek.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_pembelian: id_pembelian,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // this.setState({
        //   data: responseJson,
        // });
        useData(responseJson);
      });
  };
  const pindah = () => {
    console.log('Pindah pindahhh');
    navigation.navigate('Pembelian');
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
          <Text style={{color: 'white'}}>Lihat Bukti Transaksi</Text>
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
                  {foto_barang ? (
                    <Image
                      source={{
                        uri:
                          'data:image/' + tipe_foto + ';base64,' + foto_barang,
                      }}
                      style={{width: '100%', height: '100%'}}
                      resizeMode="contain"
                    />
                  ) : null}
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  alignContent: 'center',
                }}>
                <Text>Transaksi : {id_pembelian}</Text>
                <Text>Nama Barang : {nama_barang} </Text>
                <Text>Harga : {harga} </Text>
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
                  {data.map((items: any, i) => {
                    return (
                      <Image
                        key={i}
                        source={{
                          uri:
                            'data:image/' +
                            items.tipe_foto +
                            ';base64,' +
                            items.foto_bukti,
                        }}
                        style={{width: '100%', height: '100%'}}
                        resizeMode="contain"
                      />
                    );
                  })}
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  alignContent: 'center',
                }}>
                {data.map((items: any, i) => {
                  return (
                    <View
                      key={i}
                      style={{
                        justifyContent: 'space-around',
                        alignContent: 'space-around',
                      }}>
                      <Item>
                        <Input
                          disabled
                          onChangeText={(no_rek) => useNo_rek(no_rek)}
                          placeholder="No Rekening"
                          defaultValue={items.no_rekening}
                        />
                      </Item>
                      <Item>
                        <Input
                          disabled
                          onChangeText={(nama_rek) => useNama_rek(nama_rek)}
                          placeholder="Nama Rekening"
                          defaultValue={items.nama_rekening}
                        />
                      </Item>
                      <Item>
                        <Input
                          disabled
                          onChangeText={(bank_rek) => useBank_rek(bank_rek)}
                          placeholder="Nama Bank"
                          defaultValue={items.bank_penerima}
                        />
                      </Item>
                    </View>
                  );
                })}
                <View
                  style={{
                    paddingTop: 15,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                  }}></View>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default Transaksi1Screen;
