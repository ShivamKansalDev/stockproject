import {StyleSheet, View, Image} from 'react-native';

import React from 'react';
import Button from './Button';

const Header = () => {
  return (
    <View style={styles.headerView}>
      <View style={styles.titleView}>
        <Image
          source={require('../../images/siteTitle.png')}
          style={{width: '70%', height: '80%', resizeMode: 'contain'}}
        />
      </View>
      <View style={styles.titleView}>
        <Image
          source={require('../../images/banKTitle.png')}
          style={{width: '50%', height: '80%', resizeMode: 'contain'}}
        />
      </View>
      {/* ======================= */}
      <View style={styles.buttonRowView}>
        <Button width="32.5%" title="Main Page" height={45} />
        <Button width="30%" title="Orders" height={45} />
        <Button width="35.5%" title="Retionalization" height={45} />
      </View>
      <View style={{...styles.buttonRowView}}>
        <Button width="28.5%" title="Analytics" height={45} />
        <Button width="28.5%" title="Strategy" height={45} />
        <Button width="40.5%" title="Advanced Search" height={45} />
      </View>
      {/* ======================= */}
      <View
        style={{
          height: 90,
          width: '100%',
          marginTop: 15,
        }}>
        <View style={styles.buttonRowView2}>
          <Button width="48%" title="Site Details" height={35} />
          <Button width="48%" title="Site Certefication" height={35} />
        </View>
        <View style={styles.buttonRowView2}>
          <Button width="48%" title="Circuit Search" height={35} />
          <Button width="48%" title="Site Search" height={35} />
        </View>
      </View>
      {/* ======================= */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  //Header View
  headerView: {
    width: '100%',
    paddingTop: 20,
  },
  titleView: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRowView: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  buttonRowView2: {
    width: '100%',
    height: 46,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  //Header View
});
