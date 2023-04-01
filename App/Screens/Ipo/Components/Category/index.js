import {
    StyleSheet,
    Text,
    View,
    Platform,
    FlatList,
    TouchableOpacity,
  } from 'react-native';
import React, {useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IPO } from '../../../../ActionType/Ipo';
import { useIsFocused } from '@react-navigation/native';

export const data = [
    {id: 0, name: 'Best Performing IPO', isActive: true, value: 'BestPerformingIPO'},
    {id: 1, name: 'Forth Coming', isActive: false, value: 'ForthComing'},
    {id: 2, name: 'Open IPO', isActive: false, value: 'OpenIPO'},
    {id: 3, name: 'Closed IPO', isActive: false, value: 'ClosedIPO'},
    {id: 4, name: 'New Listing', isActive: false, value: 'NewListing'},
    {id: 5, name: 'Companies With Financials', isActive: false, value: 'CompaniesWithFinancials'},
    {id: 6, name: 'Unlisted Companies Filing for IPO', isActive: false, value: 'UnlistedCompanies'},
    {id: 7, name: 'Class Wise Companies', isActive: false, value: 'ClassWise'},
    {id: 8, name: 'Status Wise Companies', isActive: false, value: 'StatusWise'},
    {id: 9, name: 'Most Viewed Companies', isActive: false, value: 'MostViewed'},
   
  ];
const Category = ({setDisplayComponents}) => {
  const focus=useIsFocused()
  const {Ipo}=useSelector(state=>state.Ipo)
  
    const [allItem, setAllItem] = React.useState(data);
    const [setectItem, setsetectItem] = React.useState('');
    const myRef = useRef(null);
   const dispatch= useDispatch()

    const actiText = (id,val) => {
      
        listData = allItem.map(item => {
            let itm = {...item, isActive: false};
            return itm;
          });
          
          listData[id].isActive = true;
          setAllItem(listData);
          // setDisplayComponents(val)
      };
    const centerTab = i => {
        myRef.current.scrollToIndex({animated: true, index: i, viewPosition: 0.5});
      };
      useEffect(() => {
      const nameee=  data.find(item=>item.value===Ipo.ipo)
        if (nameee) {
          centerTab(nameee.id)
        }
      // console.log(nameee,'pp');
      }, [Ipo.ipo])
      
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
                  // actiText(index,item.value);
                  // centerTab(index);
                  dispatch({
                    type:IPO,
                    data:item.value
                })
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
                    color: Ipo===item.value ? '#12626C' : '#686868',
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