import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Foundation from 'react-native-vector-icons/Foundation';
const NationalOverView = () => {
  return (
    <View style={{width: '90%', height: 130, alignSelf: 'center'}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          marginTop: 10,
          fontWeight: 'bold',
          color: '#6494ec',
          fontStyle: 'italic',
        }}>
        National Overview
      </Text>
      <View style={styles.tableHeaderView}>
        <View style={styles.tableHeader}>
          <View style={{...styles.left2, alignItems: 'flex-start'}}></View>
          <View style={styles.left1}>
            <Text style={{...styles.headerText, fontSize: 15}}>Circuits</Text>
          </View>
          <View style={styles.left1}>
            <Text style={{...styles.headerText, fontSize: 15}}>Devices</Text>
          </View>
          <View style={styles.left1}>
            <Text
              style={{
                ...styles.headerText,
                fontWeight: 'bold',
                fontSize: 18,
                color: 'black',
              }}>
              Total
            </Text>
          </View>
        </View>

        <View style={styles.dataRow}>
          <View style={{...styles.left2, alignItems: 'flex-start'}}>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Monthly
            </Text>
          </View>
          <View
            style={{
              ...styles.left1,
              borderLeftWidth: 1,
              borderLeftColor: '#2ac3b8',
            }}>
            <Text style={{marginRight: 3}}>
              <Foundation name="dollar" size={18} />
            </Text>
            <Text style={{...styles.headerText1}}>4,484</Text>
          </View>
          <View style={{...styles.left1}}>
            <Text style={{marginRight: 3}}>
              <Foundation name="dollar" size={18} />
            </Text>
            <Text style={{...styles.headerText1}}>4,484</Text>
          </View>
          <View style={{...styles.left1}}>
            <Text style={{marginRight: 3}}>
              <Foundation name="dollar" size={18} color="black" />
            </Text>
            <Text style={{...styles.headerText1, color: 'black'}}>4,484</Text>
          </View>
        </View>
        <View style={styles.dataRow}>
          <View style={{...styles.left2, alignItems: 'flex-start'}}>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Yearly
            </Text>
          </View>
          <View
            style={{
              ...styles.left1,
              borderLeftWidth: 1,
              borderLeftColor: '#2ac3b8',
            }}>
            <Text style={{marginRight: 3}}>
              <Foundation name="dollar" size={18} />
            </Text>
            <Text style={{...styles.headerText1}}>4,484</Text>
          </View>
          <View style={{...styles.left1}}>
            <Text style={{marginRight: 3}}>
              <Foundation name="dollar" size={18} />
            </Text>
            <Text style={{...styles.headerText1}}>4,484</Text>
          </View>
          <View style={{...styles.left1}}>
            <Text style={{marginRight: 3}}>
              <Foundation name="dollar" size={18} color="black" />
            </Text>
            <Text style={{...styles.headerText1, color: 'black'}}>4,484</Text>
          </View>
        </View>
        {/* ======data Row====== */}
      </View>
    </View>
  );
};

export default NationalOverView;

const styles = StyleSheet.create({
  //table
  tableHeaderView: {
    width: '100%',
    height: 50,
  },
  tableHeader: {
    width: '100%',
    height: '70%',
    flexDirection: 'row',
    paddingHorizontal: 3,
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    alignItems: 'center',
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  //table
  //dataRow
  dataRow: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    borderBottomColor: '#d8dbdc',
    borderBottomWidth: 0.7,
  },
  left: {
    width: '20%',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: 'red',
    alignItems: 'flex-end',
  },
  left2: {
    width: '25%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  left1: {
    width: '25%',
    height: '100%',
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  right: {
    width: '80%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  headerText1: {
    fontWeight: 'bold',
    fontSize: 13,
  },

  //dataRow
});
