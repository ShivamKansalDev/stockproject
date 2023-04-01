
import { CloudUrl } from '../../Url';
import { HOME_COMPANY_NAME } from '../../ActionType/CompanyName';
import { getToken } from '../AuthHelper';

export const getListedHomeIndex = (setniftySensex) => dispatch => {

    getToken().then((token) => {
        fetch(`${CloudUrl}/master/?path=ticker/bse`, {
            method: 'Get',

            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((res) => {
            return res.json()
        }).then(result => {
            if (result) {
                // console.log("!@!@(&*&^&^ COMPANY NAME: ", result.data)
                setniftySensex(false)
                dispatch({
                    type: HOME_COMPANY_NAME,
                    data: result.data
                })
            }
        }).catch(err => console.log(err))
    }).catch((error) => {
        console.log(error)
    })
};
