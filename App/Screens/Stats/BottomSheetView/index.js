import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  Keyboard,
} from 'react-native';
import React, {useMemo} from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
const BottomSheetView = ({bottomRef, diplayName}) => {
  const snapPoints = useMemo(() => ['10%', '30%'], []);
  const data = [
    {id: 0, name: 'Active'},
    {id: 1, name: 'Inactive'},
  ];

  return (
    <>
      <BottomSheet
        handleIndicatorStyle={{
          backgroundColor: '#757575',
          height: 2.5,
          opacity: 0.5,
        }}
        enabledInnerScrolling={true}
        enabledContentGestureInteraction={false}
        ref={bottomRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        animateOnMount
        animatedPosition={true}>
        <View style={{flex: 1}}>
          <View style={{...styles.top}}>
            <View style={styles.textView}>
              <TouchableOpacity
                onPress={() => {
                  bottomRef.current.close();
                  Keyboard.dismiss();
                }}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: '#007aff'}}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {diplayName}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  bottomRef.current.close();
                  Keyboard.dismiss();
                }}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: '#007aff'}}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <BottomSheetFlatList
            keyboardShouldPersistTaps="handled"
            data={data}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss();
                    bottomRef.current.close();
                  }}
                  style={{
                    width: '100%',
                    height: 30,
                    marginVertical: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default BottomSheetView;

const styles = StyleSheet.create({
  top: {width: '100%', height: 50},
  textView: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  searchView: {
    width: '90%',
    height: 50,

    alignSelf: 'center',
    borderColor: 'black',
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
  },
  searchViewLeft: {
    width: '90%',
    height: '100%',
  },
  searchViewRight: {
    width: '10%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',

    paddingRight: 5,
  },
});
