import React, {useState, useEffect} from 'react';
import {View, Text, Image, AsyncStorage} from 'react-native';
import {
  Card,
  CardItem,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const WishScreen = () => {
  const [data, useData] = useState([]);
  const [ada, useAda] = useState(false);
  const [nama, useNama] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      _getItems();
    });
    return () => unsubcribe();
  }, [navigation]);

  const _getItems = () => {
    AsyncStorage.getItem('Profile').then((value: any) => {
      let data = JSON.parse(value);
      //console.log(value);
      if (data != null) {
        useNama(data.nama);
        fetch('http://simlabtiug.xyz/api_sepatu/getWish.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: data.user_id,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson !== 'Tidak Ada') {
              useData(responseJson);
              useAda(true);
            } else {
              useAda(false);
            }
          });
      }
    });
  };
  return (
    <View style={{paddingTop: 30}}>
      <Card
        style={{
          marginLeft: 10,
          marginRight: 10,
          paddingLeft: 5,
          paddingRight: 5,
        }}>
        <CardItem
          header
          style={{borderBottomWidth: 1, borderBottomColor: 'black'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Left>
              <Text>Daftar Wishlist, {nama}</Text>
            </Left>
            {/* <Right>
              <Button
                onPress={() => _getItems()}
                style={{
                  height: 40,
                  width: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white'}}>Refresh</Text>
              </Button>
            </Right> */}
          </View>
        </CardItem>
        <List>
          {ada == false ? (
            <View
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Tidak ada wishlist</Text>
            </View>
          ) : (
            data.map((items: any, i: number) => {
              return (
                <ListItem thumbnail key={i}>
                  <Left>
                    <Thumbnail
                      square
                      source={{
                        uri:
                          'data:image/' +
                          items.tipe1 +
                          ';base64,' +
                          items.foto1,
                      }}
                    />
                  </Left>
                  <Body>
                    <Text>{items.nama_barang}</Text>
                    <Text note numberOfLines={1}>
                      Rp. {items.harga}
                    </Text>
                  </Body>
                  <Right>
                    <Button
                      style={{
                        width: 55,
                        height: 40,
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}
                      //   onPress={() =>
                      //     this.props.navigation.navigate('Product', {
                      //       id_barang: items.id_barang,
                      //       nama_barang: items.nama_barang,
                      //       foto1: items.foto1,
                      //       tipe1: items.tipe1,
                      //       foto2: items.foto2,
                      //       tipe2: items.tipe2,
                      //       foto3: items.foto3,
                      //       tipe3: items.tipe3,
                      //       harga: items.harga,
                      //       kota_penjual: items.kota_penjual,
                      //       kategori: items.kategori,
                      //       stock: items.stock,
                      //       sizeMin: items.sizeMin,
                      //       sizeMax: items.sizeMax,
                      //       keterangan: items.keterangan,
                      //     })
                      //   }>
                    >
                      <Text style={{color: 'white'}}>View</Text>
                    </Button>
                  </Right>
                </ListItem>
              );
            })
          )}
        </List>
      </Card>
    </View>
  );
};

export default WishScreen;
