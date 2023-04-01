import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FilterButton = ({bottomRef, title, onPress, setDiplayName}) => {
  return (
    <View
      style={{
        width: '45%',
        height: '100%',
        borderBottomColor: 'red',
        borderBottomWidth: 2,

        flexDirection: 'row',
      }}>
      <View
        style={{
          width: '80%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{title}</Text>
      </View>
      <View
        style={{
          width: '20%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            onPress();
          }}>
          <AntDesign name="caretdown" size={16} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const FilterArea = ({bottomRef, setDiplayName}) => {
  const statusCheck = () => {
    setDiplayName('Status');
    bottomRef.current.snapToIndex(1);
  };
  const checkircuit = () => {
    setDiplayName('Ciruit ID');
    bottomRef.current.snapToIndex(1);
  };
  return (
    <View style={{width: '100%'}}>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'center',
          color: 'black',
          fontWeight: 'bold',
        }}>
        Filter
      </Text>
      <View
        style={{
          width: '100%',
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <FilterButton
          onPress={checkircuit}
          title="Ciruit ID"
          setDiplayName={setDiplayName}
          bottomRef={bottomRef}
        />
        <FilterButton
          onPress={statusCheck}
          title="Status"
          setDiplayName={setDiplayName}
          bottomRef={bottomRef}
        />
      </View>
    </View>
  );
};

export default FilterArea;

const styles = StyleSheet.create({});
