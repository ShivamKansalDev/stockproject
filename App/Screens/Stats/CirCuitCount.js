import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CirCuitCount = () => {
  const [iconShow, setIconShow] = useState(false);
  const data = [
    {id: 1, name: 'Voice', state: 10, city: 10, quantity: 15, uniqueL: 15},
    {id: 1, name: 'Data', state: 15, city: 20, quantity: 22, uniqueL: 22},
    {
      id: 1,
      name: 'Service',
      state: 16,
      city: 1052,
      quantity: 3136,
      uniqueL: 2455,
    },
    {
      id: 1,
      name: 'Wireless',
      state: 15,
      city: 591,
      quantity: 1150,
      uniqueL: 1068,
    },
    {
      id: 1,
      name: 'Cable/Sat',
      state: 15,
      city: 591,
      quantity: 1150,
      uniqueL: 1068,
    },
  ];
  const data1 = [
    {
      id: 1,
      name: 'Cable/Sat',
      state: 8,
      city: 8,
      quantity: 8,
      uniqueL: 8,
    },
    {id: 1, name: 'Wireless', state: 10, city: 10, quantity: 15, uniqueL: 15},
    {
      id: 1,
      name: 'Service',
      state: 15,
      city: 591,
      quantity: 1150,
      uniqueL: 1068,
    },
    {id: 1, name: 'Data', state: 16, city: 1052, quantity: 3136, uniqueL: 2455},
    {id: 1, name: 'Voice', state: 15, city: 20, quantity: 22, uniqueL: 22},
  ];
  const [data2, setData2] = useState([]);
  const assen = () => {
    setData2(data);
  };
  const dec = () => {
    setData2(data1);
  };
  useEffect(() => {
    if (iconShow) {
      setData2(data);
    } else {
      setData2(data1);
    }
  }, [iconShow]);

  return (
    <>
      <View style={styles.container}>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: 'bold',
            color: 'black',
            fontStyle: 'italic',
          }}>
          Circuit Count
        </Text>
        {/* ================== Table Header======= */}
        <View style={styles.tableHeaderView}>
          <View style={styles.tableHeader}>
            <View style={{...styles.left2, alignItems: 'flex-start'}}>
              <Text style={styles.headerText}>Category</Text>
            </View>
            <View style={styles.left1}>
              <Text style={styles.headerText}>At&T</Text>
            </View>
            <View style={styles.left1}>
              <Text style={styles.headerText}>VeriZon</Text>
            </View>
            <View style={styles.left1}>
              <Text style={styles.headerText}>Granite</Text>
            </View>
            <View style={styles.left2}>
              <Text style={styles.headerText}>Other</Text>
            </View>
          </View>

          <View style={styles.tableHeaderIcon}>
            {iconShow ? (
              <TouchableOpacity onPress={() => setIconShow(!iconShow)}>
                <AntDesign name="caretup" size={10} color="black" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setIconShow(!iconShow)}>
                <AntDesign name="caretdown" size={10} color="black" />
              </TouchableOpacity>
            )}
          </View>
          {/* ======data Row====== */}
          {data2.map((item, i) => {
            return (
              <View key={i} style={styles.dataRow}>
                <View style={{...styles.left2, alignItems: 'flex-start'}}>
                  <Text style={{...styles.headerText, marginLeft: 5}}>
                    {item.name}
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.left1,
                    borderLeftWidth: 1,
                    borderLeftColor: '#2ac3b8',
                  }}>
                  <Text style={styles.headerText}>{item.state}</Text>
                </View>
                <View style={{...styles.left1}}>
                  <Text style={styles.headerText}>{item.city}</Text>
                </View>
                <View style={{...styles.left1}}>
                  <Text style={{...styles.headerText1}}>{item.quantity}</Text>
                </View>
                <View style={styles.left2}>
                  <Text style={{...styles.headerText, marginRight: 5}}>
                    {item.uniqueL}
                  </Text>
                </View>
              </View>
            );
          })}
          <View style={styles.dataRow}>
            <View style={{...styles.left2, alignItems: 'flex-start'}}>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Total
              </Text>
            </View>
            <View
              style={{
                ...styles.left1,
                borderLeftWidth: 1,
                borderLeftColor: '#2ac3b8',
              }}>
              <Text style={styles.headerText}>33</Text>
            </View>
            <View style={{...styles.left1}}>
              <Text style={styles.headerText}>1,134</Text>
            </View>
            <View style={{...styles.left1}}>
              <Text style={{...styles.headerText1}}>4,484</Text>
            </View>
            <View style={styles.left2}>
              <Text style={{...styles.headerText, marginRight: 5}}>2,639</Text>
            </View>
          </View>
          {/* ======data Row====== */}
        </View>

        {/* ================== Table Header======= */}
      </View>
    </>
  );
};

export default CirCuitCount;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 220,
  },
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
    alignItems: 'center',
  },
  tableHeaderIcon: {
    width: '100%',
    height: '30%',
    paddingRight: 10,
    borderBottomColor: '#2ac3b8',
    borderBottomWidth: 1,
    paddingBottom: 2,
    alignItems: 'flex-end',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  //table
  //dataRow
  dataRow: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
  },
  left: {
    width: '20%',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: 'red',
    alignItems: 'flex-end',
  },
  left2: {
    width: '24.5%',
    height: '100%',
    alignItems: 'flex-end',

    justifyContent: 'center',
  },
  left1: {
    width: '17%',
    height: '100%',
    alignItems: 'flex-end',
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
