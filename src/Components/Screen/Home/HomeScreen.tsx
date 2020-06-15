import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {Container, Header, Content, Card, CardItem} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [nama, useNama] = useState('');
  const [username, useUsername] = useState('');
  const [data, useData] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    _getItems();
    _getData();
  }, []);
  const _getItems = () => {
    fetch('http://simlabtiug.xyz/api_sepatu/getItem.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // this.setState({
        //   data: responseJson,
        // });
        useData(responseJson);
      });
  };

  const _getData = () => {
    AsyncStorage.getItem('username').then((value: any) => {
      if (value != '') {
        useUsername(value);

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

  return (
    <ImageBackground
      source={require('../../../../assets/bg.png')}
      style={{width: '100%', height: '100%'}}>
      <SafeAreaView style={{flex: 1}}>
        <Container>
          <Content padder>
            <View
              style={{
                height: 100,
                width: '95%',
                margin: 10,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'black',
              }}>
              <Image
                source={require('../../../../assets/banner.jpg')}
                style={{height: 100, width: '100%'}}
              />
            </View>
            <Card style={{}}>
              <CardItem
                header
                bordered
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'black',
                  backgroundColor: '#2f5aa4',
                }}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>
                  Produsen Sepatu
                </Text>
              </CardItem>
              <CardItem cardBody style={{flexDirection: 'column'}}>
                <View style={{flex: 1, height: 100, flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: 'black',
                      margin: 10,
                    }}>
                    <Image
                      source={require('../../../../assets/pic/Logo/adidasl.jpg')}
                      resizeMode="stretch"
                      style={{height: '100%', width: '100%'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: 'black',
                      margin: 10,
                    }}>
                    <Image
                      source={require('../../../../assets/pic/Logo/Diadoral.png')}
                      resizeMode="stretch"
                      style={{height: '100%', width: '100%'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: 'black',
                      margin: 10,
                    }}>
                    <Image
                      source={require('../../../../assets/pic/Logo/guccil.png')}
                      resizeMode="stretch"
                      style={{height: '100%', width: '100%'}}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, height: 100, flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: 'black',
                      margin: 10,
                    }}>
                    <Image
                      source={require('../../../../assets/pic/Logo/nikel.jpg')}
                      resizeMode="stretch"
                      style={{height: '100%', width: '100%'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: 'black',
                      margin: 10,
                    }}>
                    <Image
                      source={require('../../../../assets/pic/Logo/pierol.gif')}
                      resizeMode="stretch"
                      style={{height: '100%', width: '100%'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: 'black',
                      margin: 10,
                    }}>
                    <Image
                      source={require('../../../../assets/pic/Logo/vansl.png')}
                      resizeMode="stretch"
                      style={{height: '100%', width: '100%'}}
                    />
                  </TouchableOpacity>
                </View>
              </CardItem>
            </Card>
            <Card>
              <CardItem
                header
                bordered
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'black',
                  backgroundColor: '#2f5aa4',
                }}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>
                  Rekomendasi
                </Text>
              </CardItem>
              <CardItem
                cardBody
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  width: '100%',
                  flexWrap: 'wrap',
                }}>
                {data.map((items: any, i: any) => {
                  return (
                    <View
                      style={{
                        width: 140,
                        borderWidth: 1,
                        borderColor: 'black',
                        margin: 10,
                        height: 250,
                      }}
                      key={i}>
                      <View
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: 'black',
                          margin: 10,
                        }}>
                        {items.foto1 ? (
                          <Image
                            source={{
                              uri:
                                'data:image/' +
                                items.tipe1 +
                                ';base64,' +
                                items.foto1,
                            }}
                            style={{width: '100%', height: '100%'}}
                            resizeMode="contain"
                          />
                        ) : null}
                      </View>
                      <View style={{flex: 1, margin: 10}}>
                        <View style={{flex: 0.7}}>
                          <Text style={{}}>{items.nama_barang}</Text>
                          <Text style={{}}>Rp. {items.harga}</Text>
                        </View>
                        <View style={{flex: 0.3}}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('Product', {
                                id_barang: items.id_barang,
                                nama_barang: items.nama_barang,
                                foto1: items.foto1,
                                tipe1: items.tipe1,
                                foto2: items.foto2,
                                tipe2: items.tipe2,
                                foto3: items.foto3,
                                tipe3: items.tipe3,
                                harga: items.harga,
                                kota_penjual: items.kota_penjual,
                                kategori: items.kategori,
                                stock: items.stock,
                                sizeMin: items.sizeMin,
                                sizeMax: items.sizeMax,
                                keterangan: items.keterangan,
                              })
                            }
                            style={{
                              height: 30,
                              width: '100%',
                              borderWidth: 1,
                              borderColor: 'white',
                              padding: 2,
                              backgroundColor: '#2f5aa4',
                            }}>
                            <Text style={{textAlign: 'center', color: 'white'}}>
                              View
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </CardItem>
            </Card>
          </Content>
        </Container>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
