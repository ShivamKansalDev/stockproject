

import {
    StyleSheet,
    Text,
    View,
    Platform,
    FlatList,
    TouchableOpacity,

} from 'react-native';
import React, { useRef, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {
    VictoryBar,
    VictoryTheme,
    VictoryAxis,
    VictoryChart,
    Background,
    VictoryGroup,
    VictoryLine
} from 'victory-native';
import BottomSheetView1 from '../../../../../../Components/BottomSheetView';

const Score = () => {
   
    const [activeComponent, setactiveComponent] = useState('score')
    const { CheckList } = useSelector(state => state.CheckList)
    const seleted=(id)=>{
        // dispatch({
        //     type: IS_SELECTED,
        //     payload: {
        //       id: id
        //     }
        //   })
    }
    const filterData=()=>{
       
            // dispatch({
            //   type: FILTER_LIST
            // })
            // bottomSheetRef.current.close()
    }

    const bottomSheetRef = useRef(null)
    const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
    return (
        <>
            <View style={{
                width: "100%", paddingHorizontal: 10, paddingVertical: 12,
            }}>

                <TouchableOpacity

                    onPress={() => {
                        setactiveComponent('score')
                    }}

                    style={{
                        ...styles.button,
                        height: activeComponent == 'score' ? 500 : 40,
                        paddingTop: activeComponent == 'score' ? 10 : 0,
                        alignItems: activeComponent == 'score' ? 'flex-start' : 'center',

                    }}>
                    <View style={{
                        width: "100%", height: 50, flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{
                                fontSize: 16,

                                fontWeight: '700',
                                color: activeComponent == 'score' ? '#12626C' : '#12626C',
                            }}>
                            Score
                        </Text>
                        <Entypo name={activeComponent == 'score' ? "chevron-thin-up" : "chevron-thin-down"} size={20} color="black" />
                    </View>


                    {activeComponent == 'score' ? (
                        <View style={{
                            width: '100%', height: 350,

                        }}>

                            <VictoryChart width={250} height={300}>
                                <VictoryAxis


                                    style={{
                                        axis: { stroke: '#686868' },
                                        ticks: { stroke: 'red' },
                                        tickLabels: {
                                            fontSize: 15,
                                            padding: 5,
                                            width: 0,
                                            height: 0,
                                        },
                                    }}
                                    tickValues={[
                                        1, 2, 3, 4,
                                    ]}
                                    tickFormat={['Yes', 'No', 'Probably', 'Never']}
                                />
                                <VictoryGroup horizontal
                                    offset={10}
                                    style={{ data: { width: 12 } }}
                                    colorScale={["brown", "tomato", "gold"]}
                                >
                                    <VictoryBar
                                        data={[
                                            { x: 1, y: 1 },
                                            { x: 2, y: 2 },
                                            { x: 3, y: 3 },
                                            { x: 4, y: 2 },

                                        ]}
                                    />
                                    <VictoryBar
                                        data={[
                                            { x: 1, y: 2 },
                                            { x: 2, y: 3 },
                                            { x: 3, y: 4 },
                                            { x: 4, y: 5 },

                                        ]}
                                    />

                                </VictoryGroup>

                            </VictoryChart>
                        </View>
                    ) : null}

                </TouchableOpacity>
                


            </View>
            <BottomSheetView1
            data={[]}
            onPress={seleted}
            onPress1={filterData}
            counntData={4}
                snapPoints={snapPoints}
                bottomSheetRef={bottomSheetRef}
            />
        </>
    )
}

export default Score

const styles = StyleSheet.create({
    chipsItem: {
        flexDirection: 'row',
        // padding: 7,
        paddingHorizontal: 15,
        height: 40,
    },
    chipsScrollView: {
        paddingLeft: 5,
        zIndex: 0,
        position: 'absolute',
        top: Platform.OS === 'ios' ? 140 : 140,
        //paddingHorizontal: 10,
    },
    container: {
        width: '100%', height: 35, backgroundColor: '#EEEEEF',
        flexDirection: 'row',
        borderRadius: 10
    },
    button: {
        width: '100%',

        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: '#EEEEEF',

        paddingHorizontal: 10
    }

})