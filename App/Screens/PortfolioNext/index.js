import { StyleSheet, SafeAreaView, Image,
    FlatList, TouchableOpacity,Dimensions, Text, View } from 'react-native'
import React from 'react'
import ProfileHeader from '../../Components/Header/ProfileHeader'
import StatusBarView from '../../Components/StatusBar'
import ProfileBackView from '../../Components/ProfileBackView'
const image=[
    {name:"Reliance Industries"},
    {name:"Reliance Industries"},
    {name:"Reliance Industries"},
    {name:"Reliance "},
]
const PortfolioNext = ({navigation}) => {
    const goBack=()=>{
        navigation.navigate('Profile')
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBarView />
            <ProfileHeader />
            <ProfileBackView  onPress={goBack}/>
            <View style={styles.container}>
            <FlatList
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        data={image}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => {

                            return (
                                <View style={{
                                    width: 160,
                                    height: 160,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom:15,
                                    
                                    borderRadius: 5,
                                    borderColor:"#EBEBEB",
                                    borderWidth:1


                                }}>
                                    <View style={{ width: '100%', height: '100%',
                                    justifyContent:'center',
                                alignItems:'center' }}>
                                        {/* <Image source={item.img}
                                            style={{ width: '100%', height: '100%', resizeMode: 'cover' }} /> */}
                                            <Text>{item.name}</Text>
                                    </View>
                                    
                                </View>
                            )
                        }}
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                        contentContainerStyle={{ backgroundColor: 'white' }}
                    />
</View>
                    <View style={{ height: 70 }}></View>
        </SafeAreaView>
    )
}

export default PortfolioNext

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop:15,
      paddingHorizontal:30
        
    },
    // listItem: {
    //     maxWidth: Dimensions.get('window').width /2,
    //     flex:0.5,
    //     backgroundColor: '#fff',
    //     marginBottom: 30,
    //     borderRadius: 4,
    // },
})