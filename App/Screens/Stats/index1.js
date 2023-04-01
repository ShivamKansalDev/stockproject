import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import {Checkbox} from 'react-native-paper';
import {TextInput, Input} from 'react-native-paper';
// import Lodder from '../../components/lodder';

const Stats = () => {
  const [text, setText] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [passCheck, setPassCheck] = React.useState(true);
  const [lodding, setLodding] = React.useState(false);
  const submit = () => {
    if (!password || !text) {
      Snackbar.show({
        text: 'ALL Fields are Required',
        textColor: 'white',
        backgroundColor: 'red',
      });
    } else {
      setLodding(true);
      setPassword('');
      setText('');
      setTimeout(() => {
        setLodding(false);
        setTimeout(() => {
          Snackbar.show({
            text: 'Submit Successful',
            textColor: 'white',
            backgroundColor: 'green',
          });
        }, 1000);
      }, 2000);
    }
  };
  return (
    <>
      <SafeAreaView
        style={{
          marginTop: StatusBar.currentHeight,
          flex: 1,
        }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            {/* ==========logo======== */}
            <View style={styles.logoView}>
              <Image
                source={require('../../images/siteTitle.png')}
                style={{width: 200, height: 120, resizeMode: 'contain'}}
              />
            </View>
            {/* ==========logo======== */}
            {/* ==========input======== */}

            <View style={styles.inputView}>
              <Text
                style={{textAlign: 'center', fontSize: 16, fontWeight: '800'}}>
                Sing In
              </Text>
              <TextInput
                label="Username"
                mode="outlined"
                value={text}
                theme={{
                  colors: {
                    primary: '#95bcd8', // Outline color here
                  },
                }}
                style={{marginTop: 15, width: '90%', alignSelf: 'center'}}
                onChangeText={text => setText(text)}
                left={
                  <TextInput.Icon
                    name={() => <Entypo name={'user'} size={22} />}
                  />
                }
                right={
                  <TextInput.Icon
                    name={() => (
                      <FontAwesome name={'question-circle'} size={22} />
                    )}
                  />
                }
              />
              <TextInput
                mode="outlined"
                secureTextEntry={passCheck}
                style={{marginTop: 15, width: '90%', alignSelf: 'center'}}
                theme={{
                  colors: {
                    primary: '#95bcd8', // Outline color here
                  },
                }}
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                left={
                  <TextInput.Icon
                    name={() => <FontAwesome name={'lock'} size={22} />}
                  />
                }
                right={
                  <TextInput.Icon
                    name={() => (
                      <FontAwesome name={'question-circle'} size={22} />
                    )}
                  />
                }
              />
              {/* ==========Remember======== */}
              <View style={styles.check}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                  color="#1b5a90"
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                  }}>
                  Remember me
                </Text>
              </View>
              {/* ==========Remember======== */}
              {/* ==========button======== */}
              <TouchableOpacity style={styles.button} onPress={submit}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: '800',
                    color: 'white',
                  }}>
                  Sing In
                </Text>
              </TouchableOpacity>
              {/* ==========button======== */}
              <View style={styles.check}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                  }}>
                  need help singing in?
                </Text>
              </View>
            </View>
            {/* ==========input======== */}
          </View>
        </TouchableWithoutFeedback>
        {/* ==========Lodder======== */}
        {/* <Lodder lodding={lodding} /> */}
      </SafeAreaView>
    </>
  );
};

export default Stats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //=======logo
  logoView: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //=======logo
  //=======input
  inputView: {
    width: '100%',
    height: '70%',
  },
  //=======input
  //=======button
  button: {
    width: '90%',
    height: 60,
    backgroundColor: '#3577b5',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //=======button
  //=======check
  check: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  //=======check
});
