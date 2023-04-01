import React from 'react';
import {Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {getToken} from '../AuthHelper';

GoogleSignin.configure({
  webClientId:
    '798481395046-n3l9ld0atrnnaiqbea6b2dvp4u0va77r.apps.googleusercontent.com',
});

// 798481395046-s9261fbe4r5egk70ev3ucpbrq446lkal.apps.googleusercontent.com new
// 798481395046-vrm20q1qjna0giqpn8tej1ss2090suvo.apps.googleusercontent.com arnab
// 798481395046-4t4mk6oc1050hsroedvssuq45cnt2jpt.apps.googleusercontent.com

export async function signOut() {
  auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
    })
    .catch(error => {
      console.error(error);
    });
}

// export function createUserWithEmailAndPassword(userName, password) {
//   auth()
//     .createUserWithEmailAndPassword(userName, password)
//     .then(() => {
//       console.log('User account created & signed in!');
//     })
//     .catch(error => {
//       if (error.code === 'auth/email-already-in-use') {
//         console.log('That email address is already in use!');
//       }

//       if (error.code === 'auth/invalid-email') {
//         console.log('That email address is invalid!');
//       }

//       console.error(error);
//     });
// }

// export function signInUserWithEmailAndPassword(userName, password) {
//   auth()
//     .signInWithEmailAndPassword(userName, password)
//     .then(data => {
//       console.log('User account created & signed in!');
//       console.log(data.user);
//       return data.user;
//     })
//     .catch(error => {
//       if (error.code === 'auth/email-already-in-use') {
//         console.log('That email address is already in use!');
//       }

//       if (error.code === 'auth/invalid-email') {
//         console.log('That email address is invalid!');
//       }

//       console.error(error);
//     });
// }

// export function phoneSignIn(regPhoneNum) {
//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState(null);

//   const [code, setCode] = useState('');

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

//   async function confirmCode() {
//     try {
//       await confirm.confirm(code);
//     } catch (error) {
//       console.log('Invalid code.');
//     }
//   }

//   console.log(`PH: ${regPhoneNum}`);

//   if (!confirm) {
//     return (
//       <Button
//         title="Phone Number Sign In"
//         onPress={() => signInWithPhoneNumber(regPhoneNum)}
//       />
//     );
//   }

//   return (
//     <>
//       <TextInput value={code} onChangeText={text => setCode(text)} />
//       <Button title="Confirm Code" onPress={() => confirmCode()} />
//     </>
//   );
// }

// export function GoogleSignIn() {
//   return (
//     <Button
//       title="Google Sign-In"
//       onPress={() =>
//         onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
//       }
//     />
//   );
// }

export const onGoogleButtonPress = async () => {
  try {
    console.log('1');
    // Check if your device supports Google Play
    // await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    await GoogleSignin.hasPlayServices();

    console.log('2');
    // Get the users ID token
    const userInfo = await GoogleSignin.signIn();
    // const {idToken} = await GoogleSignin.signIn();

    console.log('3');
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );

    console.log('4');
    // Sign-in the user with the credential
    return (await auth().signInWithCredential(googleCredential))?.user;
  } catch (error) {
    console.log(error.code);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};
