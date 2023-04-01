import { StyleSheet, Text, ScrollView,
    TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector, useDispatch, connect } from 'react-redux';
import { DETAILS_EVENT } from '../../../../../../ActionType/CompanyDetails';


const TextV = () => {
    return (
        <Text style={{ color: "#0F9764" }}>Read more...</Text>
    )
}
const Event = ({bottomSheetRef2}) => {
    const dispatch=useDispatch()
    const { Event } = useSelector(state => state.Event)

    return (
        <View style={{ width: "100%", paddingHorizontal:5 }}>
            {Event && Event.map((item, i) => {
                return (
                    <View key={i}  style={{
                        width: "100%", flexDirection: "row", marginVertical: 5,
                        paddingRight: 10,

                    }}>
                        <View style={{
                            width: 18, height: 18,
                            borderRadius: 9,
                            marginTop: 5,
                            backgroundColor: '#0F9764'
                        }}></View>

                        {item?.Description.length > 200 ?
                         (
                            
                         <Text style={{ marginHorizontal: 5,color:'black' }}>
                            {item?.Description.substring(0, 200)}
                            <TouchableOpacity 
                            onPress={()=>{
                                // bottomSheetRef.current.snapToIndex(2)
                                dispatch({
                                    type:DETAILS_EVENT,
                                    data:item.Description
                                })
                                bottomSheetRef2.current.snapToIndex(2)
                            }}
                            >
                            <Text style={{color:"#0F9764",marginTop:10}}>Read more</Text>
                            </TouchableOpacity>
                            </Text>
                           
                           
                            ) : 
                            (
                            <Text style={{ marginHorizontal: 5,
                                color:'black' }}>
                                  {item?.Description}</Text>
                        )
                        }

                    </View>
                )
            })}

        </View>
    )
}

export default Event

const styles = StyleSheet.create({})