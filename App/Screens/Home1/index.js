import { StyleSheet, SafeAreaView, StatusBar, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ProfileHeader from '../../Components/Header/ProfileHeader'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import SenSexSinglebox from '../../Components/SenSexSinglebox';
import BrandImage from '../../Components/BrandImage';
import ToggleTypeButton from '../../Components/ToggleTypeButton';
import LineChart from '../../Components/LineChart';
import BseAndNse from '../../Components/BseAndNse';
import { Button, Avatar } from 'react-native-paper';
const Home1 = ({navigation}) => {
    const [buttonType, setButtonType] = useState('chat')
    const [bseAndNse, setbseAndNsee] = useState('BSE')
    const chart = () => {
        setButtonType('chat')
    }
    const explore = () => {
        setButtonType('explore')
    }
    const bse = () => {
        setbseAndNsee('BSE')
    }
    const nse = () => {
        setbseAndNsee('NSE')
    }
    return (
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
            <View style={{
                width: "100%", height: 50, flexDirection: 'row',
                paddingRight: 10, alignItems: 'center',
                justifyContent: "flex-end"
            }}>
                <BseAndNse bseAndNse={bseAndNse}
                    bse={bse}
                    nse={nse} />
                <Feather name="external-link" size={24} color="black"
                    style={{ marginLeft: 15 }} />
            </View>
            <LineChart />
            <Button icon="camera" mode="contained" onPress={() => navigation.navigate('Home2')}>
    Press me
  </Button>

        </SafeAreaView>
    )
}

export default Home1

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