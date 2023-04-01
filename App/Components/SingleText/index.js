import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SingleText = () => {
  return (
    <View style={styles.innerLeft}>
                <Text style={{color: 'black', fontSize: 14}}>{"title"}</Text>
                
              </View>
  )
}

export default SingleText

const styles = StyleSheet.create({
    innerLeft: {
        width: '45%',
        height: '100%',
        paddingLeft: 5,
        justifyContent: 'center',
      },

})