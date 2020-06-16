import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Header, Left, Body, Right, Card, CardItem, Button} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const ProductScreen = ({route}: any) => {
  const {
    id_barang,
    foto1,
    tipe1,
    foto2,
    tipe2,
    foto3,
    tipe3,
    nama_barang,
    kota_penjual,
    kategori,
    stock,
    sizeMin,
    sizeMax,
    keterangan,
    harga,
  } = route.params;
  const [ada, useAda] = useState(false);
  const [user_id, useUser_id] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getUserId();
    checkWishlist();
  }, []);

  const getUserId = () => {
    AsyncStorage.getItem('Profile').then((value: any) => {
      let data = JSON.parse(value);
      //console.log(value);
      if (data != null) {
        // this.setState({
        //   user_id: data.user_id,
        // })
        useUser_id(data.user_id);
        //console.log(data.user_id)
      }
    });
  };

  const checkWishlist = () => {
    //this.getUserId();
    AsyncStorage.getItem('Profile').then((value: any) => {
      let data = JSON.parse(value);
      if (data != null) {
        fetch('http://simlabtiug.xyz/api_sepatu/checkWish.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            id_barang: id_barang,
            user_id: data.user_id,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson == 'Ada') {
              useAda(true);
            } else {
              useAda(false);
            }
          });
      }
    });
  };

  const addWishlist = () => {
    console.log('jhalan');
    fetch('http://simlabtiug.xyz/api_sepatu/PostWishlist.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_barang: id_barang,
        user_id: user_id,
        nama_barang: nama_barang,
        harga: harga,
        foto1: foto1,
        tipe1: tipe1,
        foto2: foto2,
        tipe2: tipe2,
        foto3: foto3,
        tipe3: tipe3,
        kota_penjual: kota_penjual,
        kategori: kategori,
        stock: stock,
        sizeMin: sizeMin,
        sizeMax: sizeMax,
        keterangan: keterangan,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson == 'Masuk') {
          Alert.alert('Wishlist di tambahkan');
          useAda(true);
          //this.props.navigation.navigate('Wishlist');
        } else {
          console.log('err');
        }
      });
  };

  const remWishlist = () => {
    console.log('Kehapus');
    fetch('http://simlabtiug.xyz/api_sepatu/remWishlist.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_barang: id_barang,
        user_id: user_id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson == 'Berhasil') {
          Alert.alert('Wishlist barang telah di hapus');
          useAda(false);
          //this.props.navigation.navigate('Wishlist');
        } else {
          console.log('err');
        }
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
          <Text style={{color: 'white'}}>{nama_barang}</Text>
        </Body>
        <Right />
      </Header>
      <ScrollView
        style={{flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 5}}>
        <View
          style={{
            height: 200,
            borderWidth: 1,
            borderColor: 'black',
            width: '100%',
          }}>
          {foto1 ? (
            <Image
              source={{
                uri: 'data:image/' + tipe1 + ';base64,' + foto1,
              }}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          ) : (
            <Text>Test</Text>
          )}
        </View>
        <View style={{paddingTop: 5}}>
          <Text style={{fontSize: 20}}>{nama_barang}</Text>
          <Text style={{fontSize: 15, color: 'red'}}>Rp {harga}</Text>
        </View>
        <Card style={{paddingTop: 5, paddingBottom: 30}}>
          <CardItem header bordered>
            <Text>Detail Produk</Text>
          </CardItem>
          <CardItem cardBody>
            <View style={{flex: 1, flexDirection: 'column', padding: 15}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: 'black',
                    height: 45,
                    justifyContent: 'center',
                    paddingLeft: 5,
                  }}>
                  <Text>Merk</Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    borderWidth: 1,
                    borderColor: 'black',
                    height: 45,
                    justifyContent: 'center',
                    paddingLeft: 5,
                  }}>
                  <Text>{nama_barang}</Text>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: 'black',
                    height: 45,
                    justifyContent: 'center',
                    paddingLeft: 5,
                  }}>
                  <Text>Kategori</Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    borderWidth: 1,
                    borderColor: 'black',
                    height: 45,
                    justifyContent: 'center',
                    paddingLeft: 5,
                  }}>
                  <Text>{kategori}</Text>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: 'black',
                    height: 45,
                    justifyContent: 'center',
                    paddingLeft: 5,
                  }}>
                  <Text>Size </Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    borderWidth: 1,
                    borderColor: 'black',
                    height: 45,
                    justifyContent: 'center',
                    paddingLeft: 5,
                  }}>
                  <Text>
                    {sizeMin} - {sizeMax}
                  </Text>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: 'black',
                    height: 45,
                    justifyContent: 'center',
                    paddingLeft: 5,
                  }}>
                  <Text>Stok</Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    borderWidth: 1,
                    borderColor: 'black',
                    height: 45,
                    justifyContent: 'center',
                    paddingLeft: 5,
                  }}>
                  <Text>{stock}</Text>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: 'black',
                    height: 45,
                    justifyContent: 'center',
                    paddingLeft: 5,
                  }}>
                  <Text>Dikirim</Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    borderWidth: 1,
                    borderColor: 'black',
                    height: 45,
                    justifyContent: 'center',
                    paddingLeft: 5,
                  }}>
                  <Text>Kota {kota_penjual}</Text>
                </View>
              </View>
              <View style={{paddingTop: 15}}>
                <Text style={{fontSize: 18, textAlign: 'center'}}>
                  Keterangan
                </Text>
                <Text>{keterangan}</Text>
              </View>
              <View style={{paddingTop: 20, paddingBottom: 30}}>
                <View style={{paddingTop: 20}}>
                  {ada == true ? (
                    <Button block onPress={() => remWishlist()}>
                      <Text style={{color: 'white'}}>Remove from Wishlist</Text>
                    </Button>
                  ) : (
                    <Button block onPress={() => addWishlist()}>
                      <Text style={{color: 'white'}}>Add To Wishlist</Text>
                    </Button>
                  )}
                </View>
                <View style={{paddingTop: 20}}>
                  <Button
                    block
                    onPress={
                      () =>
                        navigation.navigate('cart', {
                          id_barang: id_barang,
                          nama_barang: nama_barang,
                          harga: harga,
                          foto1: foto1,
                          tipe1: tipe1,
                        })
                      // navigation.navigate('cart')
                    }>
                    <Text style={{color: 'white'}}>Buy Now</Text>
                  </Button>
                </View>
              </View>
            </View>
          </CardItem>
        </Card>
      </ScrollView>
    </View>
  );
};

export default ProductScreen;
