import {
    StyleSheet,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import React from 'react';


import AntDesign from 'react-native-vector-icons/AntDesign';

const UserWithButton = () => {
    return (
        <>

            <View
                style={styles.container}>
                <View
                    style={styles.leftItem}>
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            backgroundColor: 'red',
                            borderRadius: 25,
                        }}>
                        <Image
                            source={require('./../../../../Images/user.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'cover',
                                borderRadius: 30,
                            }}
                        />
                    </View>
                </View>
                {/* ============middle==== */}
                <View
                    style={styles.middleItem}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>
                            Name Name
                        </Text>
                        
                        <Text style={{ marginLeft: 5, color: '#0F9764' }}>NameName</Text>
                    </View>
                    <Text style={{ color: '#686868' }}>Name Name</Text>
                    <Text style={{ color: '#686868' }}>Name Name</Text>
                </View>
                      {/* ============right==== */}
                <View
                    style={styles.rightItem}>
                        <TouchableOpacity  style={styles.button}>
<Text style={{color:"white"}}>Following</Text>
                        </TouchableOpacity>

                </View>
            </View>

        </>
    );
};

export default UserWithButton;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    leftItem: {
        width: '15%',
        height: '100%',
        justifyContent: 'center',


    },
    middleItem: {

        width: '55%',
        height: '100%',
        justifyContent: 'center',
        
       

    },
    rightItem: {

        width: '30%',
        height: '100%',
        paddingTop:15,
        alignItems: 'center',
      

    },
    button:{
        paddingHorizontal:15,
        paddingVertical:5,
        justifyContent:"center",
        alignItemsL:'center',
        borderWidth:1,
        borderColor:"#0F9764",
        borderRadius:15,
        backgroundColor:'#0F9764'
    }

});