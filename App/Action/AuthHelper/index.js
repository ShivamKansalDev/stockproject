import auth from '@react-native-firebase/auth';
import { userUrl } from '../../Url';


const saveUser = (token, setreload) => {

    fetch(`${userUrl}/user`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => {
            // console.log(res, 'red');
            return res.json();
        })
        .then(result => {
            setreload(true)
            console.log(result, 'rea');

        })
        .catch(err => console.log(err, 'reee'));

}
export const updateUserDisplayName = async (name, setreload) => {
    console.log(name);
    let userName = name
    let update = {
        displayName: name
    };

    const pp = await auth().currentUser.updateProfile(update);

    const token = await getTokenRefresh();
    console.log(token, 'token', pp);
    if (token) {
        saveUser(token, setreload)
    }

    else {
        alert('User not found')
    }


}

export async function getToken() {
    return await auth()?.currentUser?.getIdToken(true);
}
export async function getTokenRefresh() {
    return await auth()?.currentUser?.getIdToken(true);
}

export function getCurrentUser() {
    return auth()?.currentUser;
}
