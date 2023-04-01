import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

export const data = [
  {id: 0, name: 'Quaterly Results', isActive: false, value: 'Quaterly Results'},
  {id: 1, name: 'Profit And Loss', isActive: false, value: 'Profit And Loss'},
  {id: 2, name: 'Balance Sheet', isActive: false, value: 'Balance Sheet'},
  {id: 3, name: 'Cash Flow', isActive: false, value: 'Cash Flow'},
];
const Financials = () => {
  const [allItem, setAllItem] = React.useState(data);

  const myRef = useRef(null);

  const actiText = id => {
    let listData;
    const entry = allItem.find(i => i.isActive === true);
    if (entry == undefined) {
      listData = allItem.map(item => {
        let itm = {...item, isActive: false};
        return itm;
      });

      listData[id].isActive = true;
      setAllItem(listData);
    } else if (entry.id == id) {
      listData = allItem.map(item => {
        let itm = {...item, isActive: false};
        return itm;
      });

      setAllItem(listData);
    } else {
      listData = allItem.map(item => {
        let itm = {...item, isActive: false};
        return itm;
      });
      // third_party_filter(value);

      listData[id].isActive = true;
      setAllItem(listData);
    }
  };
  const centerTab = i => {
    myRef.current.scrollToIndex({animated: true, index: i, viewPosition: 0.5});
  };
  return (
    <>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 10,
          paddingVertical: 12,
        }}>
        <FlatList
          ref={myRef}
          data={allItem}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                ref={myRef}
                onPress={() => {
                  actiText(index);
                  centerTab(index);
                }}
                key={index}
                style={{
                  width: '100%',
                  height: item.isActive ? 400 : 40,
                  marginVertical: 5,
                  borderRadius: 5,
                  backgroundColor: '#EEEEEF',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: item.isActive ? 10 : 0,
                  alignItems: item.isActive ? 'flex-start' : 'center',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,

                    fontWeight: '700',
                    color: item.isActive ? '#12626C' : '#12626C',
                  }}>
                  {item.name}
                </Text>
                <Entypo
                  name={item.isActive ? 'chevron-thin-up' : 'chevron-thin-down'}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </>
  );
};

export default Financials;

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
    width: '100%',
    height: 35,
    backgroundColor: '#EEEEEF',
    flexDirection: 'row',
    borderRadius: 10,
  },
});
