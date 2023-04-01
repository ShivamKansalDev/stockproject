import { StyleSheet, Text, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar, View } from 'react-native'
import React from 'react'
import ProfileHeader from '../../Components/Header/ProfileHeader'
import { Button, Avatar } from 'react-native-paper';
import { } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
const Sudipta = ({navigation}) => {
  return (
    <>
      <SafeAreaView style={{ flex: 1, }}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <ScrollView showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{ backgroundColor: 'white', }} >
          <ProfileHeader />
          {/* ===========Post Upper Section===== */}
          <View style={styles.postupper}>

            <View style={styles.cardUpper}>
              <View style={styles.cardUpperLeft}>
                <Avatar.Image size={34} source={require('../../Images/avatar.png')} />
                <Text style={{ marginLeft: 10, color:'black' }}>Avatar</Text>
              </View>
              <View style={styles.cardUpperRight}>
                <TouchableOpacity style={styles.postButton}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Post</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.postLower}>
              <View style={{
                width: '23.33%', height: '100%', flexDirection: 'row',
                alignItems: 'center'
              }}>
                <FontAwesome name="photo" size={20} color="black" />
                <Text style={{ marginLeft: 5 ,color:'black'}}>Photo</Text>
              </View>
              <View style={{
                width: '23.33%', height: '100%', flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Feather name="video" size={24} color="black" />
                <Text style={{ marginLeft: 5,color:'black' }}>Video</Text>
              </View>
              <View style={{
                width: '30%', height: '100%', flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Feather name="mic" size={24} color="black" />
                <Text style={{ marginLeft: 2,color:'black' }}>Voice post</Text>
              </View>
              <View style={{
                width: '23.33%', height: '100%', flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 5
              }}>
                <Feather name="video" size={24} color="black" />
                <Text style={{ marginLeft: 5,color:'black' }}>Video</Text>
              </View>

            </View>
          </View>
          {/* ===========Post  Section===== */}
          <View style={{ paddingHorizontal: 15, }}>
            <View style={{
              height: 80, width: "100%",
              flexDirection: 'row',
              alignItems: 'center',

            }}>
              <View style={{
                height: '100%', width: "60%",
                flexDirection: 'row', alignItems: 'center'
              }}>
                <View style={{ width: '20%', height: '100%', justifyContent: 'center' }}>
                  <Avatar.Image size={34} source={require('../../Images/avatar.png')} />
                </View>
                <View style={{ width: '80%', height: '100%', justifyContent: 'center' }}>
                  <Text style={{ color: "#0F9764", fontWeight: '900' }}>Anul Borra</Text>
                  <Text style={{color:'black'}}>52 min ago</Text>
                </View>
              </View>
              <View style={{
                height: '100%', width: "40%",
                justifyContent: 'center',
                alignItems: 'flex-end'
              }}>
                <View style={{
                  width: 100, height: 40, borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5, borderColor: "#0F9764"
                }}>
                  <Text style={{ color: "#0F9764", fontWeight: 'bold' }}>Following</Text>
                </View>
              </View>
            </View>

            {/* ==============Image */}
            <View style={{ paddingVertical: 20, width: "100%" }}>
              <View style={{ width: '100%', height: 400, borderRadius: 10 }}>
                <Image source={require('../../Images/Image.png')}
                  style={{ width: "100%", height: '100%', resizeMode: "cover", borderRadius: 10 }}
                />
              </View>
              <Text style={{ marginVertical: 10,color:'black' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et.</Text>
              <View style={styles.shareDiv}>
                <View style={{
                  width: '50%', height: "100%",
                  alignItems: 'center',
                  flexDirection: 'row'
                }}>
                  <Feather name="share-2" size={24} color="#8b8c8f" />
                  <Text style={{ marginLeft: 10 }}>36</Text>
                </View>
                <View style={{
                  width: '50%', height: "100%",
                  flexDirection: 'row',
                  
                }}>
                  <View style={{ width: '50%', height: '100%',
                  alignItems:'center',
                  justifyContent:'flex-end',
                  flexDirection:'row'}}>
                  <AntDesign name="hearto" size={20} color="black" />
                  <Text style={{marginLeft:10,color:'black'}}>45</Text>
                  </View>
                  <View style={{ width: '50%', height: '100%',
                  justifyContent:'flex-end',
                  alignItems:'center',
                  flexDirection:'row'}}>
                 <Octicons name="comment" size={24} color="black" />
                  <Text style={{marginLeft:10,color:'black'}}>12</Text>
                  </View>
                 
                </View>
              </View>
            </View>
          </View>
          <Button icon="camera" mode="contained" onPress={() => navigation.navigate('Home1')}>
    Press me
  </Button>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Sudipta

const styles = StyleSheet.create({
  header: { width: '100%', flexDirection: "row", height: 50, },
  headerLeft: {
    width: "50%", paddingLeft: 10, paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headerRight: { width: "50%", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", paddingRight: 10 },
  title: { paddingVertical: 10, paddingLeft: 10 },
  postupper: {
    width: '100%', height: 120,
    borderTopColor: "#e5e6e9",

    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderBottomColor: "#e5e6e9",
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10
  },
  cardUpper: { width: "100%", height: "50%", flexDirection: 'row', alignItems: 'center' },
  postLower: {
    width: "100%", height: "50%",
    flexDirection: 'row'
  },
  postButton: {
    width: 70, height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#0F9764",
    marginRight: 10
  },
  cardUpperLeft: {
    width: "70%", height: "50%", flexDirection:
      'row',
    alignItems: 'center'
  },
  cardUpperRight: {
    width: "30%", height: "50%",
    justifyContent: "center",
    alignItems: 'flex-end',

  },
  shareDiv: {
    width: '100%', height: 50,
    flexDirection: 'row'
  }

})