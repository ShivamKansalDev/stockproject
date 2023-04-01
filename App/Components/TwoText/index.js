import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TwoText = () => {
  return (
    <View style={styles.innerLeft}>
                <Text style={{color: 'black', fontSize: 14}}>{"title"}</Text>
                <Text style={{color: '#1B1C28', fontSize: 10}}>{"senSExType"}: {date}</Text>
              </View>
  )
}

export default TwoText

const styles = StyleSheet.create({
    innerLeft: {
        width: '45%',
        height: '100%',
        paddingLeft: 5,
        justifyContent: 'center',
      },
})