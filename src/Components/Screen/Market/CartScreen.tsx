import React, {Component} from 'react';
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
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

interface CartScreenProps {}

const CartScreen = ({route}: any) => {
  var {height, width} = Dimensions.get('window');
  const navigation = useNavigation();
  const {id_barang, nama_barang, harga, foto1, tipe1} = route.params;
  return (
    <View style={{flex: 1}}>
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
          flex: 0.2,
          paddingTop: 30,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 30,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 150,
            width: width,
            paddingBottom: 10,
          }}>
          <View
            style={{
              flex: 1.5,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
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
          <View style={{flex: 3, flexDirection: 'column'}}>
            <View style={{paddingLeft: 5, paddingTop: 5}}>
              <Text>{nama_barang}</Text>
            </View>
            <View style={{paddingLeft: 5, paddingTop: 5}}>
              <Text>Rp. {harga}</Text>
            </View>
          </View>
        </View>
      </Card>
      <View style={{padding: 10, marginLeft: 15, marginRight: 15}}>
        <Button
          block
          onPress={() =>
            navigation.navigate('checkout', {
              id_barang: id_barang,
              nama_barang: nama_barang,
              harga: harga,
              foto1: foto1,
              tipe1: tipe1,
            })
          }>
          <Text style={{color: 'white'}}>Checkout</Text>
        </Button>
      </View>
      <View style={{padding: 10, marginLeft: 15, marginRight: 15}}>
        <Button block onPress={() => navigation.goBack()}>
          <Text style={{color: 'white'}}>Cancel</Text>
        </Button>
      </View>
    </View>
  );
};

export default CartScreen;
