import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SingleBoxForDrawer from '../SingleBoxForDrawer'

const DrawerItemm = ({title,leftIcon ,onPress }) => {
    return (
        <>
            <TouchableOpacity style={{
                width: '100%', 
            }}
            onPress={()=>{
                onPress()
            }}>
                
                
                    <View style={{ height: 50, width: '100%',  }}>
                        <SingleBoxForDrawer title={title}
                            leftIcon={leftIcon}
                            
                        />
                        <View style={{
                    width: '95%',
                    height:1, backgroundColor:'#D7D9E4',
                    alignSelf:'center',
                    marginTop:4
                }}>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default DrawerItemm

const styles = StyleSheet.create({})