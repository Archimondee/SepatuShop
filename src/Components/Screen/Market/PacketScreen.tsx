import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {List, ListItem, Left, Right, Body, SwipeRow, Card} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const PacketScreen = () => {
  const [nama, useNama] = useState('');
  const [user_id, useUser_id] = useState('');
  const [data, useData] = useState([]);
  const [q, useQ] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('Profile').then((value: any) => {
        let data = JSON.parse(value);
        //console.log(value);
        if (data != null) {
          // this.setState({
          //   nama: data.nama,
          //   user_id: data.user_id,
          // });
          console.log(data.user_id);
          useNama(data.nama);
          useUser_id(data.user_id);
          _getItem(data.user_id);
        }
      });
    });
    return () => unsubcribe();
  }, [navigation]);

  const _getItem = (user: string) => {
    console.log('jalan');
    fetch('http://simlabtiug.xyz/api_sepatu/getPembelian.php', {
      method: 'POST',
      body: JSON.stringify({
        user_id: user,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        //console.log('user : ', user_id);
        if (responseJson == 'Tidak') {
          useData([]);
        } else {
          useData(responseJson);
        }
      });
  };

  const goto = (status_pembelian: string, items: any) => {
    if (status_pembelian == '0') {
      console.log('0');
      //console.log(items.id_pembelian);

      navigation.navigate('transaksi', {
        id_pembelian: items.id_pembelian,
        id_barang: items.id_barang,
        nama_barang: items.nama_barang,
        user_id: items.user_id,
        nama_pembeli: items.nama_pembeli,
        harga: items.harga,
        foto_barang: items.foto_barang,
        tipe_foto: items.tipe_foto,
        alamat: items.alamat,
        pesan: items.pesan,
        status_pembelian: items.status_pembelian,
      });
    } else if (status_pembelian == '1') {
      console.log('1');
      navigation.navigate('transaksi1', {
        id_pembelian: items.id_pembelian,
        id_barang: items.id_barang,
        nama_barang: items.nama_barang,
        harga: items.harga,
        nama_pembeli: items.nama_pembeli,
        foto_barang: items.foto_barang,
        tipe: items.tipe,
        status_pembelian: items.status_pembelian,
        alamat: items.alamat,
        pesan: items.pesan,
      });
    } else if (status_pembelian == '2') {
      console.log('2');
      //   onPress={() =>
      //     navigate('Penerima', {
      //       id_pembelian: items.id_pembelian,
      //       id_barang: items.id_barang,
      //       nama_barang: items.nama_barang,
      //       user_id: items.user_id,
      //       nama_pembeli: items.nama_pembeli,
      //       harga: items.harga,
      //       foto_barang: items.foto_barang,
      //       tipe_foto: items.tipe_foto,
      //       alamat: items.alamat,
      //       pesan: items.pesan,
      //       status_pembelian: items.status_pembelian,
      //     })
      //   }
    }
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        {data.length != 0 ? (
          data.map((items: any, i: number) => {
            let status = '';
            if (items.status_pembelian == '0') {
              status = 'Menunggu Pembayaran';
            } else if (items.status_pembelian == '1') {
              status = 'Pembayaran sedang di proses';
            } else if (items.status_pembelian == '2') {
              status = 'Barang sedang dikirim';
            } else if (items.status_pembelian == '3') {
              status = 'Barang telah di terima';
            }
            return (
              <Card
                key={i}
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  onPress={() => goto(items.status_pembelian, items)}
                  style={{flex: 1, flexDirection: 'row', padding: 10}}>
                  <View style={{flex: 3.3, flexWrap: 'wrap'}}>
                    <Text style={{color: 'black', paddingBottom: 3}}>
                      {items.nama_barang}
                    </Text>
                    <Text style={{color: 'black'}}>{items.id_pembelian}</Text>
                  </View>
                  <View style={{flex: 3}}>
                    <Text style={{color: 'black', paddingBottom: 3}}>
                      Status
                    </Text>
                    <Text style={{color: 'black'}}>{status}</Text>
                  </View>
                  <View style={{justifyContent: 'center', paddingRight: 5}}>
                    <Icon name="ios-arrow-forward" size={32} color="black" />
                  </View>
                </TouchableOpacity>
              </Card>
            );
          })
        ) : (
          <Text>Data Belum ada</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default PacketScreen;
