import { StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, FlatList, Image, Text, View, ScrollView } from 'react-native'
import React, { useState, useRef, useMemo } from 'react'
import ProfileHeader from '../../Components/Header/ProfileHeader'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

import SenSexSinglebox from '../../Components/SenSexSinglebox';
import BrandImage from '../../Components/BrandImage';
import ToggleTypeButton from '../../Components/ToggleTypeButton';
import LineChart from '../../Components/LineChart';
import BseAndNse from '../../Components/BseAndNse';
import BottomSheetView1 from '../../Components/BottomSheetView';



const Home2 = () => {
    const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
    const imgg = require('../../Images/gdp1.png')
    const imgg1 = require('../../Images/gdp.png')
    const imgg2 = require('../../Images/bar-chart.png')
    const imgg3 = require('../../Images/pie-chart.png')


    const image = [
        { name: 'International Index', img: require('../../Images/gdp1.png') },
        { name: 'International Index', img: require('../../Images/gdp.png') },
        { name: 'International Index', img: require('../../Images/bar-chart.png')},
        { name: 'International Index', img:require('../../Images/pie-chart.png') },
    ]
    const [buttonType, setButtonType] = useState('chat')
    const [bseAndNse, setbseAndNsee] = useState('BSE')
    const chart = () => {
        setButtonType('chat')
    }
    const explore = () => {
        setButtonType('explore')
    }
    const bottomSheetRef = useRef(null)
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar

                    backgroundColor="transparent"
                    barStyle="dark-content"
                />
                <ProfileHeader />
                {/* ===========company View======= */}
                <View style={styles.companyView}>
                    <View style={styles.companyInneview}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
                            <View style={styles.companyLeft}>
                                <Text> Company Name</Text>
                                <Text> 00.00</Text>
                                <Text> <AntDesign name="caretdown" size={16} color="#0f9764" /></Text>
                            </View>
                            <View style={styles.companyLeft}>
                                <Text> Company Name</Text>
                                <Text> 00.00 </Text>
                                <Text> <AntDesign name="caretdown" size={16} color="#0f9764" /></Text>
                            </View>
                            <View style={styles.companyLeft}>
                                <Text> Company Name</Text>
                                <Text> 00.00 </Text>
                                <AntDesign name="caretdown" size={16} color="#0f9764" />
                            </View>
                        </ScrollView>
                    </View>
                </View>
                {/* ===========company View======= */}
                <Text style={{
                    color: "#12626c", marginLeft: 10, marginVertical: 10,
                    fontSize: 18,
                    fontWeight: '600'
                }}>Indicies</Text>
                <View style={{
                    width: '100%', paddingHorizontal: 10, flexDirection: 'row',
                    height: 90
                }}>
                    <View style={{
                        width: '100%', height: '100%', flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>

                        <SenSexSinglebox title="NIFTY" color="red" rotate="0deg" />
                        <SenSexSinglebox title="SENSEX" color="green" rotate="180deg" />
                        <SenSexSinglebox title="VIX" color="red" rotate="0deg" />
                    </View>
                </View>
                {/* ==========brand image======= */}
                <BrandImage />
                {/* ==========toggle=== */}
                <ToggleTypeButton buttonType={buttonType}
                    chart={chart}
                    explore={explore}
                />
                <TouchableOpacity onPress={() => {
                    bottomSheetRef.current.snapToIndex(2)
                }} style={{
                    width: "100%", height: 50, flexDirection: 'row',
                    paddingRight: 10, alignItems: 'center',
                    justifyContent: "flex-end"
                }}>
                    <Octicons name="diff-added" size={24} color="#0F9764" />
                    <Text style={{ marginLeft: 10, fontWeight: '900', color: '#0F9764' }}>Add</Text>
                </TouchableOpacity>
                <View style={{
                    width: '100%', height: 400,
                    paddingHorizontal: 10
                }}>
                    <FlatList
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        data={image}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => {

                            return (
                                <View style={{
                                    width: '48%',
                                    height: 150,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 5,
                                    marginRight: 5,
                                    borderRadius: 5,


                                    shadowColor: "#aaaaaa",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.23,
                                    shadowRadius: 2.62,

                                    elevation: 4,
                                }}>
                                    <View style={{ width: 70, height: 70 }}>
                                        <Image source={item.img}
                                            style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                                    </View>
                                    <Text>{item.name}</Text>
                                </View>
                            )
                        }}
                        contentContainerStyle={{ backgroundColor: 'white' }}
                    />

                    <View style={{ height: 70 }}></View>
                </View>



            </SafeAreaView>
            <BottomSheetView1
                snapPoints={snapPoints}
                bottomSheetRef={bottomSheetRef}
            />
        </>
    )
}

export default Home2

const styles = StyleSheet.create({
    companyView: { paddingHorizontal: 10, flexDirection: 'row', width: "100%" },

    companyLeft: {
        paddingHorizontal: 10, height: 40,
        alignItems: "center",
        flexDirection: 'row'
    },
    companyInneview: {
        width: "100%", height: "100%", flexDirection: 'row',
        backgroundColor: "#D7D9E4",
        borderRadius: 10
    }
})



// import React, { useCallback, useMemo, useRef } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';

// const Home1 = () => {
//   // ref
//   const bottomSheetRef = useRef(null);

//   // variables
//   const snapPoints = useMemo(() => ['25%', '50%'], []);

//   // callbacks
//   const handleSheetChanges = useCallback((index) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   // renders
//   return (
//     <View style={styles.container}>
//       <BottomSheet
//         ref={bottomSheetRef}
//         index={1}
//         snapPoints={snapPoints}
//         onChange={handleSheetChanges}
//       >
//         <View style={styles.contentContainer}>
//           <Text>Awesome 🎉</Text>
//         </View>
//       </BottomSheet>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: 'grey',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
// });

// export default Home1;
