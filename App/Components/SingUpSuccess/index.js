import { StyleSheet, SafeAreaView, Image, TouchableOpacity, Text, StatusBar, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';
const SingUpSuccess = ({ navigation }) => {
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
                        <MaterialIcons name="arrow-back-ios" size={24} color="black" />

                    </TouchableOpacity>
                </View>
                <StatusBar

                    backgroundColor="transparent"
                    barStyle="dark-content"
                />
                <View style={{}}>

                    {/* ==========email======== */}
                    <View style={styles.emailView}>
                        <Text style={{ color: 'black', fontSize: 16 }}>We’ve sent an activation email to:
                        </Text>
                        <Text style={{ fontWeight: '500', color: 'black', fontSize: 16 }}>
                            loremipsum@gmail.com</Text>
                    </View>
                    {/* ==========Box ======== */}
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={styles.mailBoxItem}>
                            <View style={{ width: "100%", height: '50%', alignItems: "center", justifyContent: 'flex-end' }}>
                                <Image source={require('../../Images/download.png')} style={{ width: 20, height: 20, resizeMode: 'cover' }} />
                            </View>
                            <View style={{ width: "100%", height: '50%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 10, color: "black" }}>Check Inbox</Text>
                            </View>


                        </View>
                        <View style={{
                            width: '10%', height: 100, justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <View style={{ width: '90%', height: 1, backgroundColor: '#686868' }}></View>


                        </View>
                        <View style={styles.mailBoxItem}>
                            <View style={{ width: "100%", height: '50%', alignItems: "center", justifyContent: 'flex-end' }}>
                                <Image source={require('../../Images/open-email.png')} style={{ width: 20, height: 20, resizeMode: 'cover' }} />
                            </View>
                            <View style={{ width: "100%", height: '50%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 10, color: "black" }}>Click in email</Text>
                            </View>


                        </View>

                        <View style={{
                            width: '10%', height: 100, justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <View style={{ width: '90%', height: 1, backgroundColor: '#686868' }}></View>


                        </View>

                        <View style={styles.mailBoxItem}>
                            <View style={{ width: "100%", height: '50%', alignItems: "center", justifyContent: 'flex-end' }}>
                                <Image source={require('../../Images/clickcopy.png')} style={{ width: 20, height: 20, resizeMode: 'cover' }} />
                            </View>
                            <View style={{ width: "100%", height: '50%', alignItems: "center" }}>
                                <Text style={{ fontSize: 10, color: "black" }}>Click link in email</Text>
                            </View>


                        </View>
                    </View>
                </View>
                <View style={{
                    width: '100%', justifyContent: "center",
                    paddingVertical: 25,
                    alignItems: 'center'
                }}>
                    <Text style={{
                        textAlign: "center", fontSize: 26, color: 'black',
                        fontWeight: 'bold'
                    }}>Go to your inbox</Text>
                </View>
                <Text style={{ textAlign: 'center', color: "black" }}>Did not get email?<Text style={{ color: "#0f9764", marginBottom: 20 }}> we will send again</Text></Text>
                <View style={{
                    width: '100%', justifyContent: "center"
                    , paddingTop: 15, alignItems: "center"
                }}   >
                    <Text style={{ color: "black" }}>We recommend you to check your spam folder </Text>
                    <Text style={{ color: "black" }}>for legitimate mails that may have landed there.</Text>
                </View>
                <Button style={{marginTop:30}}  mode="contained" onPress={() => navigation.navigate('Login')}
                >
    Next
  </Button>
            </SafeAreaView>
        </>
    )
}

export default SingUpSuccess

const styles = StyleSheet.create({
    emailView: {
        justifyContent: 'center', alignItems: 'center',
        paddingVertical: 20
    },
    mailBoxItem: {
        width: '26.66%', height: 100, borderColor: 'green',
        justifyContent: 'center', alignItems: 'center',
    },
    header: {
        width: '100%', paddingVertical: 10,
        justifyContent: 'center',
        paddingLeft: 10
    },
})