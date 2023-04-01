import {
  StyleSheet, Text,
  SafeAreaView, View, ScrollView, StatusBar
} from 'react-native'
import React from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Box from './Components/Box';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import OneBox from './Components/OneBox';
import ThreeBox from './Components/ThreeBox';

const iocnlink = {
  follower: <AntDesign name="addusergroup" size={24} color="#686868" />,
  user: <MaterialCommunityIcons name="account-circle-outline" size={24} color="#686868" />,
  shield: <Octicons name="shield-check" size={24} color="#686868" />,
  history: <Feather name="file-text" size={24} color="#686868" />,
  reward: <AntDesign name="gift" size={24} color="#686868" />,
  share: <Feather name="share-2" size={24} color="#686868" />,
  ques: <FontAwesome5 name="question-circle" size={24} color="#686868" />,

}

const Setting = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView showsVerticalScrollIndicator={false} >
        <Card style={styles.cardView}>
          <View style={styles.cardMain}>
            <View style={styles.cardLeft}>
              <View style={{
                width: '30%', height: "100%", justifyContent: "center",
                paddingRight: 8,
                alignItems: 'flex-end'
              }}>
                <Avatar.Image size={34} source={require('../../Images/avatar.png')} />
              </View>
              <View style={{
                width: '70%', height: "100%",
                justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 16 ,color:'black' }}>Stockknocks</Text>
                <Text style={{ color:'black' }}>stockknocks@gmail.cpm</Text>
              </View>
            </View>
            <View style={styles.cardRight}>
              <FontAwesome5 name="edit" size={24} color="#9fa0a3" />
            </View>
          </View>
        </Card>
        <Box title='Account'
          uptitle='Followers '
          lowtitle='Followings'
          upperIcon={iocnlink.follower}
          lowerIcon={iocnlink.follower} />
        <Box title='Privacy'
          uptitle='Profile'
          lowtitle='Security'
          upperIcon={iocnlink.user}
          lowerIcon={iocnlink.shield} />
        <OneBox title='Finance'
          uptitle='History'
          upperIcon={iocnlink.history} />

        <ThreeBox title='More'
          lowtitle='Follower'
          midtitle='Share with frinds'
          uptitle='History'
          upperIcon={iocnlink.reward}
          midIcon={iocnlink.share}
          lowerIcon={iocnlink.ques} />
           <Button icon="camera" mode="contained" onPress={() => navigation.navigate('CommunityDrawer')}>
    Press me
  </Button>
        <View style={{ height: 300 }}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Setting

const styles = StyleSheet.create({
  cardView: {

    marginHorizontal: 15,
    marginVertical: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    height: 80,
    flexDirection: 'row'
  },
  cardRight: {
    width: "30%", height: '100%',
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 15
  },
  cardMain: { width: "100%", height: "100%", flexDirection: 'row' },
  cardLeft: {
    width: "70%", height: '100%',
    flexDirection: "row"

  }
})