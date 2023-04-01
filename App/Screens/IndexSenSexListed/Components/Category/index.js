import {
    StyleSheet,
    Text,
    View,
    Platform,
    FlatList,
    TouchableOpacity,
  } from 'react-native';
import React, {useRef} from 'react';
export const data = [
    {id: 0, name: 'Domestic Index', isActive: true, value: 'DomesticIndex'},
    {id: 1, name: 'International Index', isActive: false, value: 'InternationalIndex'},
    {id: 2, name: 'FII/DII Activity', isActive: false, value: 'FIIDIIActivity'},
    {id: 3, name: 'Sector', isActive: false, value: 'SectorName'},
    {id: 4, name: 'Deal', isActive: false, value: 'Deal'},
    {id: 5, name: 'Top Loser', isActive: false, value: 'TopLoser'},
    {id: 6, name: 'Top Gainer', isActive: false, value: 'TopGainer'},
    {id: 7, name: 'Out Performer', isActive: false, value: 'OutPerformer'},
    {id: 7, name: 'Advance / Decline', isActive: false, value: 'AdvanceDecline'},
   
  ];
const Category = ({setDisplayComponents}) => {
    const [allItem, setAllItem] = React.useState(data);
    const [setectItem, setsetectItem] = React.useState('');
    const myRef = useRef(null);

    const actiText = (id,val) => {
      // console.log(val)
        listData = allItem.map(item => {
            let itm = {...item, isActive: false};
            return itm;
          });
          
          listData[id].isActive = true;
          setAllItem(listData);
          setDisplayComponents(val)
      };
    const centerTab = i => {
        myRef.current.scrollToIndex({animated: true, index: i, viewPosition: 0.5});
      };
  return (
    <>
    <View style={{
            width: "100%", paddingHorizontal: 10, paddingVertical: 12,
        }}>
    <View style={{
            width: "100%", backgroundColor:'#FAFAFA',
            borderRadius:8
        }}>
     
   
        <FlatList
          horizontal
          ref={myRef}
          data={allItem}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                ref={myRef}
                onPress={() => {
                  actiText(index,item.value);
                  centerTab(index);
                }}
                key={index}
                style={{
                  ...styles.chipsItem,
                // marginRight:20,
                // paddingVertical:5,
                  alignItems: 'center',
                  
                  
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight:item.isActive ?'500':null,
                    color: item.isActive ? '#12626C' : '#686868',
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.contentContainer}
        />
   
      </View>
      </View>
    </>
  )
}

export default Category

const styles = StyleSheet.create({
    chipsItem: {
        flexDirection: 'row',
       
        // padding: 7,
        paddingHorizontal: 15,
        marginHorizontal: 5,
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
    }

})