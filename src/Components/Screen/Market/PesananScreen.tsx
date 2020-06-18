import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Content,
  Tab,
  Tabs,
  Left,
  Body,
  Right,
  Title,
  ScrollableTab,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import PacketScreen from './PacketScreen';

interface PesananScreenProps {}

const PesananScreen = ({navigation, route}: any) => {
  return (
    <Container>
      <Header hasTabs style={{backgroundColor: '#2f5aa4'}}>
        <Body>
          <Text style={{color: 'white', fontSize: 18}}>Pesanan Saya</Text>
        </Body>
        <Right />
      </Header>
      <Tabs>
        <Tab
          heading="Pembelian"
          tabStyle={{backgroundColor: '#2f5aa4'}}
          activeTabStyle={{backgroundColor: '#2f5aa4'}}>
          <PacketScreen />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default PesananScreen;
